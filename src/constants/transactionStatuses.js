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
  exchange: {
    increase: false,
    description: 'Exchange money',
  },
}
