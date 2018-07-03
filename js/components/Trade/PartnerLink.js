import React from 'react';
import {
    StyleSheet, Text,
    View,
} from 'react-native';
import User from "../../models/User";
import OnlineStatus from "../../style/OnlineStatus";

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
});

class PartnerLink extends React.Component {

    render() {
        const { user, online, isSeller } = this.props;

        return (

            <View style={styles.row}>
                <Text>{isSeller ? 'Продавец' : 'Покупатель'}</Text>
                <OnlineStatus isOnline={online}/>
                <Text>{user.user_name} ({User.approximateTradesCount(user.completed_trades_count)})</Text>
                <Text>{user.feedback_grade}%</Text>
            </View>
        );
    }
}

export default PartnerLink;
