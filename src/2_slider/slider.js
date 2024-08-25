import React from "react";
import "./slider.css";

function Slider() {
  return (
    <div className="pt-0  mt-3" style={{ height: "300px" }}>
      {/*carousel   */}
      <div className="row px-5 pt-0">
        <div className="col-12">
          <div className="card w-100">
            <div className="card-text p-3"></div>
            <div className="card-body">
              <div style={{ height: "200px" }} id="carouselExampleIndicators1" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="0" className="active" aria-label="Slide 1" aria-current="true"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
                </div>

                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="d-flex">
                      <div className="">
                        <div>
                          <h1>50% Off For Your First</h1>
                        </div>
                        <div>
                          <h1>Shopping</h1>
                        </div>
                        <p className="pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.</p>
                      </div>
                      <div className="">
                        {" "}
                        <img src="slide-3.png" className="d-block w-100" alt="..."></img>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="d-flex">
                      <div className="">
                        <div>
                          <h1>50% Off For Your First</h1>
                        </div>
                        <div>
                          <h1>Shopping</h1>
                        </div>
                        <p className="pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.</p>
                      </div>
                      <div className="">
                        <img src="slide-2.png" className="d-block w-100" alt="..."></img>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="d-flex">
                      <div className="">
                        <div>
                          <h1>50% Off For Your First</h1>
                        </div>
                        <div>
                          <h1>Shopping</h1>
                        </div>
                        <p className="pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.</p>
                      </div>
                      <div className="my-auto">
                        {" "}
                        <img src="slide-1.png" className="d-block w-100" alt="..."></img>
                      </div>
                    </div>
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

export default Slider;
