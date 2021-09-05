import React, { Component } from 'react'
import history from '../history'
import './Style.css'
import firestore from "../firebase/firestore"

import Button from 'react-bootstrap/Button';
import styled, { css } from 'styled-components'
import Paper from '@material-ui/core/Paper';
import { BsPeopleFill } from "react-icons/bs";
import { FaKey } from "react-icons/fa";
import { Base64 } from 'js-base64';
import { connect } from 'react-redux';
import { addUser } from '../actions/userAction';
import { addAccount } from '../actions/accountAction'
import { addProduct } from '../actions/productAction';
import { addProductProfile } from '../actions/productProfileAction';
import { addShelf } from '../actions/shelfAction';
import { addBill } from '../actions/billAction';
import { addNotification } from '../actions/notificationAction';

import { Error } from '../pic';

const ButtonLogin = styled.button`
  background: #ef3f3e;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
  margin: 0 1em;
  padding: 0.5em 3em;
`

const ButtonOK = styled.button`
  background: #ef3f3e;
  border: 2px;
  color: #ffffff;
  width: 121px;
  height: 48px;
  border-radius: 12px;
  margin: 0 1em;
  padding: 0.5em 1.75em;
`

const FontLogin = styled.div`
  && {
    color: #EF3F3E;
    font-size: 3em;
  }
`
const Font = styled.div`
  && {
    color: #000000;
    font-size: 1em;
    font-weight: semibold;
  }
`

