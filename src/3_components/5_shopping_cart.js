import { useDispatch, useSelector } from "react-redux";
//import { delete_item, update_quantity } from "../../redux/add_to_by";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { delete_product_by, update_quantity } from "../6_redux_state_manegment/userReducer";
import { Link } from "react-router-dom";

export default function Add_cart() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // @ts-ignore
  const { product_by } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.user.delete_pro);
  const status_2 = useSelector((state) => state.user.product_watch.status);

  const [items_deleted, setitem] = useState(0);

  const dispatch = useDispatch();
  const totalSum = product_by.reduce((sum, item) => sum + item.products.price * item.quantity, 0);

  useEffect(() => {
    console.log("status_2", status_2);
    console.log("product by", product_by);
  }, [product_by, status_2]);
  const onchange_q = (item, quantity) => {
    const data = {
      Userid: user_id,
      Productid: item.products.id,
      quantity: quantity,
      ...(item.color_selected && {
        color: item.color_selected,
      }),
      ...(item.size_selected && {
        size: item.size_selected,
      }),
    };
    dispatch(update_quantity(data));
  };
  const user_id = useSelector((state) => state.user.login.user_data);

  const delete_items = (item, index) => {
    //console.log(item);
    setitem(index);
    const data = {
      id_user_p: item.id,
      Userid: user_id,
      Productid: item.products.id,
      ...(item.color_selected && {
        color: item.color_selected,
      }),
      ...(item.size_selected && {
        size: item.size_selected,
      }),
    };
    //console.log(data);
    dispatch(delete_product_by(data));
  };
  if (status_2 === "loading")
    return (
      <div className="d-flex justify-content-center mt-5 align-items-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  else if (status_2 === "failed")
    return (
      <div className="d-flex justify-content-center mt-5 align-items-center">
        <p>Error load Data</p>
      </div>
    );
  else if (status_2 === "succeeded" && product_by.length > 0)
    return (
      <div className="row" style={{ marginTop: "10px" }}>
        <div className="col-md-8 ">
          {product_by.map((item, index) => (
            <div data-aos="fade-right" key={index} className="row container my-2 mx-2 rounded  border-secondary  border shadow position-relative">
              {index === items_deleted && (
                <div key={index} className="loading" style={{ display: status === "loading" ? "flex" : "none" }}>
                  <div className="spinner-border text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              <div className="col-sm-8 d-flex">
                <img className="border" src={`data:image/jpeg;base64,${item.products.img[item.color_selected ? item.products.color.indexOf(item.color_selected) : 0]}`} height={"200px"} width={"200px"} alt="..."></img>
                <div className="p-3">
                  <h2>{item.products.title}</h2>
                  {item.color_selected && <h4>Color :{item.color_selected}</h4>}
                </div>
              </div>

              <div className="col-sm-4">
                <div className="row ">
                  {item.size_selected && <div className="col text-danger fw-bold">Size</div>}
                  <div className="col text-danger fw-bold">Price</div>
                  <div className="col text-danger fw-bold">Qty</div>
                  <div className="col text-danger fw-bold">Subtotal</div>
                </div>

                <hr></hr>

                <div className="row ms-1   ">
                  {item.size_selected && <div className="col">{item.size_selected}</div>}
                  <div className="col">{item.products.price}</div>
                  <input className="col border rounded" type="number" value={item.quantity} min={1} onChange={(e) => onchange_q(item, e.target.value)}></input>
                  <button className="col btn  text-danger" onClick={() => delete_items(item, index)}>
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                  {/* <div className="col">{item.quantity * item.price}</div> */}
                </div>

                <hr></hr>
              </div>
            </div>
          ))}
        </div>

        {product_by.length > 0 ? (
          <div className="col-md-4" style={{ minHeight: "300px" }}>
            <div className="container border rounded border-secondary my-2 p-3 shadow">
              <div className="d-flex justify-content-center">
                <div className="text-danger fw-bold fs-4">Summary ({product_by.length} items)</div>
              </div>

              <hr></hr>

              <div className="d-flex justify-content-between px-2">
                <div className="text-danger fs-4 fw-bold">Full Price Total</div>
                <div className="fs-5 fw-bold">{totalSum}$</div>
              </div>

              <hr></hr>
              <div className="mt-5 d-flex justify-content-end">
                <Link className="btn  bg-danger text-white" to="/checkout">
                  Check out
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  else return <div className="d-flex fs-3 mt-5  justify-content-center align-items-center text-danger">No Items in By List</div>;
}
