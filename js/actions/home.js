import { HOME } from '../actions'
import Api from '../services/Api'

export function fetch(dispatch, params = {}) {
  Api.get('/home', params)
    .then(response => dispatch(fetchSucceed(response.data.home)))
    .catch(response => dispatch(fetchFailure('Ошибка /home')));

  return { type: HOME.FETCH_HOME_STARTED }
}

function fetchSucceed(home) {
  return {
    type: HOME.FETCH_HOME_SUCCEED,
    appLifetime: home.app_lifetime,
    totalAmount: home.total_amount,
    adBuyCount: home.ad_buy_count,
    adSellCount: home.ad_sell_count,
    adBuyMaxPrice: home.ad_buy_max_price,
    adSellMinPrice: home.ad_sell_min_price,
    walletCount: home.wallet_count,
    tradesCount: home.trades_count,
  }
}

function fetchFailure(error) {
  return { type: HOME.FETCH_HOME_FAILURE, error: error }
}