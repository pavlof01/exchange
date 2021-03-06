import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Api from '../../services/Api';
import OneSignal from 'react-native-onesignal';
import {
  tradePartner,
  tradeType,
  tradeTypeBuy,
  isTradeDone,
  keysToCamelCase,
} from '../../helpers';
import Buy from './Buy';
import Sell from './Sell';
import { createBasicNavigationOptions } from '../../style/navigation';
import ModalDialog from '../../style/ModalDialog';
import TradeReportRating from './TradeReportRating';

class Trade extends Component {
  static navigationOptions = createBasicNavigationOptions('Trade');

  state = {
    pending: false,
    messages: [],
    isConfirming: false,
    tradeEndpoint: null,
  };

  componentDidMount() {
    this.props.updatePartnerActivity({ [this.partner.id]: this.partner.online });
    this.socket = new WebSocket('ws://91.228.155.81/cable');
    this.socket.onopen = this.onConnect;
    this.socket.onmessage = this.onMessage;
    this.socket.onclose = this.onDisconnect;
  }

  componentWillUnmount() {
    if (this.socket instanceof WebSocket) {
      this.socket.close();
    }
  }

  onConnect = () => {
    const intervalId = setInterval(() => {
      OneSignal.inFocusDisplaying(0);
      const {
        trade,
      } = this.props;
      if (trade.conversation_id) {
        switch (this.socket.readyState) {
          case this.socket.CLOSING:
          case this.socket.CLOSED:
            clearInterval(intervalId);
            break;
          case this.socket.OPEN:
            this.subscribeOnChatConversation(trade.conversation_id);
            clearInterval(intervalId);
            break;
          default:
            break;
        }
      }
    }, 100);
  };

  onMessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'welcome':
      case 'ping':
        break;
      case 'confirm_subscription':
        console.log('Subscription confirmed (Api::V1::ChatChannel)');
        break;
      default:
        const message = data.message;
        if (message.messages) {
          this.setState({ messages: message.messages.map(msg => keysToCamelCase(msg)) });
        }
        break;
    }
  };

  /* eslint-disable  */
  onDisconnect = (event) => {
    OneSignal.inFocusDisplaying(2);
    console.warn('chat disconnect');
    event.wasClean
      ? console.log('Disconnect was clean (Api::V1::ChatChannel)')
      : console.log('Disconnect (Api::V1::ChatChannel):', event);
  };
  /* eslint-enable  */

  sendMessage = (params = {}) => {
    this.send({
      command: 'message',
      data: JSON.stringify({ ...params, action: 'create' }),
    });
  };

  send = (data) => {
    this.socket.send(
      JSON.stringify({
        ...data,
        identifier: JSON.stringify({
          channel: 'Api::V1::ChatChannel',
          conversation_id: this.props.trade.conversation_id,
        }),
      }),
    );
  };

  subscribeOnChatConversation = (conversationId) => {
    this.socket.send(
      JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'Api::V1::ChatChannel',
          conversation_id: conversationId,
        }),
      }),
    );
  };

  onSubmit = (msg, clearInput) => {
    clearInput();
    this.sendMessage({ body: msg });
  };

  tradeActionHandlerFactory = endpoint => () => {
    this.setState({
      isConfirming: true,
      tradeEndpoint: endpoint,
    });
  };

  sendSelectedTradeRequest = () => {
    const endpoint = this.state.tradeEndpoint;
    if (endpoint) {
      Api.post(`/trades/${this.props.trade.id}${endpoint}`)
        .then((response) => {
          this.props.update(response.data.trade);
          this.setState({ pending: false });
        })
        .catch((error) => {
          const newState = { pending: false };
          if (error.response.status === 405) {
            newState.errors = error.response.data.errors;
          }
          this.setState(newState);
        });
      this.setState({
        pending: true,
        isConfirming: false,
      });
    }
  };

  closeModal = () => {
    this.setState({ isConfirming: false });
  };

  onPaidHandler = this.tradeActionHandlerFactory('/complete');

  onCancelHandler = this.tradeActionHandlerFactory('/cancel');

  onCompleteHandler = this.tradeActionHandlerFactory('/confirm');

  get createdAt() {
    const date = new Date(this.props.trade.created_at);

    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const year = date.getFullYear();

    const hours = (`0${date.getHours()}`).slice(-2);
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  renderBuyActionBlock() {
    const {
      messages,
    } = this.state;
    const {
      partnerActivityStatuses,
    } = this.props;
    return (
      <Buy
        messages={messages}
        sendMessage={this.onSubmit}
        partnerName={this.partner.user_name}
        isOnline={partnerActivityStatuses[this.partner.id]}
        onCancelHandler={this.onCancelHandler}
        onCompleteHandler={this.onCompleteHandler}
        {...this.props}
      />
    );
  }

  renderSellActionBlock() {
    const {
      messages,
    } = this.state;
    const {
      partnerActivityStatuses,
    } = this.props;
    return (
      <Sell
        messages={messages}
        sendMessage={this.onSubmit}
        partnerName={this.partner.user_name}
        isOnline={partnerActivityStatuses[this.partner.id]}
        createdAt={this.createdAt}
        onPaidHandler={this.onPaidHandler}
        {...this.props}
      />
    );
  }

  renderTradeCompleted = () => {
    const {
      messages,
    } = this.state;
    const {
      trade,
      user,
    } = this.props;
    return (
      <TradeReportRating
        trade={trade}
        messages={messages}
        sendMessage={this.onSubmit}
        partnerName={this.partner.user_name}
        isUserBuying={this.isUserBuying()}
        user={user}
      />
    );
  };

  renderActionBlock = () => {
    if (!this.isTradeLoaded) {
      return undefined;
    }

    if (this.state.pending) {
      return <ActivityIndicator size="large" />;
    }
    const { status } = this.props.trade;

    if (this.isTradeCompleted()) {
      return this.renderTradeCompleted();
    }

    return this.isUserBuying()
      ? this.renderBuyActionBlock(status)
      : this.renderSellActionBlock(status);
  };

  isUserBuying = () => {
    const {
      trade,
      user,
    } = this.props;
    return this.isTradeLoaded() && (tradeType(trade, user.id) === tradeTypeBuy);
  };

  isTradeLoaded = () => {
    const {
      trade,
    } = this.props;
    return !!(trade && trade.status);
  };

  isTradeCompleted = () => {
    if (this.isTradeLoaded()) {
      const { status } = this.props.trade;
      return isTradeDone(status);
    }
    return false;
  };

  get partner() {
    const {
      trade,
      user,
    } = this.props;
    return this.isTradeLoaded() ? tradePartner(trade, user.id) : '';
  }

  renderProgress = () => (
    <View style={{
      flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <ActivityIndicator size="large" />
    </View>
  );

  render() {
    const {
      isConfirming,
    } = this.state;
    if (!this.isTradeLoaded()) return this.renderProgress();
    return (
      <View style={{ flex: 1 }}>
        {this.renderActionBlock()}
        <ModalDialog
          title={<FormattedMessage id="app.trade.sure" />}
          isOpen={isConfirming}
          onClose={this.closeModal}
          onNegativePress={this.closeModal}
          onPositivePress={this.sendSelectedTradeRequest}
        />
      </View>
    );
  }
}

Trade.propTypes = {
  trade: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  partnerActivityStatuses: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  update: PropTypes.func,
  updatePartnerActivity: PropTypes.func,
};

export default Trade;
