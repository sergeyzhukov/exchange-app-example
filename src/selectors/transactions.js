import { createSelector } from 'reselect'
import { filter, sortBy, groupBy, map } from 'lodash'
import moment from 'moment'

export const getTransactionsByAccountListSelector = codeSelector => createSelector(
  codeSelector,
  state => state.transactions,
  (code, transactions) => sortBy(
    filter(transactions, transaction => transaction.account === code),
    'timestamp'
  ).reverse()
)

export const getTransactionsListSelector = createSelector(
  state => state.transactions,
  transactions => sortBy(transactions, 'timestamp').reverse()
)

export const getGroupedTransactionsListSelector = transactionsSelector => createSelector(
  transactionsSelector,
  transactions => map(
    groupBy(transactions, transaction => moment(transaction.timestamp).startOf('day').format('ll')),
    (transactionsGroup, section) => ({ data: transactionsGroup, title: section })
  )
)
