export const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS';
export const RECOVER_PASSWORD_ERROR = 'RECOVER_PASSWORD_ERROR';
export const RECOVER_PASSWORD_REQUEST = 'RECOVER_PASSWORD_REQUEST';

export function recover(params) {
    return {
        type: RECOVER_PASSWORD,
        payload: params,
    };
}

export function recoverSuccess() {
    return {
        type: RECOVER_PASSWORD_SUCCESS,
    };
}

export function recoverError(error) {
    return {
        type: RECOVER_PASSWORD_ERROR,
        payload: error,
    };
}

export function recoverPasswordRequest() {
    return {
        type: RECOVER_PASSWORD_REQUEST,
    };
}