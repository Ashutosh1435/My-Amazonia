import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, } from "react-router-dom";
import { signout } from './actions/userActions';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignInScreen from './screens/SignInScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }

  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);
  const dispatch = useDispatch()
  const { cartItems } = cart;
  const { userInfo } = userSignin;
  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <button onClick={openMenu}>
              &#9776;
        </button>
            <Link className="brand" to="/">Amazonia</Link>
          </div>
          <div>
            <Link to="/cart">Cart
            {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {/* {' '}<i className="fa fa-cart-arrow-down" ></i> */}
            {/* It is called conditional rendering. */}
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name}{" "}<i className="fa fa-chevron-circle-down"></i></Link>
                  <ul className="dropdown-content">
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/orderhistory">Order History</Link></li>
                    <li><Link to="#signout" onClick={signoutHandler}>Sign Out</Link></li>

                  </ul>
                </div>
              ) :
                (
                  <Link to="/signin">Sign In</Link>
                )
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">Admin {' '}<i className="fa fa-chevron-circle-down"></i></Link>
                  <ul className="dropdown-content">
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/productlist'>Products</Link></li>
                    <li><Link to='/orderlist'>Orders</Link></li>
                    <li><Link to='/userlist'>Users</Link></li>
                  </ul>
                </div>
              )
            }
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
          <li>
              <Link to="/category/All">All</Link>
            </li>
            <li>
              <Link to="/category/Pants">Pants</Link>
            </li>
            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li>
          </ul>
        </aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/category/:id" component={HomeScreen}></Route>
          <Route exact path="/" component={HomeScreen}></Route>
          <Route path="/signin" component={SignInScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} ></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <ProtectedRoute path="/profile" component={ProfileScreen}></ProtectedRoute>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <ProtectedRoute path="/order/:id" component={OrderScreen}></ProtectedRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
        </main>
        <footer className="row center">All reghts are reserved.</footer>
      </div>
    </Router>
  )
}

export default App;
