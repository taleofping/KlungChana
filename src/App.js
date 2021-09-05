import { Route, Switch, Router } from 'react-router-dom';
import React, { Component } from 'react'
import history from './history'

import Login from './Component/Login'
import ForgetPassword from './Component/ForgetPassword'
import Home from './Component/Home'
import Dashboard from './Component/Dashboard'
import InvenCost from './Component/InvenCost'
import Stock from './Component/Stock'
import ViewStock from './Component/ViewStock'
import CountingStock from './Component/CountingStock'
import EditStock from './Component/EditStock'
import Ordering from './Component/Ordering'
import Picking from './Component/Picking'
import MemberManage from './Component/MemberManage'
import AddMember from './Component/AddMember'
import OrderConfirm from './Component/OrderConfirm'
import History from './Component/History'
import ConfirmShipping from './Component/ConfirmShipping'
import Shelf from './Component/Shelf'
import OrderingChart from './Component/OrderingChart'
import Profile from './Component/Profile'
import PickingChart from './Component/PickingChart'
import EditMember from './Component/EditMember'
import ConReceiving from './Component/ConReceiving'
import ConPacking from './Component/ConPacking'
import ConReturning from './Component/ConReturning'
import ConReturned from './Component/ConReturned'
import AddProduct from './Component/AddProduct'
import ConReturnedChart from './Component/ConReturnedChart'
import CountShelf from './Component/CountShelf'
import ProductDetail from './Component/ProductDetail'
import { Provider } from 'react-redux';
import configureStore from './Store';
import BillOrder from './Component/BillOrder'
import BillOrder2 from './Component/BillOrder2'
import BillOHis from './Component/BillOHis'
import EditShelf from './Component/EditShelf'
import EditProduct from './Component/EditProduct'
import BillPick from './Component/BillPick'
import CountingReport from './Component/CountingReport'
import BillPick2 from './Component/BillPick2'
import BillPHis from './Component/BillPHis'
import EditProductDetail from './Component/EditProductDetail'
import EditProductShelf from './Component/EditProductShelf'
import BillReturn from './Component/BillReturn'
import BillReturn2 from './Component/BillReturn2'
import BillRHis from './Component/BillRHis'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <Provider store={configureStore}>

        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/forgetPassword" component={ForgetPassword} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/inventoryCost" component={InvenCost} />
            <Route exact path="/stock" component={Stock} />
            <Route exact path="/Ordering" component={Ordering} />
            <Route exact path="/Ordering/orderingChart" component={OrderingChart} />
            <Route exact path="/Ordering/orderingChart/billOrder" component={BillOrder} />
            <Route exact path="/Ordering/orderingChart/AddProduct" component={AddProduct} />
            <Route exact path="/stock/viewStock" component={ViewStock} />
            <Route exact path="/stock/countingStock" component={CountingStock} />
            <Route exact path="/stock/editStock" component={EditStock} />
            <Route exact path="/picking" component={Picking} />
            <Route exact path="/picking/pickingChart" component={PickingChart} />
            <Route exact path="/picking/pickingChart/billPick" component={BillPick} />
            <Route exact path="/memberManage" component={MemberManage} />
            <Route exact path="/memberManage/addMember" component={AddMember} />
            <Route exact path="/memberManage/editMember" component={EditMember} />
            <Route exact path="/history" component={History} />
            <Route exact path="/history/billOHis" component={BillOHis} />
            <Route exact path="/history/billPHis" component={BillPHis} />
            <Route exact path="/history/billRHis" component={BillRHis} />
            <Route exact path="/confirmShipping" component={ConfirmShipping} />
            <Route exact path="/orderConfirm" component={OrderConfirm} />
            <Route exact path="/orderConfirm/receiving" component={ConReceiving} />
            <Route exact path="/orderConfirm/receiving/billOrder2" component={BillOrder2} />
            <Route exact path="/orderConfirm/packing" component={ConPacking} />
            <Route exact path="/orderConfirm/packing/billPick2" component={BillPick2} />
            <Route exact path="/orderConfirm/returning" component={ConReturning} />
            <Route exact path="/orderConfirm/returning/billReturn2" component={BillReturn2} />
            <Route exact path="/returned" component={ConReturned} />
            <Route exact path="/returned/returnedChart" component={ConReturnedChart} />
            <Route exact path="/returned/returnedChart/billReturn" component={BillReturn} />
            <Route exact path="/stock/viewStock/shelf" component={Shelf} />
            <Route exact path="/stock/viewStock/shelf/detail" component={ProductDetail} />
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/stock/countingStock/countShelf" component={CountShelf}/>
            <Route exact path="/stock/countingStock/countShelf/countReport" component={CountingReport}/>
            <Route exact path="/stock/editStock/editshelf" component={EditShelf} />
            <Route exact path="/stock/editStock/editproductshelf" component={EditProductShelf} />
            <Route exact path="/stock/editStock/editproductshelf/editproduct" component={EditProduct} />
            <Route exact path="/stock/editStock/editproductshelf/editproduct/editproductdetail" component={EditProductDetail} />

          </Switch>
        </Router>

      </Provider>
    )
  }
}

export default App;
