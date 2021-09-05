import { ADD_PICKORDER, DELETE_PICKORDER, CLEAR_PICKORDER } from './types'

export const addPickOrder = (product) => ({
    type: ADD_PICKORDER,
    product: product,
});

export const deletePickOrder = (id) => ({
    type: DELETE_PICKORDER,
    id: id,
});

export const clearPickOrder = () => ({
    type: CLEAR_PICKORDER,
})