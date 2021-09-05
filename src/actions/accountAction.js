import { ADD_ACCOUNT, DELETE_ACCOUNT, EDIT_ACCOUNT, CLEAR_ACCOUNT } from './types'

export const addAccount = (account) => ({
    type: ADD_ACCOUNT,
    account: account,
});

export const deleteAccount = (id) => ({
    type: DELETE_ACCOUNT,
    id: id,
});

export const editAccount = (account) => ({
    type: EDIT_ACCOUNT,
    account: account,
});

export const clearAccount = () => ({
    type: CLEAR_ACCOUNT,
})