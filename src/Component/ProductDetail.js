import React, { Component } from 'react'
import history from '../history'
import Hamburger from './Hamburger'

import firestore from '../firebase/firestore'
import { search, shelf } from '../pic'

import { addAccount, clearAccount } from '../actions/accountAction'
import { connect } from 'react-redux';

import { formatMoney } from '../formatMoney'

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            product: this.props.location.state.product,
            shelf: this.props.location.state.shelf,
            qty: 0,
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

    render() {

        return (
            <div className="bg">
                <Hamburger page={this.state.shelf} user={this.state.user} />
                <div className="paperProductDetail" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '97%', justifyContent: 'center', alignItems: 'center', height: '145.5px' }}>
                        <p className='txtProductDetail' style={{}}>Product Picture</p>
                        <p className='txtProductDetail' style={{}}>Product ID</p>
                        <p className='txtProductDetail' style={{}}>Product Name</p>
                        <p className='txtProductDetail' style={{}}>Type</p>
                        <p className='txtProductDetail2' style={{}}>QTY</p>
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
                        <p className='txtTopProductDetail2' style={{}}>{this.state.qty}</p>

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

                </div>

                <scroll style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.productList.map((item) => {
                        if ((item.productID == this.state.product.productID) && (item.shelf == this.state.shelf) && (item.qty > 0)){
                            return (
                                <div className="paperProduct" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', width: '97%' }}>
                                    <p className='txtProShelf' style={{}}>{item.recvDate}</p>
                                    <p className='txtProShelf' style={{}}>{item.expDate}</p>
                                    <p className='txtProShelf' style={{}}>{item.shelf}</p>
                                    <p className='txtProShelf' style={{}}>{item.level}</p>
                                    <p className='txtProShelf' style={{}}>{formatMoney(item.costPunit)}</p>
                                    <p className='txtProShelf' style={{}}>{formatMoney(item.qty)}</p>
                                    <p className='txtProShelf' style={{}}>{formatMoney(parseInt(item.qty) * parseInt(item.costPunit))}</p>
                                </div>
                            );
                        }
                    })}
                </scroll>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAccount: (account) => dispatch(addAccount(account)),
        clearAccount: () => dispatch(clearAccount()),
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
