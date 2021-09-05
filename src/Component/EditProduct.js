import React, { Component } from 'react'
import history from '../history'
import Hamburger from './Hamburger'

import firestore from '../firebase/firestore'
import { search, shelf } from '../pic'

import { addAccount, clearAccount } from '../actions/accountAction'
import { connect } from 'react-redux'

import { formatMoney } from '../formatMoney'

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            shelf: this.props.location.state.shelf,
            productProfileList: this.props.productProfileList,
            qty: 0,
            productID: '',
            productName: '',
        };
    }

    onSearch = () => {
        console.log(this.state.productProfileList)
        if (this.state.productID === '' && this.state.productName === '') {
            this.setState({ productProfileList: this.props.productProfileList })
        } else {
            this.setState({
                productProfileList: this.state.productProfileList.filter(
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

    render() {
        return (
            <div className="bg">
                <Hamburger page={'EDIT PRODUCT '+this.state.shelf} user={this.state.user} />
                <div className="paper" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '15%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Product ID</a1>
                        <input name="productID" type="text" style={{ fontSize: 24 }} onChange={txt => this.setState({ productID: txt.target.value })} value={this.state.productID} ></input>
                    </div>
                    <div style={{ display: 'flex', margin: "0.5%", paddingTop: "2%", justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>or</a1>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Product Name</a1>
                        <input name="productName" type="text" style={{ fontSize: 24 }} onChange={txt => this.setState({ productName: txt.target.value })} value={this.state.productName} ></input>
                    </div>
                    <img
                        style={{ justifyContent: 'flex-end', width: "10%", marginLeft: '15%' }}
                        src={search}
                        onClick={this.onSearch}
                    />

                </div>
                <div className="paperTopProduct" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '9%', borderRadius: '25px' }}>
                    <p className='txtProTopShelf' style={{}}>Product</p>
                    <p className='txtProTopShelf' style={{}}>Product ID</p>
                    <p className='txtProTopShelf' style={{}}>Product Name</p>
                    <p className='txtProTopShelf' style={{}}>Type</p>
                    <p className='txtProTopShelf' style={{}}>QTY</p>
                    <p className='txtProTopShelf' style={{}}>UNIT</p>
                </div>
                <scroll style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {this.state.productProfileList.map((item) => {
                        if (item.shelf === this.state.shelf) {
                            let qty = 0
                            this.props.productList.forEach(product => {
                                if (product.productID === item.productID) {
                                    qty += parseInt(product.qty)
                                }
                            })
                            item.qty = qty
                            return (
                                <div className="paperProduct2" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', width: '97%' }}
                                    onClick={() => history.push({
                                        pathname: '/stock/editStock/editproductshelf/editproduct/editproductdetail',
                                        state: {
                                            product: item,
                                            shelf: this.state.shelf,
                                        },
                                    })}>
                                    <div className='txtProShelf'>
                                        <img src={item.pic} style={{ width: '100px', height: '100px' }}></img>
                                    </div>
                                    <p className='txtProShelf' style={{}}>{item.productID}</p>
                                    <p className='txtProShelf' style={{}}>{item.productName}</p>
                                    <p className='txtProShelf' style={{}}>{item.type}</p>
                                    <p className='txtProShelf' style={{}}>{formatMoney(item.qty)}</p>
                                    <p className='txtProShelf' style={{}}>{item.unit}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
