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
import { addBill } from '../actions/billAction'

import { deleteProduct, editProduct } from '../actions/productAction'

class BillPHis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            notificationHead: 'ยืนยันคำร้องการจ่าย',
            bill: this.props.location.state.bill,
            product: {},
        };
    }

    render() {
        return (
            <div className="bg" >
                <Paper className="printBill">
                    <BillP2 bill={this.state.bill} />
                    <Paper className="btnCancel" onClick={() => {
                        history.push('/history')
                    }}>
                        <p className="txtbtnCancle">Exit</p>
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
        editProduct: (product) => dispatch(editProduct(product))
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

export default connect(mapStateToProps, mapDispatchToProps)(BillPHis);
