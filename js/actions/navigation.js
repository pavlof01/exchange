export const NEW_TRADE_REQUEST = 'NEW_TRADE_REQUEST';
export const OPEN_TRADE_REQUEST = 'OPEN_TRADE_REQUEST';
export const OPEN_PROFILE_REQUEST = 'OPEN_PROFILE_REQUEST';
export const OPEN_FEEDBACK_REQUEST = 'OPEN_FEEDBACK_REQUEST';
export const OPEN_ADS = 'OPEN_ADS';

export function newTrade(ad) {
    return {
        type: NEW_TRADE_REQUEST,
        ad
    };
}

export function openTrade(id) {
    return {
        type: OPEN_TRADE_REQUEST,
        id
    };
}

export function openProfile(profile) {
    return {
        type: OPEN_PROFILE_REQUEST,
        profile
    };
}

export function openFeedback(user_name) {
    return {
        type: OPEN_FEEDBACK_REQUEST,
        user_name
    };
}

export function openAds() {
    return {
        type: OPEN_ADS
    };
}