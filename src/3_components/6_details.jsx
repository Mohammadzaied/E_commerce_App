import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StarIcon } from "../4_shared/card";
import { add_product_by } from "../6_redux_state_manegment/userReducer";
import { search_item } from "../6_redux_state_manegment/product";

function Details() {
  const { id_product } = useParams();
  const dispatch = useDispatch();
  const [selectedindexcolor, setcolor] = useState(0);
  const [selectedindexsize, setsize] = useState(0);
  const user_id = useSelector((state) => state.user.login.user_data);
  const product = useSelector((state) => state.product.searchResults[0]);
  const { error, status } = useSelector((state) => state.user.add_pro);

  //const { status } = useSelector((state) => state.user.product_watch);
  const handleColorChange = (index) => {
    setcolor(index);
  };
  const handleSizeChange = (index) => {
    setsize(index);
  };
  const handleButtonClick = (product) => {
    const data = {
      Userid: user_id,
      Productid: id_product,
      ...(product.color && {
        color: product.color[selectedindexcolor],
      }),
      ...(product.size && {
        size: product.size[selectedindexsize],
      }),
    };
    dispatch(add_product_by(data));
  };
  useEffect(() => {
    dispatch(search_item([id_product]));
    console.log("product det", product);
    window.scrollTo(0, 0);
  }, [dispatch, id_product, product]);
  if (!product) return <div>.....lodaing</div>;
  return (
    <div>
      <div className="row">
        <div className="col  m-3">
          <div id="carouselExampleControls" className="carousel carousel-dark slide border" data-ride="carousel">
            <div className="carousel-indicators">
              {product.img.map((image, index) => (
                <button key={index} type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to={`${index}`} className={`${index === 0 ? " active" : ""}`} aria-label="Slide 1" aria-current="true"></button>
              ))}
            </div>
            <div className="carousel-inner">
              {product.img.map((image, index) => (
                <div key={index} className={`carousel-item${index === 0 ? " active" : ""}`}>
                  <img src={`data:image/jpeg;base64,${image}`} className="d-block w-100" alt="" style={{ height: "450px", width: "450px" }}></img>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <div className="col m-3">
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <h1>{product.title}</h1>
              <StarIcon count={product.evaluation} />
              <p style={{ fontSize: "25px", fontWeight: "bold" }}>{product.price}$</p>
            </div>
            <div className="" style={{ minWidth: "270px" }}>
              {product.color ? (
                <div>
                  <div>
                    <span className="fw-bold fs-4">Selected Color: </span> <span className="fw-bold fs-5">{product.color[selectedindexcolor].toUpperCase()}</span>
                  </div>
                  <div className="px-3 py-2 border rounded bg-secondary" style={{ width: "fit-content" }}>
                    {product.color.length > 0
                      ? product.color.map((co, index) => (
                          <button
                            key={index}
                            type="button"
                            className="btn btn-circle btn-lg ms-2"
                            style={{
                              backgroundColor: co,
                              border: selectedindexcolor === index ? "2px solid red" : "none",
                            }}
                            onClick={() => handleColorChange(index)}
                          ></button>
                        ))
                      : null}
                  </div>
                </div>
              ) : null}
              {product.size ? (
                <div>
                  <div>
                    <span className="fw-bold fs-4">Selected Size: </span> <span className="fw-bold fs-">{product.size[selectedindexsize].toUpperCase()}</span>
                  </div>
                  <div className="py-2 ">
                    {product.size
                      ? product.size.map((co, index) => (
                          <button
                            key={index}
                            type="button"
                            className="btn btn-rectangle btn-md ms-2"
                            style={{
                              backgroundColor: "gray",
                              border: selectedindexsize === index ? `2px solid red` : "none",
                            }}
                            onClick={() => handleSizeChange(index)}
                          >
                            {product.size[index].toUpperCase()}
                          </button>
                        ))
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <hr></hr>
          <p>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>Description :</span> {product.description}
          </p>
          <hr></hr>
          <div className="text-center">
            <button
              className="btn btn-light border ps-5 pe-5"
              style={{
                color: "#EA4F69",
                fontSize: "30px",
                fontWeight: "bold",
              }}
              onClick={() => handleButtonClick(product)}
            >
              Add to <i className="bi bi-cart-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
