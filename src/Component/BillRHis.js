import React, { Component } from 'react'
import history from '../history'
import Paper from '@material-ui/core/Paper';
import './Style.css'

import { connect } from 'react-redux';
import { addNotification } from '../actions/notificationAction'

import BillR2 from './BillR2.js';


class BillRHis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            notificationHead: 'ยืนยันคำร้องการสั่งซื้อ',
            bill: this.props.location.state.bill,
        };
    }

    render() {
        return (
            <div className="bg" >
                <Paper className="printBill">
                    <BillR2 bill={this.state.bill} />
                    <Paper className="btnCancel" onClick={() => {
                        history.push('/history')
                    }}>
                        <p className="txtbtnExit" style={{cursor:'pointer'}}>Exit</p>
                    </Paper>
                </Paper>

            </div>
        );
    }
}



const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillRHis);
