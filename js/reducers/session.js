import { SESSION } from '../actions'
import LoginUser from '../models/User/Login'
import LogoutUser from '../models/User/Logout'

const initial = {
  user: new LogoutUser({}),
  error: null,
  pending: false,
  login_history: {
    page: 1,
    data: [],
    error: null,
    pending: false,
    total_pages: null
  },
  phone_verification: {
    token: null,
    errors: null,
  },
  profile_verification: {

  },
  transactions: {
      page: 1,
      data: [],
      error: null,
      pending: false,
      total_pages: null
  },
  transaction_tokens: {
    data: [],
    error: null,
    pending: false,
    generation_pending: false
  },
  withdrawal: {
    error: null,
    status: null,
    pending: false,
  }
};

export default (state = initial, action) => {
  switch (action.type) {
    case SESSION.FETCH_USER_STARTED: return {
      ...state, error: null, pending: true
    };

    case SESSION.FETCH_USER_FAILURE: return {
      ...state, error: action.error, pending: false
    };

    case SESSION.SESSION_SET_USER: return {
      ...state, error: null, pending: false, user: action.user
    };

    case SESSION.SESSION_UPDATE_USER: return {
      ...state, user: new LoginUser({...state.user, ...action.attrs})
    };

    case SESSION.UPDATE_USER_META_SUCCESS: return {
      ...state, user: new LoginUser({...state.user, ...action.data})
    };

    case SESSION.FETCH_LOGIN_HISTORY_STARTED: return {
      ...state, login_history: { ...state.login_history, error: null, pending: true }
    };

    case SESSION.FETCH_LOGIN_HISTORY_SUCCESS: return {
      ...state, login_history: {
        ...state.login_history,
            total_pages: action.data.total_pages,
            data: action.data.histories,
            page: action.data.page,
            pending: false
      }
    };

    case SESSION.FETCH_LOGIN_HISTORY_FAILURE: return {
      ...state, login_history: { ...state.login_history, error: action.error, pending: false }
    };

    case SESSION.ATTACH_GOOGLE_AUTH_SUCCESS: return {
      ...state, user: new LoginUser({ ...state.user, ...action.data }), authenticator_error: null
    };

    case SESSION.ATTACH_GOOGLE_AUTH_FAILURE: return {
      ...state, authenticator_error: action.error
    };

    case SESSION.DETACH_GOOGLE_AUTH_SUCCESS: return {
      ...state, user: new LoginUser({ ...state.user, ...action.data }), authenticator_error: null
    };

    case SESSION.DETACH_GOOGLE_AUTH_FAILURE: return {
      ...state, authenticator_error: action.error
    };

    case SESSION.CHANGE_LOGIN_GUARD_SUCCESS: return {
      ...state, user: new LoginUser({ ...state.user, ...action.data })
    };


    case SESSION.CLR_PHONE_NUMBER: return {
      ...state, phone_verification: { token: null, errors: null }
    };

    case SESSION.SET_PHONE_NUMBER_STARTED: return {
      ...state, phone_verification: { ...state.phone_verification, errors: null }
    };

    case SESSION.SET_PHONE_NUMBER_SUCCESS: return {
      ...state, phone_verification: { token: action.data, errors: null }
    };

    case SESSION.SET_PHONE_NUMBER_FAILURE: return {
      ...state, phone_verification: { token: null, errors: action.errors }
    };

    case SESSION.VERIFY_PHONE_NUMBER_STARTED: return {
      ...state, phone_verification: { ...state.phone_verification, errors: null }
    };

    case SESSION.VERIFY_PHONE_NUMBER_SUCCESS: return {
      ...state, phone_verification: { token: null, errors: null }
    };

    case SESSION.VERIFY_PHONE_NUMBER_FAILURE: return {
      ...state, phone_verification: { ...state.phone_verification, errors: action.errors }
    };

    case SESSION.GET_PROFILE_STATUS_STARTED: return {
      ...state
    };

    case SESSION.GET_PROFILE_STATUS_SUCCESS: return {
      ...state, profile_verification: { ...state.profile_verification, status: action.status }
    };

    case SESSION.GET_PROFILE_STATUS_FAILURE: return {
      ...state, profile_verification: {
        ...state.profile_verification, error: action.error, status: action.status
      }
    };



    case SESSION.FETCH_TRANSACTIONS_STARTED: return {
        ...state, transactions: { ...state.transactions, error: null, pending: true }
    };

    case SESSION.FETCH_TRANSACTIONS_SUCCEED: return {
        ...state, transactions: {
            ...state.transactions,
            total_pages: action.data.total_pages,
            data: action.data.transactions,
            page: action.data.page,
            pending: false
        }
    };

    case SESSION.FETCH_TRANSACTIONS_FAILURE: return {
        ...state, transactions: { ...state.transactions, error: action.error, pending: false }
    };

    case SESSION.TOGGLE_TRANSACTION_DETAILS: return {
        ...state, transactions: {
            ...state.transactions,
            data: state.transactions.data.map(item =>
                item.id === action.data ? {...item, isOpen: !item.isOpen} : item
            )
        }
    };

    case SESSION.FETCH_TRANSACTION_TOKENS_STARTED: return {
      ...state, transaction_tokens: { ...state.transaction_tokens, error: null, pending: true }
    };

    case SESSION.FETCH_TRANSACTION_TOKENS_SUCCEED: return {
        ...state, transaction_tokens: {
            ...state.transaction_tokens,
            data: action.data.accounts,
            pending: false
        }
    };

    case SESSION.FETCH_TRANSACTION_TOKENS_FAILURE: return {
      ...state, transaction_tokens: { ...state.transaction_tokens, error: action.error, pending: false }
    };

    case SESSION.GENERATE_TRANSACTION_TOKEN_STARTED: return {
        ...state, transaction_tokens: { ...state.transaction_tokens, error: null, generation_pending: true }
    };

    case SESSION.GENERATE_TRANSACTION_TOKEN_SUCCEED: return {
        ...state, transaction_tokens: {
            ...state.transaction_tokens,
            data: [action.data.account].concat(state.transaction_tokens.data),
            generation_pending: false
        }
    };

    case SESSION.GENERATE_TRANSACTION_TOKEN_FAILURE: return {
        ...state, transaction_tokens: { ...state.transaction_tokens, error: action.error, generation_pending: false }
    };

    case SESSION.CURRENCY_SENDING_STARTED: return {
        ...state, withdrawal: { ...state.withdrawal, error: null, status: null, pending: true }
    };

    case SESSION.CURRENCY_SENDING_SUCCEED: return {
        ...state, withdrawal: { ...state.withdrawal, status: action.status, pending: false }
    };

    case SESSION.CURRENCY_SENDING_FAILURE: return {
        ...state, withdrawal: { ...state.withdrawal, error: action.error, status: action.status, pending: false }
    };

    case SESSION.UPDATE_FEE_STARTED: return {
        ...state, withdrawal: { ...state.withdrawal, fee_pending: true, fee: null }
    };

    case SESSION.UPDATE_FEE_SUCCEED: return {
        ...state, withdrawal: { ...state.withdrawal, fee_pending: false, fee: action.data }
    };

    case SESSION.UPDATE_FEE_FAILURE: return {
        ...state, withdrawal: { ...state.withdrawal, fee_pending: false }
    };



    default: return state;
  }
};