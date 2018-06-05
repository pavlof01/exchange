import Api from '../services/Api'
import { PROFILE } from '../actions'

export function getFeedbacks(params, dispatch) {
    Api.get('/feedbacks', params).then(({ data }) => {
        dispatch({ type: PROFILE.FETCH_FEEDBACK_SUCCEED, data: { ...data, page: params.page } })
    }).catch(error => {
        dispatch({ type: PROFILE.FETCH_FEEDBACK_FAILURE, error })
    });

    return { type: PROFILE.FETCH_FEEDBACK_STARTED }
}