import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import './Style.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styled, { css } from 'styled-components'


const ButtonCancel = styled.button`
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

class Picking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            date: new Date(),
            customerName: '',
            address: '',
            telCus: '',
        };
    }

    onNext = () => {
        if ((this.state.customerName !== '') && (this.state.address !== '') && (this.state.telCus !== '')) {
            let date = this.state.date
            let year = date.getFullYear().toString().substr(2, 3)
            let mount = date.getMonth().toString()
            if (date.getMonth().toString().length === 1) {
                mount = '0' + (date.getMonth() + 1).toString()
            }
            let day = date.getDate().toString()
            if (date.getDate().toString().length === 1) {
                day = '0' + date.getDate().toString()
            }
            let hour = date.getHours().toString()
            if (date.getHours().toString().length === 1) {
                hour = '0' + date.getHours().toString()
            }
            let min = date.getMinutes().toString()
            if (date.getMinutes().toString().length === 1) {
                min = '0' + date.getMinutes().toString()
            }
            let sec = date.getSeconds().toString()
            if (date.getSeconds().toString().length === 1) {
                sec = '0' + date.getSeconds().toString()
            }

            const info = {
                reqName: this.state.user.firstnameTH+' '+this.state.user.lastnameTH,
                telReq: this.state.user.tel,
                customerName: this.state.customerName,
                address: this.state.address,
                telCus: this.state.telCus,
                date: (this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear()).toString(),
                reNum: 'MR' + year + mount + day + hour + min + sec,
            }
            history.push({
                pathname: '/picking/pickingChart',
                state: { info: info },
            })
        } else {
            alert('Please complete all infomations.')
        }
    }

    render() {
        return (
            <div className="bg">
                <Hamburger page='PICKING' user={this.state.user} />
                <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '0.25%', paddingTop: '9%', justifyContent: 'center' }}>
                    <Paper className="paperOrdering">
                        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '7%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '6.2%', paddingLeft: '7%' }}>
                                <p className="textOr" style={{ paddingRight: '49%' }}>Date</p>
                                <input type="text" style={{ fontSize: 24, }} value={this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear()} readOnly />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '6.2%', paddingLeft: '20.2%' }}>
                                <p className="textOr" style={{ paddingRight: '0%', paddingTop: '1%' }}>Customer</p>
                                <p className="textOr" style={{ paddingRight: '10%', paddingLeft: '2%', paddingTop: '1%' }}>Name</p>
                                <input type="text" style={{ fontSize: 24, }} onChange={txt => this.setState({ customerName: txt.target.value })} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '7%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '3%', paddingLeft: '7%' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', }}>
                                    <p className="textOr" style={{ paddingRight: '0%', paddingTop: '1%' }}>Request</p>
                                    <p className="textOr" style={{ paddingRight: '10%', paddingLeft: '2%', paddingTop: '1%' }}>Name</p>
                                    <input type="text" style={{ fontSize: 24, }} value={this.state.user.firstnameTH+' '+this.state.user.lastnameTH} readOnly />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '10%', }}>
                                    <p className="textOr" style={{ paddingRight: '41%' }}>Tel.</p>
                                    <input type="text" style={{ fontSize: 24, }} value={this.state.user.tel} readOnly />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '3%', paddingLeft: '12.7%' }}>
                                <p className="textOr" style={{ paddingRight: '37.1%' }}>Address</p>
                                <div style={{ display: 'flex', flexDirection: 'row', }}>
                                    <textarea type="text" style={{ fontSize: 24, height: 150, width: 335,resize:'none' }} onChange={txt => this.setState({ address: txt.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '53.5%', paddingTop: '3%', paddingBottom: '1%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', }}>
                                <p className="textOr" style={{ paddingRight: '0%', paddingTop: '1%' }}>Customer</p>
                                <p className="textOr" style={{ paddingRight: '18.2%', paddingLeft: '2%', paddingTop: '1%' }}>Tel.</p>
                                <input type="text" style={{ fontSize: 24, }} onChange={txt => this.setState({ telCus: txt.target.value })} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

                            <div style={{ paddingLeft: 0, paddingTop: 25 }}>
                                <ButtonCancel style={{ fontSize: 25, width: 184, height: 52 }} onClick={() => history.push('/home')}>
                                    Cancel
                                </ButtonCancel>
                            </div>
                            <div style={{ paddingLeft: 50, paddingTop: 25 }}>
                                <ButtonNext style={{ fontSize: 25, width: 184, height: 52 }} onClick={this.onNext}>
                                    Next
                            </ButtonNext>
                            </div>
                        </div>
                    </Paper>
                </div>

            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
        accountList: state.accountReducer.accountList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Picking);

