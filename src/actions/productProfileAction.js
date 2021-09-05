import { ADD_PRODUCT_PROFILE, EDIT_PRODUCT_PROFILE, DELETE_PRODUCT_PROFILE, CLEAR_PRODUCT_PROFILE } from './types'

export const addProductProfile = (product) => ({
    type: ADD_PRODUCT_PROFILE,
    product: product,
});

export const deleteProductProfile = (id) => ({
    type: DELETE_PRODUCT_PROFILE,
    id: id,
});

export const editProductProfile = (product) => ({
    type: EDIT_PRODUCT_PROFILE,
    product: product,
});

export const clearProductProfile = () => ({
    type: CLEAR_PRODUCT_PROFILE,
})