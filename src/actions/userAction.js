import { ADD_USER, CLEAR_USER } from './types'

export const addUser = (user) => ({
    type: ADD_USER,
    user: user,
});

export const clearUser = () => ({
    type: CLEAR_USER,
});
