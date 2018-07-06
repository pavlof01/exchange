import React, {Component} from "react";
import {StyleSheet, View, ColorPropType, ViewPropTypes} from "react-native";
import PropTypes from "prop-types";
import BorderlessButton from "../BorderlessButton/index";


const styles = StyleSheet.create({
    topButton: {
        flex: 1
    },
    text: {
        fontWeight: 'bold',
    },
});

export default class TopButton extends Component {
    static propTypes = {
        /**
         * Text to display inside the button.
         */
        title: PropTypes.string.isRequired,
        /**
         * Text to display for blindness accessibility features.
         */
        accessibilityLabel: PropTypes.string,
        /**
         * Color for border and text inside the button.
         */
        color: ColorPropType,
        /**
         * Selected text color
         */
        selectedColor: ColorPropType,
        /**
         * If true, disable all interactions for this component and highlight it.
         */
        selected: PropTypes.bool,
        /**
         * Handler to be called when the user taps the button.
         */
        onPress: PropTypes.func,
        /**
         * Used to locate this view in end-to-end tests.
         */
        testID: PropTypes.string,
        /**
         * Styles.
         */
        style: ViewPropTypes.style
    };

    render() {
        const selectedColor = this.props.selectedColor || 'blue';
        const color = this.props.color || 'black';

        return (
            <View style={styles.topButton}>
                <BorderlessButton
                    title={this.props.title}
                    onPress={this.props.onPress}
                    disabled={this.props.selected}
                    color={this.props.selected ? selectedColor : color}
                    textStyle={styles.text}/>
            </View>
        )
    }
}