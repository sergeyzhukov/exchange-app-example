import { schema } from 'normalizr'

const currency = new schema.Entity('currency', {}, {
  idAttribute: (value, parent, key) => key,
})

export default {
  CURRENCY: currency,
  CURRENCY_ARRAY: new schema.Values(currency),
}
