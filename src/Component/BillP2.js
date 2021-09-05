import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'
import { logoTop, logoPump, line } from '../pic'

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';

import { formatMoney } from '../formatMoney'

class BillP2 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
        };
    }

    render() {
        return (
            <Paper className='bill'>
                <Paper className="blackTopic">
                    <p className="txtMR">Material Request</p>
                    <p className="txtsubMR">ใบเบิกสินค้า</p>
                </Paper>
                <Paper className="borLeft">
                    <p className="txtTopicL1">Customer Name :</p>
                    <p className="txtTopicL2">Address</p>
                    <p className="colonPAddr">:</p>
                    <p className="txtTopicL3">Tel.</p>
                    <p className="colonPTel">:</p>
                    <p className="txtsubtp1">ผู้ขาย</p>
                    <p className="txtsubtp2">ที่อยู่</p>
                    <p className="txtsubtp3">เบอร์ติดต่อ</p>

                    <p className="txtPdataL1">{this.props.bill.info.customerName}</p>
                    <p className="txtPdataL2">{this.props.bill.info.address}</p>
                    <p className="txtPdataL3">{this.props.bill.info.telCus}</p>
                </Paper>
                <Paper className="borRight">
                    <p className="txtTopicR1">Date</p>
                    <p className="colonPDate">:</p>
                    <p className="txtTopicR2">Requseted Name :</p>
                    <p className="txtTopicR3">Tel.</p>
                    <p className="colonPDepart">:</p>
                    <p className="txtsubtp4">วันที่เบิกสินค้า</p>
                    <p className="txtsubtp5">ผู้เบิกสินค้า</p>
                    <p className="txtsubtp6">เบอร์ติดต่อ</p>

                    <p className="txtPdataR1">{this.props.bill.info.date}</p>
                    <p className="txtPdataR2">{this.props.bill.info.reqName}</p>
                    <p className="txtPdataR3">{this.props.bill.info.telReq}</p>
                </Paper>
                <Paper className="dataBill2">
                    {this.props.bill.order.map((item) => {
                        this.setState({ total: this.state.total += parseInt(item.qty * item.costPunit) })
                        return (
                            <scroll style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: '10px', }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '1711px', marginTop: '2%' }}>
                                    <p className='billOproduct1 ' style={{}}>{this.props.bill.order.indexOf(item) + 1}</p>
                                    <p className='billOproduct2 ' style={{}}>{item.productID}</p>
                                    <p className='billOproduct3 ' style={{}}>{item.productName}</p>
                                    <p className='billOproduct4 ' style={{}}>{formatMoney(item.costPunit)}</p>
                                    <p className='billOproduct4' style={{}}>{item.qty}</p>
                                    <p className='billOproduct5' style={{}}>{formatMoney(item.qty * item.costPunit)}</p>
                                </div>
                            </scroll>
                        );
                    })}
                </Paper>
                <Paper className="topBill">

                </Paper>
                <Paper className="totalBox">
                    <p className="txtTotaldata">{formatMoney(this.state.total)}</p>

                </Paper>
                
                <img img className="imLogo" src={logoTop} />
                <img img className="imPump2" src={logoPump} />
                <p className="txtB1">บริษัท คลังชนะ จำกัด มหาชน</p>
                <p className="txtB2">126 หมู่ 8 ตำบลทุ่งสุขลา อำเภอศรีราชา</p>
                <p className="txtB3">จังหวัดชลบุรี 20230</p>
                <p className="txtTB1">No</p>
                <p className="txtTB2">Product ID</p>
                <p className="txtTB3">ProductName</p>
                <p className="txtPTB44">Cost/Unit</p>
                <p className="txtPTB55">QTY(ea)</p>
                <p className="txtPTB66">Amount</p>
                <p className="txtPONO">MR No. :</p>
                <p className="txtPoNoInfo">{this.props.bill.info.reNum}</p>
                <img img className="linee0" src={line} />
                <img img className="linee1" src={line} />
                <img img className="linee2" src={line} />
                <img img className="linee3" src={line} />
                <img img className="linee4" src={line} />
                <p className="txtTotal">Total</p>
                <p className="txtsTotal">จำนวนเงินรวมทั้งสิ้น</p>
                
            </Paper>
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
        accountList: state.accountReducer.accountList,
        productProfile: state.productProfileReducer.productProfileList,
        notificationList: state.notificationReducer.notificationList,
        pickOrderList: state.pickOrderReducer.pickOrderList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillP2);