import React, { Component } from 'react'
import history from '../history'
import { Base64 } from 'js-base64';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

import firestore from "../firebase/firestore"
import storage from '../firebase/storage'

import { connect } from 'react-redux';

import { addAccount } from '../actions/accountAction'

import './Style.css'

import Paper from '@material-ui/core/Paper';
import Hamburger from './Hamburger'

class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeID: '',
            department: 'Select Department',
            departmentID: '',
            firstnameTH: '',
            lastnameTH: '',
            firstnameEN: '',
            lastnameEN: '',
            idCard: '',
            birthDate: '',
            tel: '',
            email: '',
            address: '',
            user: this.props.userList[this.props.userList.length - 1],
            pic: null,
        };
    }

    onAdd = () => {
        let canAdd = true
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if ((this.state.employeeID !== '') && (this.state.department !== 'Select Department') && (this.state.firstnameTH !== '') && (this.state.lastnameTH !== '') && (this.state.firstnameEN !== '') && (this.state.lastnameEN !== '') && (this.state.idCard !== '') && (this.state.birthDate !== '') && (this.state.tel !== '') && (this.state.email !== '') && (this.state.address !== '')) {
            this.props.accountList.forEach((item) => {
                if ((item.employeeID === this.state.employeeID) || (item.email === this.state.email)) {
                    canAdd = false
                }
            })
            if(re.test(this.state.email)===false){
                alert("Invalid Email")
            }
            if (!canAdd) {
                alert('Employee ID or email is already have.')
            } else {
                if (this.state.pic !== null) {
                    storage.uploadProfilePic(this.state.pic, this.state.email, this.uploadSuccess, this.uploadReject)
                } else {
                    alert("Please select a profile image")
                }
            }

        }else {
            alert('Please complete all infomations.')
        }

    }

    addSuccess = (doc) => {
        console.log(doc.id)
        history.push('/memberManage')
    }

    addReject = (error) => {
        console.log(error)
    }

    uploadSuccess = (uri) => {
        console.log(uri)
        this.setState({ pic: uri })
        const user = {
            employeeID: this.state.employeeID,
            department: this.state.department,
            departmentID: this.state.departmentID,
            firstnameTH: this.state.firstnameTH,
            lastnameTH: this.state.lastnameTH,
            firstnameEN: this.state.firstnameEN,
            lastnameEN: this.state.lastnameEN,
            idCard: this.state.idCard,
            birthDate: this.state.birthDate,
            tel: this.state.tel,
            email: this.state.email,
            address: this.state.address,
            pass: Base64.encode(this.state.email),
            pic: uri
        }
        firestore.addUser(user, this.addSuccess, this.addReject)
        this.props.addAccount(user)

    }

    uploadReject = (error) => {
        console.log(error)
    }

    onImageChange = (event) => {
        if (this.state.email === null || this.state.email === '') {
            alert("Please input Email before select a profile image")
        } else {
            if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.setState({ pic: e.target.result });
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }


    render() {
        return (
            <div className="bg">
                <Paper className="paperPhoto" >
                    <div style={{ alignContent: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <img style={{ width: '230px', height: '230px', alignSelf: 'center' }} src={this.state.pic} />
                        <input type="file" onChange={this.onImageChange} style={{ width: '105px', alignSelf: 'center' }} />
                    </div>
                </Paper>
                <Paper className="paperAddMB" style={{ cursor: 'pointer' }} onClick={this.onAdd}>
                    <div >
                        <p className="textAddMB" >Add</p>
                    </div>
                </Paper>
                <Paper className="paperCancelMB" style={{ cursor: 'pointer' }} onClick={() => history.push('/memberManage')}>
                    <div>
                        <p className="textCancelMB" >Cancel</p>
                    </div>
                </Paper>
                <Paper className="paperDetail" >
                    <div><p className="textP1" style={{ width: '156px', height: '39px', left: '7%', top: '2%' }} >Employee ID</p></div>
                    <div><input className="editP1" style={{ top: '7%' }} value={this.state.employeeID} onChange={txt => this.setState({ employeeID: txt.target.value })}></input></div>
                    <div><p className="textP1" style={{ width: '171px', height: '39px', left: '7%', top: '12%' }}>Firstname(TH)</p></div>
                    <div><input className="editP1" style={{ top: '17%' }} onChange={txt => this.setState({ firstnameTH: txt.target.value })}></input></div>
                    <div><p className="textP1" style={{ width: '171px', height: '39px', left: '7%', top: '22%' }}>Firstname(EN)</p></div>
                    <div><input className="editP1" style={{ top: '27%' }} onChange={txt => this.setState({ firstnameEN: txt.target.value })}></input></div>
                    <div><p className="textP1" style={{ width: '139px', height: '39px', left: '7%', top: '32%' }}>ID card No.</p></div>
                    <div><input className="editP1" style={{ top: '37%' }} onChange={txt => this.setState({ idCard: txt.target.value })}></input></div>
                    <div><p className="textP1" style={{ width: '39px', height: '39px', left: '7%', top: '42%' }}>Tel.</p></div>
                    <div><input className="editP1" style={{ top: '47%' }} onChange={txt => this.setState({ tel: txt.target.value })}></input></div>
                    <div><p className="textP1" style={{ width: '207px', height: '39px', left: '7%', top: '52%' }}>Current Address</p></div>
                    <div><textarea className="editP2" style={{ top: '57%' ,resize:'none'}} onChange={txt => this.setState({ address: txt.target.value })}></textarea></div>
                    <div><p className="textP1" style={{ width: '150px', height: '39px', left: '49.5%', top: '2%' }}>Department</p></div>
                    <div style={{ paddingTop: '8%' }} className="inputP4">
                        <MDBDropdown dropdown>
                            <MDBDropdownToggle caret color="light" style={{ width: 246 }}>
                                {this.state.department}
                            </MDBDropdownToggle>
                            <MDBDropdownMenu basic>
                                <MDBDropdownItem onClick={() => this.setState({
                                    department: 'Admin',
                                    departmentID: 7
                                })}>Admin</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => this.setState({
                                    department: 'Manager',
                                    departmentID: 6
                                })}>Manager</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => this.setState({
                                    department: 'StockChecker',
                                    departmentID: 5
                                })}>StockChecker</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => this.setState({
                                    department: 'Orderer',
                                    departmentID: 4
                                })}>Orderer</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => this.setState({
                                    department: 'Picker',
                                    departmentID: 3
                                })}>Picker</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => this.setState({
                                    department: 'OrderConfirm',
                                    departmentID: 2
                                })}>OrderConfirm</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </div>
                    <div><p className="textP1" style={{ width: '170px', height: '39px', left: '49.5%', top: '12%' }}>Lastname(TH)</p></div>
                    <div><input className="editP3" style={{ top: '17%' }} onChange={txt => this.setState({ lastnameTH: txt.target.value })}></input></div>
                    <div><p className="textP1" style={{ width: '169px', height: '39px', left: '49.5%', top: '22%' }}>Lastname(EN)</p></div>
                    <div><input className="editP3" style={{ top: '27%' }} onChange={txt => this.setState({ lastnameEN: txt.target.value })}></input></div>
                    <div><p className="textP1" style={{ width: '161px', height: '39px', left: '49.5%', top: '32%' }}>Date of Birth</p></div>
                    <div><input className="editP3" style={{ top: '37%' }} onChange={txt => this.setState({ birthDate: txt.target.value })}></input></div>
                    <div><p className="textP1" style={{ width: '75px', height: '39px', left: '49.5%', top: '42%' }}>E-mail</p></div>
                    <div><input className="editP3" style={{ top: '47%' }} onChange={txt => this.setState({ email: txt.target.value })}></input></div>
                </Paper>


                <Hamburger page='ADD MEMBER' user={this.state.user} />

            </div>


        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAccount: (account) => dispatch(addAccount(account)),
    };
};

const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
        accountList: state.accountReducer.accountList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
