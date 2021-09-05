import React, { Component } from 'react'
import history from '../history'
import Hamburger from './Hamburger'

import firestore from '../firebase/firestore'
import { search, shelf } from '../pic'

import { addAccount, clearAccount } from '../actions/accountAction'
import { connect } from 'react-redux';
import { Success, DG, shelf2 } from '../pic';
import { formatMoney } from '../formatMoney'
import styled, { css } from 'styled-components'

import { editProduct, deleteProduct } from '../actions/productAction'
import { RiTShirtAirFill } from 'react-icons/ri'
import { FaThinkPeaks } from 'react-icons/fa'

const Font = styled.div`
  && {
    color: #000000;
    font-size: 24px;
  }
`
const ButtonEdit = styled.button`
  background: #40BA8E;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
  margin: 0 1em;
  width:20%
  padding: 0.5em 1.5em;
`

const ButtonDelete = styled.button`
  background: #881313;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
  margin: 0 1em;
  width:20%
  padding: 0.5em 1.5em;
`
const ButtonYes = styled.button`
  background: #ef3f3e;
  border: 2px;
  color: #ffffff;
  width: 121px;
  height: 48px;
  border-radius: 12px;
  margin: 0 1em;
  padding: 0.5em 1.75em;
`

const ButtonNo = styled.button`
  background: #929990;
  border: 2px;
  color: #ffffff;
  width: 121px;
  height: 48px;
  border-radius: 12px;
  margin: 0 1em;
  padding: 0.5em 1.75em;
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

class EditProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            product: this.props.location.state.product,
            shelf: this.props.location.state.shelf,
            qty: 0,
            modal1: false,
            modalSure: false,
            level: null,
            costPunit: null,
            qty2: null,
        };
    }

    componentDidMount = () => {
        let qty = 0
        this.props.productList.forEach(product => {
            if (product.productID === this.state.product.productID) {
                qty += parseInt(product.qty)
            }
        })
        this.setState({ qty: qty })
    }

    deleteSuccess = () => {
        console.log('Delete Success')
    }

    reject = (error) => {
        console.log(error)
    }

    handleModalSureCloseYes = () => {
        this.props.productList.forEach((item) => {
            if(item.productID === this.state.product.productID){
                firestore.deleteProduct(item.id, this.deleteSuccess, this.reject)
                this.props.deleteProduct(item.id)
            }
        })
        this.setState({ modalSure: false });
    }

    handleModalSureClose = () => {
        this.setState({ modalSure: false });
    };

    handleModalSureOpen = () => {
        this.setState({ modalSure: true });
    };

    ///////////////////////////
    handleModalOpen1 = () => {
        this.setState({ modal1: true });
    };

    onAdd = (item) => {
        this.setState({
            product: item,
            level: item.level,
            costPunit: item.costPunit,
            qty2: item.qty
        })
        this.handleModalOpen1()
    }

    updateSuccess = () => {
        console.log('Edit Success')
    }

    reject = (error) => {
        console.log(error)
    }

    handleModalCloseAdd = (e) => {
        const product = { ...this.state.product }
        product.level = this.state.level
        product.costPunit = this.state.costPunit
        product.qty = this.state.qty2
        firestore.updateProductByID(product, this.updateSuccess, this.reject)
        this.props.editProduct(product)
        this.setState({ modal1: false })
    };

    handleModalClose1 = () => {
        this.setState({ modal1: false })
    }
    /////////////////////////////////////////////
    render() {

        return (
            <div className="bg">
                <Hamburger page={'EDIT PRODUCT ' + this.state.shelf} user={this.state.user} />
                <div className="paperProductDetail" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '97%', justifyContent: 'center', alignItems: 'center', height: '145.5px' }}>
                        <p className='txtProductDetail' style={{}}>Product Picture</p>
                        <p className='txtProductDetail' style={{}}>Product ID</p>
                        <p className='txtProductDetail' style={{}}>Product Name</p>
                        <p className='txtProductDetail' style={{}}>Type</p>
                        <p className='txtProductDetail' style={{}}>Unit</p>
                        <p className='txtProductDetail' style={{}}>QTY</p>
                        <p className='txtProductDetail' style={{}}></p>
                    </div>


                </div>
                <div className="paperProductDetail" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '15%', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '97%', justifyContent: 'center', alignItems: 'center', height: '145.5px' }}>
                        <div className='txtTopProductDetail'>
                            <img src={this.state.product.pic} style={{ width: '100px', height: '100px' }}></img>
                        </div>
                        <p className='txtTopProductDetail' style={{}}>{this.state.product.productID}</p>
                        <p className='txtTopProductDetail' style={{}}>{this.state.product.productName}</p>
                        <p className='txtTopProductDetail' style={{}}>{this.state.product.type}</p>
                        <p className='txtTopProductDetail' style={{}}>{this.state.product.unit}</p>
                        <p className='txtTopProductDetail' style={{}}>{this.state.qty}</p>
                        <div className='txtTopProductDetail'>
                            <ButtonDelete style={{ width: 140, height: 50, }} onClick={this.handleModalSureOpen}>DELETE</ButtonDelete>
                        </div>
                    </div>
                </div>

                <div hidden={!this.state.modalSure}>
                    <div className="modal-background">
                        <div className="modal-cardforget">
                            <div style={{ paddingTop: 20 }}>
                                <img className="picWarning" src={DG} />
                            </div>
                            <div>
                                <Font style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 30 }} >
                                    <p>Are you sure ?</p>
                                </Font>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 35 }}>
                                <ButtonYes style={{ fontSize: 20 }} onClick={this.handleModalSureCloseYes}>Yes</ButtonYes>
                                <ButtonNo style={{ fontSize: 20 }} onClick={this.handleModalSureClose}>No</ButtonNo>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="paperTopProductDetail" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '9%', borderRadius: '25px', marginTop: '1%' }}>
                    <p className='txtProTopShelf' style={{}}>Received Date</p>
                    <p className='txtProTopShelf' style={{}}>Exp.</p>
                    <p className='txtProTopShelf' style={{}}>Shelf</p>
                    <p className='txtProTopShelf' style={{}}>Level</p>
                    <p className='txtProTopShelf' style={{}}>Cost/Unit</p>
                    <p className='txtProTopShelf' style={{}}>QTY</p>
                    <p className='txtProTopShelf' style={{}}>Amount</p>
                    <p className='txtProTopShelf' style={{}}></p>
                </div>

                <scroll style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '690px', overflow: 'auto' }}>
                    {this.props.productList.map((item) => {
                        if ((item.productID == this.state.product.productID) && (item.shelf == this.state.shelf) && (item.qty > 0)) {
                            return (
                                <div className="paperProduct" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', width: '97%' }}>
                                    <p className='txtProShelf' style={{}}>{item.recvDate}</p>
                                    <p className='txtProShelf' style={{}}>{item.expDate}</p>
                                    <p className='txtProShelf' style={{}}>{item.shelf}</p>
                                    <p className='txtProShelf' style={{}}>{item.level}</p>
                                    <p className='txtProShelf' style={{}}>{formatMoney(item.costPunit)}</p>
                                    <p className='txtProShelf' style={{}}>{formatMoney(item.qty)}</p>
                                    <p className='txtProShelf' style={{}}>{formatMoney(item.qty * item.costPunit)}</p>
                                    <div className='txtProShelf'>
                                        <ButtonEdit style={{ width: 120, height: 50 }} onClick={() => this.onAdd(item)}>EDIT</ButtonEdit>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </scroll>

                <div hidden={!this.state.modal1}>
                    <div className="modal-background">
                        <div className="modal-orderChart">
                            <div style={{ display: 'flex', paddingTop: 10, justifyContent: 'space-around' }}>
                                <p style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }}>Product ID</p>
                                <p style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }}>Shelf</p>
                                <p style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }}>Level</p>
                                <p style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }}>Cost/Unit</p>
                                <p style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }}>QTY</p>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%', justifyItems: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <p style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }}>{this.state.product.recvDate}</p>
                                <p style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }}>{this.state.product.expDate}</p>
                                <input type="number" style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }} value={this.state.level} onChange={txt => this.setState({ level: txt.target.value })} />
                                <input type="number" style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }} value={this.state.costPunit} onChange={txt => this.setState({ costPunit: txt.target.value })} />
                                <input type="number" style={{ height: 35, fontSize: 24, width: '20%', marginRight: '1%', marginLeft: '1%', textAlign: 'center' }} value={this.state.qty2} onChange={txt => this.setState({ qty2: txt.target.value })} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                                <ButtonCancel1 style={{ width: 100, height: 50 }} onClick={this.handleModalClose1}>Cancel</ButtonCancel1>
                                <ButtonAdd1 style={{ width: 100, height: 50 }} onClick={this.handleModalCloseAdd}>Edit</ButtonAdd1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAccount: (account) => dispatch(addAccount(account)),
        clearAccount: () => dispatch(clearAccount()),
        editProduct: (product) => dispatch(editProduct(product)),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        accountList: state.accountReducer.accountList,
        userList: state.userReducer.userList,
        productList: state.productReducer.productList,
        productProfileList: state.productProfileReducer.productProfileList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductDetail);
