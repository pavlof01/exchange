import Api from '../services/Api'
import LogoutUser from '../models/User/Logout'
import { SESSION } from '../actions'

export function isFetchingUser() {
  return { type: SESSION.FETCHING_USER }
}

export function setFailure(error) {
  return { type: SESSION.FETCH_USER_FAILURE, error: error, user: new LogoutUser({}) }
}

export function setUser(user) {
  return { type: SESSION.SESSION_SET_USER, user }
}

export function update(attrs) {
  return { type: SESSION.SESSION_UPDATE_USER, attrs: attrs }
}

/**GOOGLE 2FA**/
export function activateGoogleAuth(code, dispatch) {
    Api.post('/mfas', { two_way_auth_method: "google_authenticator", code})
    .then(({ data: { user } }) => {
        dispatch({ type: SESSION.ATTACH_GOOGLE_AUTH_SUCCESS, data: user })
    })
    .catch((response) => {
        let error = "";

        switch (response.response.status) {
            case 400:
                error = "Не может быть пустым";
                break;
            case 403:
                error = "Не верный код";
                break;
            case 422:
                error = response.response.data.errors.verification_code;
                break;
            default:
                error = "Что-то пошло не так";
                break;
        }
        console.log(error)
        dispatch({ type: SESSION.ATTACH_GOOGLE_AUTH_FAILURE, error })
    });

    return { type: SESSION.ATTACH_GOOGLE_AUTH_STARTED }
}

export function disableGoogleAuth(code, dispatch) {
    Api.patch('/mfas', { two_way_auth_method: "google_authenticator", code})
    .then(({ data: { user } }) => {
        dispatch({ type: SESSION.DETACH_GOOGLE_AUTH_SUCCESS, data: user })
    })
    .catch((response) => {
        let error = "";

        switch (response.response.status) {
            case 400:
                error = "Не может быть пустым";
                break;
            case 403:
                error = "Не верный код";
                break;
            case 422:
                error = response.response.data.errors.verification_code;
                break;
            default:
                error = "Что-то пошло не так";
                break;
        }

        dispatch({ type: SESSION.DETACH_GOOGLE_AUTH_FAILURE, error })
    });
    // Api.post('/mfas/init_disable').then(({ data: { user }}) => {
    //     dispatch({ type: SESSION.DETACH_GOOGLE_AUTH_SUCCESS, data: user })
    // }).catch((err) => {
    //     console.error(err);
    // });

    return { type: SESSION.DETACH_GOOGLE_AUTH_STARTED }
}

export function loginHistory(page, dispatch) {
  Api.get('/login_histories', { page }).then(({ data }) => {
      dispatch({ type: SESSION.FETCH_LOGIN_HISTORY_SUCCESS, data: { ...data, page } })
  }).catch(error => {
      dispatch({ type: SESSION.FETCH_LOGIN_HISTORY_FAILURE, error })
  });

  return { type: SESSION.FETCH_LOGIN_HISTORY_STARTED }
}

export function changePhoneNumber(phone, dispatch) {
    Api.post('/users/verifications', { phone })
        .then(({ data: { verification_token } }) => {
            dispatch({ type: SESSION.SET_PHONE_NUMBER_SUCCESS, data: verification_token })
        }).catch(error => {
            dispatch({ type: SESSION.SET_PHONE_NUMBER_FAILURE, errors: error.response.data.errors })
        });

    return { type: SESSION.SET_PHONE_NUMBER_STARTED }
}

export function clearPhoneVerification() {
    return { type: SESSION.CLR_PHONE_NUMBER }
}

export function approvePhoneCode(phone, dispatch) {
    Api.post('/users/verifications/verify', { phone })
        .then(({ data }) => {
            dispatch({ type: SESSION.VERIFY_PHONE_NUMBER_SUCCESS, data })
        }).catch(err => {
            let error = "";
            switch(err.response.status) {
                case 422: error = 'Не верный код'; break;
                case 404: error = 'Истек срок действия страницы. Пожалуйста верефицируйте заново'; break;
                default : error = 'Что-то пошло не так';
            }

            dispatch({ type: SESSION.VERIFY_PHONE_NUMBER_FAILURE, errors: {code: [error]} })
        });

    return { type: SESSION.VERIFY_PHONE_NUMBER_STARTED }
}

