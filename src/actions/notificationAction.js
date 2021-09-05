import { ADD_NOTIFY, EDIT_NOTIFY, DELETE_NOTIFY, CLEAR_NOTIFY } from './types'

export const addNotification = (notification) => ({
    type: ADD_NOTIFY,
    notification: notification,
});

export const deleteNotification = (id) => ({
    type: DELETE_NOTIFY,
    id: id,
});

export const editNotification = (notification) => ({
    type: EDIT_NOTIFY,
    notification: notification,
});

export const clearNotification = () => ({
    type: CLEAR_NOTIFY,
})