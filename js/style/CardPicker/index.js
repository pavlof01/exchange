import React from 'react';
import {
    StyleSheet, Text,
    View,
} from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    picker: {
        elevation: 4,
        borderRadius: 4,
        backgroundColor: 'white',
        margin: 8,
    },
    cardText: {
        fontSize: 24,
        color: 'black',
    }
});

class CardPicker extends React.Component {


    static propTypes = {
        /**
         * Callback on item selection.
         */
        onValueChange: PropTypes.func,

        /**
         * First selected item
         */
        selectedValue: PropTypes.string,

        renderButton: PropTypes.func,

        fontSize: PropTypes.number,
    };

    state = {
        selectedValue: this.props.selectedValue,
    };

    handleChange = (newValue) => {
        this.props.onValueChange(newValue);
        this.setState({ selectedValue: newValue });
    };

    render() {
        const { fontSize } = this.props;

        let selected;
        const options = React.Children.map(this.props.children,
            (child) => {
                if(child.props.value === this.state.selectedValue) {
                    selected = child;
                }
                return React.cloneElement(child, {onSelect: this.handleChange, customStyles: {optionText: [styles.cardText, fontSize ? {fontSize} : undefined]}})
            }
        );

        return (
            <Menu>
                <MenuTrigger customStyles={{triggerOuterWrapper: styles.picker}}>{this.props.renderButton(this.state.selectedValue, selected && selected.props.text)}</MenuTrigger>
                <MenuOptions>
                    {options}
                </MenuOptions>
            </Menu>
        );
    }
}

export default CardPicker;
