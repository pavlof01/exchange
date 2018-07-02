import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    red_circle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'red',
        margin: 4,
    },
    green_circle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'green',
        margin: 4,
    },
});

class OnlineStatus extends React.Component {

    static propTypes = {
        /**
         * Color.
         */
        isOnline: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <View style={this.props.isOnline ? styles.green_circle : styles.red_circle}/>
        );
    }
}

export default OnlineStatus;
