import React from 'react';
import {
  StyleSheet, Text,
  View,
} from 'react-native';
import User from '../../models/User';
import OnlineStatus from '../../style/OnlineStatus';
import Touchable from '../../style/Touchable';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    padding: 8,
    elevation: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  userName: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 24,
    marginLeft: 4,
  },
});

class OwnProfileLink extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { user, onProfileOpen } = this.props;

    return (
      <Touchable onPress={() => onProfileOpen(user)}>
        <View style={styles.row}>
          <OnlineStatus isOnline />
          <Text style={styles.userName}>
            {user.user_name}
            (
            {User.approximateTradesCount(user.completed_trades_count)}
            )
          </Text>
          <Text>
            {user.feedback_grade}
            %
          </Text>
        </View>
      </Touchable>
    );
  }
}

export default OwnProfileLink;
