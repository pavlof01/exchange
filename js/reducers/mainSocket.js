import { SESSION } from '../actions';
import store from '../store';
import MainSocket from '../services/MainSocket';
import { update as updateCurrentTrade } from '../actions/currentTrade';

const handler = (message) => {
  // TODO: необходимо поправить логику дейстрия updateUser() -
  // т.к. данные перевели на имутабельные структуры.
  switch (message.event) {
    case 'notice_count':
      // store.dispatch(updateUser({
      //   notifications_count: message.data.count,
      //   notifications: message.data.notifications
      // }));
      break;
    case 'balance_amount':
      // store.dispatch(updateUser({balance: message.data.balance}));
      break;
    case 'trade_partner_activity':
      // store.dispatch(updatePartnerActivity(message.data.statuses));
      break;
    case 'trading_allowed':
      break;
    case 'trade_changed':
      store.dispatch(updateCurrentTrade(message.data.trade));
      break;
    default:
      break;
  }
};

const initial = {
  instance: null,
  interval: null,
};

export default (state = initial, action) => {
  if (action.type === SESSION.SESSION_SET_USER) {
    clearInterval(state.interval);

    if (action.user.isLogged) {
      const instance = new MainSocket(handler);
      instance.open(action.user.id);

      return {
        instance,
        interval: setInterval(() => instance.sendMessage('online'), 5 * 1000),
      };
    } if (state.instance) {
      state.instance.close();
      return initial;
    }
    return state;
  }
  return state;
};
