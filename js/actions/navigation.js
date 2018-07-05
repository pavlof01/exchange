export const NEW_TRADE_REQUEST = 'NEW_TRADE_REQUEST';
export const OPEN_TRADE_REQUEST = 'OPEN_TRADE_REQUEST';
export const OPEN_PROFILE_REQUEST = 'OPEN_PROFILE_REQUEST';

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