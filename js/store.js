import { createStore } from 'redux'
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './sagas';
import orders from './middlewares/orders'
import position from './middlewares/position'
import { applyMiddleware } from 'redux'

import { navMiddleware } from './App'

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
    orders,
    position,
    sagaMiddleware,
    navMiddleware,
];
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSagas);

export default store;
