import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import Hamburger from './Hamburger'

import { connect } from 'react-redux';
import { purple } from '@material-ui/core/colors';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import { search, shelf } from '../pic'
import Paper from '@material-ui/core/Paper';

class ViewStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            shelfList: this.props.shelfList,
            shelf: '',
        };
    }

    onSearch = () => {
        
    }

    render() {
        return (
            <div className="bg">
                <Hamburger page='VIEW STOCK' user={this.state.user} />
                <div className="paper" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '15%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <a1 style={{ fontSize: 24, fontWeight: 'bold' }}>Shelf ID</a1>
                        <input type="text" style={{ fontSize: 24 }} value={this.state.shelf} onChange={txt => this.setState({ shelf: txt.target.value })} ></input>
                    </div>
                    <img
                        style={{ justifyContent: 'flex-end', width: "10%", cursor: 'pointer', marginLeft: '15%' }}
                        src={search} />

                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: "15%", marginTop: '2%', marginBottom: '2%', }}>
                    <a1 style={{ fontSize: 36, fontWeight: 'bold', marginLeft: "5%" }}>Please select Shelf</a1>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.props.shelfList.map((item) => {
                        return (
                            <Paper className="paperShelf" style={{ borderRadius: "10%", margin: '1.5%' }} onClick={() => history.push({
                                pathname: '/stock/viewStock/shelf',
                                state: { shelf: item.shelfID },
                            })}>
                                <div style={{ alignItems: 'center', justifyItems: 'center' }}>
                                    <img className="imViewStock" src={shelf} />
                                    <p className="textViewStock">{item.shelfID}</p>
                                </div>
                            </Paper>
                        );
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
        shelfList: state.shelfReducer.shelfList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStock);
