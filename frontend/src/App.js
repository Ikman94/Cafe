import { BrowserRouter, Route, Link } from 'react-router-dom';
import ShopPage from "./Pages/shopPage";
import ProductPage from "./Pages/productPage";
import CartPage from './Pages/cartPage';
import { useDispatch, useSelector } from 'react-redux';
import SigninPage from './Pages/signinPage';
import { signout } from './actions/userActions';
import ShippingAddressPage from './Pages/ShippingAddressPage';
import PaymentPage from './Pages/paymentPage';
import PlaceOrderPage from './Pages/placeOrderPage';
import OrderPage from './Pages/OrderPage';
import OrderHistoryPage from './Pages/orderHistoryPage';
import ProfilePage from './Pages/profilePage';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signout());
  }
  return (
    <BrowserRouter>

      <div className="grid-container">
        <header className="ow navbar sticky-top">
          <div>
            <Link className="brand" to="/">
              <p className="display-3">TAPPY</p>
            </Link>
          </div>
          <div className="header-links">
            <Link to="/home">HOME</Link>
            <Link to="/shop">DOUGHNUTS</Link>
            <Link to="/icecream">ICE CREAM</Link>
            <Link to="/cookies">COOKIES</Link>
            <Link to="/cart">CART
            {cartItems.length > 0 && (
                <span className="badge"> {cartItems.length} </span>
              )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#"> {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                  </Link>
                  <ul className="dropdown-content list-group">
                    <li className="">
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li className="">
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li className="">
                      <Link to="#signOut" onClick={signOutHandler}>
                        Sign Out
                    </Link>
                    </li>
                  </ul>
                </div>
              ) :
                (
                  <Link to="/signin">Sign In</Link>
                )
            }
            {userInfo && userInfo.isAdmin && (
              <div className="">
                <Link to="#admin">Admin <i className="fa fa-caret-down"></i> </Link>
              </div>
            )}

          </div>
        </header>

        <main>
          <Route exact path="/signin" component={SigninPage}></Route>
          <Route exact path="/shop" component={ShopPage}></Route>
          <Route exact path="/product/:id" component={ProductPage}></Route>
          <Route exact path="/cart/:id?" component={CartPage}></Route>
          <Route exact path="/shipping" component={ShippingAddressPage}></Route>
          <Route exact path="/payment" component={PaymentPage}></Route>
          <Route exact path="/placeorder" component={PlaceOrderPage}></Route>
          <Route exact path="/order/:id" component={OrderPage}></Route>
          <Route exact path="/orderhistory" component={OrderHistoryPage}></Route>
          <PrivateRoute exact path="/profile" component={ProfilePage}></PrivateRoute>
        </main>

        <footer className="footer">
          <div className="container pt-5 border-bottom">
            <div className="ow">
              <div className="col-md-12 col-sm-12">
                <div className="col-md-3 col-sm-6 col-6 p-0 mb-3 float-left">
                  <h5 className="mb-4 font-weight-light text-uppercase">Social</h5>
                  <ul className="list-group list-group-horizontal">
                    <li className="list-group-item bg-transparent border-0 p-2 mb-2"><Link to=""><i className="fab fa-instagram"></i></Link></li>
                    <li className="list-group-item bg-transparent border-0 p-2 mb-2"><Link to=""><i className="fab fa-twitter"></i></Link></li>
                    <li className="list-group-item bg-transparent border-0 p-2 mb-2"><Link to=""><i className="fab fa-facebook-square"></i></Link></li>
                  </ul>
                </div>

                <div className="col-md-3 col-sm-6 col-6 p-0 float-left mb-3">
                  <h5 className="mb-4 font-weight-bold text-uppercase">Solutions</h5>
                  <ul className="list-group">
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to="">Sales</Link></li>
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to="">Project Management</Link></li>
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to="">Workforce</Link></li>
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to=""> E-Commerce</Link></li>
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to="">Finance</Link></li>
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to="">Business Apps</Link></li>
                  </ul>
                </div>

                <div className="col-md-3 col-sm-6 col-6 p-0 mb-3 float-left">
                  <h5 className="mb-4 font-weight-bold text-uppercase">Developers</h5>
                  <ul className="list-group">
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to="">Open Source</Link></li>
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to="">Technology</Link></li>
                  </ul>
                </div>

                <div className="col-md-3 col-sm-6 col-6 mb-3 p-0 float-left">
                  <h5 className="mb-4 font-weight-bold text-uppercase">Company</h5>
                  <ul className="list-group">
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to="">About</Link></li>
                    <li className="list-group-item bg-transparent border-0 p-0 mb-2"><Link to="">Blog</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <a className="mt-4" href="../privacy.html">
              <p className="text-center">© Tap |Privacy Policy|</p>
            </a>
          </div>

        </footer>
      </div>

    </BrowserRouter>
  );
}

export default App;
