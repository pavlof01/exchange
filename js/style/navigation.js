/**
 * Создаёт стиль для navbar'а, единый для приложения
 * @param {string} title Заголовок сцены
 * @return {{title: *, headerStyle: {backgroundColor: string}, headerTitleStyle: {color: string}, headerTintColor: string}}
 */
import React from "react";
import {StatusBar, StyleSheet, Image} from "react-native";

const styles = StyleSheet.create({
    bottomBarIcon: {
        height: 24,
        width: 24,
    },
});

export function createBasicNavigationOptions(title) {
    return {
        title,
        headerStyle: { backgroundColor: '#2B2B82' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
    }
}

export const bottomBarStyle = {
    initialRouteName: 'Settings',
    tabBarOptions: {
        activeTintColor: '#25367E',
        inactiveTintColor: '#696969',
    }
};

export function createBottomBarOptions(src) {
    return () => ({
        tabBarIcon: ({tintColor, focused}) => <Image
            source={src}
            style={styles.bottomBarIcon}
            tintColor={tintColor}
        />
    })
}

export const withCommonStatusBar = (container) => {
    container.key = 1;
    return [
        <StatusBar
            backgroundColor="#2A2A72"
            barStyle="light-content"
            key={0}
        />, container];
};


export const withColoredStatusBar = (color, container) => {
    container.key = 1;
    return [
        <StatusBar
            backgroundColor={color}
            barStyle="light-content"
            key={0}
        />, container];
};