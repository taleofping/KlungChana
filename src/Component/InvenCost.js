import React, { Component } from 'react'
import history from '../history'
import Topbar from './Topbar'
import firestore from "../firebase/firestore"
import Hamburger from './Hamburger'
import { IoIosCloseCircle } from "react-icons/io";
import styled from 'styled-components'
import { connect } from 'react-redux';
import { Input, Paper } from '@material-ui/core';
import { CC, EOQ, TC, OC } from '../pic';
import { findEOQ, findNY, findLead } from '../EOQ';
import { formatMoney } from '../formatMoney'
import { convert } from '../convert'
import './Modal.css';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ComposedChart, Line, CartesianGrid } from 'recharts';
const Font = styled.div`
  && {
    color: #000000;
    font-size: 16px;
    font-weight: bold;
  }
`

class InvenCost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userList[this.props.userList.length - 1],
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            eoqM: 0,
            nOrM: 0,
            leadM: 0,
            workday: 0,
            workdM: 365,
            demandM: 0,
            ocM: 0,
            crM: 0,
            date: new Date(),
            currentMonth: new Date().getMonth(),
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
            extraCost: 0,
            oCost: null,
            jValC: 0,
            fValC: 0,
            mValC: 0,
            aValC: 0,
            mayValC: 0,
            junValC: 0,
            julValC: 0,
            augValC: 0,
            sepValC: 0,
            octValC: 0,
            novValC: 0,
            decValC: 0,
            extracCost: 0,
            cCost: null,
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
        };

    }


    onKeyPress1(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (/\+|-/.test(keyValue) || /\./.test(keyValue) || /\e/.test(keyValue))
            event.preventDefault();
    }

    setWorkTime = () => {
        if (this.state.workday > 0) {
            this.setState({ workdM: this.state.workday })
        }
        else {
            this.setState({ workdM: this.state.workdM })
        }

    }


    handleModalClose1 = (e) => {
        this.setState({ modal1: false });
    };

    handleModalOpen1 = () => {
        this.setState({ modal1: true });
    };

    handleModalClose2 = (e) => {
        this.setState({ modal2: false });
    };

    handleModalOpen2 = () => {
        this.setState({ modal2: true });
        if ((this.state.date.getMonth() === 0) && this.state.decVal > 0) {
            const oCost = {
                Apr: 0,
                Aug: 0,
                Dec: 0,
                Feb: 0,
                Jan: 0,
                Jul: 0,
                Jun: 0,
                Mar: 0,
                May: 0,
                Nov: 0,
                Oct: 0,
                Sep: 0,
            }
            firestore.updateCost(oCost, this.updateSuccess, this.updateReject)
            //console.log("new year")
        }
    };
    handleModalClose3 = (e) => {
        this.setState({ modal3: false });
    };

    handleModalOpen3 = () => {
        this.setState({ modal3: true });
        if ((this.state.date.getMonth() === 0) && this.state.decValC > 0) {
            const cCost = {
                Apr: 0,
                Aug: 0,
                Dec: 0,
                Feb: 0,
                Jan: 0,
                Jul: 0,
                Jun: 0,
                Mar: 0,
                May: 0,
                Nov: 0,
                Oct: 0,
                Sep: 0,
            }
            firestore.updatecCost(cCost, this.updatecSuccess, this.updatecReject)
            //console.log("new year")
        }
    };

    handleModalClose4 = (e) => {
        this.setState({ modal4: false });
    };

    handleModalOpen4 = () => {
        this.setState({ modal4: true });
        this.setState({
            jValT: this.state.jVal + this.state.jValC,
            fValT: this.state.fVal + this.state.fValC,
            mValT: this.state.mVal + this.state.mValC,
            aValT: this.state.aVal + this.state.aValC,
            mayValT: this.state.mayVal + this.state.mayValC,
            junValT: this.state.junVal + this.state.junValC,
            julValT: this.state.julVal + this.state.julValC,
            augValT: this.state.augVal + this.state.augValC,
            sepValT: this.state.sepVal + this.state.sepValC,
            octValT: this.state.octVal + this.state.octValC,
            novValT: this.state.novVal + this.state.novValC,
            decValT: this.state.novVal + this.state.novValC,
        })
    };


    handleClick1 = () => {
        if (this.state.currentMonth === 0 && this.state.extraCost !== "") {
            this.setState({ jVal: this.state.jVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 1 && this.state.extraCost !== "") {
            this.setState({ fVal: this.state.fVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 2 && this.state.extraCost !== "") {
            this.setState({ mVal: this.state.mVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 3 && this.state.extraCost !== "") {
            this.setState({ aVal: this.state.aVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 4 && this.state.extraCost !== "") {
            this.setState({ mayVal: this.state.mayVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 5 && this.state.extraCost !== "") {
            this.setState({ junVal: this.state.junVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 6 && this.state.extraCost !== "") {
            this.setState({ julVal: this.state.julVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 7 && this.state.extraCost !== "") {
            this.setState({ augVal: this.state.augVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 8 && this.state.extraCost !== "") {
            this.setState({ sepVal: this.state.sepVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 9 && this.state.extraCost !== "") {
            this.setState({ octVal: this.state.octVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 10 && this.state.extraCost !== "") {
            this.setState({ novVal: this.state.novVal += parseInt(this.state.extraCost) })
        }
        else if (this.state.currentMonth === 11 && this.state.extraCost !== "") {
            this.setState({ decVal: this.state.decVal += parseInt(this.state.extraCost) })
        }
        const oCost = {
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
        firestore.updateCost(oCost, this.updateSuccess, this.updateReject)
    }
    componentDidMount = () => {
        firestore.getAllCost(this.getSuccess, this.getReject)
        firestore.getAllcCost(this.getcSuccess, this.getcReject)
    }
    updateSuccess = () => {
        console.log("Success")
    }
    updateReject = (e) => {
        console.log(e)
    }
    getSuccess = (querySnapshot) => {
        let oCost
        querySnapshot.forEach(doc => {
            oCost = doc.data()
            oCost.id = doc.id
            this.setState({ oCost: oCost })
        });
        this.setState(
            {
                jVal: oCost.Jan,
                fVal: oCost.Feb,
                mVal: oCost.Mar,
                aVal: oCost.Apr,
                mayVal: oCost.May,
                junVal: oCost.Jun,
                julVal: oCost.Jul,
                augVal: oCost.Aug,
                sepVal: oCost.Sep,
                octVal: oCost.Oct,
                novVal: oCost.Nov,
                decVal: oCost.Dec,
            })
    }
    getReject = (e) => {
        console.log(e)
    }
    /*-----------------------------End of Ordering Cost------------------------------*/
    /*----------------------------- Carrying Cost -------------------------------*/
    handleClick2 = () => {
        if (this.state.currentMonth === 0 && this.state.extracCost !== "") {
            this.setState({ jValC: this.state.jValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 1 && this.state.extracCost !== "") {
            this.setState({ fValC: this.state.fValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 2 && this.state.extracCost !== "") {
            this.setState({ mValC: this.state.mValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 3 && this.state.extracCost !== "") {
            this.setState({ aValC: this.state.aValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 4 && this.state.extracCost !== "") {
            this.setState({ mayValC: this.state.mayValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 5 && this.state.extracCost !== "") {
            this.setState({ junValC: this.state.junValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 6 && this.state.extracCost !== "") {
            this.setState({ julValC: this.state.julValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 7 && this.state.extracCost !== "") {
            this.setState({ augValC: this.state.augValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 8 && this.state.extracCost !== "") {
            this.setState({ sepValC: this.state.sepValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 9 && this.state.extracCost !== "") {
            this.setState({ octValC: this.state.octValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 10 && this.state.extracCost !== "") {
            this.setState({ novValC: this.state.novValC += parseInt(this.state.extracCost) })
        }
        if (this.state.currentMonth === 11 && this.state.extracCost !== "") {
            this.setState({ decValC: this.state.decValC += parseInt(this.state.extracCost) })
        }
        const cCost = {
            Apr: this.state.aValC,
            Aug: this.state.augValC,
            Dec: this.state.decValC,
            Feb: this.state.fValC,
            Jan: this.state.jValC,
            Jul: this.state.julValC,
            Jun: this.state.junValC,
            Mar: this.state.mValC,
            May: this.state.mayValC,
            Nov: this.state.novValC,
            Oct: this.state.octValC,
            Sep: this.state.sepValC,
        }
        firestore.updatecCost(cCost, this.updatecSuccess, this.updatecReject)
    }
    updatecSuccess = () => {
        console.log("Success")
    }
    updatecReject = (e) => {
        console.log(e)
    }
    getcSuccess = (querySnapshot) => {
        let cCost
        querySnapshot.forEach(doc => {
            cCost = doc.data()
            cCost.id = doc.id
            this.setState({ cCost: cCost })
        });
        this.setState(
            {
                jValC: cCost.Jan,
                fValC: cCost.Feb,
                mValC: cCost.Mar,
                aValC: cCost.Apr,
                mayValC: cCost.May,
                junValC: cCost.Jun,
                julValC: cCost.Jul,
                augValC: cCost.Aug,
                sepValC: cCost.Sep,
                octValC: cCost.Oct,
                novValC: cCost.Nov,
                decValC: cCost.Dec,
            })
    }
    getcReject = (e) => {
        console.log(e)
    }
    /*-----------------------------End of Carrying Cost------------------------------*/

    render() {

        let barData1 = [
            {
                name: 'Jan', Cost: this.state.jVal,
            },
            {
                name: 'Feb', Cost: this.state.fVal,
            },
            {
                name: 'Mar', Cost: this.state.mVal,
            },
            {
                name: 'Apr', Cost: this.state.aVal,
            },
            {
                name: 'May', Cost: this.state.mayVal,
            },
            {
                name: 'Jun', Cost: this.state.junVal,
            },
            {
                name: 'Jul', Cost: this.state.julVal,
            },
            {
                name: 'Aug', Cost: this.state.augVal,
            },
            {
                name: 'Sep', Cost: this.state.sepVal,
            },
            {
                name: 'Oct', Cost: this.state.octVal,
            },
            {
                name: 'Nov', Cost: this.state.novVal,
            },
            {
                name: 'Dec', Cost: this.state.decVal,
            },
        ];
        let barData2 = [
            {
                name: 'Jan', Cost: this.state.jValC,
            },
            {
                name: 'Feb', Cost: this.state.fValC,
            },
            {
                name: 'Mar', Cost: this.state.mValC,
            },
            {
                name: 'Apr', Cost: this.state.aValC,
            },
            {
                name: 'May', Cost: this.state.mayValC,
            },
            {
                name: 'Jun', Cost: this.state.junValC,
            },
            {
                name: 'Jul', Cost: this.state.julValC,
            },
            {
                name: 'Aug', Cost: this.state.augValC,
            },
            {
                name: 'Sep', Cost: this.state.sepValC,
            },
            {
                name: 'Oct', Cost: this.state.octValC,
            },
            {
                name: 'Nov', Cost: this.state.novValC,
            },
            {
                name: 'Dec', Cost: this.state.decValC,
            },
        ];
        let barData3 = [
            {
                name: 'Jan', Cost: this.state.jValT,
            },
            {
                name: 'Feb', Cost: this.state.fValT,
            },
            {
                name: 'Mar', Cost: this.state.mValT,
            },
            {
                name: 'Apr', Cost: this.state.aValT,
            },
            {
                name: 'May', Cost: this.state.mayValT,
            },
            {
                name: 'Jun', Cost: this.state.junValT,
            },
            {
                name: 'Jul', Cost: this.state.julValT,
            },
            {
                name: 'Aug', Cost: this.state.augValT,
            },
            {
                name: 'Sep', Cost: this.state.sepValT,
            },
            {
                name: 'Oct', Cost: this.state.octValT,
            },
            {
                name: 'Nov', Cost: this.state.novValT,
            },
            {
                name: 'Dec', Cost: this.state.decValT,
            },
        ];
        return (
            <div className="bg">
                <Hamburger page='INVENTORY COST' user={this.state.user} />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '7%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                        <div style={{ paddingRight: 70 }}>
                            <Paper className="paperInEOQ" onClick={this.handleModalOpen1}>
                                <img className="picIn1" src={EOQ}></img>
                                <p className="textInventC" style={{ paddingTop: '8%' }}>Economic Order
                                Quantity
                            </p>
                            </Paper>
                        </div>

                        <div style={{ paddingTop: 70 }}>
                            <Paper className="paperInEOQ" onClick={this.handleModalOpen3}>
                                <img className="picIn2" src={CC}></img>
                                <p className="textInventC" style={{ paddingTop: '8%' }}>Carrying
                            Cost</p>
                            </Paper>
                        </div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Paper className="paperInEOQ" onClick={this.handleModalOpen2} >
                            <img className="picIn3" src={OC}></img>
                            <p className="textInventC" style={{ paddingTop: '8%' }}>Ordering
                            Cost</p>
                        </Paper>
                        <div style={{ paddingTop: 70 }}>
                            <Paper className="paperInEOQ" onClick={this.handleModalOpen4}>
                                <img className="picIn3" src={TC}></img>
                                <p className="textInventC" style={{ paddingTop: '8%' }}>Total
                            Cost</p>
                            </Paper>
                        </div>

                    </div>

                </div>
                <div hidden={!this.state.modal1}>
                    <div className="modal-background" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="modal-cardd">
                            <div style={{ paddingLeft: '95%', cursor: 'pointer' }}><IoIosCloseCircle style={{ width: '40px', height: '40px' }} onClick={this.handleModalClose1}></IoIosCloseCircle></div><div style={{ display: 'flex', flexDirection: 'row' }}>
                                <img style={{ width: '160px', height: '70px', marginLeft: '5%' }} src={EOQ}></img>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '5%' }}>
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '5%', marginTop: '10%' }}>
                                        <p>Demand in units</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input type="number" min="0" onKeyPress={this.onKeyPress1.bind(this)} style={{ width: '100px', borderWidth: '0', paddingLeft: '9px', marginLeft: '5%' }} onChange={txt => this.setState({ demandM: txt.target.value })}></input>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5%', marginTop: '3%' }}>
                                        <p>Order cost</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input type="number" min="0" onKeyPress={this.onKeyPress1.bind(this)} style={{ width: '100px', borderWidth: '0', paddingLeft: '9px', marginLeft: '5%' }} onChange={txt => this.setState({ ocM: txt.target.value })}></input>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5%', marginTop: '3%' }}>
                                        <p>Carrying costs</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input type="number" min="0" onKeyPress={this.onKeyPress1.bind(this)} style={{ width: '100px', borderWidth: '0', paddingLeft: '9px', marginLeft: '5%' }} onChange={txt => this.setState({ crM: txt.target.value })}></input>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5%', marginTop: '3%', width: '250px' }}>
                                        <p>Work days/year</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input type="number" min="0" max="366" onKeyPress={this.onKeyPress1.bind(this)} style={{ width: '100px', borderWidth: '0', paddingLeft: '9px', marginLeft: '5%' }} onChange={txt => this.setState({ workdM: txt.target.value })}></input>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15%' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '5%', marginTop: '10%' }}>
                                        <p>EOQ</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Paper className='paperEoq'><Font style={{cursor:'default', marginLeft: '5%'}}>{formatMoney(findEOQ(this.state.demandM, this.state.ocM, this.state.crM))}</Font></Paper>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5%', marginTop: '3%', width: '300px' }}>
                                        <p>Number of orders/year</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Paper className='paperEoq'><Font style={{cursor:'default', marginLeft: '5%'}}>{formatMoney(findNY(this.state.demandM, this.state.ocM, this.state.crM))}</Font></Paper>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5%', marginTop: '3%' }}>
                                        <p>Order lead time</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Paper className='paperEoq'><Font style={{cursor:'default', marginLeft: '5%'}}>{formatMoney(findLead(this.state.demandM, this.state.ocM, this.state.crM, this.state.workdM))}</Font></Paper>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div hidden={!this.state.modal2}>
                    <div className="modal-background" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="modal-card">
                            <div style={{ paddingLeft: '95%', cursor: 'pointer' }}><IoIosCloseCircle style={{ width: '40px', height: '40px' }} onClick={this.handleModalClose2}></IoIosCloseCircle></div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <img style={{ width: '140px', height: '80px', marginLeft: '5%' }} src={OC}></img>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '7%' }}>
                                    <p>Insert Ordering Cost</p>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input style={{ width: '100px', borderWidth: '0', paddingLeft: '9px', marginLeft: '5%' }} type="number" name="cost" onChange={txt => this.setState({ extraCost: txt.target.value })}></input>
                                        <button style={{ width: '60px', borderWidth: '0', marginLeft: '2%', backgroundColor: 'salmon', borderRadius: '15px', fontSize: '12px' }} onClick={this.handleClick1}>Save</button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: "5%" }}>
                                <ComposedChart
                                    width={750}
                                    height={400}
                                    data={barData1}
                                    margin={{
                                        top: 0, right: 0, bottom: 0, left: 50,
                                    }}
                                >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Cost" barSize={20} fill="#413ea0" />
                                </ComposedChart>
                            </div>
                        </div>
                    </div>
                </div>
                <div hidden={!this.state.modal3}>
                    <div className="modal-background" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="modal-card">
                            <div style={{ paddingLeft: '95%', cursor: 'pointer' }}><IoIosCloseCircle style={{ width: '40px', height: '40px' }} onClick={this.handleModalClose3}></IoIosCloseCircle></div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <img style={{ width: '140px', height: '80px', marginLeft: '5%' }} src={CC}></img>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '7%' }}>
                                    <p>Insert Carrying Cost</p>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input style={{ width: '100px', borderWidth: '0', paddingLeft: '9px', marginLeft: '5%' }} type="number" name="ccost" onChange={txt => this.setState({ extracCost: txt.target.value })} ></input>
                                        <button style={{ width: '60px', borderWidth: '0', marginLeft: '2%', backgroundColor: 'salmon', borderRadius: '15px', fontSize: '12px' }} onClick={this.handleClick2}>Save</button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: "5%" }}>
                                <ComposedChart
                                    width={750}
                                    height={400}
                                    data={barData2}
                                    margin={{
                                        top: 0, right: 0, bottom: 0, left: 50,
                                    }}
                                >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Cost" barSize={20} fill="#413ea0" />
                                </ComposedChart>
                            </div>
                        </div>
                    </div>
                </div>
                <div hidden={!this.state.modal4}>
                    <div className="modal-background" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="modal-card">
                            <div style={{ paddingLeft: '95%', cursor: 'pointer' }}><IoIosCloseCircle style={{ width: '40px', height: '40px' }} onClick={this.handleModalClose4}></IoIosCloseCircle></div>
                            <img style={{ width: '140px', height: '80px', marginLeft: '5%' }} src={TC}></img>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: "5%" }}>
                                <ComposedChart
                                    width={750}
                                    height={400}
                                    data={barData3}
                                    margin={{
                                        top: 0, right: 0, bottom: 0, left: 50,
                                    }}
                                >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Cost" barSize={20} fill="#413ea0" />
                                </ComposedChart>
                            </div>
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
        productList: state.productReducer.productList,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvenCost);

