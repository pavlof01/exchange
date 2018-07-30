import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import { FormattedMessage } from 'react-intl';

const styles = StyleSheet.create({
  bottomBarIcon: {
    height: 24,
    width: 24,
  },
});

/**
 * Создаёт стиль для navbar'а, единый для приложения
 * @param {string} title Заголовок сцены
 * @return {Object}
 */
export function createBasicNavigationOptions(title) {
  return {
    title,
    headerStyle: { backgroundColor: '#2B2B82' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  };
}

export const bottomBarStyle = {
  initialRouteName: 'Offers',
  tabBarOptions: {
    activeTintColor: '#25367E',
    inactiveTintColor: '#696969',
  },
};

export function createBottomBarOptions(labelMessageId, src) {
  return ({
    tabBarLabel: ({ tintColor, focused }) => (
      <FormattedMessage
        id={labelMessageId}
      >
        {text => (
          <Text style={{ color: tintColor, fontSize: 10, textAlign: 'center' }}>
            {text}
          </Text>
        )}
      </FormattedMessage>
    ),
    tabBarIcon: ({ tintColor, focused }) => (
      <Image
        source={src}
        style={styles.bottomBarIcon}
        tintColor={tintColor}
      />
    ),
  });
}

export const withCommonStatusBar = (container) => {
    return <React.Fragment>
            <StatusBar
                backgroundColor="#2A2A72"
                barStyle="light-content"/>
            {container}
        </React.Fragment>;
};


export const withColoredStatusBar = (color, container) => {
    return <React.Fragment>
            <StatusBar
                backgroundColor={color}
                barStyle="light-content"/>
            {container}
        </React.Fragment>;
};