import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
import "./style.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../6_redux_state_manegment/userReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { isAuthenticated, status, error } = useSelector((state) => state.user.login);
  const form = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setemail(value);
      emailInput.current.classList.remove("is-invalid");
    } else if (name === "password") {
      setpassword(value);
      passwordInput.current.classList.remove("is-invalid");
    }
  };
  const validateForm = (event) => {
    event.preventDefault();

    // emailInput.current.classList.remove("is-invalid");
    // passwordInput.current.classList.remove("is-invalid");

    if (!email.trim()) {
      emailInput.current.classList.add("is-invalid");
    }

    if (!password.trim()) {
      passwordInput.current.classList.add("is-invalid");
    }

    if (email.trim() && password.trim()) {
      dispatch(authenticateUser({ email, password }));
    }
  };

  useEffect(() => {
    if (error === "Email or Password invalid") passwordInput.current.classList.add("is-invalid");

    if (isAuthenticated) {
      emailInput.current.classList.remove("is-invalid");
      passwordInput.current.classList.remove("is-invalid");
      navigate("/");
    }
  }, [error, isAuthenticated, navigate]);

  return (
    <div>
      <div style={{ paddingTop: "60px" }} className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-4  p-3 pt-1 ">
            <div className="row">
              <div className="col-12 p-2  ">
                <div className="pt-3 pb-3 text-center">
                  <a className="login" href="/">
                    <div className="d-flex justify-content-center align-items-center">
                      <img src="shopping.png" className="me-3" alt="" width="60" height="60"></img>
                      <h3>E-Commerce</h3>
                    </div>
                  </a>
                </div>

                <div className="card w-100">
                  <div className="card-text p-3 text-center">
                    <h4 className="login">Login to Your Account</h4>
                    <p>Enter your username & password to login</p>
                  </div>
                  <div className="card-body">
                    <form className="row g-3 needs-validation" noValidate="" id="myForm" ref={form}>
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">
                          email
                        </label>
                        <div className="input-group has-validation">
                          <input onChange={handleInputChange} type="email" name="email" className="form-control" id="email" required="" ref={emailInput}></input>
                          <div className="invalid-feedback">{"Please set valid email."}</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <input onChange={handleInputChange} type="password" name="password" className="form-control" id="yourPassword" required="" ref={passwordInput}></input>
                        <div className="invalid-feedback">
                          {error === "Email or Password invalid" ? "Email or Password invalid" : null}
                          {password.length === 0 ? " Please enter your password!" : null}
                        </div>
                        {/* <div className="invalid-feedback">
                          {error ? "ffffffff" : null}
                        </div> */}
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required=""></input>
                          <label className="form-check-label" htmlFor="acceptTerms">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-danger w-100" type="submit" disabled={status === "loading"} onClick={validateForm}>
                          {status === "loading" ? (
                            <div className="spinner-border text-white" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Don't have account?
                          <a style={{ color: "rgb(151, 35, 35)" }} href="/register">
                            Create an account
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
