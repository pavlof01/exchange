import { HOME_FILTER } from '../actions'

export function update(values) {
  return { type: HOME_FILTER.UPDATE_HOME_FILTER, ...values }
}