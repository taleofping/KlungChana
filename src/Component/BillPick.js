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

import BillP from './BillP.js';
import { clearPickOrder } from '../actions/pickOrderAction'
import { addBill } from '../actions/billAction'

import { clearProduct, deleteProduct, editProduct, addProduct } from '../actions/productAction'
import { addProductProfile } from '../actions/productProfileAction';

class BillPick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            notificationHead: 'ยืนยันคำร้องการจ่าย',
            notiCount: 1,
            info: this.props.location.state.info,
            order: this.props.location.state.order,
            product: {},
        };
    }

    deleteSuccess = () => {
        console.log('Delete Success')
    }

    editSuccess = () => {
        console.log('Edit Success')
    }

    getAllProductSuccess = (querySnapshot) => {
        querySnapshot.forEach(doc => {
            const product = doc.data()
            product.id = doc.id
            this.props.addProduct(product)
        });
        history.push('/home')
    }

    onGetAll = async() => {
        this.props.clearProduct()
        await firestore.getAllProduct(this.getAllProductSuccess, this.reject)
    }

    getSuccess = async(doc) => {
        /*this.state.order.forEach((item) => {
            if (item.id == doc.id) {
                if (item.qty === doc.data().qty) {
                    console.log(doc.id)
                    firestore.deleteProduct(doc.id, this.deleteSuccess, this.reject)
                    this.props.deleteProduct(doc.id)
                } else {
                    console.log(doc.id)
                    const product = doc.data()
                    product.id = doc.id
                    product.qty = (parseInt(product.qty) - parseInt(item.qty)).toString()
                    firestore.updateProductByID(product, this.editSuccess, this.reject)
                    this.props.editProduct(product)
                }
            }
        })
        this.props.clearProduct()
        firestore.getAllProduct(this.getAllProductSuccess, this.reject)
        this.onGetAll()*/
        const product = this.state.order.filter((item) => item.id === doc.id)
        if (parseInt(product[0].qty) === parseInt(doc.data().qty)) {
            await firestore.deleteProduct(doc.id, this.deleteSuccess, this.reject)
            this.props.deleteProduct(doc.id)
        } else {
            const product1 = product[0]
            product1.qty = (parseInt(doc.data().qty) - parseInt(product[0].qty)).toString()
            await firestore.updateProductByID(product1, this.editSuccess, this.reject)
            this.props.editProduct(product1)
        }
    }

    reject = (error) => {
        console.log(error)
    }

    addBillSuccess = (doc) => {
        let bill = {
            info: this.state.info,
            order: this.state.order,
            managerConfirm: true,
            confirm: false,
            readStatus: false,
            id: doc.id,
            type: 'MR',
        }
        this.props.addBill(bill)
        this.props.clearPickOrder()
    }

    addReject = (error) => {
        console.log(error)
    }

    onSend = async() => {
        const notification = {
            notificationHead: this.state.notificationHead,
            notiCount: this.state.notiCount,
            notiNum:this.state.info,
        }
        await firestore.addNotification(notification, this.success, this.reject)
        this.props.addNotification(notification)
        const bill = {
            info: this.state.info,
            order: this.state.order,
            managerConfirm: true,
            confirm: false,
            readStatus: false,
            type: 'MR',
        }
        await firestore.addBill(bill, this.addBillSuccess, this.addReject)
        this.state.order.forEach((item) => {
            firestore.getProductByID(item.id, this.getSuccess, this.reject)
        })
        this.onGetAll()
        /*history.push('/home')*/
    }


    render() {
        return (
            <div className="bg" >
                <Paper className="printBill">
                    <BillP info={this.state.info} order={this.state.order} />
                    <Paper className="btnSend" style={{ cursor: 'pointer' }} onClick={this.onSend}>
                        <p className="txtbtnSend">Send</p>
                    </Paper>
                    <Paper className="btnCancel" style={{ cursor: 'pointer' }} onClick={() => {
                        this.props.clearPickOrder()
                        history.push('/home')
                    }}>
                        <p className="txtbtnCancle2">Cancel</p>
                    </Paper>
                    <Paper className="btnEdit" style={{ cursor: 'pointer' }} onClick={() => history.push({
                        pathname: '/picking/pickingChart',
                        state: { info: this.state.info },
                    })}>
                        <p className="txtbtnEdit">Edit</p>
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
        addBill: (bill) => dispatch(addBill(bill)),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        editProduct: (product) => dispatch(editProduct(product)),
        addProduct: (product) => dispatch(addProduct(product)),
        clearProduct: () => dispatch(clearProduct())
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
