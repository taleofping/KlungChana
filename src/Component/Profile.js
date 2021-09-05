import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import './Style.css'
import { Base64 } from 'js-base64';
import Paper from '@material-ui/core/Paper';
import Hamburger from './Hamburger'
import firestore from "../firebase/firestore"
import { connect } from 'react-redux';
import styled, { css } from 'styled-components'
import './Modal.css';
import { Success, Error } from '../pic';

import { editAccount } from '../actions/accountAction'

const ButtonCancel = styled.button`
  background: #868181;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
  margin: 0 1em;
  padding: 0.5em 1.5em;
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

const Font = styled.div`
  && {
    color: #000000;
    font-size: 24px;
  }
`

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalChangpass: false,
            user: this.props.userList[this.props.userList.length - 1],
            pass: null,
            confirmNewPass: null,
            newPass: null
        };
    }

    onOk = () => {
        if (Base64.encode(this.state.pass) === this.state.user.pass && this.state.newPass === this.state.confirmNewPass) {
            console.log("correct!!")
            const user = this.state.user
            user.pass = Base64.encode(this.state.newPass)
            firestore.updateUserByID(user, this.success, this.reject)
            /*console.log(user)*/
        } else {
            alert('Incorrect password')
        }
    }
    success = () => {
        const user = {
            firstnameTH: this.state.user.firstnameTH,
            lastnameTH: this.state.user.lastnameTH,
            firstnameEN: this.state.user.firstnameEN,
            lastnameEN: this.state.user.lastnameEN,
            tel: this.state.user.tel,
            address: this.state.user.address,
            pass: Base64.encode(this.state.newPass),
            pic: this.state.user.pic,
            id: this.state.user.id,
        }
        this.props.editAccount(user)
        alert('Update password success')
        this.setState({ modalChangpass: !this.state.modalChangpass });
    }
    reject = (e) => {
        console.log(e)
    }
    handleModalClose = (e) => {
        const currentClass = e.target.className;
        if (currentClass == 'modal-cardChangePass') {
            return;
        }
        this.setState({ modalChangpass: !this.state.modalChangpass });
    };

    handleModalOpen = () => {
        this.setState({ modalChangpass: !this.state.modalChangpass });
    };

    render() {
        return (
            <div className="bg">
                <Paper className="paperPhoto" >
                    <div style={{ alignContent: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', padding: 18 }}>
                        <img style={{ width: '230px', height: '230px', alignSelf: 'center' }} src={this.state.user.pic} />
                    </div>
                </Paper>
                <Paper className="paperDetail" >
                    <div><p className="textP1" style={{ width: '156px', height: '39px', left: '7%', top: '2%',cursor:'default' }}>Employee ID</p></div>
                    <div><input placeholder={this.state.user.employeeID} className="inputP1" style={{ top: '7%',cursor:'default' }} readOnly></input></div>
                    <div><p className="textP1" style={{ width: '171px', height: '39px', left: '7%', top: '12%',cursor:'default' }}>Firstname(TH)</p></div>
                    <div><input placeholder={this.state.user.firstnameTH} className="inputP1" style={{ top: '17%',cursor:'default' }} readOnly></input></div>
                    <div><p className="textP1" style={{ width: '171px', height: '39px', left: '7%', top: '22%',cursor:'default' }}>Firstname(EN)</p></div>
                    <div><input placeholder={this.state.user.firstnameEN} className="inputP1" style={{ top: '27%',cursor:'default' }} readOnly></input></div>
                    <div><p className="textP1" style={{ width: '139px', height: '39px', left: '7%', top: '32%',cursor:'default' }}>ID card No.</p></div>
                    <div><input placeholder={this.state.user.idCard} className="inputP1" style={{ top: '37%',cursor:'default' }} readOnly></input></div>
                    <div><p className="textP1" style={{ width: '39px', height: '39px', left: '7%', top: '42%',cursor:'default' }}>Tel.</p></div>
                    <div><input placeholder={this.state.user.tel} className="inputP1" style={{ top: '47%',cursor:'default' }} readOnly></input></div>
                    <div><p className="textP1" style={{ width: '207px', height: '39px', left: '7%', top: '52%',cursor:'default' }}>Current Address</p></div>
                    <div><textarea  placeholder={this.state.user.address} className="inputP2" style={{ top: '57%',resize:'none',cursor:'default' }} readOnly></textarea></div>
                    <div><p className="textP1" style={{ width: '150px', height: '39px', left: '49.5%', top: '2%',cursor:'default' }}>Department</p></div>
                    <div><input placeholder={this.state.user.department} className="inputP3" style={{ top: '7%',cursor:'default' }} readOnly></input></div>
                    <div><p className="textP1" style={{ width: '170px', height: '39px', left: '49.5%', top: '12%',cursor:'default' }}>Lastname(TH)</p></div>
                    <div><input placeholder={this.state.user.lastnameTH} className="inputP3" style={{ top: '17%',cursor:'default' }} readOnly></input></div>
                    <div><p className="textP1" style={{ width: '169px', height: '39px', left: '49.5%', top: '22%',cursor:'default' }}>Lastname(EN)</p></div>
                    <div><input placeholder={this.state.user.lastnameEN} className="inputP3" style={{ top: '27%',cursor:'default' }} readOnly></input></div>
                    <div><p className="textP1" style={{ width: '161px', height: '39px', left: '49.5%', top: '32%',cursor:'default' }}>Date of Birth</p></div>
                    <div><input placeholder={this.state.user.birthDate} className="inputP3" style={{ top: '37%',cursor:'default' }} readOnly></input></div>
                    <div><p className="textP1" style={{ width: '75px', height: '39px', left: '49.5%', top: '42%',cursor:'default' }}>E-mail</p></div>
                    <div><input placeholder={this.state.user.email} className="inputP3" style={{ top: '47%',cursor:'default' }} readOnly></input></div>
                </Paper>
                <Paper className="paperChangePass" onClick={this.handleModalOpen} style={{cursor:'pointer'}}>
                    <div>
                        <p className="textChangePass" >Change Password</p>
                    </div>
                </Paper>
                <Hamburger page='PROFILE' user={this.state.user} />

                <div hidden={!this.state.modalChangpass}>
                    <div className="modal-background">
                        <div className="modal-cardChangePass">
                            <div>
                                <Font style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }} >Change Password</Font>
                                <Font style={{ display: 'flex', flexDirection: 'column', paddingTop: 25, paddingLeft: 20 }} >Current Password</Font>
                            </div>
                            <div style={{ paddingTop: 10, paddingLeft: 20 }}>
                                <input type="password" style={{ fontSize: 24 }} onChange={txt => this.setState({ pass: txt.target.value })} />
                            </div>
                            <div>
                                <Font style={{ display: 'flex', flexDirection: 'column', paddingTop: 20, paddingLeft: 20 }} >New Password</Font>
                            </div>
                            <div style={{ paddingTop: 10, paddingLeft: 20 }}>
                                <input type="password" style={{ fontSize: 24 }} onChange={txt => this.setState({ newPass: txt.target.value })} />
                            </div>
                            <div>
                                <Font style={{ display: 'flex', flexDirection: 'column', paddingTop: 20, paddingLeft: 20 }} >Confirm Password</Font>
                            </div>
                            <div style={{ paddingTop: 10, paddingLeft: 20 }}>
                                <input type="password" style={{ fontSize: 24 }} onChange={txt => this.setState({ confirmNewPass: txt.target.value })} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }} >
                                <div style={{ paddingLeft: 10, paddingTop: 50 }}>
                                    <ButtonCancel style={{ fontSize: 20 }} onClick={this.handleModalClose}>Cancel</ButtonCancel>
                                </div>
                                <div style={{ paddingLeft: 50, paddingTop: 50 }}>
                                    <ButtonOK style={{ fontSize: 20 }} onClick={this.onOk}>OK</ButtonOK>
                                </div>
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
        editAccount: (account) => dispatch(editAccount(account)),
    };
};

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
        accountList: state.accountReducer.accountList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);