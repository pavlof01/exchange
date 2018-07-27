export const NOTIFICATION_SET_PUSH_TOKEN = 'set_push_token';

/**
 * @param {string} pushToken - токен девайса полученный после инициализации onesignal.
 */
export function setPushToken(pushToken) {
  return {
    type: NOTIFICATION_SET_PUSH_TOKEN,
    payload: pushToken,
  };
}
