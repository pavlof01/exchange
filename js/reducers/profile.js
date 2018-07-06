import { PROFILE } from '../actions'

const initial = {
    feedbacks: {
        page: 1,
        data: [],
        error: null,
        pending: false,
        total_pages: null,

        different_users_count: 0,
        positive_count: 0,
        block_count: 0,
        neutral_count : 0,
        total_count   : 0,
    }
};

export default (state = initial, action) => {
    switch (action.type) {
        case PROFILE.FETCH_FEEDBACK_STARTED: return {
            ...state, feedbacks: { ...state.feedbacks, error: null, pending: true }
        };

        case PROFILE.FETCH_FEEDBACK_SUCCEED: return {
            ...state, feedbacks: {
                ...state.feedbacks,

                total_pages: action.data.total_pages,
                data: action.data.page === 1 ? action.data.feedbacks : [...state.feedbacks.data, ...action.data.feedbacks],
                page: action.data.page,

                different_users_count: action.data.different_users_count,
                all_count: action.data.all_count,
                positive_count: action.data.positive_count,
                block_count: action.data.block_count,
                neutral_count : action.data.neutral_count,
                total_count   : action.data.total_count,

                pending: false
            }
        };

        case PROFILE.FETCH_FEEDBACK_FAILURE: return {
            ...state, feedbacks: { ...state.feedbacks, error: action.error, pending: false }
        };

        default: return state
    }
}