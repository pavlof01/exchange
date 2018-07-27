import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
} from "react-native";
import { fonts } from '../../style/resourceHelpers';

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#d5d5d5',
    },
    text: {
        color: '#9b9b9b',
        fontSize: 18,
        fontFamily: fonts.bold.regular,
        letterSpacing: 0.2,
    }
});

class Title extends Component {

    render() {
        const { titleContainer, text } = styles;
        const { styleContainer, textStyle } = this.props;
        return (
            <View style={[titleContainer, styleContainer]}>
                <Text style={[text, textStyle]}>{this.props.text || "Your TEXT"}</Text>
            </View>
        );
    }

}

Title.propTypes = {
    text: PropTypes.string,
    textStyle: PropTypes.object,
    styleContainer: PropTypes.object
};

export default Title;