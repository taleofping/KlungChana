import React, { Component } from 'react'
import history from '../history'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'
import styled, { css } from 'styled-components'
import { addAccount, clearAccount } from '../actions/accountAction'
import { connect } from 'react-redux';
import { search, DG } from '../pic'
import firestore from '../firebase/firestore'

import './Modal.css';
import { AiOutlineUserAdd } from "react-icons/ai";

const Font = styled.div`
  && {
    color: #000000;
    font-size: 24px;
  }
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

class MemberManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            accounts: this.props.accountList,
            employeeID: '',
            idCard: '',
            firstnameEN: '',
            lastnameEN: '',
            tel: '',
        };
    }

    handlemodalDeleteUserClose = (e) => {
        this.setState({ modalDeleteUser: false });
    };


    handlemodalDeleteUserOpen = () => {
        this.setState({ modalDeleteUser: true });
    };

    onSearch = () => {
        if (this.state.employeeID === '' && this.state.idCard === '' && this.state.firstnameEN === '' && this.state.lastnameEN === '') {
            this.setState({ accounts: this.props.accountList })
        } else {
            this.setState({
                accounts: this.state.accounts.filter(
                    (item) => ((item.employeeID === this.state.employeeID) ||
                        (item.firstnameEN === this.state.firstnameEN) ||
                        (item.idCard === this.state.idCard) ||
                        (item.lastnameEN === this.state.lastnameEN))
                )
            })
        }
        this.setState({
            employeeID: '',
            idCard: '',
            firstnameEN: '',
            lastnameEN: '',
        })
    }

    onMember = (item) => {
        if (this.state.user.departmentID >= 6) {
            history.push({
                pathname: '/memberManage/editMember',
                state: { member: item },
            })
        } else {
            alert('Access deny.')
        }
    }

    render() {
        return (
            <div className="bg">

                <Paper className="paperSearchMB" >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'lighter' }}>Employee ID</a1>
                        <input type="text" style={{ fontSize: 24, borderWidth: 0 }} value={this.state.employeeID} onChange={txt => this.setState({ employeeID: txt.target.value })}></input>
                        <div style={{ paddingTop: 10 }}>
                            <button className="buttonAddMB" style={{ fontSize: 20, justifyContent: 'center' }} onClick={() => {
                                if (this.state.user.departmentID >= 6) {
                                    history.push('/memberManage/addMember')
                                } else {
                                    alert('Access deny.')
                                }
                            }
                            }> <AiOutlineUserAdd size={40} /> Add Member</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', margin: "0.5%", paddingTop: "1%", justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'lighter' }}>or</a1>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'lighter' }}>ID card number</a1>
                        <input type="text" style={{ fontSize: 24, borderWidth: 0 }} value={this.state.idCard} onChange={txt => this.setState({ idCard: txt.target.value })}></input>
                    </div>
                    <div style={{ display: 'flex', margin: "0.5%", paddingTop: "1%", justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'lighter' }}>or</a1>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'lighter' }}>First Name</a1>
                        <input type="text" style={{ fontSize: 24, borderWidth: 0 }} value={this.state.firstnameEN} onChange={txt => this.setState({ firstnameEN: txt.target.value })}></input>
                    </div>
                    <div style={{ display: 'flex', margin: "0.5%", paddingTop: "1%", justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'lighter' }}>or</a1>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'lighter' }}>Last Name</a1>
                        <input type="text" style={{ fontSize: 24, borderWidth: 0 }} value={this.state.lastnameEN} onChange={txt => this.setState({ lastnameEN: txt.target.value })}></input>
                    </div>
                    <img
                        style={{ justifyContent: 'flex-end', width: "10%", cursor: 'pointer' }}
                        src={search}
                        onClick={this.onSearch}></img>
                </Paper>

                <Hamburger page='MEMBER MANAGEMENT' user={this.state.user} />
                <div style={{ paddingTop: 250 }}>
                    {this.state.accounts.map((item) => {

                        return (
                            <div style={{ marginLeft: '12%' }}>
                                <Paper className="paper" style={{ display: 'flex', flexDirection: 'row', height: '250px', margin: '1%', width: '86%', borderRadius: '15px', cursor: 'pointer' }}
                                    onClick={() => this.onMember(item)} >
                                    <img style={{ width: '170px', height: '170px', alignSelf: 'center', borderRadius: '50%', marginLeft: '10%' }} src={item.pic} />
                                    <div style={{ marginLeft: '10%', alignSelf: 'center' }}>
                                        <p style={{ fontSize: '24px', fontWeight: 'normal' }}>Employee ID : {item.employeeID}</p>
                                        <p style={{ fontSize: '24px', fontWeight: 'normal' }}>Department : {item.department}</p>
                                        <p style={{ fontSize: '24px', fontWeight: 'normal' }}>Name : {item.firstnameEN} {item.lastnameEN}</p>
                                        <p style={{ fontSize: '24px', fontWeight: 'normal' }}>Tel : {item.tel}</p>
                                    </div>
                                </Paper>
                            </div>
                        );
                    })}
                </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberManage);
