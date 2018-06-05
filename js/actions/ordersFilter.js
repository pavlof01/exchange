import { ORDERS_FILTER } from '../actions'

export function update(values) {
  let newValues = values;

  if (values.paymentMethodCode === 'ANY') {
    newValues.paymentMethodCode = null;
  }

  return { type: ORDERS_FILTER.UPDATE_ORDERS_FILTER, values: newValues }
}