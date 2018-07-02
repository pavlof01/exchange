import React from 'react';
import {
    StyleSheet, Text,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2B2B82',
        color: 'white',
        height: 48,
        padding: 10,
        fontSize: 22,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
});

class HeaderBar extends React.Component {

    static propTypes = {
        /**
         * Title text.
         */
        title: PropTypes.string,
    };

    render() {
        return (
            <Text style={styles.container}>{this.props.title}</Text>
        );
    }
}

export default HeaderBar;