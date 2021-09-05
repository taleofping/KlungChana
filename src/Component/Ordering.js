import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

class Ordering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            supplier: '',
            address: '',
            telSup: '',
            date: new Date(),
        };
    }

    onNext = () => {
        if ((this.state.supplier !== '') && (this.state.address !== '') && (this.state.telSup !== '')) {
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
                console.log('wi')
                sec = '0' + date.getSeconds().toString()
            }
            const info = {
                supplier: this.state.supplier,
                address: this.state.address,
                telSup: this.state.telSup,
                date: (this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear()).toString(),
                contactName: this.state.user.firstnameTH+' '+this.state.user.lastnameTH,
                telCon: this.state.user.tel,
                reNum: 'PO' + year + mount + day + hour + min + sec,
            }
            history.push({
                pathname: '/Ordering/orderingChart',
                state: { info: info },
            })
        } else {
            alert('Please complete all infomations.')
        }
    }


    render() {
        return (
            <div className="bg">
                <Hamburger page='ORDERING' user={this.state.user} />
                <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '0.25%', paddingTop: '9%', justifyContent: 'center' }}>
                    <Paper className="paperOrdering">
                        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '7%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '6.2%', paddingLeft: '12.5%' }}>
                                <p className="textOr" style={{ paddingRight: '5%', paddingTop: '1%' }}>Supplier</p>
                                <input type="text" style={{ fontSize: 24, }} onChange={txt => this.setState({ supplier: txt.target.value })}></input>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '6.2%', paddingLeft: '12.5%' }}>
                                <p className="textOr" style={{ paddingRight: '42%', paddingTop: '1%' }}>Date</p>
                                <input type="text" style={{ fontSize: 24, }} value={this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear()} readOnly/>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '7%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '3%', paddingLeft: '12.5%' }}>
                                <p className="textOr" style={{ paddingRight: '5%', paddingTop: '1%' }}>Address</p>
                                <textarea type="text" style={{ fontSize: 24, height: 150, width: 355,resize:'none' }} onChange={txt => this.setState({ address: txt.target.value })}></textarea>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '3%', paddingLeft: '11.4%' }} >
                                <div style={{ display: 'flex', flexDirection: 'row', }}>
                                    <p className="textOr" style={{ paddingRight: '0%', paddingTop: '1%' }}>Contact</p>
                                    <p className="textOr" style={{ paddingRight: '5%', paddingLeft: '2%', paddingTop: '1%' }}>Name</p>
                                    <input type="text" style={{ fontSize: 24, }} value={this.state.user.firstnameTH+' '+this.state.user.lastnameTH} readOnly/>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '10%', }}>
                                    <p className="textOr" style={{ paddingRight: '35.5%', paddingTop: '1%' }}>Tel.</p>
                                    <input type="text" style={{ fontSize: 24, }} value={this.state.user.tel} readOnly/>
                                </div>
                            </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '7%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '3%', paddingLeft: '12.5%' }}>
                                <p className="textOr" style={{ paddingRight: '25%', paddingTop: '1%' }}>Tel.</p>
                                <input type="text" style={{ fontSize: 24, }} onChange={txt => this.setState({ telSup: txt.target.value })}></input>
                            </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                            <div style={{ paddingLeft: 730, paddingTop: 50 }}>
                                <ButtonCancel style={{ fontSize: 25, width: 184, height: 52 }} onClick={() => history.push('/home')}>
                                    Cancel
                            </ButtonCancel>
                            </div>
                            <div style={{ paddingLeft: 50, paddingTop: 50 }}>
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
        accountList: state.accountReducer.accountList,
        productProfile: state.productProfileReducer.productProfileList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ordering);
