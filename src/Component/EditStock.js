import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import {  editstock,editpro,editshelf } from '../pic'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

import Hamburger from './Hamburger'


class EditStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userList[this.props.userList.length - 1],
    };
  }

  render() {
    return (
      <div className="bg">
        <Hamburger page='EDIT STOCK' user={this.state.user} />
        <div style={{ display: 'flex', flexDirection: 'row',paddingTop:'19%',justifyContent:'center'}}>
          <Paper className="paperVs" style={{borderRadius:"10%"}} onClick={() => history.push('/stock/editStock/editshelf')}>
            <div style={{alignContent:'center',marginBottom:'100%',justifyContent:'center'}}>
              <img className="imVs" src={editshelf}  />
              <p className="textSto1">Edit Shelf</p>
            </div>
          </Paper>

          <Paper className="paperVs" style={{borderRadius:"10%"}} onClick={() => history.push('/stock/editStock/editproductshelf')}>
            <div style={{alignContent:'center',marginBottom:'100%'}}>
              <img className="imVs" src={editpro} />
              <p className="textSto2">Edit Product</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditStock);

