import React, { Component } from 'react';

import { Alert, ActivityIndicator } from 'react-native';
import Api from "../../services/Api";

import { tradePartner, tradeType, tradeTypeBuy } from "../../helpers";
import Buy from './Buy';
import Sell from './Sell';
import { createBasicNavigationOptions } from "../../style/navigation";
import Feedback from "./Feedback";
import { keysToCamelCase } from "../../helpers";

export default class Trade extends Component {
    static navigationOptions = createBasicNavigationOptions('Сделка');

  state = {
    pending: false,
    errors: undefined,
    messages: [],
    ws: null,
  };

  componentDidMount() {
    this.props.updatePartnerActivity({[this.partner.id]: this.partner.online});
    this.socket = new WebSocket('ws://91.228.155.81/cable');
    this.socket.onopen = this.onConnect;
    this.socket.onmessage = this.onMessage;
    this.socket.onclose = this.onDisconnect;
  }

  componentWillUnmount() {
    if (this.socket instanceof WebSocket) {
      this.socket.close()
    }
  }

  onConnect = () => {
    let intervalId = setInterval(() => {
      if (!!this.props.trade.conversation_id) {
        switch (this.socket.readyState) {
          case this.socket.CLOSING:
          case this.socket.CLOSED:
            clearInterval(intervalId);
            break;
          case this.socket.OPEN:
            this.subscribeOnChatConversation(this.props.trade.conversation_id);
            clearInterval(intervalId);
            break;
          default:
            break;
        }
      }
    }, 100);
  };

  onMessage = (event) => {
    let data = JSON.parse(event.data);
    switch (data.type) {
      case 'welcome':
      case 'ping':
        break;
      case 'confirm_subscription':
        console.log('Subscription confirmed (Api::V1::ChatChannel)');
        break;
      default:
        let message = data.message;
        if (message.messages) {
          this.setState({messages: message.messages.map(message => keysToCamelCase(message))});
        } else if (message.error) {
          this.setState({error: message.error})
        }
        break;
    }
  };

  onDisconnect = (event) => {
    event.wasClean ?
      console.warn('Disconnect was clean (Api::V1::ChatChannel)') :
      console.warn('Disconnect (Api::V1::ChatChannel):', event);
  };

  sendMessage = (params = {}) => {
    this.setState({error: null});
    this.send({
      command: 'message',
      data: JSON.stringify({...params, action: 'create'}),
    });
  };

  send = (data) => {
    this.socket.send(
      JSON.stringify({
        ...data,
        identifier: JSON.stringify({
          channel: 'Api::V1::ChatChannel',
          conversation_id: this.props.trade.conversation_id
        })
      })
    );
  };

  subscribeOnChatConversation = (conversationId) => {
    this.socket.send(
      JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'Api::V1::ChatChannel',
          conversation_id: conversationId
        })
      })
    );
  };

      onSubmit = (msg, clearInput) => {
            clearInput();
            this.sendMessage({body: msg});
      };

    tradeActionHandlerFactory = (endpoint) => () => {
        Alert.alert('Are you sure?', undefined, [
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            {text: 'OK', onPress: () => {
                    Api.post(`/trades/${this.props.trade.id}${endpoint}`)
                        .then(response => {
                            this.props.update(response.data.trade);
                            this.setState({pending: false});
                        }).catch(error => {
                            const newState = {pending: false};

                            //console.warn(JSON.stringify(error, undefined, 2));
                            if (error.response.status === 405) {
                                newState.errors = error.response.data.errors;
                            }

                            this.setState(newState);
                        });

                    this.setState({pending: true})
                }},
        ]);
    };

  onPaidHandler = this.tradeActionHandlerFactory('/confirm');
  onCancelHandler = this.tradeActionHandlerFactory('/cancel');
  onCompleteHandler = this.tradeActionHandlerFactory('/complete');

  get createdAt() {
      let date = new Date(this.props.trade.created_at);

      let day = ("0" + date.getDate()).slice(-2);
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let year = date.getFullYear();

      let hours = ("0" + date.getHours()).slice(-2);
      let minutes = ("0" + date.getMinutes()).slice(-2);
      return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
  }

  renderBuyActionBlock() {
    return <Buy
      messages={this.state.messages}
      sendMessage={this.onSubmit}
      partnerName={this.partner.user_name}
      isOnline = {this.props.partnerActivityStatuses[this.partner.id]}
      onCancelHandler={this.onCancelHandler}
      onCompleteHandler={this.onCompleteHandler}
      {...this.props}
    />;
  }

  renderSellActionBlock() {
    return <Sell
      messages={this.state.messages}
      sendMessage={this.onSubmit}
      partnerName={this.partner.user_name}
      isOnline = {this.props.partnerActivityStatuses[this.partner.id]}
      createdAt = {this.createdAt}
      onPaidHandler={this.onPaidHandler}
      {...this.props}
    />;
  };

    renderActionBlock = () => {
        if(!this.isTradeLoaded){
            return undefined;
        }

        if(this.state.pending) {
            return <ActivityIndicator size="large" />
        }
        const { status } = this.props.trade;

        return this.isUserBuying() ? this.renderBuyActionBlock(status) : this.renderSellActionBlock(status);
    };

    isUserBuying = () => {
        return this.isTradeLoaded() && (tradeType(this.props.trade, this.props.user.id) === tradeTypeBuy);
    };

    isTradeLoaded = () => {
        return !!this.props.trade.status;
    };

    get partner() {
        return this.isTradeLoaded() ? tradePartner(this.props.trade, this.props.user.id) : "";
    }

    get actionTitle () {
        return this.isUserBuying() ? 'ПОКУПКУ ОНЛАЙН' : 'ПРОДАЖУ ОНЛАЙН';
    }

    render() {
        return this.renderActionBlock();
    }
}