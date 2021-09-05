import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import Paper from '@material-ui/core/Paper';
import './Style.css'
import { returnor, recvOr, packor } from '../pic'

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';

const Font = styled.div`
  && {
    color: #000000;
    font-size: 30px;
    width: 250px;
    font-weight: lighter;
  }
`

const Fontt = styled.div`
  && {
    color: #000000;
    font-size: 30px;
    width: 200px;
    font-weight: lighter;
  }
`

const Font2 = styled.div`
  && {
    color: #000000;
    font-size: 36px;
    font-weight: bold;
  }
`

const Font3 = styled.div`
  && {
    color: #000000;
    font-size: 48px;
    font-weight: bold;
  }
`


class ConReceiving extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
        };
    }

    onCheck = (item) => {
        history.push({
            pathname: '/orderConfirm/receiving/billOrder2',
            state: {
                bill: item,
            },
        })
    }

    render() {
        return (
            <div className="bg">
                <Paper className='OrConTopic' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Font3>Receiving Order</Font3>
                    </div>
                </Paper>

                
                <Paper className='OrConTable' style={{display:'flex',flexDirection:'row'}}>
                    <p className="txtOrConTable1" style={{textAlign:'center'}}>PO No.</p>
                    <p className="txtOrConTable1" style={{textAlign:'center'}}>Date</p>
                    <p className="txtOrConTable1" style={{textAlign:'center'}}>Officer In Charge</p>
                    <p className="txtOrConTable1" style={{textAlign:'center'}}>Contact Number</p>
                    
                    
                </Paper>
                <Hamburger page='RECEIVING ORDER' user={this.state.user} />
                <div style={{ paddingTop: 230 ,paddingLeft:'1%'}}>
                    {this.props.billList.map((item) => {
                        if (item.managerConfirm && !item.confirm && (item.type === 'PO')) {
                            return (
                                <div style={{paddingTop: 20}} onClick={() => this.onCheck(item)}>
                                    <Paper className='paperRcvOd' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' ,cursor:'pointer'}}>
                                        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                                            <Font style={{textAlign:'center',width:'25%'}}>{item.info.reNum}</Font>
                                            <Font style={{textAlign:'center',width:'25%'}}>{item.info.date}</Font>
                                            <Font style={{textAlign:'center',width:'25%'}}>{item.info.contactName}</Font>
                                            <Font style={{textAlign:'center',width:'25%'}}>{item.info.telCon}</Font>
                                        </div>
                                    </Paper>
                                </div>
                            );
                        }
                    })}
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
        billList: state.billReducer.billList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConReceiving);
