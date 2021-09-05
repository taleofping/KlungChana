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

import { clearPickOrder } from '../actions/pickOrderAction'

import BillO2 from './BillO2.js';

import { editBill, deleteBill } from '../actions/billAction'
import { addProduct, clearProduct } from '../actions/productAction'

class BillOrder2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            notificationHead: 'ยืนยันคำร้องการสั่งซื้อ',
            bill: this.props.location.state.bill,
            product: null,
        };
    }

    getAllProductSuccess = (querySnapshot) => {
        querySnapshot.forEach(doc => {
            let product = doc.data()
            product.id = doc.id
            this.props.addProduct(product)
        });
        history.push('/orderConfirm/receiving')
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
        history.push('/orderConfirm/receiving')
    }


    render() {
        return (
            <div className="bg" >
                <Paper className="printBill">
                    <BillO2  bill={this.state.bill} />
                    <Paper className="btnSend" style={{cursor:'pointer'}} onClick={this.onAccept}>
                        <p className="txtbtnSend2">Accept</p>
                    </Paper>
                    <Paper className="btnCancel" style={{cursor:'pointer'}} onClick={() => {
                        history.push('/orderConfirm/receiving')
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

export default connect(mapStateToProps, mapDispatchToProps)(BillOrder2);
