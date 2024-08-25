import Navbar from "./1_Navbar/navbar";
import Slider from "./2_slider/slider";
import Home from "./3_components/1_home";
import Watches from "./3_components/2_watches";
import Mobiles from "./3_components/3_mobiles";
import Clothes from "./3_components/4_clothes";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./5_footer/footer";
import Add_cart from "./3_components/5_shopping_cart";
import Details from "./3_components/6_details";
import Login from "./7_registration_login/login";
import Registration from "./7_registration_login/login";
import Checkout from "./3_components/7_checkout";
import React, { useEffect } from "react";
import Items_watch from "./3_components/8_items_watch";
import { useDispatch, useSelector } from "react-redux";
import { fetchClothes, fetchhome, fetchMobiles, fetchWatches } from "./6_redux_state_manegment/product";
import { user_data } from "./6_redux_state_manegment/userReducer";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { home, clothes, mobiles, watches } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user.login);
  const id_user = useSelector((state) => state.user.login.user_data);

  const { status } = useSelector((state) => state.user.product_watch);

  useEffect(() => {
    //console.log(id_user);
    if (home.status === "idle") {
      //console.log("im in app home");
      dispatch(fetchhome());
    }
    if (clothes.status === "idle") {
      //console.log("im in app clothes");

      dispatch(fetchClothes());
    }
    if (mobiles.status === "idle") {
      //console.log("im in app mobiles");
      dispatch(fetchMobiles());
    }
    if (watches.status === "idle") {
      //console.log("im in app watches");
      dispatch(fetchWatches());
    }
    if (isAuthenticated && status === "idle") {
      dispatch(user_data(id_user));
    }
  }, [clothes.status, dispatch, home.status, id_user, isAuthenticated, mobiles.status, status, watches.status]);

  const location = useLocation();
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
