import { List, Record, fromJS } from 'immutable';
import { SESSION } from '../actions';

const BalanceRecord = Record({
  ETH: {
    code: 'ETH',
    value: '0.0',
  },
  BTC: {
    code: 'BTC',
    value: '0.0',
  },
});

const TradingAllowed = Record({
  eth: {
    currency: 'eth',
    allowed: false,
    limit: 0.05,
  },
  btc: {
    currency: 'btc',
    allowed: false,
    limit: 0.05,
  },
});

const UserRecord = Record({
  id: -1,
  isLogged: false,
  user_name: '',
  locale: 'en',
  phone_number: null,
  phone_code: null,
  two_way_auth_method: null,
  real_name: null,
  real_name_show: null,
  real_name_verification_count: 0,
  introduction: null,
  ad_sell_enabled: true,
  ad_buy_enabled: true,
  balance: new BalanceRecord(),
  feedback_count: 0,
  feedback_grade: 0,
  feedback_different_user: 0,
  online: true,
  place_id: null,
  country: null,
  country_code: null,
  currency_code: null,
  city: null,
  confirmed_at: null,
  security_status: null,
  sms_new_trade_contact: true,
  sms_escrow_released: true,
  sms_payment_received: true,
  notifications: List([]), // eslint-disable-line new-cap
  notifications_count: 0,
  created_at: null,
  completed_trades_count: 0,
  id_verified: false,
  email_verified_date: null,
  pending_accounts: [],
  email_about_sign_in: true,
  email_about_new_chat_messages: true,
  trading_allowed: new TradingAllowed(),
  invite_code: null,
  is_push_enabled: true,
  lbc_code: null,
  lbc_username: null,
  response_time: null,
  current_sign_in_at: null,
  api_token: null,
  google_qr_uri: null,
  google_secret: null,
  email: null,
});

const LoginHistory = Record({
  page: 1,
  data: List([]), // eslint-disable-line new-cap
  error: null,
  pending: false,
  total_pages: null,
});

const PhoneVerification = Record({
  token: null,
  errors: null,
});

const InitialState = Record({
  user: new UserRecord({}),
  error: null,
  pending: false,
  login_history: new LoginHistory(),
  phone_verification: new PhoneVerification(),
  profile_verification: Record({

  }),
  transactions: Record({
    page: 1,
    data: List([]), // eslint-disable-line new-cap
    error: null,
    pending: false,
    total_pages: null,
  }),
  transaction_tokens: Record({
    data: List([]), // eslint-disable-line new-cap
    error: null,
    pending: false,
    generation_pending: false,
  }),
  withdrawal: Record({
    error: null,
    status: null,
    pending: false,
  }),
});

const initial = new InitialState();

