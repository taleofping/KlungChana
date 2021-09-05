import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import { counting, viewstock, editstock } from '../pic'
import Paper from '@material-ui/core/Paper';
import { search, shelf } from '../pic'

import styled, { css } from 'styled-components'
import { connect } from 'react-redux';

const Font = styled.div`
  && {
    color: #000000;
    font-size: 24px;
  }
`

const ButtonReport = styled.button`
    background: #EF3F3E;
    border-radius: 10px;
    border: 2px;
    color: #000000;
`
const ButtonInput = styled.button`
  background: #6E0D0D;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
  margin: 0 1em;
  width:20%
  padding: 0.5em 1.5em;
  `
const ButtonOk = styled.button`
  background: #ef3f3e;
  border: 2px;
  color: #ffffff;
  width: 125px;
  height: 52px;
  border-radius: 12px;
  margin:5%;
  
`

const ButtonCancel = styled.button`
  background: #929990;
  border: 2px;
  color: #ffffff;
  width: 125px;
  height: 52px;
  border-radius: 12px;
  margin: 5%;
  
`

class CountShelf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            shelf: this.props.location.state.shelf,
            modalCounting: false,
            counting:'',
            product:{},

        };
    }

    openModalCounting = (item) => {
        this.setState({
            modalCounting: true,
            product:item,
            counting:''
        });
    };

    closeModalCounting = (e) => {
        const currentClass = e.target.className;
        if (currentClass == 'modal-cardforget') {
            return;
        }
        const product = this.state.product
        product.counting = this.state.counting
        this.setState({
            modalCounting: false,
        });
    };

    render() {
        return (
            <div className="bg">
                <Hamburger page={this.state.shelf} user={this.state.user} />
                <div className="paper" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '15%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <a1 className='txtTopCountShelf' style={{ fontSize: 48, fontWeight: 'bold' }}>Shelf</a1>
                        <a1 className='txtTopCountShelf' style={{ fontSize: 48, fontWeight: 'bold' }}>{this.state.shelf}</a1>
                    </div>


                </div>
                <div className="paperTopProduct" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '9%', borderRadius: '25px' }}>
                    <p className='txtProTopShelf' style={{}}>Product</p>
                    <p className='txtProTopShelf' style={{}}>Product ID</p>
                    <p className='txtProTopShelf' style={{}}>Product Name</p>
                    <p className='txtProTopShelf' style={{}}>Type</p>
                    <p className='txtProTopShelf' style={{}}>QTY</p>
                    <p className='txtProTopShelf' style={{}}>Unit</p>
                </div>
                <scroll>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',height:'650px' ,overflow: 'auto' }}>
                        {this.props.productList.map((item) => {
                            if (item.shelf === this.state.shelf) {
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', width: '97%' }}>
                                        <div className='txtCountShelf'>
                                            <img src={item.pic} style={{ width: '100px', height: '100px' }}></img>
                                        </div>
                                        <p className='txtCountShelf' style={{}}>{item.productID}</p>
                                        <p className='txtCountShelf' style={{}}>{item.productName}</p>
                                        <p className='txtCountShelf' style={{}}>{item.type}</p>
                                        <p className='txtCountShelf' style={{}}>{item.qty}</p>
                                        <p className='txtCountShelf' style={{}}>{item.unit}</p>

                                    </div>
                                );
                            }

                        })}
                    </div>
                </scroll>

                <div hidden={!this.state.modalCounting}>
                    <div className="modal-background">
                        <div className="modal-cardCounting">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Font style={{ fontSize: 30, paddingTop: 20 }}>Please input count</Font>
                            </div>
                            <div style = {{display: 'flex', justifyContent: 'center', paddingTop: 40}}>
                                <input type="number" style={{ fontSize: 24 ,textAlign:'center'}} value={this.state.counting} onChange={txt => this.setState({ counting: txt.target.value })}></input>
                            </div>
                            <div style={{ display: 'flex', paddingTop: 20, justifyContent: 'space-around' }}>
                                <ButtonCancel style={{ fontSize: 20 }} onClick={this.closeModalCounting}>Cancel</ButtonCancel>
                                <ButtonOk style={{ fontSize: 20 }} onClick={this.closeModalCounting}>OK</ButtonOk>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ paddingLeft: '1%', paddingTop: '1%', alignItems: 'self-end' }}>
                    <ButtonReport style={{ fontSize: 25, width: 184, height: 52, marginBottom: '2%', marginLeft: '85%' }} onClick={() => {
                        
                        history.push({
                            pathname: '/stock/countingStock/countShelf/countReport',
                            state: { shelf: this.state.shelf },})}}>
                        Report
                    </ButtonReport>

                </div>
            </div>

        )
    }
};


const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
        accountList: state.accountReducer.accountList,
        productList: state.productReducer.productList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountShelf);
