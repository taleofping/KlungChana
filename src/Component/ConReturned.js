import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'
import { returnor, recvOr, packor } from '../pic'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';

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

class ConReturned extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      user: this.props.userList[this.props.userList.length - 1],
      des: '',
    };
  }

  onNext = () => {
    if ((this.state.des !== '')) {
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
        reName: this.state.user.firstnameTH+' '+this.state.user.lastnameTH,
        tel: this.state.user.tel,
        des: this.state.des,
        date: (this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear()).toString(),
        reNum: 'RE' + year + mount + day + hour + min + sec,
      }
      history.push({
        pathname: '/returned/returnedChart',
        state: { info: info },
      })
    } else {
      alert('Please complete all infomations.')
    }
  }

  render() {
    return (
      <div className="bg">
        <Hamburger page='RETURNED ORDER' user={this.state.user} />
        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '0.25%', paddingTop: '9%', justifyContent: 'center' }}>
          <Paper className='paperOrdering' >
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '3.5%', paddingLeft: '34%' }}>
              <p className='textOr' style={{ paddingRight: '3%', }}>Date</p>
              <input type="text" style={{ fontSize: 24, }} value={this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear()} readOnly />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '2%', paddingLeft: '34%' }}>
              <p className='textOr' style={{ paddingRight: '3%', paddingTop: '1%' }}>Returned Name</p>
              <input type="text" style={{ fontSize: 24, }} value={this.state.user.firstnameTH+' '+this.state.user.lastnameTH} readOnly />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '2%', paddingLeft: '34%' }}>
              <p className='textOr' style={{ paddingRight: '3%', paddingTop: '1%' }}>Tel.</p>
              <input type="text" style={{ fontSize: 24, }} value={this.state.user.tel} readOnly />
            </div>
            <div style={{ display: 'flex', flexDirection: 'flex-start', paddingTop: '2%', paddingLeft: '34%' }}>
              <p className='textOr' >Description</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'flex-start', paddingLeft: '34%' }}>
              <textarea type="text" max="10" style={{ fontSize: 24, paddingBottom: 100, width: 615,resize:'none' }} value={this.state.des} onChange={txt => this.setState({ des: txt.target.value })} />
            </div>




            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ paddingLeft: 1500, paddingTop: 160 }}>
                <ButtonCancel style={{ fontSize: 25, width: 184, height: 52 }} onClick={() => history.push('/home')}>
                  Cancel
            </ButtonCancel>
              </div>
              <div style={{ paddingLeft: 10, paddingTop: 160 }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConReturned);