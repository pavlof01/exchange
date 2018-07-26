import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fonts } from '../../style/resourceHelpers';

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
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
  chatContainer: {
    height: 100,
    backgroundColor: '#f8f9fb',
  },
  chatContentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    marginEnd: 25,
    marginStart: 25,
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

  _keyExtractor = (item) => item.id;

  renderMessage = (message) => {
    const {
      userId,
    } = this.props;
    const messageUserId = message.item.user.id;
    const isMyMessage = messageUserId === userId;
    return (
      <View key={messageUserId} style={styles.messageContainer}>
        <Text>{message.item.body}</Text>
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

          </View>
        </TouchableOpacity>
        {
          isOpen && (
            <View>
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
};

export default ChatView;
