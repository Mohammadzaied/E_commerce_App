import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { add_remove_product_watch } from "../6_redux_state_manegment/userReducer";
export const StarIcon = ({ count }) => {
  const stars = Array.from({ length: count }, (_, index) => <i key={index} style={{ color: "#FFCD4E", fontSize: "24px" }} className="bi bi-star-fill ps-1"></i>);
  return <div>{stars}</div>;
};

const Card = ({ id, img, description, discount, color, size, price, evaluation, title }) => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  useEffect(() => {}, []);

  // const handleButtonClick_by = () => {};
  const dispatch = useDispatch();
  const fill = useSelector((state) => state.user.product_watch.data);
  const user_id = useSelector((state) => state.user.login.user_data);
  const id_product = id;
  const handleButtonClick_watch = () => {
    dispatch(add_remove_product_watch({ id_product, user_id }));
  };
  const [image, setimage] = useState(img[0]);
  return (
    <div className="p-2" data-aos="">
      <div className="card" style={{ width: "300px", height: "530px" }}>
        <span className=" m-3 p-2 badge rounded-pill bg-danger" style={{ width: "80px" }}>
          {discount}% off
        </span>

        <Link to={`/details/${id}`}>
          <img src={`data:image/jpeg;base64,${image}`} className="p-1" alt="..." style={{ height: "250px", width: "300px" }}></img>
        </Link>
        <div className="card-body" style={{ margin: 0, padding: 0, paddingLeft: "10px" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {title}
          </span>

          <StarIcon count={evaluation} />

          <div className="">
            {color
              ? color.map((co, index) => <button key={co} type="button" className="btn btn-circle border btn-md me-2 p-3" style={{ backgroundColor: co }} onMouseEnter={() => setimage(img[index])} onMouseLeave={() => setimage(img[0])}></button>)
              : null}
          </div>

          <div className="mt-2">
            {size
              ? size.map((co) => (
                  <span key={co} className="badge rounded-pill bg-secondary me-1 p-2">
                    {co}
                  </span>
                ))
              : null}
          </div>

          <p
            style={{
              paddingTop: "5px",
              color: "#EA4F69",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {price}$
          </p>
          <div
            className="d-flex justify-content-center position-absolute"
            style={{
              right: "10px",
              bottom: "10px",
            }}
          >
            <button className="btn btn-light border border-danger px-3 me-2 text-danger fs-4" onClick={handleButtonClick_watch}>
              <i className={fill.includes(id) ? "bi bi-heart-fill" : "bi bi-heart"}></i>
            </button>

            <Link
              to={`/details/${id}`}
              className="btn btn-light  border border-danger px-3"
              style={{
                color: "#EA4F69",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Details
            </Link>

            {/* "bi bi-heart-fill": */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
