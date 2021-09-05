import React, { Component } from 'react';
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { FaBell } from "react-icons/fa";
import history from '../history'
import firestore from "../firebase/firestore"

import { connect } from 'react-redux';
import { clearUser } from '../actions/userAction';
import { clearAccount } from '../actions/accountAction';
import { clearProduct } from '../actions/productAction';
import { clearProductProfile } from '../actions/productProfileAction';
import { clearShelf } from '../actions/shelfAction'
import { clearPickOrder } from '../actions/pickOrderAction'
import { clearBill } from '../actions/billAction'
import { clearNotification, editNotification } from '../actions/notificationAction'

import { logoTopBar } from '../pic'

import styled, { css } from 'styled-components'
import './Modal.css';
import { Success } from '../pic';
import Badge from '@material-ui/core/Badge';

const ButtonOK = styled.button`
  background: #ef3f3e;
  border: 2px;
  color: #ffffff;
  width: 121px;
  height: 48px;
  border-radius: 12px;
  margin: 0 1em;
  padding: 0.5em 1.75em;
`
const Font = styled.div`
  && {
    color: #000000;
    font-size: 24px;
  }
`

const Arrow = styled.div`
  top: 0px;
  right: 165px;
  transform: translate(-50%, -100%);
  clip: rect(0px, 18px, 14px, -4px);
  position:fixed;
  ::after {
    content: "";
    display: block;
    width: 14px;
    height: 14px;
    transform: rotate(45deg) translate(6px, 6px);
    box-shadow: rgba(0, 0, 0, 0.44) -1px -1px 1px -1px;
    background: #FFF4F2;
  }
`

class Hamburger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sidebar: false,
      user: this.props.userList[this.props.userList.length - 1],
      modal1: false,
      count: 0,
      notification: this.props.notificationList,
      // data: []

    };


  }

  countNoti = () => {
    var count = 0
    this.props.notificationList.forEach(item => {
      if (item.notiCount === 1) {
        count = count + 1;
        console.log(count)
      }
    })
    this.setState({ count: count });
  }

  reduceCount = (item) => {
    var notiNum = '';
    const notification = item;
    notification.notiCount = 0;
    notiNum = notification.notiNum.reNum;
    this.props.billList.forEach(b => {
      if (b.info.reNum === notiNum) {
        this.onCheck(b);
      }
    })
    firestore.updateNotiByID(notification, this.editSuccess, this.editReject)
    this.props.editNotification(notification)
    this.countNoti();
  }

  dataNoti = () => {
    var data = [];
    this.props.notificationList.forEach(item => {
      data.push(item)
    })
    data.reverse()
    this.setState({ notification: data })
    //console.log(data)
  }

  handleModalClose = (e) => {
    this.setState({ modal: false });
  };

  handleModalOpen = () => {
    this.setState({ modal: true });
  };

  handleModalClose1 = (e) => {
    this.setState({ modal1: false });
  };

  handleModalOpen1 = () => {
    this.setState({ modal1: !this.state.modal1 });
    this.dataNoti()
  };

  showSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  }

  editSuccess = () => {
    console.log('Edit Success')
  }

  editReject = (error) => {
    console.log(error)
  }

  componentDidMount() {
    this.countNoti()
    this.dataNoti()
  }

  onCheck = (item) => {
    if (item.type === "PO") {
      history.push({
        pathname: '/orderConfirm/receiving/billOrder2',
        state: {
          bill: item,
        },
      })
    }
    else if (item.type === "MR") {
      history.push({
        pathname: '/orderConfirm/packing/billPick2',
        state: {
          bill: item,
        },
      })
    }

  }

  // clearNoti = () => {
  //   this.setState({ noti: false });
  // }





  render() {
    return (
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <RiMenuUnfoldLine size={40} onClick={this.showSidebar} />
          </Link>
          <div style={{ cursor: 'pointer' }} onClick={() => history.push('/home')}>
            <img className="iconKCN" src={logoTopBar} />
            <p className="tectKCN">KLUNG CHANA</p>
          </div>
          <span className='title' style={{ paddingLeft: '169px' }} >{this.props.page}</span>

            <Badge badgeContent={this.state.count} color="secondary"><FaBell style={{ color: 'yellow', width: '35px', height: '35px', cursor: 'pointer' }} onClick={this.handleModalOpen1}></FaBell></Badge>
            <div hidden={!this.state.modal1}>
              <div className="modal-tri" style={{ paddingTop: '1%' }}>
                <Arrow />
                {this.state.notification.map((item) => {
                  return (
                    <div >
                      {item.notiCount === 1 && <scroll className="paperNoti" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                          <p className='txtPdInOD' style={{}} onClick={() => {
                            this.reduceCount(item);
                          }}>{item.notificationHead}</p>
                        </div>
                      </scroll>}
                      {item.notiCount === 0 && <scroll className="paperRead" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                          <p className='txtPdInOD' style={{}} >{item.notificationHead}</p>
                        </div>
                      </scroll>}
                    </div>
                  );
                })}

              </div>
            </div>
        

          <div style={{ cursor: 'pointer' }} onClick={() => history.push('/profile')}>
            <span><img style={{ width: '40px', height: '40px', borderRadius: '60%' }} src={this.state.user.pic} /></span>
            <span style={{ color: '#fff' }}>{this.state.user.firstnameEN}</span>
          </div>
        </div>
        <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={this.showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars' style={{ paddingLeft: 18 }}>
                <RiMenuFoldLine size={40} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} onClick={() => {
                    if (item.path === '/') {
                      console.log('logout')
                      this.props.clearAccount()
                      this.props.clearUser()
                      this.props.clearProduct()
                      this.props.clearProductProfile()
                      this.props.clearShelf()
                      this.props.clearPickOrder()
                      this.props.clearBill()
                      this.props.clearNotification()
                    }
                  }}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>



      </IconContext.Provider>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearAccount: () => dispatch(clearAccount()),
    clearUser: () => dispatch(clearUser()),
    clearProduct: () => dispatch(clearProduct()),
    clearProductProfile: () => dispatch(clearProductProfile()),
    clearShelf: () => dispatch(clearShelf()),
    clearPickOrder: () => dispatch(clearPickOrder()),
    clearBill: () => dispatch(clearBill()),
    clearNotification: () => dispatch(clearNotification()),
    editNotification: (notification) => dispatch(editNotification(notification))
  };
};

const mapStateToProps = (state) => {
  return {
    notificationList: state.notificationReducer.notificationList,
    userList: state.userReducer.userList,
    billList: state.billReducer.billList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);