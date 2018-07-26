import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fonts } from '../../style/resourceHelpers';
import moment from "moment";

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
    scaleY: -1,
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
  messageBubble: {
    width: '85%',
    backgroundColor: "#ffffff",
    padding: 10,
    flex: 1,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
  },
  messageTimeText: {
    color: '#4a4a4a',
    fontFamily: fonts.medium.regular,
    fontSize: 12,
  },
  me: {
    flex: 1,
    alignItems: "flex-end",
  },
  trader: {
    flex: 1,
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
    if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
      this.focus();
    }
  }

  handleToggleChat = () => {
    const {
      isOpen,
    } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  handleChangeText = (value) => {
    if (typeof this.props.onChangeText === 'function') {
      this.props.onChangeText(value);
    }
  };

  handleSubmitEditing = () => {
    if (typeof this.props.onSubmitEditing === 'function') {
      this.props.onSubmitEditing();
    }
  };

  handleStartShouldSetResponderCapture = () => {
    if (typeof this.props.onStartShouldSetResponderCapture === 'function') {
      this.props.onStartShouldSetResponderCapture();
    }
  };

  _keyExtractor = (item) => item.id;

  renderMessage = (message) => {
    const {
      userId,
    } = this.props;
    const messageUserId = message.item.user.id;
    const isMyMessage = messageUserId === userId;
    const messageTime = `${moment(message.item.date).format("HH:mm")} (MSK)`;
    return (
      <View key={messageUserId} style={[styles.messageContainer, isMyMessage ? styles.me : styles.trader]}>
        <View style={styles.messageBubble}>
          <Text>{message.item.body}</Text>
        </View>
        <Text style={styles.messageTimeText}>{messageTime}</Text>
      </View>
    );
  };

  render() {
    const {
      isOpen,
    } = this.state;
    const {
      messages,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'CHAT'}</Text>
        <TouchableOpacity onPress={this.handleToggleChat}>
          <View style={styles.toggleChatBox}>
            <Image source={require('../../img/ic_add_message.png')} style={styles.addIcon} />
            <Text style={styles.toggleChatBoxText}>Add message</Text>
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
                ref={(ref) => this.input = ref}
                placeholder="You may leave a message"
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeText}
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
  isOpen: PropTypes.boolean,
  userId: PropTypes.number,
  messages: PropTypes.array,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onStartShouldSetResponderCapture: PropTypes.func,
};

export default ChatView;
