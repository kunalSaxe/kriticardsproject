import {Route,BrowserRouter as Router} from 'react-router-dom'
import SignUp from './component/Admin/signup';
import SignIn from './component/Admin/signin';
import Dashboard from './component/Admin/Dashboard';
import DisplayAllUser from './component/Admin/DisplayAllUser';
import CardItems from './component/Admin/Addcarditem';
import UserGallery from './component/UserInterface/gallery';
import ProductPictures from './component/Admin/ProductPicture';
import CardView from './component/UserInterface/cardview'
import Home from './component/UserInterface/Home';
import OrderDetail from './component/Admin/orderdetail';
import AddStockThroughExel from './component/Admin/AddStockThroughExel'
import MyAccount from './component/UserInterface/MyAccount';
import Invoice from './component/Admin/invoice';
import OrderHistory from './component/UserInterface/OrderHistory';
import AdminSignin from './component/Admin/AdminSignin';


function App(props) {
  return (<>
  
  <Router>
  
  <Route component={SignUp} path="/signup" props={props.history}/>
  <Route component={SignIn} path="/signin" props={props.history}/>
  <Route component={Dashboard} path="/dashboard" props={props.history}/>
  <Route component={DisplayAllUser} path="/displayuser" props={props.history}/>
  <Route component={CardItems} path="/addcard" props={props.history}/>
  <Route component={UserGallery} path="/gallery" props={props.history}/>
  <Route component={ProductPictures} path="/addcardpics" props={props.history}/>
  <Route component={CardView} path="/cardview" props={props.history}/>
  <Route component={Home} path="/home" props={props.history}/>
  <Route component={OrderDetail} path="/orders" props={props.history}/>
  <Route component={AddStockThroughExel} path="/addstock" props={props.history}/>
  <Route component={MyAccount} path="/myaccount" props={props.history}/>
  <Route component={Invoice} path="/invoice" props={props.history}/>
  <Route component={OrderHistory} path="/orderhistory" props={props.history}/>
  <Route component={AdminSignin} path="/admin" props={props.history}/>
 

  </Router>

  </>
   
  );
}

export default App;