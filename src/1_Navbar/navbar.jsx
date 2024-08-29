import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../6_redux_state_manegment/userReducer";
import { useInView } from "react-intersection-observer";

// const LazyImage = ({ src, alt }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true, // Load the image only once when it first enters the viewport
//     threshold: 0.1, // When 10% of the image is in view, start loading
//   });

//   return <img ref={ref} src={inView ? src : "/path/to/placeholder.jpg"} alt={alt} style={{ width: "100%", height: "auto" }} />;
// };

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user.login);
  const { product_by } = useSelector((state) => state.user);
  const product_watch = useSelector((state) => state.user.product_watch.data);

  const dispatch = useDispatch();
  const handellogout = () => {
    window.location.reload();
    dispatch(logoutUser());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container-fluid">
          <a href="/" className="navbar-brand d-flex">
            <img src="shopping.png" alt=""></img>
            <h3>E-Commerce</h3>{" "}
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/watches">
                  Watches
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/mobiles">
                  Mobiles
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/clothes">
                  Clothes
                </NavLink>
              </li>
            </ul>
            <form className="d-flex search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
            {/* <div className="iconn"> */}
            <NavLink className="nav-link cart p-3" to={isAuthenticated ? "/cart" : "/login"}>
              <span className="badge rounded-pill badge-notification">
                <i className="iconn bi bi-bag-check-fill fs-1">
                  <span className="badge rounded-pill badge-notification bg-danger num">{isAuthenticated && !(product_by[0]?.id_user_p === null) ? product_by.length : null}</span>
                </i>
              </span>
            </NavLink>
            <NavLink className="nav-link cart p-3" to={isAuthenticated ? "/watch_list" : "/login"}>
              <span className="badge rounded-pill badge-notification">
                <i className="iconn bi bi-heart fs-1">
                  <span className="badge rounded-pill badge-notification bg-danger num">{isAuthenticated && product_watch.length > 0 ? product_watch.length : null}</span>
                </i>
              </span>
            </NavLink>

            {isAuthenticated ? (
              <button className="nav-link p-3 pe-0" onClick={handellogout}>
                <span className="badge rounded-pill badge-notification">
                  {/* <i class="bi bi-box-arrow-right"></i> */}
                  <i className="bi bi-box-arrow-right fs-1"></i>
                </span>
              </button>
            ) : (
              <NavLink className="nav-link p-3 pe-0" to="/login">
                <span className="badge rounded-pill badge-notification">
                  <i className="bi bi-person-circle fs-1"></i>
                </span>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
