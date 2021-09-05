import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { addNotification } from '../actions/notificationAction'
import firestore from '../firebase/firestore'

import BillP2 from './BillP2.js';
import { clearPickOrder } from '../actions/pickOrderAction'
import { editBill, deleteBill } from '../actions/billAction'

import { addProduct, clearProduct, editProduct } from '../actions/productAction'

class BillPick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            notificationHead: 'ยืนยันคำร้องการจ่าย',
            bill: this.props.location.state.bill,
            product: {},
        };
    }

    getAllProductSuccess = (querySnapshot) => {
        querySnapshot.forEach(doc => {
            let product = doc.data()
            product.id = doc.id
            this.props.addProduct(product)
        });
        history.push('/orderConfirm/packing')
    }

    onGetAll = () => {
        this.props.clearProduct()
        firestore.getAllProduct(this.getAllProductSuccess, this.reject)
    }

    updateBillSuccess = () => {
        let bill = this.state.bill
        bill.confirm = true
        this.props.editBill(bill)
        console.log('Update Success')
        history.push('/orderConfirm/packing')
    }

    onAccept = () => {
        let bill = this.state.bill
        bill.confirm = true
        firestore.updateBillByID(bill, this.updateBillSuccess, this.reject)
    }

    reject = (error) => {
        console.log(error)
    }

    deleteBillSuccess = () => {
        /*console.log('Delete Success')*/
        this.props.deleteBill(this.state.bill.id)
    }

    editSuccess = () => {
        console.log('Edit Success')
    }

    getSuccess = (doc) => {
        /*if (doc.data() === undefined) {
            this.state.bill.order.forEach((item) => {
                if (doc.id === item.id) {
                    console.log('Add-' + doc.id)
                    firestore.addProductByID(item, this.addSuccess, this.addReject)
                    this.props.addProduct(item)
                }
            })
        } else {
            this.state.bill.order.forEach((item) => {
                if (doc.id === item.id) {
                    console.log('Edit-' + doc.id)
                    const product = doc.data()
                    product.id = doc.id
                    product.qty = (parseInt(product.qty) + parseInt(item.qty)).toString()
                    firestore.updateProductByID(product, this.editSuccess, this.reject)
                    this.props.editProduct(product)
                }
            })
        }*/
        const product = {...this.state.bill.order.filter((item) => item.id === doc.id)[0]}
        if (doc.data() === undefined) {
            firestore.addProductByID(product, this.addSuccess, this.addReject)
            this.props.addProduct(product)
        } else {
            const product2 = doc.data()
            product2.id = doc.id
            product2.qty = (parseInt(product2.qty) + parseInt(product.qty)).toString()
            console.log(product2.qty)
            this.props.editProduct(product2)
            firestore.updateProductByID(product2, this.editSuccess, this.reject) 
        }
    }

    getReject = (error) => {
        console.log(error)
    }

    addSuccess = (doc) => {
        console.log('success')
    }

    addReject = (error) => {
        console.log(error)
    }

    onReject = () => {
        this.state.bill.order.forEach((item) => {
            firestore.getProductByID(item.id, this.getSuccess, this.getReject)
        })
        firestore.deleteBill(this.state.bill.id, this.deleteBillSuccess, this.reject)
        /*this.onGetAll()*/
        history.push('/orderConfirm/packing')
    }

    render() {
        return (
            <div className="bg" >
                <Paper className="printBill">
                    <BillP2 bill={this.state.bill} />
                    <Paper className="btnSend" onClick={this.onAccept}>
                        <p className="txtbtnSend2">Accept</p>
                    </Paper>
                    <Paper className="btnCancel" onClick={() => {
                        history.push('/orderConfirm/packing')
                    }}>
                        <p className="txtbtnCancle2">Cancel</p>
                    </Paper>
                    <Paper className="btnEdit" onClick={this.onReject}>
                        <p className="txtbtnEdit2">Reject</p>
                    </Paper>
                </Paper>

            </div>
        );
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        clearPickOrder: () => dispatch(clearPickOrder()),
        addNotification: (notification) => dispatch(addNotification(notification)),
        editBill: (bill) => dispatch(editBill(bill)),
        deleteBill: (id) => dispatch(deleteBill(id)),
        addProduct: (product) => dispatch(addProduct(product)),
        clearProduct: () => dispatch(clearProduct()),
        editProduct: (product) => dispatch(editProduct(product)),
    };
};

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
        accountList: state.accountReducer.accountList,
        productProfile: state.productProfileReducer.productProfileList,
        notificationList: state.notificationReducer.notificationList,
        pickOrderList: state.pickOrderReducer.pickOrderList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillPick);
