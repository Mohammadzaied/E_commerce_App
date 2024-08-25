import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="container-fluid p-5 footer">
      <div className="row">
        <div className="col-lg-4 col-sm-12 p-2">
          <div className="d-flex">
            <img src="shopping.png" alt=""></img> <h3>E-Commerce</h3>{" "}
          </div>
        </div>

        <div className="col-lg-4 col-sm-12 p-2">
          <div>
            <h2>Contact</h2>
          </div>
          <hr></hr>
          <p>E : mohammad.zaied.8@gmail.com</p>
          <p>T : +(972)123456</p>
        </div>

        <div className="col-lg-4 col-sm-12 p-2">
          <div>
            <h2>Addres</h2>
          </div>
          <hr></hr>
          <p>8 Nablus , An-najah</p>
          <p>70063</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
