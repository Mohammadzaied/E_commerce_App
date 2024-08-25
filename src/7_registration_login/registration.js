import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SigninUser } from "../7_redux_data_add_cart/userReducer";

function Registration() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");

  const { error, status } = useSelector((state) => state.user.signin);

  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const form = useRef(null);
  const firstnameInput = useRef(null);
  const lastnameInput = useRef(null);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstname":
        setfirstname(value);
        firstnameInput.current.classList.remove("is-invalid");
        break;
      case "lastname":
        setlastname(value);
        lastnameInput.current.classList.remove("is-invalid");
        break;
      case "email":
        setemail(value);
        emailInput.current.classList.remove("is-invalid");
        break;
      case "password":
        setpassword(value);
        passwordInput.current.classList.remove("is-invalid");
        break;
      default:
        break;
    }
  };

  const validateForm = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    firstnameInput.current.classList.remove("is-invalid");
    lastnameInput.current.classList.remove("is-invalid");
    emailInput.current.classList.remove("is-invalid");
    passwordInput.current.classList.remove("is-invalid");

    if (!firstname.trim()) {
      firstnameInput.current.classList.add("is-invalid");
    }
    if (!lastname.trim()) {
      lastnameInput.current.classList.add("is-invalid");
    }
    if (!email.trim() || !emailRegex.test(email.trim())) {
      emailInput.current.classList.add("is-invalid");
    }

    if (!password.trim()) {
      passwordInput.current.classList.add("is-invalid");
    }

    if (
      firstname.trim() &&
      lastname.trim() &&
      email.trim() &&
      password.trim() &&
      emailRegex.test(email.trim())
    ) {
      dispatch(SigninUser({ email, password, firstname, lastname }));
    }
  };

  useEffect(() => {
    console.log(status);
    if (status === "succeeded") {
      navigate("/login");
    }
  }, [status, navigate]);

  return (
    <div>
      {error ? <div>{error}</div> : null}

      <div style={{ paddingTop: "10px" }} className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-4  p-3 pt-1 ">
            <div className="row">
              <div className="col-12 p-2  ">
                <div className="pt-3 pb-3 text-center">
                  <a className="login" href="/">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src="shopping.png"
                        className="me-3"
                        alt=""
                        width="60"
                        height="60"
                      ></img>
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
                    <form
                      ref={form}
                      className="row g-3 needs-validation"
                      noValidate=""
                      id="myForm"
                    >
                      <div className="col-12">
                        <label htmlFor="yourName" className="form-label">
                          Your Name
                        </label>
                        <input
                          ref={firstnameInput}
                          value={firstname}
                          onChange={handleInputChange}
                          type="text"
                          name="firstname"
                          className="form-control"
                          id="yourName"
                          required=""
                        ></input>
                        <div className="invalid-feedback">
                          Please, enter first name!
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourName" className="form-label">
                          Last Name
                        </label>
                        <input
                          ref={lastnameInput}
                          value={lastname}
                          onChange={handleInputChange}
                          type="text"
                          name="lastname"
                          className="form-control"
                          id="yourName"
                          required=""
                        ></input>
                        <div className="invalid-feedback">
                          Please, enter last name!
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">
                          Your Email
                        </label>
                        <input
                          ref={emailInput}
                          value={email}
                          onChange={handleInputChange}
                          type="email"
                          name="email"
                          className="form-control"
                          id="yourEmail"
                          required=""
                        ></input>
                        <div className="invalid-feedback">
                          Please enter a valid Email adddress!
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <input
                          ref={passwordInput}
                          value={password}
                          onChange={handleInputChange}
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          required=""
                        ></input>
                        <div className="invalid-feedback">
                          Please enter your password!
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            name="terms"
                            type="checkbox"
                            value=""
                            id="acceptTerms"
                          ></input>
                          <label
                            className="form-check-label"
                            htmlFor="acceptTerms"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-danger w-100"
                          type="submit"
                          onClick={validateForm}
                        >
                          Create Account
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Don't have account?
                          <a style={{ color: "rgb(151, 35, 35)" }} href="login">
                            Login
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

export default Registration;
