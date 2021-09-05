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

const Font = styled.div`
  && {
    color: #000000;
    font-size: 24px;
  }
`

class BillR2 extends React.PureComponent {
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
                    <p className="txtMR">Returned Request</p>
                    <p className="txtsubMR">ใบขอคืนสินค้า</p>
                </Paper>
                <Paper className="borLeft">
                    <p className="txtTopicL1">Date :</p>
                    <p className="txtTopicL2">Returned Name</p>
                    <p className="colonPAddr">:</p>
                    <p className="txtTopicL3">Tel.</p>
                    <p className="colonPTel">:</p>
                    <p className="txtsubtp1">วันที่</p>
                    <p className="txtsubtp2">ผู้คืนสินค้า</p>
                    <p className="txtsubtp3">เบอร์ติดต่อ</p>

                    <p className="txtPdataL1">{this.props.bill.info.date}</p>
                    <p className="txtPdataL2">{this.props.bill.info.reName}</p>
                    <p className="txtPdataL3">{this.props.bill.info.tel}</p>
                </Paper>

                <Paper className="dataBill">
                    {this.props.bill.order.map((item) => {
                        this.setState({ total: this.state.total += parseInt(item.qty * item.costPunit) })
                        return (
                            <scroll style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: '10px', }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '1711px', marginTop: '2%' }}>
                                    <p className='billOproduct1 ' style={{}}>{this.props.bill.order.indexOf(item) + 1}</p>
                                    <p className='billOproduct2 ' style={{}}>{item.productID}</p>
                                    <p className='billOproduct3 ' style={{}}>{item.productName}</p>
                                    <p className='billOproduct4 ' style={{}}>{item.shelf}</p>
                                    <p className='billOproduct4' style={{}}>{item.level}</p>
                                    <p className='billOproduct5' style={{}}>{formatMoney(item.qty)}</p>
                                </div>
                            </scroll>
                        );
                    })}
                </Paper>
                <Paper className="topBill">

                </Paper>
                <Paper className='noteBill'>
                    <Font style={{paddingLeft:10}}>{this.props.bill.info.des}</Font>
                </Paper>
                <Paper className="totalBox">
                    <p className="txtTotaldata">{formatMoney(this.state.total)}</p>

                </Paper>

                <img img className="imLogo" src={logoTop} />
                <img img className="imPump" src={logoPump} />
                <p className="txtB1">บริษัท คลังชนะ จำกัด มหาชน</p>
                <p className="txtB2">126 หมู่ 8 ตำบลทุ่งสุขลา อำเภอศรีราชา</p>
                <p className="txtB3">จังหวัดชลบุรี 20230</p>
                <p className="txtTB1">No</p>
                <p className="txtTB2">Product ID</p>
                <p className="txtTB3">ProductName</p>
                <p className="txtTB4">Shelf</p>
                <p className="txtTB5">Level</p>
                <p className="txtTB6">QTY(ea)</p>
                <p className="txtPONO">RE No. :</p>
                <p className="txtPoNoInfo">{this.props.bill.info.reNum}</p>
                <img img className="line0" src={line} />
                <img img className="line1" src={line} />
                <img img className="line2" src={line} />
                <img img className="line3" src={line} />
                <img img className="line4" src={line} />
                <p className="txtTotal">Total</p>
                <p className="txtsTotal">จำนวนเงินรวมทั้งสิ้น</p>
                <p className='txtNote'>Note</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillR2);