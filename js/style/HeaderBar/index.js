import React from 'react';
import {
    Platform,
    StyleSheet, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {fonts} from "../resourceHelpers";

const styles = StyleSheet.create({
    androidContainer: {
        backgroundColor: '#2B2B82',
        color: 'white',
        height: 56,
        padding: 14,
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: fonts.bold.regular,
        elevation: 8,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    iosContainer: {
        backgroundColor: '#2B2B82',
        color: 'white',
        height: 56,
        padding: 24,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: fonts.bold.regular,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
});


const isAndroid = Platform.OS === 'android';

class HeaderBar extends React.Component {

    static propTypes = {
        /**
         * Title text.
         */
        title: PropTypes.string,
    };

    render() {
        return (
            <Text style={isAndroid ? styles.androidContainer : styles.iosContainer}>{this.props.title}</Text>
        );
    }
}

export default HeaderBar;
