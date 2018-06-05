import { PARTNER_ACTIVITY } from '../actions'

export default function update(statuses) {
  return { type: PARTNER_ACTIVITY.PARTNER_ACTIVITY_UPDATE, statuses: statuses }
}