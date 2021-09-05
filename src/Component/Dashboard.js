import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import './Style.css'
import firestore from "../firebase/firestore"
import Paper from '@material-ui/core/Paper';
import Hamburger from './Hamburger'
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ComposedChart, Line, CartesianGrid } from 'recharts';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components'
import './Modal.css';

import { formatMoney } from '../formatMoney'
import { convert } from '../convert'

const ButtonAll = styled.button`
  background: #4A71D6;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
`

const ButtonRecv = styled.button`
  background: #559540;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
`

const ButtonPick = styled.button`
  background: #FF6060;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
`
const ButtonAfter = styled.button`
  background: #C4C4C4;
  border-radius: 10px;
  border: 2px;
  color: #ffffff;
`
const Font = styled.div`
  && {
    color: #000000;
    font-size: 16px;
    font-weight: bold;
  }
`
const Font2 = styled.div`
  && {
    width: 182px;
    height: 60px;
    font-family: Prompt;
    font-style: normal;
    font-weight: lighter;
    font-size: 40px;
    line-height: 60px;
    color: #000000;
  }
`

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userList[this.props.userList.length - 1],
      modal1: true,
      modal2: false,
      modal3: false,
      countAll: 0,
      countPick: 0,
      countRcv: 0,
      dateMonth: new Date().getMonth(),
      typeA: 0,
      typeB: 0,
      typeC: 0,
      inventLv: 0,
      jVal: 0,
      fVal: 0,
      mVal: 0,
      aVal: 0,
      mayVal: 0,
      junVal: 0,
      julVal: 0,
      augVal: 0,
      sepVal: 0,
      octVal: 0,
      novVal: 0,
      decVal: 0,
      numberOfItem: 0,
      jValT: 0,
      fValT: 0,
      mValT: 0,
      aValT: 0,
      mayValT: 0,
      junValT: 0,
      julValT: 0,
      augValT: 0,
      sepValT: 0,
      octValT: 0,
      novValT: 0,
      decValT: 0,
      graph: null,
      TO: null,
      avIv: 0,
      costLv: 0,

    };

    this.props.productList.forEach((item) => {
      if (item.type === 'A') {
        this.setState({ typeA: this.state.typeA += parseInt(item.qty) })
      }
      if (item.type === 'B') {
        this.setState({ typeB: this.state.typeB += parseInt(item.qty) })
      }
      if (item.type === 'C') {
        this.setState({ typeC: this.state.typeC += parseInt(item.qty) })
      }
      this.setState({ inventLv: this.state.inventLv += (parseInt(item.costPunit) * parseInt(item.qty)) })
      if (this.state.dateMonth === 0) {
        this.setState({ jVal: this.state.jVal += (parseInt(item.costPunit) * parseInt(item.qty)) })

      }
      if (this.state.dateMonth === 1) {
        this.setState({ fVal: this.state.fVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 2) {
        this.setState({ mVal: this.state.mVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 3) {
        this.setState({ aVal: this.state.aVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 4) {
        this.setState({ mayVal: this.state.mayVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 5) {
        this.setState({ junVal: this.state.junVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 6) {
        this.setState({ julVal: this.state.julVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 7) {
        this.setState({ augVal: this.state.augVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 8) {
        this.setState({ sepVal: this.state.sepVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 9) {
        this.setState({ octVal: this.state.octVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 10) {
        this.setState({ novVal: this.state.novVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      if (this.state.dateMonth === 11) {
        this.setState({ decVal: this.state.decVal += (parseInt(item.costPunit) * parseInt(item.qty)) })
      }
      this.setState({ numberOfItem: this.state.numberOfItem += parseInt(item.qty) })
    })
    const graph = {
      Apr: this.state.aVal,
      Aug: this.state.augVal,
      Dec: this.state.decVal,
      Feb: this.state.fVal,
      Jan: this.state.jVal,
      Jul: this.state.julVal,
      Jun: this.state.junVal,
      Mar: this.state.mVal,
      May: this.state.mayVal,
      Nov: this.state.novVal,
      Oct: this.state.octVal,
      Sep: this.state.sepVal,
    }
    firestore.updateGraph(graph, this.updateGSuccess, this.updateGReject)

  }
  componentDidMount = () => {
    this.countOrder()
    console.log("coungting is running in comp")
    console.log(this.state.countAll)
    console.log(this.state.countPick)
    console.log(this.state.countRcv)
    firestore.getAllGraph(this.getGSuccess, this.getGReject)
  }
  getGSuccess = (querySnapshot) => {
    let graph
    querySnapshot.forEach(doc => {
      graph = doc.data()
      graph.id = doc.id
      this.setState({ graph: graph })
    });
    this.setState(
      {
        jVal: graph.Jan,
        fVal: graph.Feb,
        mVal: graph.Mar,
        aVal: graph.Apr,
        mayVal: graph.May,
        junVal: graph.Jun,
        julVal: graph.Jul,
        augVal: graph.Aug,
        sepVal: graph.Sep,
        octVal: graph.Oct,
        novVal: graph.Nov,
        decVal: graph.Dec,
      })
  }
  getGReject = (e) => {
    console.log(e)
  }
  updateGSuccess = () => {
    console.log("Success")
  }
  updateGReject = (e) => {
    console.log(e)
  }

  COLORS = ['#0088FE', '#00C49F', '#FFBB28',];


  CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
          <label>{`${payload[0].name} : ${formatMoney(convert(payload[0].value)) + " (" + ((payload[0].value / this.state.numberOfItem) * 100).toFixed(2) + "%)"}`}</label>
        </div>
      );
    }

    return null;
  };

  handleModalAllR = (e) => {
    const currentClass = e.target.className;
    if (currentClass == 'modal-card') {
      return;
    }
    this.setState({ modal1: !this.state.modal1 });

    this.setState({ modal2: !this.state.modal2 });
  }

  handleModalAllP = (e) => {
    const currentClass = e.target.className;
    if (currentClass == 'modal-card') {
      return;
    }
    this.setState({ modal1: !this.state.modal1 });

    this.setState({ modal3: !this.state.modal3 });
  }

  handleModalRecvA = (e) => {
    const currentClass = e.target.className;
    if (currentClass == 'modal-card') {
      return;
    }
    this.setState({ modal2: !this.state.modal2 });

    this.setState({ modal1: !this.state.modal1 });
  }

  handleModalRecvP = (e) => {
    const currentClass = e.target.className;
    if (currentClass == 'modal-card') {
      return;
    }
    this.setState({ modal2: !this.state.modal2 });

    this.setState({ modal3: !this.state.modal3 });
  }

  handleModalPickA = (e) => {
    const currentClass = e.target.className;
    if (currentClass == 'modal-card') {
      return;
    }
    this.setState({ modal3: !this.state.modal3 });

    this.setState({ modal1: !this.state.modal1 });
  }

  handleModalPickR = (e) => {
    const currentClass = e.target.className;
    if (currentClass == 'modal-card') {
      return;
    }
    this.setState({ modal3: !this.state.modal3 });

    this.setState({ modal2: !this.state.modal2 });
  }

  countOrder = () => {
    var countA = 0
    var countP = 0
    var countR = 0
    this.props.billList.forEach(item => {
      if (parseInt(item.info.date.split('/')[1]) === this.state.dateMonth + 1) {
        console.log("coungting is running")
        if (item.confirm === true) {
          if (item.type === 'PO') {
            countR = countR + 1;
            countA = countA + 1;
          }
          else if (item.type === 'MR') {
            countP = countP + 1;
            countA = countA + 1;
          }
        }
      }
    })
    this.setState({ countAll: countA });
    this.setState({ countPick: countP });
    this.setState({ countRcv: countR });
    let d = new Date()
    if (d.getDay === 1) {
      this.setState({ countAll: 0 });
      this.setState({ countPick: 0 });
      this.setState({ countRcv: 0 });
    }
  }

  // componentDidMount(){
  //   this.countOrder()
  //   console.log("coungting is running in comp")
  // }



  render() {
    let pieData = [
      {
        "name": "TypeA",
        "value": this.state.typeA
      },
      {
        "name": "TypeB",
        "value": this.state.typeB
      },
      {
        "name": "TypeC",
        "value": this.state.typeC
      },
    ];
    console.log(pieData[0].value)
    let barData = [
      {
        name: 'Jan', value: 123515, turnover: 123515 / ((0 + 123515) / 2),
      },
      {
        name: 'Feb', value: 231515, turnover: 231515 / ((123515 + 231515) / 2),
      },
      {
        name: 'Mar', value: 155511, turnover: 155511 / ((231515 + 155511) / 2),
      },
      {
        name: 'Apr', value: this.state.aVal, turnover: this.state.aVal / ((155511 + this.state.aVal) / 2),
      },
      {
        name: 'May', value: this.state.mayVal, turnover: this.state.mayVal / ((this.state.aVal + this.state.mayVal) / 2),
      },
      {
        name: 'Jun', value: this.state.junVal, turnover: this.state.junVal / ((this.state.mayVal + this.state.junVal) / 2),
      },
      {
        name: 'Jul', value: this.state.julVal, turnover: this.state.julVal / ((this.state.junVal + this.state.julVal) / 2),
      },
      {
        name: 'Aug', value: this.state.augVal, turnover: this.state.augVal / ((this.state.julVal + this.state.augVal) / 2),
      },
      {
        name: 'Sep', value: this.state.sepVal, turnover: this.state.sepVal / ((this.state.augVal + this.state.sepVal) / 2),
      },
      {
        name: 'Oct', value: this.state.octVal, turnover: this.state.octVal / ((this.state.sepVal + this.state.octVal) / 2),
      },
      {
        name: 'Nov', value: this.state.novVal, turnover: this.state.novVal / ((this.state.octVal + this.state.novVal) / 2),
      },
      {
        name: 'Dec', value: this.state.decVal, turnover: this.state.decVal / ((this.state.decVal + this.state.decVal) / 2),
      },
    ];
    return (
      <div className="bg">


        {/* <Paper className="paperTI" >
          <div style={{ paddingTop: '5%' }}>
            <Font2 style={{ marginLeft: '25%' }}>TOP ITEM</Font2>
            <Paper className='topItem' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '2%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Font>Product</Font>
                <Font>Product Name</Font>
                <Font>QTY</Font>
              </div>
            </Paper>
          </div>
        </Paper> */}
        <Paper className="paperIL" >
          <div>
            <p className="txtIl" style={{paddingTop:20,paddingLeft:50}}>Inventory Levels</p>
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '10%',  }}>
              <p className="txtIl" style={{fontSize: '50px', textAlign: 'right', fontSize: '60px' }}>{formatMoney(convert(this.state.inventLv))}</p>
              <p className="txtIl" style={{  fontSize: '50px', textAlign: 'right', fontSize: '60px',width:50 }}>฿</p>
            </div>
          </div>
        </Paper>
        {/* <Paper className="paperDam" >
          <div>
            <p className="txtDam">Damage value this month</p>
            <p className="txtIl" style={{ paddingLeft: '75%', paddingTop: '25%', fontSize: '50px' }}>฿</p>
          </div>
        </Paper> */}
        {/* <Paper className="paperTO" >
          <div>
            <p className="txtTo">Total Orders this month</p>
          </div>
        </Paper> */}

        <div hidden={!this.state.modal1}>
          <div className="modal-backgroundForDash" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="modal-cardDashOTW">
              <p className='textOTWeek'>Order this month</p>
              <p className='textOTWeek2'>{this.state.countAll}</p>
              <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 50 }}>
                <div style={{ paddingLeft: 12 }}>
                  <ButtonRecv style={{ width: 100 }} onClick={this.handleModalAllR}>Receiving</ButtonRecv>
                </div>
                <div style={{ paddingLeft: 20 }}>
                  <ButtonAfter style={{ width: 100 }}>All</ButtonAfter>
                </div>
                <div style={{ paddingLeft: 20 }} >
                  <ButtonPick style={{ width: 100 }} onClick={this.handleModalAllP}>Picking</ButtonPick>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div hidden={!this.state.modal2}>
          <div className="modal-backgroundForDash" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="modal-cardDashOTW">
              <p className='textOTWeek'>Order this month</p>
              <p className='textOTWeek2'>{this.state.countRcv}</p>
              <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 50 }}>
                <div style={{ paddingLeft: 12 }}>
                  <ButtonAfter style={{ width: 100 }} >Receiving</ButtonAfter>
                </div>
                <div style={{ paddingLeft: 20 }}>
                  <ButtonAll style={{ width: 100 }} onClick={this.handleModalRecvA}>All</ButtonAll>
                </div>
                <div style={{ paddingLeft: 20 }} >
                  <ButtonPick style={{ width: 100 }} onClick={this.handleModalRecvP}>Picking</ButtonPick>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div hidden={!this.state.modal3}>
          <div className="modal-backgroundForDash" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="modal-cardDashOTW">
              <p className='textOTWeek'>Order this month</p>
              <p className='textOTWeek2'>{this.state.countPick}</p>
              <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 50 }}>
                <div style={{ paddingLeft: 12 }}>
                  <ButtonRecv style={{ width: 100 }} onClick={this.handleModalPickR}>Receiving</ButtonRecv>
                </div>
                <div style={{ paddingLeft: 20 }}>
                  <ButtonAll style={{ width: 100 }} onClick={this.handleModalPickA}>All</ButtonAll>
                </div>
                <div style={{ paddingLeft: 20 }} >
                  <ButtonAfter style={{ width: 100 }}>Picking</ButtonAfter>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Paper className="paperABC" >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart width={730} height={300}>
              <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                {
                  pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
                }
              </Pie>
              <Tooltip content={<this.CustomTooltip />} />
              <Legend />
            </PieChart>
          </div>
        </Paper>
        <Paper className="paperTT" >
          <div>
            <p className='textOTWeek' style={{ fontWeight: 'bold', textAlign: 'center' }}>Inventories per month</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: 50 }}>
              <ComposedChart
                width={750}
                height={420}
                data={barData}
                margin={{
                  top: 10, right: 0, bottom: 160, left: 50,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="value" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="turnover" stroke="#ff7300" />
              </ComposedChart>
            </div>
          </div>
        </Paper>
        <Hamburger page='DASHBOARD' user={this.state.user} />

      </div >

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
    productList: state.productReducer.productList,
    billList: state.billReducer.billList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);