const FontError = styled.div`
  && {
    color: #000000;
    font-size: 24px;
    font-weight: semibold;
  }
`

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalError: false,
            email: null,
            pass: null,
            account: null,
            user: this.props.userList[this.props.userList.length - 1],
            accounts: null,
        };
    }

    handleModalErrorClose = (e) => {
        this.setState({ modalError: false });
    };


    handleModalErrorOpen = () => {
        this.setState({ modalError: true });
    };

    onLogin = () => {
        firestore.getUser(this.state.email, this.getSuccess, this.getReject)
    };

    getAllSuccess = (querySnapshot) => {
        querySnapshot.forEach(doc => {
            let account = doc.data()
            account.id = doc.id
            /*console.log(account)*/
            this.props.addAccount(account)
        });
        /*console.log(this.props.accountList)*/
    }

    getAllReject = (error) => {
        console.log(error)
    }

    getAllNotificationSuccess = (querySnapshot) => {
        querySnapshot.forEach(doc => {
            let notification = doc.data()
            notification.id = doc.id
            this.props.addNotification(notification)
        });
        /*console.log(this.props.productList)*/
    }

    getAllProductSuccess = (querySnapshot) => {
        querySnapshot.forEach(doc => {
            let product = doc.data()
            product.id = doc.id
            this.props.addProduct(product)
        });
        /*console.log(this.props.productList)*/
    }

    getAllProductProfileSuccess = (querySnapshot) => {
        querySnapshot.forEach(doc => {
            let product = doc.data()
            product.id = doc.id
            this.props.addProductProfile(product)
        });
        /*console.log(this.props.productProfileList)*/
    }

    getAllShelfSuccess = (querySnapshot) => {
        querySnapshot.forEach(doc => {
            let shelf = doc.data()
            shelf.id = doc.id
            this.props.addShelf(shelf)
        });
        /*console.log(this.props.shelfList)*/
    }

    getAllBillSuccess = (querySnapshot) => {
        querySnapshot.forEach(doc => {
            let bill = doc.data()
            bill.id = doc.id
            this.props.addBill(bill)
        });
        console.log(this.props.billList)
    }

    getSuccess = (querySnapshot) => {
        let user;
        querySnapshot.forEach(doc => {
            user = doc.data()
            user.id = doc.id
            this.setState({ user: user })
        });
        /*console.log(user.pass)
        console.log(this.state.user.pass)*/
        if (Base64.decode(user.pass) === this.state.pass) {
            this.props.addUser(user)
            /*console.log(this.props.userList)*/
            firestore.getAllUser(this.getAllSuccess, this.getAllReject)
            firestore.getAllProduct(this.getAllProductSuccess, this.getAllReject)
            firestore.getAllProductProfile(this.getAllProductProfileSuccess, this.getAllReject)
            firestore.getAllShelf(this.getAllShelfSuccess, this.getAllReject)
            firestore.getAllBill(this.getAllBillSuccess, this.getAllReject)
            firestore.getAllNotification(this.getAllNotificationSuccess,this.getAllReject)
            history.push("/home")
            /*window.location.href="/home"*/
        } else {
            alert("Email or Password is incorrect")
        }
        /*console.log(this.state.account)*/
    }

    getReject = (error) => {
        console.log(error)
        this.handleModalErrorOpen()
        // alert("Email or Password is incorrect")
    }

    addProduct = () => {
        const product = {
            costPunit: '4590',
            expDate: '-',
            expTime: '-',
            level: '1',
            oty: '50',
            pic: 'PIC',
            productID: '15201A',
            productName: 'Crocodile Leather',
            recvDate: '20/01/21',
            recvTime: '15:30',
            shelf: 'S1-01',
            type: 'A',
            unit: 'EA',
        }
        firestore.addProduct(product, this.addSuccess, this.addReject)
    }

    addSuccess = (doc) => {
        console.log(doc.id)
    }

    addReject = (error) => {
        console.log(error)
    }

    render() {
        return (
            <div className="bgLogin">
                <div style={{ display: 'flex', flexDirection: 'row',paddingLeft:"62%",paddingTop:"17%",justifyContent: 'center'}}>
                    <Paper className="PLogin">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ paddingLeft: 105 }}>
                                <FontLogin>Login</FontLogin>
                            </div>
                            <div style={{ paddingLeft: 85 }}>
                                <Font>Sign in your account</Font>
                            </div>
                            <div style={{ paddingLeft: 35, paddingTop: 20 }}>
                                <Font><BsPeopleFill /> Email </Font>
                            </div>
                            <div style={{ paddingLeft: 35, paddingTop: 5 }}>
                                <input style={{ width: 250 }} type="text" name="email" onChange={txt => this.setState({ email: txt.target.value })} />
                            </div>
                            <div style={{ paddingLeft: 35, paddingTop: 10 }}>
                                <Font><FaKey /> Password </Font>
                            </div>
                            <div style={{ paddingLeft: 35, paddingTop: 5 }}>
                                <input style={{ width: 250 }} type="password" name="pass" onChange={txt => this.setState({ pass: txt.target.value })} />
                            </div>
                            <div style={{ paddingLeft: 20, paddingTop: 25 }}>
                                <ButtonLogin style={{ width: 250 }} onClick={this.onLogin/*this.addProduct*/}>
                                    Login
                                </ButtonLogin>
                            </div>
                            <div style={{ paddingLeft: 82, paddingTop: 10 }}>
                                <Button variant="link" onClick={() => history.push({
                                    pathname: '/forgetPassword',
                                })}>
                                    Forget password ?
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </div>
                <div hidden={!this.state.modalError}>
                    <div className="modal-background" >
                        <div className="modal-cardforget">
                            <div style={{ paddingTop: 20 }}>
                                <img className="picError" src={Error} />
                            </div>
                            <div>
                                <FontError style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 30 }} >
                                    <p>Email or Password is incorrect.</p>
                                </FontError>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 35 }}>
                                <ButtonOK style={{ fontSize: 20 }} onClick={this.handleModalErrorClose}>OK</ButtonOK>
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
        addUser: (user) => dispatch(addUser(user)),
        addAccount: (account) => dispatch(addAccount(account)),
        addProduct: (product) => dispatch(addProduct(product)),
        addProductProfile: (product) => dispatch(addProductProfile(product)),
        addShelf: (shelf) => dispatch(addShelf(shelf)),
        addBill: (bill) => dispatch(addBill(bill)),
        addNotification: (notification) => dispatch(addNotification(notification)),
    };
};

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
        accountList: state.accountReducer.accountList,
        productList: state.productReducer.productList,
        productProfile: state.productProfileReducer.productProfileList,
        shelfList: state.shelfReducer.shelfList,
        billList: state.billReducer.billList,
        notificationList: state.notificationReducer.notificationList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
