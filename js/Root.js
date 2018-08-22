import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import store from './store';

import App from './App';

class Root extends Component {
  render() {
    return (
      <MenuProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MenuProvider>
    );
  }
}

export default Root;
