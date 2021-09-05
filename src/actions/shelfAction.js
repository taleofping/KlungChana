import { ADD_SHELF, EDIT_SHELF, DELETE_SHELF, CLEAR_SHELF } from './types'

export const addShelf = (shelf) => ({
    type: ADD_SHELF,
    shelf: shelf,
});

export const deleteShelf = (id) => ({
    type: DELETE_SHELF,
    id: id,
});

export const editShelf = (shelf) => ({
    type: EDIT_SHELF,
    shelf: shelf,
});

export const clearShelf = () => ({
    type: CLEAR_SHELF,
})