// eslint-disable-next-line import/prefer-default-export
export default {
  receive: {
    increase: true,
    description: 'Incoming transfer',
  },
  withdrawal: {
    increase: false,
    description: 'Outgoing transfer',
  },
  exchangeFrom: {
    increase: false,
    description: 'Exchange money',
  },
  exchangeTo: {
    increase: true,
    description: 'Exchange money',
  },
}
