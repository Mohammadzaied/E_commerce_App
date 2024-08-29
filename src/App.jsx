import Navbar from "./1_Navbar/navbar";
import Slider from "./2_slider/slider";
import Home from "./3_components/1_home";
import Watches from "./3_components/2_watches";
import Mobiles from "./3_components/3_mobiles";
import Clothes from "./3_components/4_clothes";

import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Footer from "./5_footer/footer";
import Add_cart from "./3_components/5_shopping_cart";
import Details from "./3_components/6_details";
import Login from "./7_registration_login/login";
import Registration from "./7_registration_login/registration";
import Checkout from "./3_components/7_checkout";
import React, { useEffect } from "react";
import Items_watch from "./3_components/8_items_watch";
import { useDispatch, useSelector } from "react-redux";
import { fetchClothes, fetchhome, fetchMobiles, fetchWatches } from "./6_redux_state_manegment/product";
import { user_data } from "./6_redux_state_manegment/userReducer";
import { jwtDecode } from "jwt-decode";

// const useRouteChange = (callback) => {
//   const location = useLocation();
//   console.log("enter");

//   useEffect(() => {
//     callback(location);
//   }, [location, callback]);
// };

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { home, clothes, mobiles, watches } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user.login);
  const id_user = useSelector((state) => state.user.login.user_data);
  const { token } = useSelector((state) => state.user.login);
  const { status } = useSelector((state) => state.user.product_watch);

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
    try {
      const decodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      //console.log(decodedToken.exp < currentTime);

      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  useEffect(() => {
    console.log("Navigated to:", location.pathname);

    if (isTokenExpired(token) && token) {
      localStorage.clear();
      navigate("/login");
    }
  }, [location, token, navigate]);

  useEffect(() => {
    if (home.status === "idle") {
      dispatch(fetchhome(1));
    }
    if (clothes.status === "idle") {
      dispatch(fetchClothes(1));
    }
    if (mobiles.status === "idle") {
      dispatch(fetchMobiles(1));
    }
    if (watches.status === "idle") {
      dispatch(fetchWatches(1));
    }
    if (isAuthenticated && status === "idle") {
      dispatch(user_data(id_user));
    }
  }, [clothes.status, dispatch, home.status, id_user, isAuthenticated, mobiles.status, status, watches.status]);

  const iscart = location.pathname === "/cart";
  const isdetails = location.pathname.startsWith("/details");
  const isLogin = location.pathname === "/login";
  const isregister = location.pathname === "/register";
  const ischeckout = location.pathname === "/checkout";
  const iswatch = location.pathname === "/watch_list";

  return (
    <div className="App">
      <React.Fragment>{!isLogin && !isregister && <Navbar />}</React.Fragment>

      <React.Fragment>{!iscart && !isdetails && !ischeckout && !isLogin && !isregister && !iswatch && <Slider />} </React.Fragment>
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/watches" Component={Watches} />
          <Route path="/mobiles" Component={Mobiles} />
          <Route path="/clothes" Component={Clothes} />
          <Route path="/cart" Component={Add_cart} />
          <Route path="/watch_list" Component={Items_watch} />
          <Route path="/register" Component={Registration} />
          <Route path="/login" Component={Login} />
          <Route path="/checkout" Component={Checkout} />
          <Route path="/details/:id_product" element={<Details />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
