import { createSelector } from 'reselect'

export const accountsListSelector = createSelector(
  state => state.accounts,
  accounts => ({
    accounts: Object.values(accounts),
  })
)

export const getAccountByCodeSelector = codeSelector => createSelector(
  codeSelector,
  state => state.accounts,
  (code, accounts) => accounts[code]
)
