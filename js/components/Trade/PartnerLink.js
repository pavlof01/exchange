import React from 'react';
import {
    StyleSheet, Text,
    View,
} from 'react-native';
import User from "../../models/User";
import OnlineStatus from "../../style/OnlineStatus";
import Touchable from "../../style/Touchable";

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
        fontSize: 16,
        marginLeft: 4,
    },
    feedback_grade: {
        fontSize: 11,
        marginLeft: 4,
    }
});

class PartnerLink extends React.Component {

    render() {
        const { user, online, isSeller, onProfileOpen } = this.props;

        return (
            <Touchable onPress={() => onProfileOpen(user)}>
                <View style={styles.row}>
                    <Text>{isSeller ? 'Продавец' : 'Покупатель'}</Text>
                    <OnlineStatus isOnline={online}/>
                    <Text style={styles.userName}>{user.user_name} ({User.approximateTradesCount(user.completed_trades_count)})</Text>
                    <Text> {user.feedback_grade}%</Text>
                </View>
            </Touchable>
        );
    }
}

export default PartnerLink;
