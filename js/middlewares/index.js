import { applyMiddleware } from 'redux';
import orders from './orders';
import position from './position';

export default applyMiddleware(
  orders,
  position,
);
