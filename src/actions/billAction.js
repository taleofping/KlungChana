import { ADD_BILL, DELETE_BILL, EDIT_BILL, CLEAR_BILL } from './types'

export const addBill = (bill) => ({
    type: ADD_BILL,
    bill: bill,
});

export const deleteBill = (id) => ({
    type: DELETE_BILL,
    id: id,
});

export const editBill = (bill) => ({
    type: EDIT_BILL,
    bill: bill,
})

export const clearBill = () => ({
    type: CLEAR_BILL,
})