function parseMutation(state, action) {
  switch (action.type) {
    case SESSION.LOGIN: return { error: null, pending: true };

    case SESSION.LOGIN_REQUEST: return { pending: false };

    case SESSION.LOGIN_SUCCESS: return { pending: false };

    case SESSION.LOGIN_FAILURE: return { error: action.error, pending: false };

    case SESSION.FETCHING_USER: return { error: null, pending: true };

    case SESSION.LOGOUT_SUCCESS: return { ...initial.toObject() };

    case SESSION.FETCH_USER_FAILURE: return { error: action.error, pending: false };

    case SESSION.SESSION_SET_USER: return {
      error: null, pending: false, user: action.user,
    };

    case SESSION.SESSION_UPDATE_USER: return {
      user: { ...state.user.toJS(), ...action.attrs },
    };

    case SESSION.UPDATE_USER_META_SUCCESS: return {
      user: { ...state.user.toJS(), ...action.data },
    };

    case SESSION.FETCH_LOGIN_HISTORY_STARTED: return {
      login_history: { error: null, pending: true },
    };

    case SESSION.FETCH_LOGIN_HISTORY_SUCCESS: return {
      login_history: {
        total_pages: action.data.total_pages,
        data: action.data.histories,
        page: action.data.page,
        pending: false,
      },
    };

    case SESSION.FETCH_LOGIN_HISTORY_FAILURE: return {
      login_history: { error: action.error, pending: false },
    };

    case SESSION.ATTACH_GOOGLE_AUTH_SUCCESS: return {
      user: { ...action.data }, authenticator_error: null,
    };

    case SESSION.ATTACH_GOOGLE_AUTH_FAILURE: return {
      authenticator_error: action.error,
    };

    case SESSION.DETACH_GOOGLE_AUTH_SUCCESS: return {
      user: { ...action.data }, authenticator_error: null,
    };

    case SESSION.DETACH_GOOGLE_AUTH_FAILURE: return {
      authenticator_error: action.error,
    };

    case SESSION.CHANGE_LOGIN_GUARD_SUCCESS: return {
      user: { ...action.data },
    };

    case SESSION.CLR_PHONE_NUMBER: return {
      phone_verification: { token: null, errors: null },
    };

    case SESSION.SET_PHONE_NUMBER_STARTED: return {
      phone_verification: { errors: null },
    };

    case SESSION.SET_PHONE_NUMBER_SUCCESS: return {
      phone_verification: { token: action.data, errors: null },
    };

    case SESSION.SET_PHONE_NUMBER_FAILURE: return {
      phone_verification: { token: null, errors: action.errors },
    };

    case SESSION.VERIFY_PHONE_NUMBER_STARTED: return {
      phone_verification: { errors: null },
    };

    case SESSION.VERIFY_PHONE_NUMBER_SUCCESS: return {
      phone_verification: { token: null, errors: null },
    };

    case SESSION.VERIFY_PHONE_NUMBER_FAILURE: return {
      phone_verification: { errors: action.errors },
    };

    case SESSION.GET_PROFILE_STATUS_SUCCESS: return {
      profile_verification: { status: action.status },
    };

    case SESSION.GET_PROFILE_STATUS_FAILURE: return {
      profile_verification: {
        error: action.error, status: action.status,
      },
    };

    case SESSION.REFRESH_TRANSACTIONS: {
      return {
        transactions: { error: null, pending: true, data: [] },
      };
    }

    case SESSION.FETCH_TRANSACTIONS_STARTED: {
      const oldData = state.transactions.data || [];
      return {
        transactions: { error: null, pending: true, data: oldData },
      };
    }

    case SESSION.FETCH_TRANSACTIONS_SUCCEED: {
      let oldData = [];
      try {
        const tr = state.transactions.toJS();
        oldData = tr.data || [];
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`SESSION.FETCH_TRANSACTIONS_SUCCEED parse error - ${JSON.stringify(error, null, 2)}`);
      }
      const newData = oldData.concat(action.data.transactions);
      return {
        transactions: {
          total_pages: action.data.total_pages,
          data: newData,
          page: action.data.page,
          pending: false,
        },
      };
    }

    case SESSION.FETCH_TRANSACTIONS_FAILURE: return {
      transactions: { error: action.error, pending: false },
    };

    case SESSION.TOGGLE_TRANSACTION_DETAILS: return {
      transactions: {

        data: state.transactions.data.map(item => (item.id === action.data
          ? { ...item, isOpen: !item.isOpen } : item)),
      },
    };

    case SESSION.FETCH_TRANSACTION_TOKENS_STARTED: return {
      transaction_tokens: { error: null, pending: true },
    };

    case SESSION.FETCH_TRANSACTION_TOKENS_SUCCEED: return {
      transaction_tokens: {

        data: action.data.accounts,
        pending: false,
      },
    };

    case SESSION.FETCH_TRANSACTION_TOKENS_FAILURE: return {
      transaction_tokens: { error: action.error, pending: false },
    };

    case SESSION.GENERATE_TRANSACTION_TOKEN_STARTED: return {
      transaction_tokens: { error: null, generation_pending: true },
    };

    case SESSION.GENERATE_TRANSACTION_TOKEN_SUCCEED: return {
      transaction_tokens: {

        data: [action.data.account].concat(state.transaction_tokens.data),
        generation_pending: false,
      },
    };

    case SESSION.GENERATE_TRANSACTION_TOKEN_FAILURE: return {
      transaction_tokens: { error: action.error, generation_pending: false },
    };

    case SESSION.CURRENCY_SENDING_STARTED: return {
      withdrawal: { error: null, status: null, pending: true },
    };

    case SESSION.CURRENCY_SENDING_SUCCEED: return {
      withdrawal: { status: action.status, pending: false },
    };

    case SESSION.CURRENCY_SENDING_FAILURE: return {
      withdrawal: { error: action.error, status: action.status, pending: false },
    };

    case SESSION.UPDATE_FEE_STARTED: return {
      withdrawal: { fee_pending: true, fee: null },
    };

    case SESSION.UPDATE_FEE_SUCCEED: return {
      withdrawal: { fee_pending: false, fee: action.data },
    };

    case SESSION.UPDATE_FEE_FAILURE: return {
      withdrawal: { fee_pending: false },
    };

    default: return undefined;
  }
}

export default (state = initial, action) => {
  const mutation = parseMutation(state, action);

  if (mutation) {
    return state.mergeDeep(fromJS(mutation));
  } return state;
};
