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

import BillR2 from './BillR2.js';
import { clearPickOrder } from '../actions/pickOrderAction'
import { editBill, deleteBill } from '../actions/billAction'

import { clearProduct, deleteProduct, editProduct, addProduct } from '../actions/productAction'
import { addProductProfile } from '../actions/productProfileAction';

class BillReturn2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            notificationHead: 'ยืนยันคำร้องการส่งคืนสินค้า',
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
        history.push('/orderConfirm/returning')
    }

    onGetAll = () => {
        this.props.clearProduct()
        firestore.getAllProduct(this.getAllProductSuccess, this.reject)
    }

    addProductSuccess = (doc) => {
        console.log('Add Success')
    }

    updateBillSuccess = () => {
        let bill = this.state.bill
        bill.confirm = true
        this.props.editBill(bill)
        console.log('Update Success')
        this.state.bill.order.forEach((item) => {
            this.setState({ product: item })
            console.log(this.state.product)
            firestore.addProduct(item, this.addProductSuccess, this.reject)
        })
        this.onGetAll()
    }

    reject = (error) => {
        console.log(error)
    }

    onAccept = () => {
        let bill = this.state.bill
        bill.confirm = true
        firestore.updateBillByID(bill, this.updateBillSuccess, this.reject)
    }

    deleteBillSuccess = () => {
        console.log('Delete Success')
        this.props.deleteBill(this.state.bill.id)
    }

    onReject = () => {
        firestore.deleteBill(this.state.bill.id, this.deleteBillSuccess, this.reject)
        history.push('/orderConfirm/returning')
    }

    render() {
        return (
            <div className="bg" >
                <Paper className="printBill">
                    <BillR2 bill={this.state.bill} />
                    <Paper className="btnSend" style={{cursor:'pointer'}} onClick={this.onAccept}>
                        <p className="txtbtnSend2" >Accept</p>
                    </Paper>
                    <Paper className="btnCancel" style={{cursor:'pointer'}} onClick={() => {
                        history.push('/orderConfirm/returning')
                    }}>
                        <p className="txtbtnCancle2">Cancel</p>
                    </Paper>
                    <Paper className="btnEdit" style={{cursor:'pointer'}} onClick={this.onReject}>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillReturn2);
