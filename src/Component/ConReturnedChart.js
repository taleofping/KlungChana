import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'
import { search } from '../pic'

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';

import { addPickOrder, deletePickOrder, clearPickOrder } from '../actions/pickOrderAction'
import { formatMoney } from '../formatMoney'

import DatePicker from 'react-datepicker';

const Font = styled.div`
  && {
    color: #000000;
    font-size: 24px;
  }
`

const ButtonCancel1 = styled.button`
  background: #868181;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
  margin: 0 1em;
  padding: 0.5em 1.5em;
  `
const ButtonAdd1 = styled.button`
  background: #ef3f3e;
  border: 2px;
  color: #ffffff;
  width: 121px;
  height: 48px;
  border-radius: 10px;
  margin: 0 1em;
  padding: 0.5em 1.5em;
`

const ButtonCancel = styled.button`
  background: #A09797;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
`

const ButtonClear = styled.button`
  background: #A09797;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
`

const ButtonNext = styled.button`
  background: #EF3F3E;
  border-radius: 10px;
  border: 2px;
  color: #000000;
`

const ButtonAdd = styled.button`
  background: #000000;
  border: 2px;
  border-radius: 10px;
  color: #ffffff;
  margin: 0 1em;
  padding: 0.5em 1.5em;
`

class ConReturnedChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            user: this.props.userList[this.props.userList.length - 1],
            info: this.props.location.state.info,
            item: {},
            expDate: '',
            level: '',
            costPunit: '',
            qty: '',
            notificationHead: 'ยืนยันคำร้องการสั่งซื้อ',
            date: new Date(),
        };
    }

    handleModalClose = (e) => {
        const currentClass = e.target.className;
        if (currentClass == 'modal-cardforget') {
            return;
        }
        this.setState({
            modal: !this.state.modal,
            expDate: '',
            level: '',
            costPunit: '',
            qty: '',
        });
    };

    handleModalCloseAdd = (e) => {
        if ((this.state.level !== '') && (this.state.costPunit !== '') && (this.state.qty !== '')) {
            const product = this.state.item
            product.expDate = (this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear()).toString()
            product.level = this.state.level
            product.costPunit = this.state.costPunit
            product.qty = (this.state.qty).toString()
            product.recvDate = this.state.info.date
            product.amount = (this.state.costPunit * this.state.qty).toString()
            console.log(product)
            this.props.addPickOrder(product)

            const currentClass = e.target.className;
            if (currentClass == 'modal-cardforget') {
                return;
            }
            this.setState({
                modal: !this.state.modal,
                expDate: '',
                level: '',
                costPunit: '',
                qty: '',
                date: new Date(),
            });
        }
    };

    onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (/\+|-/.test(keyValue) || /\e/.test(keyValue))
            event.preventDefault();
    }
    
    onKeyPress1(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (/\+|-/.test(keyValue) || /\e/.test(keyValue) || /\./.test(keyValue))
            event.preventDefault();
    }

    handleModalOpen = () => {
        this.setState({ modal: !this.state.modal });
    };


    onClear = () => {
        this.props.clearPickOrder()
    }

    onAdd = (item) => {
        this.setState({ item: item })
        this.handleModalOpen()
    }

    onDelete = (id) => {
        this.props.deletePickOrder(id)
    }

    success = (doc) => {
        console.log(doc.id)
    }

    reject = (error) => {
        console.log(error)
    }

    onNext = () => {
        if (this.props.pickOrderList.length > 0) {
            history.push({
                pathname: '/returned/returnedChart/billReturn',
                state: {
                    info: this.state.info,
                    order: this.props.pickOrderList,
                },
            })
        } else {
            alert('No item in list.')
        }
    }

    render() {
        return (
            <div className="bg">
                <Paper className='schOrder'>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ paddingTop: 70, paddingLeft: 30 }}>
                            <input type="text" style={{ fontSize: 13 }}></input>
                        </div>
                        <div style={{ paddingTop: 70, paddingLeft: 68 }}>
                            <input type="text" style={{ fontSize: 13 }}></input>
                        </div>
                        <div>
                            <img img className="imsch" src={search} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div >
                            <p className="txtProID">Product ID</p>
                        </div>
                        <div>
                            <p className="txtProOr">Or</p>
                        </div>
                        <div>
                            <p className="txtProNm">Product Name</p>
                        </div>

                    </div>

                </Paper>
                <Paper className='topOrdering'>
                    <p className="txtTop">Returned Order</p>
                </Paper>
                <Paper className='topicLeft'>
                    <p className="txtTopL1">Product</p>
                    <p className="txtTopL2">Product ID</p>
                    <p className="txtTopL3">Product Name</p>
                </Paper>
                <Paper className='topicRight'>
                    <p className="txtTopR1">Product</p>
                    <p className="txtTopR2">Exp.</p>
                    <p className="txtTopR3">Shelf</p>
                    <p className="txtTopR4">Level</p>
                    <p className="txtTopR5">Cost/Unit</p>
                    <p className="txtTopR6">QTY</p>
                    <p className="txtTopR7">Amount</p>

                </Paper>
                <Paper className='dataLeft'>
                    <div style={{ paddingLeft: '1%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            {this.props.productProfileList.map((item) => {
                                return (
                                    <scroll className="paperPdInOD" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: '10px', paddingLeft: '7%' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                            <img src={item.pic} style={{ width: '40px', height: '40px' }}></img>
                                            <p className='txtPdInOD ' style={{ paddingLeft: '8%' }}>{item.productID}</p>
                                            <p className='txtPdInOD ' style={{}}>{item.productName}</p>
                                            <Paper className="paperSl" style={{ width: '22px', marginRight: '3.7%', boxShadow: 'none', cursor: 'pointer' }} onClick={() => { this.onAdd(item) }}><p style={{ fontWeight: 'lighter', color: 'black', textAlign: 'center', paddingTop: '80%' }}> {'>'} </p></Paper>
                                        </div>
                                    </scroll>
                                );
                            })}
                        </div>
                    </div>
                </Paper>
                <Paper className='dataRight'>
                    <div style={{ paddingLeft: '1%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            {this.props.pickOrderList.map((item) => {
                                return (
                                    <scroll className="paperSelectPd" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: '10px', }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <p className='txtPdInSl ' style={{}}>{item.productID}</p>
                                            <p className='txtPdInSl ' style={{ paddingLeft: '28px' }}>{item.expDate}</p>
                                            <p className='txtPdInSl ' style={{ paddingLeft: '10px' }}>{item.shelf}</p>
                                            <p className='txtPdInSl ' style={{ paddingLeft: '30px' }}>{item.level}</p>
                                            <p className='txtPdInSl ' style={{ paddingLeft: '60px' }}>{formatMoney(item.costPunit)}</p>
                                            <p className='txtPdInSl ' style={{ marginLeft: '75px' }}>{formatMoney(item.qty)}</p>
                                            <p className='txtPdInSl ' style={{}}>{formatMoney(item.qty * item.costPunit)}</p>
                                            <Paper className="paperSl" style={{ width: '31px', marginLeft: '3.8%', boxShadow: 'none', cursor: 'pointer' }} onClick={() => this.onDelete(item.id)}><p style={{ fontWeight: 'lighter', color: 'black', textAlign: 'center', paddingTop: '100%' }}> X </p></Paper>
                                        </div>
                                    </scroll>
                                );
                            })}
                        </div>
                    </div>
                </Paper>
                <Paper className="buttonPickk">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ paddingLeft: 10, paddingTop: 122 }}>
                            <ButtonCancel style={{ fontSize: 25, width: 184, height: 52 }} onClick={() => {
                                this.props.clearPickOrder()
                                history.push('/returned')
                            }}>
                                Cancel
                            </ButtonCancel>
                        </div>
                        <div style={{ paddingLeft: 690, paddingTop: 122 }}>
                            <ButtonClear style={{ fontSize: 25, width: 184, height: 52 }} onClick={this.onClear}>
                                Clear
                            </ButtonClear>
                        </div>
                        <div style={{ paddingLeft: 10, paddingTop: 122 }}>
                            <ButtonNext style={{ fontSize: 25, width: 184, height: 52 }} onClick={this.onNext}>
                                Next
                            </ButtonNext>
                        </div>

                    </div>
                </Paper>

                <div hidden={!this.state.modal}>
                    <div className="modal-background">
                        <div className="modal-orderChart">
                            <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 10 }}>
                                <Font>Product ID</Font>
                                <Font>Exp.</Font>
                                <Font>Shelf</Font>
                                <Font>Level</Font>
                                <Font>Cost/Unit</Font>
                                <Font>QTY</Font>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 30 }}>
                                <Font>{this.state.item.productID}</Font>
                                <DatePicker style={{ width: 300 }} selected={this.state.date} onChange={date => this.setState({ date: date })} dateFormat='dd/MM/yyy' />
                                <Font>{this.state.item.shelf}</Font>
                                <input type="number" min='0' onKeyPress={this.onKeyPress1.bind(this)} style={{ width: 150, height: 35, fontSize: 24 }} value={this.state.level} onChange={txt => this.setState({ level: txt.target.value })} />
                                <input type="number" min='0' onKeyPress={this.onKeyPress.bind(this)} style={{ width: 150, height: 35, fontSize: 24 }} value={this.state.costPunit} onChange={txt => this.setState({ costPunit: txt.target.value })} />
                                <input type="number" min='0' onKeyPress={this.onKeyPress.bind(this)}  style={{ width: 150, height: 35, fontSize: 24 }} value={this.state.qty} onChange={txt => this.setState({ qty: txt.target.value })} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
                                <ButtonCancel1 style={{ width: 100, height: 50 }} onClick={this.handleModalClose}>Cancel</ButtonCancel1>
                                <ButtonAdd1 style={{ width: 100, height: 50 }} onClick={this.handleModalCloseAdd}>Add</ButtonAdd1>
                            </div>
                        </div>
                    </div>
                </div>

                <Hamburger page='RETURNED ORDER' user={this.state.user} />

            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPickOrder: (product) => dispatch(addPickOrder(product)),
        deletePickOrder: (id) => dispatch(deletePickOrder(id)),
        clearPickOrder: () => dispatch(clearPickOrder()),
    };
};

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
        productProfileList: state.productProfileReducer.productProfileList,
        pickOrderList: state.pickOrderReducer.pickOrderList,
        productList: state.productReducer.productList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConReturnedChart);