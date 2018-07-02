export const NEW_TRADE_REQUEST = 'NEW_TRADE_REQUEST';
export const OPEN_TRADE_REQUEST = 'OPEN_TRADE_REQUEST';


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