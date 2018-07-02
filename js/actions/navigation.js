export const NEW_TRADE_REQUEST = 'NEW_TRADE_REQUEST';


export function newTrade(ad) {
    return {
        type: NEW_TRADE_REQUEST,
        ad
    };
}