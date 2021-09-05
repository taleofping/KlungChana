import React, { Component } from 'react'
import history from '../history'
import Hamburger from './Hamburger'

import firestore from '../firebase/firestore'
import { search, shelf } from '../pic'

import { addAccount, clearAccount } from '../actions/accountAction'
import { connect } from 'react-redux';

import { formatMoney } from '../formatMoney'
import styled, { css } from 'styled-components'
const ButtonReport = styled.button`
  background: #EF3F3E;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
  margin: 0 1em;
  width:20%
  padding: 0.5em 1.5em;
`
const ButtonCancel = styled.button`
  background: #666666;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
  margin: 0 1em;
  width:20%
  padding: 0.5em 1.5em;
`

class CountingReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            shelf: this.props.location.state.shelf,
            date: null,
            time: null,
        };
    }

    componentDidMount = () => {
        let date = new Date()
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
        this.setState({ date: day + '/' + mount + '/' + year })
        this.setState({ time: hour + ':' + min + ':' + sec })
    }

    render() {

        return (
            <div className="bg">
                <Hamburger page={'REPORT COUNTING'} user={this.state.user} />
                <div className="paper" style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center', height: '218px', margin: '1%', borderRadius: '15px'
                }}>
                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center', margin: '1%'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Employee ID</a1>
                            <input type="text" style={{ fontSize: 24, marginLeft: '20px', marginRight: '20px', width: '250px' }} value={this.state.user.employeeID} readOnly></input>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Name</a1>
                            <input type="text" style={{ fontSize: 24, marginLeft: '20px', marginRight: '20px', width: '400px' }} value={this.state.user.firstnameEN + ' ' + this.state.user.lastnameEN} readOnly></input>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Department</a1>
                            <input type="text" style={{ fontSize: 24, marginLeft: '20px', marginRight: '20px', width: '250px' }} value={this.state.user.department} readOnly></input>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center', margin: '1%'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Location Report</a1>
                            <input type="text" style={{ width: '20px', fontSize: 24, marginLeft: '20px', marginRight: '20px', width: '150px' }} value={this.state.shelf} readOnly></input>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Location Start</a1>
                            <input type="text" style={{ width: '20px', fontSize: 24, marginLeft: '20px', marginRight: '20px', width: '150px' }}></input>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Location End</a1>
                            <input type="text" style={{ fontSize: 24, marginLeft: '20px', marginRight: '20px', width: '150px' }}></input>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Date</a1>
                            <input type="text" style={{ fontSize: 24, marginLeft: '20px', marginRight: '20px', width: '200px' }} value={this.state.date} readOnly></input>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center', margin: '1%', width: '80%'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Supervisor Name</a1>
                            <input type="text" style={{ fontSize: 24, marginLeft: '20px', marginRight: '20px', width: '400px' }}></input>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Time</a1>
                            <input type="text" style={{ fontSize: 24, marginLeft: '20px', width: '150px' }} value={this.state.time} readOnly></input>
                        </div>

                    </div>

                </div>
                <div className="paper" style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', height: '525px', margin: '1%', borderRadius: '15px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <a1 className='txtTopCountShelf' style={{ fontSize: 36, fontWeight: 'bold', marginRight: '2%' }}>Description</a1>
                        <textarea type="text" style={{ fontSize: 24, height: '300px', width: '900px' }} ></textarea>
                    </div>
                </div>
                <div className="paper" style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', height: '205px', margin: '1%', borderRadius: '15px'
                }}>
                    
                    <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyItems: 'right' }}>
                        <div style={{ display: 'flex', marginLeft: '80%',flexDirection:'column' }}>
                            <ButtonReport style={{ width: 200, height: 60,margin:'2%' ,fontSize:'36px'}} onClick={()=>{history.push('/home')}} >Report</ButtonReport>
                            <ButtonCancel style={{ width: 200, height: 60,margin:'2%',fontSize:'36px'}} onClick={()=>{history.push('/home')}}>Cancel</ButtonCancel>
                        </div>
                    </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountingReport);
