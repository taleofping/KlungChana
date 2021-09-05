import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'
import { returnor, recvOr, packor } from '../pic'

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';

class OrderConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userList[this.props.userList.length - 1],
    };
  }

  render() {
    return (
      <div className="bg">
        <Hamburger page='ORDER CONFIRMATION' user={this.state.user} />
        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '19%', justifyContent: 'center' }}>

          <Paper className='paperVs' style={{ borderRadius: "10%" }} onClick={() => history.push('/orderConfirm/receiving')}>
            <div style={{ alignContent: 'center', marginBottom: '100%', justifyContent: 'center' }}>
              <img className="imOrRecv" src={recvOr} />
              <div style={{paddingTop:"5%"}}>
                <p className="txtOrRecv1">Receiving</p>
                <p className="txtOrCon2">Order</p>
              </div>
            </div>
          </Paper>
          <Paper className='paperVs' style={{ borderRadius: "10%" }} onClick={() => history.push('/orderConfirm/packing')}>
            <div style={{ alignContent: 'center', marginBottom: '100%', justifyContent: 'center' }}>
              <img className="imOrRecv" src={packor} />
              <div style={{paddingTop:"5%"}}>
                <p className="txtOrRecv1">Picking</p>
                <p className="txtOrCon2">Order</p>
              </div>
            </div>
          </Paper>
          <Paper className='paperVs' style={{ borderRadius: "10%" }} onClick={() => history.push('/orderConfirm/returning')}>
            <div style={{ alignContent: 'center', marginBottom: '100%', justifyContent: 'center' }}>
              <img className="imOrRecv" src={returnor} />
              <div style={{paddingTop:"5%"}}>
                <p className="txtOrRecv1">Returning</p>
                <p className="txtOrCon2">Order</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm);
