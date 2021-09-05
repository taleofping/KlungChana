import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';

import { connect } from 'react-redux';
import { addUser, clearUser } from '../actions/userAction';
import { clearAccount } from '../actions/accountAction'

import { cost, dashboard, historyPic, orderconfirm, ordering, packing, standcount, confirmship, returnor } from '../pic'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
        };
    }

    onLogout = () => {
        this.props.clearAccount()
        this.props.clearUser()
        console.log(this.state.user)
        history.push('/')
    }

    render() {
        return (
            <div className="bg" >
                <Paper className="paperDash" onClick={() => {
                    if (this.state.user.departmentID >= 1) {
                        history.push('/dashboard')
                    } else {
                        alert('Access deny.')
                    }
                }}>
                    <div>
                        <img className="imDash" src={dashboard} />
                        <p className="textDb">DASHBOARD</p>
                    </div>

                </Paper>
                <Paper className="paperSt" onClick={() => {
                    if (this.state.user.departmentID >= 5) {
                        history.push('/stock')
                    } else {
                        alert('Access deny.')
                    }
                }}>
                    <div>
                        <img className="imSt" src={standcount} />
                        <p className="textSt" >
                            STOCK & COUNTING
                        </p>
                    </div>
                </Paper>
                <Paper className="paperIv" onClick={() => {
                    if (this.state.user.departmentID >= 6) {
                        history.push('/inventoryCost')
                    } else {
                        alert('Access deny.')
                    }
                }} >
                    <div>
                        <img className="imIc" src={cost} />
                        <p className="textIc">INVENTORY
                        COST</p>
                    </div>
                </Paper>
                <Paper className="paperOd" onClick={() => {
                    if ((this.state.user.departmentID == 4) || (this.state.user.departmentID == 6)|| (this.state.user.departmentID == 7)) {
                        history.push('/ordering')
                    } else {
                        alert('Access deny.')
                    }
                }}>
                    <div>
                        <img className="imOd" src={ordering} />
                        <p className="textOd">ORDERING</p>
                    </div>
                </Paper>
                <Paper className="paperPk" onClick={() => {
                    if ((this.state.user.departmentID == 3) || (this.state.user.departmentID == 6)|| (this.state.user.departmentID == 7)) {
                        history.push('/picking')
                    } else {
                        alert('Access deny.')
                    }
                }}>
                    <div>
                        <img className="imPk" src={packing} />
                        <p className="textOd">PICKING</p>
                    </div>
                </Paper>
                <Paper className="paperOc" onClick={() => {
                    if ((this.state.user.departmentID == 2) || (this.state.user.departmentID == 6)|| (this.state.user.departmentID == 7)) {
                        history.push('/orderConfirm')
                    } else {
                        alert('Access deny.')
                    }
                }}>
                    <div>
                        <img className="imOc" src={orderconfirm} />
                        <p className="textO">ORDER</p>
                        <p className="textS">CONFIRMATION</p>
                    </div>
                </Paper>
                <Paper className="paperCs" onClick={() => {
                    if ((this.state.user.departmentID == 6)|| (this.state.user.departmentID == 7)) {
                        history.push('/returned')
                    } else {
                        alert('Access deny.')
                    }
                }}>
                    <div>
                        <img className="imCs" src={returnor} />
                        <p className="textCf">RETURN</p>
                        <p className="textSh">ORDER</p>
                    </div>
                </Paper>
                <Paper className="paperHs" onClick={() => {
                    if (this.state.user.departmentID >= 1) {
                        history.push('/history')
                    } else {
                        alert('Access deny.')
                    }
                }}>
                    <div>
                        <img className="imHs" src={historyPic} />
                        <p className="textHs">HISTORY</p>

                    </div>
                </Paper>
                <Hamburger page='HOME' user={this.state.user} />
            </div >

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch(addUser(user)),
        clearAccount: () => dispatch(clearAccount()),
        clearUser: () => dispatch(clearUser()),
    };
};

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
        accountList: state.accountReducer.accountList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
