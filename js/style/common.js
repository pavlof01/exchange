import {StyleSheet, Text, View} from "react-native";
import {fonts} from "./resourceHelpers";
import React from "react";

export const common = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 8,
    },
    centerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hintText: {
        marginTop: 4,
        marginLeft: 4,
        fontSize: 11,
        textAlign: 'left',
        fontFamily: fonts.medium.regular,
    },
    errorText: {
        flex: 1,
        color: '#d61b38',
        textAlign: 'center',
        fontFamily: fonts.regular.regular,
    },
    successText: {
        flex: 1,
        color: '#14d459',
        textAlign: 'center',
        fontFamily: fonts.regular.regular,
    },
    textLink: {
        color: '#2d18a0',
        textDecorationLine: 'underline',
    },
    textCenter: {
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: fonts.regular.regular,
    },
});

export const Hint = (props) => <Text {...props} style={common.hintText}/>;