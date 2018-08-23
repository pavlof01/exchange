import { PARTNER_ACTIVITY } from '../actions';

const initial = {
  statuses: [],
};

export default (state = initial, action) => {
  switch (action.type) {
    case PARTNER_ACTIVITY.PARTNER_ACTIVITY_UPDATE: return {
      ...state, statuses: action.statuses,
    };

    default: return state;
  }
};
