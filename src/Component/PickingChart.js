import React, { Component } from 'react'
import history from '../history'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'
import { cost, dashboard, historyPic, orderconfirm, ordering, packing, standcount, confirmship, xxx, search } from '../pic'

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';

import { addPickOrder, deletePickOrder, clearPickOrder } from '../actions/pickOrderAction'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { formatMoney } from '../formatMoney'
import { FaLessThan } from 'react-icons/fa';

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

class PickingChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            item: {},
            qty: '',
            notificationHead: 'ยืนยันคำร้องการจ่าย',
            modal: false,
            modal1: false,
            product: {},
            info: this.props.location.state.info,
            productID: '',
            productName: '',
            productProfileList: this.props.productProfileList,
        };
    }

    onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (/\+|-/.test(keyValue) || /\e/.test(keyValue))
            event.preventDefault();
    }

    handleModalClose = (e) => {
        const currentClass = e.target.className;
        if (currentClass == 'modal-cardforget') {
            return;
        }
        this.setState({
            modal: false,
        });
    };

    handleModalClose1 = (e) => {
        const currentClass = e.target.className;
        if (currentClass == 'modal-cardforget') {
            return;
        }
        this.setState({
            modal1: false,
            qty: '',
        });
    };

    handleModalCloseAdd = (e) => {
        if (((this.state.qty !== '') && (parseInt(this.state.qty) <= parseInt(this.state.product.qty)))) {
            const product = { ...this.state.product }
            product.qty = (this.state.qty).toString()
            this.props.addPickOrder(product)

            const currentClass = e.target.className;
            if (currentClass == 'modal-cardforget') {
                return;
            }
            this.setState({
                modal1: false,
                modal: false,
                qty: '',
            });
        } else {
            alert('Quantity is invalid.')
        }
    };

    onSearch = () => {
        if (this.state.productID === '' && this.state.productName === '' ) {
            this.setState({ productProfileList: this.props.productProfileList })
        } else {
            this.setState({
                productProfileList: this.props.productProfileList.filter(
                    (item) => ((item.productID === this.state.productID) ||
                        (item.productName === this.state.productName))
                )
            })
        }
        this.setState({
            productID: '',
            productName: '',
        })
    }

    onClear = () => {
        this.props.clearPickOrder()
    }

    onAdd = (item) => {
        this.setState({ item: item })
        this.handleModalOpen()
    }

    onAddTrue = (item) => {
        this.setState({ product: item })
        console.log(item.qty)
        this.handleModalOpen1()
    }

    onDelete = (id) => {
        this.props.deletePickOrder(id)
    }

    handleModalOpen = () => {
        this.setState({
            modal: true,
        });
    };

    handleModalOpen1 = () => {
        this.setState({ modal1: true });
    };

    onNext = () => {
        if (this.props.pickOrderList.length > 0) {
            history.push({
                pathname: '/picking/pickingChart/billPick',
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
                            <input type="text" style={{ fontSize: 13 }} value={this.state.productID} onChange={txt => this.setState({ productID: txt.target.value })}></input>
                        </div>
                        <div style={{ paddingTop: 70, paddingLeft: 68 }}>
                            <input type="text" style={{ fontSize: 13 }} value={this.state.productName} onChange={txt => this.setState({ productName: txt.target.value })}></input>
                        </div>
                        <div>
                            <img img className="imsch" src={search} style={{ cursor: 'pointer' }} onClick={this.onSearch} />
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
                    <p className="txtTop">Order Picking</p>
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
                            {this.state.productProfileList.map((item) => {
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
                                history.push('/picking')
                            }}>
                                Cancel
                            </ButtonCancel>
                        </div>
                        <div style={{ paddingLeft: 690, paddingTop: 122 }}>
                            <ButtonClear style={{ fontSize: 25, width: 184, height: 52 }} onClick={this.onClear} >
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
                        <div className="modal-PickingChart" style={{ borderRadius: '15px' }}>
                            <Paper className="TOPPickModal" style={{ borderRadius: '15px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '97%', alignContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <p className='txtTopPicChart' style={{}}>Product Picture</p>
                                    <p className='txtTopPicChart' style={{}}>Product ID</p>
                                    <p className='txtTopPicChart' style={{}}>Product Name</p>
                                    <p className='txtTopPicChart' style={{}}>Type</p>

                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '97%', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <div className='txtTopPicChartDetail'>
                                        <img src={this.state.item.pic} style={{ width: '80px', height: '80px' }}></img>
                                    </div>
                                    <p className='txtTopPicChartDetail' style={{}}>{this.state.item.productID}</p>
                                    <p className='txtTopPicChartDetail' style={{}}>{this.state.item.productName}</p>
                                    <p className='txtTopPicChartDetail' style={{}}>{this.state.item.type}</p>


                                </div>
                            </Paper>

                            <Paper className="TOPPickModalTB"
                                style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: '15px' }} >

                                <p className='txtTBModal'>Received Date</p>
                                <p className='txtTBModal'>Exp.</p>
                                <p className='txtTBModal'>Shelf</p>
                                <p className='txtTBModal'>Level</p>
                                <p className='txtTBModal'>Cost/Unit</p>
                                <p className='txtTBModal'>QTY</p>
                                <p className='txtTBModal'>Amount</p>

                            </Paper>



                            <Paper className='TBPickModal'
                                style={{ display: 'flex', flexDirection: 'column', width: '100%', borderRadius: '15px' }}>

                                {this.props.productList.map((item) => {
                                    if (item.productID === this.state.item.productID && (item.qty > 0)) {
                                        return (
                                            <scroll style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', alignContent: 'center', cursor: 'pointer' }}>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '1%', marginBottom: '1%' }} onClick={() => this.onAddTrue(item)} >
                                                    <p className='txtTBModal2' style={{}}>{item.recvDate}</p>
                                                    <p className='txtTBModal2' style={{}}>{item.expDate}</p>
                                                    <p className='txtTBModal2' style={{}}>{item.shelf}</p>
                                                    <p className='txtTBModal2' style={{}}>{item.level}</p>
                                                    <p className='txtTBModal2' style={{}}>{formatMoney(item.costPunit)}</p>
                                                    <p className='txtTBModal2' style={{}}>{formatMoney(item.qty)}</p>
                                                    <p className='txtTBModal2' style={{}}>{formatMoney(item.qty * item.costPunit)}</p>
                                                </div>
                                            </scroll>
                                        );
                                    }
                                })}



                            </Paper>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5%', marginBottom: '0.5%' }}>
                                <ButtonCancel1 style={{ fontSize: 25, width: 150, height: 50 }} onClick={this.handleModalClose}>Cancel</ButtonCancel1>
                            </div>

                        </div>
                    </div>
                </div>

                <div hidden={!this.state.modal1}>
                    <div className="modal-background">
                        <div className="modal-orderChart">
                            <div style={{ display: 'flex', paddingTop: 10, justifyContent: 'space-around' }}>
                                <Font>Product ID</Font>
                                <Font>Exp.</Font>
                                <Font>Shelf</Font>
                                <Font>Level</Font>
                                <Font>Cost/Unit</Font>
                                <Font>QTY</Font>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 30 }}>
                                <Font>{this.state.product.productID}</Font>
                                <Font>{this.state.product.expDate}</Font>
                                <Font>{this.state.product.shelf}</Font>
                                <Font>{this.state.product.level}</Font>
                                <Font>{this.state.product.costPunit}</Font>
                                <input type="number" min='0' onKeyPress={this.onKeyPress.bind(this)} style={{ width: 150, height: 35, fontSize: 24 }} value={this.state.qty} onChange={txt => this.setState({ qty: txt.target.value })} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
                                <ButtonCancel1 style={{ width: 100, height: 50 }} onClick={this.handleModalClose1}>Cancel</ButtonCancel1>
                                <ButtonAdd1 style={{ width: 100, height: 50 }} onClick={this.handleModalCloseAdd}>Add</ButtonAdd1>
                            </div>
                        </div>
                    </div>
                </div>

                <Hamburger page='PICKING' user={this.state.user} />

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

export default connect(mapStateToProps, mapDispatchToProps)(PickingChart);