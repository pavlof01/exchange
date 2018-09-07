import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Image,  
  View,
} from 'react-native';
import { FormattedMessage } from 'react-intl';

const styles = StyleSheet.create({
  bottomBarIcon: {
    height: 24,
    width: 24,
  },
  activeIconTopLine: {
    width: '50%',
    height: 3,
    backgroundColor: '#25367e',
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
  },
  bottomBarIconContainer: {
    flex: 1,
    justifyContent: 'center',
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

export function createBottomBarOptions(navigation, sourceIcon) {
  return {
    tabBarIcon: ({ focused, tintColor }) => {
      return (
        <View style={styles.bottomBarIconContainer}>
          <View style={[focused ? styles.activeIconTopLine : null]} />
          <Image style={styles.bottomBarIcon} source={sourceIcon} />
        </View>
      );
    },
  };
}

export const withCommonStatusBar = container => (
  <React.Fragment>
    <StatusBar
      backgroundColor="#2A2A72"
      barStyle="light-content"
    />
    {container}
  </React.Fragment>
);


export const withColoredStatusBar = (color, container) => (
  <React.Fragment>
    <StatusBar
      backgroundColor={color}
      barStyle="light-content"
    />
    {container}
  </React.Fragment>
);
