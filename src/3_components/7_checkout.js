import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setcvv] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const date_regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  const form = useRef(null);
  const nameInput = useRef(null);
  const addressInput = useRef(null);
  const cardInput = useRef(null);
  const dateInput = useRef(null);
  const cvvInput = useRef(null);
  const postalInput = useRef(null);

  const nextStep = (num) => {
    //step 1 validation
    if (num === 1) {
      nameInput.current.classList.remove("is-invalid");
      addressInput.current.classList.remove("is-invalid");
      if (!shippingName.trim()) {
        nameInput.current.classList.add("is-invalid");
      }
      if (!shippingAddress.trim()) {
        addressInput.current.classList.add("is-invalid");
      }
      if (shippingAddress.trim() && shippingName.trim()) {
        setStep(step + 1);
      }
    }

    //step 2 validation
    else {
      cardInput.current.classList.remove("is-invalid");
      dateInput.current.classList.remove("is-invalid");
      cvvInput.current.classList.remove("is-invalid");
      postalInput.current.classList.remove("is-invalid");

      if (!cardNumber.trim() || cardNumber.length < 13) {
        cardInput.current.classList.add("is-invalid");
      }
      if (!expirationDate.trim() || !date_regex.test(expirationDate.trim())) {
        dateInput.current.classList.add("is-invalid");
      }
      if (!cvv.trim() || cvv.length < 4) {
        cvvInput.current.classList.add("is-invalid");
      }
      if (!postalcode.trim() || postalcode.length < 6) {
        postalInput.current.classList.add("is-invalid");
      }
      if (
        cardNumber.length >= 13 &&
        cvv.length >= 4 &&
        postalcode.length >= 6 &&
        cardNumber.trim() &&
        expirationDate.trim() &&
        date_regex.test(expirationDate.trim()) &&
        cvv.trim() &&
        postalcode.trim()
      ) {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setShippingName(value);
        nameInput.current.classList.remove("is-invalid");
        break;
      case "address":
        setShippingAddress(value);
        addressInput.current.classList.remove("is-invalid");
        break;
      case "card_number":
        setCardNumber(value);
        cardInput.current.classList.remove("is-invalid");
        break;
      case "date":
        setExpirationDate(value);
        dateInput.current.classList.remove("is-invalid");
        break;
      case "cvv":
        setcvv(value);
        cvvInput.current.classList.remove("is-invalid");
        break;
      case "postal":
        setpostalcode(value);
        postalInput.current.classList.remove("is-invalid");
        break;
      default:
        break;
    }
  };

  return (
    <div className="container p-5" style={{ marginTop: "100px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <form
                className="needs-validation"
                noValidate=""
                id="myForm"
                ref={form}
              >
                {step === 1 && (
                  <div className="row g-2">
                    <h2>Step 1: Shipping Information</h2>
                    <div className="col-12">
                      <label htmlFor="name">Name</label>
                      <div className="input-group has-validation">
                        <input
                          ref={nameInput}
                          type="text"
                          className="form-control"
                          name="name"
                          value={shippingName}
                          onChange={handleInputChange}
                          required=""
                        />
                        <div className="invalid-feedback">Please Set Name.</div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <div className="input-group has-validation">
                        <input
                          ref={addressInput}
                          type="text"
                          className="form-control"
                          name="address"
                          value={shippingAddress}
                          onChange={handleInputChange}
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please Set Address.
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => nextStep(1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="row g-2">
                    <h2>Step 2: Payment Information</h2>
                    <div className="col-12">
                      <div className="d-flex">
                        <h6 className="text-muted me-auto">Payment method</h6>
                        <div>
                          <img
                            className="m-1"
                            src="visa.png"
                            alt=""
                            style={{ height: "30px", width: "40px" }}
                          ></img>
                          <img
                            className="m-1"
                            src="paypal.webp"
                            alt=""
                            style={{ height: "30px", width: "40px" }}
                          ></img>
                          <img
                            className="m-1"
                            src="mastercard.png"
                            alt=""
                            style={{ height: "30px", width: "40px" }}
                          ></img>
                        </div>
                      </div>
                      <label htmlFor="cardNumber">Card Number</label>
                      <div className="input-group has-validation">
                        <input
                          ref={cardInput}
                          placeholder="13 digit"
                          type="text"
                          className="form-control"
                          name="card_number"
                          value={cardNumber}
                          onChange={handleInputChange}
                          required=""
                        />
                        <div className="invalid-feedback">
                          {cardNumber.length > 0
                            ? "Please enter 13 digit"
                            : "Please Set Card number."}
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <label htmlFor="expirationDate" className="form-label">
                        Expiration Date
                      </label>
                      <div className="input-group has-validation">
                        <input
                          placeholder="MM/YY"
                          ref={dateInput}
                          type="text"
                          className="form-control"
                          name="date"
                          value={expirationDate}
                          onChange={handleInputChange}
                          required=""
                        />
                        <div className="invalid-feedback">
                          {expirationDate.length > 0
                            ? "Please Set Valid Date."
                            : "Please Set Expiration Date."}
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <label htmlFor="address" className="form-label">
                        CVV
                      </label>
                      <div className="input-group has-validation">
                        <input
                          ref={cvvInput}
                          placeholder="(4 digit)"
                          type="text"
                          className="form-control"
                          name="cvv"
                          value={cvv}
                          onChange={handleInputChange}
                          required=""
                        />
                        <div className="invalid-feedback">
                          {cvv.length > 0
                            ? "Please enter 4 digit"
                            : "Please Set Cvv."}
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <label htmlFor="address" className="form-label">
                        Postal Code
                      </label>
                      <div className="input-group has-validation">
                        <input
                          ref={postalInput}
                          placeholder="(6 digit)"
                          type="text"
                          className="form-control"
                          name="postal"
                          value={postalcode}
                          onChange={handleInputChange}
                          required=""
                        />
                        <div className="invalid-feedback">
                          {postalcode.length > 0
                            ? "Please enter 6 digit"
                            : "Please Set Postal Code."}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => nextStep(2)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2>Step 3: Confirmation</h2>
                    <p>Review your order details before confirming.</p>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                    <Link to="/" className="btn btn-success">
                      Confirm Purchase
                    </Link>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
