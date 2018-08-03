import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import { fonts } from '../../style/resourceHelpers';
import { injectIntl, intlShape } from 'react-intl';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    color: '#9b9b9b',
    marginEnd: 17,
    marginStart: 17,
    marginTop: 16,
    paddingBottom: 3,
    marginBottom: 3,
    fontSize: 16,
    fontFamily: fonts.bold.regular,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
  toggleChatBox: {
    flexDirection: 'row',
    height: 50,
    marginEnd: 17,
    marginStart: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
  toggleChatBoxText: {
    color: '#4a4a4a',
    fontFamily: fonts.medium.regular,
    fontSize: 16,
    flex: 1,
    lineHeight: 48,
  },
  addIcon: {
    marginRight: 10,
  },
  pickerIcon: {
    marginLeft: 10,
  },
  pickerIconOpen: {
    marginLeft: 10,
    transform: [
      { scaleY: -1 },
    ],
  },
  chatContainer: {
    height: 200,
    backgroundColor: '#f8f9fb',
  },
  chatContentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    flex: 1,
    marginEnd: 25,
    marginStart: 25,
  },
  messageUserName: {
    color: '#4a4a4a',
    fontFamily: fonts.bold.regular,
    fontSize: 12,
  },
  messageBubble: {
    width: '85%',
    backgroundColor: '#ffffff',
    padding: 10,
    flex: 1,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
  },
  messageBubbleText: {
    color: '#000000',
    fontFamily: fonts.medium.regular,
    fontSize: 14,
  },
  messageTimeText: {
    color: '#4a4a4a',
    fontFamily: fonts.medium.regular,
    fontSize: 12,
  },
  me: {
    flex: 1,
    alignItems: 'flex-end',
  },
  trader: {
    flex: 1,
  },
  messageInput: {
    color: '#4a4a4a',
    fontFamily: fonts.medium.regular,
    fontSize: 14,
    lineHeight: 20,
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 17,
    paddingEnd: 17,
  },
});

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false,
    };
    this.input = null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    if (prevState.isOpen !== isOpen && isOpen) {
      this.focus();
    }
  }

  handleToggleChat = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  handleChangeText = (value) => {
    const { onChangeText } = this.props;
    if (typeof onChangeText === 'function') {
      onChangeText(value);
    }
  };

  handleSubmitEditing = () => {
    const { onSubmitEditing } = this.props;
    if (typeof onSubmitEditing === 'function') {
      onSubmitEditing();
    }
  };

  handleStartShouldSetResponderCapture = () => {
    const { onStartShouldSetResponderCapture } = this.props;
    if (typeof onStartShouldSetResponderCapture === 'function') {
      onStartShouldSetResponderCapture();
    }
  };

  _keyExtractor = item => item.id;

  renderMessage = (message) => {
    const {
      userId,
    } = this.props;
    const messageUserId = message.item.user.id;
    const isMyMessage = messageUserId === userId;
    const messageTime = `${moment(message.item.date).utcOffset('+0300').format('HH:mm')} (MSK)`;
    return (
      <View
        key={messageUserId}
        style={[styles.messageContainer, isMyMessage ? styles.me : styles.trader]}
      >
        {
          !isMyMessage && (
            <Text style={styles.messageUserName}>
              {message.item.user.userName}
            </Text>
          )
        }
        <View style={styles.messageBubble}>
          <Text style={styles.messageBubbleText}>
            {message.item.body}
          </Text>
        </View>
        <Text style={styles.messageTimeText}>
          {messageTime}
        </Text>
      </View>
    );
  };

  render() {
    const {
      isOpen,
    } = this.state;
    const {
      messages,
      messageValue,
      intl,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {intl.formatMessage({ id: 'app.trade.feedback.chat', defaultMessage: 'Chat' })}
        </Text>
        <TouchableOpacity onPress={this.handleToggleChat}>
          <View style={styles.toggleChatBox}>
            <Image source={require('../../img/ic_add_message.png')} style={styles.addIcon} />
            <Text style={styles.toggleChatBoxText}>
              {intl.formatMessage({ id: 'app.trade.feedback.addMsg', defaultMessage: 'Add message' })}
            </Text>
            <Image source={require('../../img/ic_picker.png')} style={isOpen ? styles.pickerIconOpen : styles.pickerIcon} />
          </View>
        </TouchableOpacity>
        {
          isOpen && (
            <View onStartShouldSetResponderCapture={this.handleStartShouldSetResponderCapture}>
              <FlatList
                style={styles.chatContainer}
                contentContainerStyle={styles.chatContentContainer}
                data={messages}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderMessage}
                inverted
              />
              <TextInput
                // eslint-disable-next-line arrow-parens, no-return-assign
                ref={(ref) => this.input = ref}
                style={styles.messageInput}
                autoCorrect={false}
                placeholder="You may leave a message"
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
                value={messageValue}
                onSubmitEditing={this.handleSubmitEditing}
              />
            </View>
          )
        }
      </View>
    );
  }
}

ChatView.propTypes = {
  isOpen: PropTypes.bool,
  userId: PropTypes.number,
  messages: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onStartShouldSetResponderCapture: PropTypes.func,
  messageValue: PropTypes.string,
};

export default injectIntl(ChatView);
