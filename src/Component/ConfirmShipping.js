import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'
import { search, Waiting, Suc, Reject, newSrch } from '../pic'

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Font = styled.div`
  && {
    color: #000000;
    font-size: 24px;
  }
`


const ImageSuc = styled.img.attrs({
    src: Suc
})`
    width: 11%;
    height: 75%;

`

const ImageRej = styled.img.attrs({
    src: Reject
})`
width: 11%;
height: 75%;

`

const ImageWait = styled.img.attrs({
    src: Waiting
})`
width: 11%;
height: 75%;

`

class ShippingConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Startdate: new Date(),
            Enddate: new Date(),
            email: null,
            pass: null,
            user: this.props.userList[this.props.userList.length - 1],
        };
    }


    onChangeStart = Startdate => {
        this.setState({ Startdate: Startdate })
    }

    onChangeEnd = Enddate => {
        this.setState({ Enddate: Enddate })
    }


    render() {
        return (
            <div className="bg">
                <Paper className='conShipTop' style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div style={{ paddingLeft: 50, display: 'flex', flexDirection: 'column' }}>
                        <a1 style={{ fontSize: 26, fontWeight: 'lighter' }}>MR No.</a1>
                        <input type="text" style={{ width: 200, fontSize: 18, borderWidth: 0 }}></input>
                    </div>
                    <div style={{ paddingLeft: 50, display: 'flex', flexDirection: 'column' }}>
                        <a1 style={{ fontSize: 26, fontWeight: 'lighter' }}>Duration Date</a1>
                        <DatePicker style={{ width: "100%" }} selected={this.state.Startdate} onChange={this.onChangeStart} dateFormat='dd/MM/yyy' />
                    </div>
                    <div style={{ paddingLeft: 30, paddingTop: 30, display: 'flex', flexDirection: 'column' }}>
                        <a1 style={{ fontSize: 26, fontWeight: 'lighter', paddingTop: 10 }}> - </a1>
                    </div>
                    <div style={{ paddingLeft: 30, paddingTop: 37, display: 'flex', flexDirection: 'column' }}>
                        <DatePicker style={{ width: "100%" }} selected={this.state.Enddate} onChange={this.onChangeEnd} dateFormat='dd/MM/yyy' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' , paddingTop: 15, paddingLeft: 20}}>
                        <img
                            style={{ width: "20%" }}
                            src={newSrch}
                            onClick={this.onSearch}></img>
                    </div>
                </Paper>
                <Paper className='StatusShip'>
                    <div style={{ display: 'flex', flexDirection: 'row', paddingTop: "2%", paddingLeft: "2%" }}>
                        <ImageSuc />
                        <Font style={{ paddingLeft: "2%", paddingTop: "1.7%", paddingRight: "2%" }}>Success</Font>
                        <ImageWait />
                        <Font style={{ paddingLeft: "2%", paddingTop: "1.7%", paddingRight: "2%" }}>Waiting</Font>
                        <ImageRej />
                        <Font style={{ paddingLeft: "2%", paddingTop: "1.7%" }}>Reject</Font>
                    </div>
                </Paper>
                <Hamburger page='CONFIRMING SHIPPING' user={this.state.user} />

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

export default connect(mapStateToProps, mapDispatchToProps)(ShippingConfirm);

