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

const OnlineStatus = (props) => <View style={props.isOnline ? styles.green_circle : styles.red_circle}/>;

export default OnlineStatus;