export function profileVerification(method, form_data, headers, dispatch) {
    Api[method]('/verification_request', form_data, headers)
        .then(({ data, status }) => {
            if (data && data.response) {
                dispatch({type: SESSION.GET_PROFILE_STATUS_SUCCESS, status: data.response.status})
            } else {
                dispatch({type: SESSION.GET_PROFILE_STATUS_SUCCESS, status})
            }
        }).catch(error => {
            if (error && error.response) {
                dispatch({
                    error: error.response.data && error.response.data.errors ? error.response.data.errors : null,
                    type: SESSION.GET_PROFILE_STATUS_FAILURE,
                    status: error.response.status,
                })
            }
        });

    return { type: SESSION.GET_PROFILE_STATUS_STARTED }
}

export function changeLoginGuard(enabled, dispatch) {
    Api.patch('/me', { user: { login_guard_enabled: enabled }})
    .then(({ data }) => {
        dispatch({ type: SESSION.CHANGE_LOGIN_GUARD_SUCCESS, data: data.user })
    })
    .catch(error => console.error(error))
}

export function updateUserMeta(params, dispatch) {
    Api.patch('/me', { user: params})
        .then(({ data }) => {
            dispatch({ type: SESSION.UPDATE_USER_META_SUCCESS, data: data.user })
        })
        .catch(error => {
            dispatch({ type: SESSION.UPDATE_USER_META_FAILURE })
        });

    return { type: SESSION.UPDATE_USER_META_STARTED }
}

export function getTransactionList(params, dispatch) {
    Api.get('/transactions', params).then(({ data }) => {
        dispatch({ type: SESSION.FETCH_TRANSACTIONS_SUCCEED, data: { ...data, page: params.page } })
    }).catch(error => {
        dispatch({ type: SESSION.FETCH_TRANSACTIONS_FAILURE, error })
    });

    return { type: SESSION.FETCH_TRANSACTIONS_STARTED }
}

export function toggleTransactionDetails(id) {
    return { type: SESSION.TOGGLE_TRANSACTION_DETAILS, data: id }
}

export function getTransactionTokensList(params, dispatch) {
    Api.get('/accounts', params).then(({ data }) => {
        dispatch({ type: SESSION.FETCH_TRANSACTION_TOKENS_SUCCEED, data })
    }).catch(error => {
        dispatch({ type: SESSION.FETCH_TRANSACTION_TOKENS_FAILURE, error })
    });

    return { type: SESSION.FETCH_TRANSACTION_TOKENS_STARTED }
}

export function generateTransactionToken(params, dispatch) {
    Api.post('/accounts/generate', params).then(({ data }) => {
        dispatch({ type: SESSION.GENERATE_TRANSACTION_TOKEN_SUCCEED, data })
    }).catch(error => {
        dispatch({ type: SESSION.GENERATE_TRANSACTION_TOKEN_FAILURE, error })
    });

    return { type: SESSION.GENERATE_TRANSACTION_TOKEN_STARTED }

}

export function sendCryptoCurrency(dispatch, params) {
    Api.post('/withdrawals', params).then(({ data, status }) => {
        dispatch({ type: SESSION.CURRENCY_SENDING_SUCCEED, data, status })
    }).catch(error => {
        console.log(error.response.data);
        if (error && error.response) {
            dispatch({
                error: error.response.data && error.response.data.errors ? error.response.data.errors : null,
                type: SESSION.CURRENCY_SENDING_FAILURE,
                status: error.response.status,
            })
        }
    });

    return { type: SESSION.CURRENCY_SENDING_STARTED }
}

export function updateEstimatedFee(params, dispatch) {
    Api.post('/withdrawals/estimated_fee', params).then(({ data }) => {
        dispatch({ type: SESSION.UPDATE_FEE_SUCCEED, data })
    }).catch(error => {
        if (error && error.response) {
            dispatch({
                type: SESSION.UPDATE_FEE_FAILURE,
                status: error.response.status
            })
        }
    });

    return { type: SESSION.UPDATE_FEE_STARTED }
}

export function loginSuccess() {
    return {
        type: SESSION.LOGIN_SUCCESS
    };
}

export function loginFailure(error) {
    return {
        type: SESSION.LOGIN_FAILURE,
        payload: error,
    };
}

export function login(params) {
    return {
        type: SESSION.LOGIN,
        payload: params,
    };
}

export function loginRequest() {
    return {
        type: SESSION.LOGIN_REQUEST,
    };
}

export function logout() {
    return {
        type: SESSION.LOGOUT,
    };
}

export function logoutSuccess() {
    return {
        type: SESSION.LOGOUT_SUCCESS,
    };
}

export function logoutError(error) {
    return {
        type: SESSION.LOGOUT_ERROR,
        payload: error,
    };
}