import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./item_watch.css";
// import { add_item } from "../../redux/add_to_by";
// import { add_item_and_remove } from "../../redux/add_to_watch";
import "aos/dist/aos.css";
import Aos from "aos";
import { add_product_by, add_remove_product_watch } from "../6_redux_state_manegment/userReducer";
import { search_item } from "../6_redux_state_manegment/product";
export default function Items_watch() {
  // @ts-ignore
  //const list_to_watch=[];
  const data = useSelector((state) => state.user.product_watch.data);

  const status = useSelector((state) => state.user.product_watch.status);
  //const status_1 = useSelector((state) => state.product.clothes.status);
  // const status_2 = useSelector((state) => state.product.watches.status);
  // const status_3 = useSelector((state) => state.product.mobiles.status);
  const user_id = useSelector((state) => state.user.login.user_data);
  const dispatch = useDispatch();
  const list_to_watch = useSelector((state) => state.product.searchResults);

  // const list_to_watch = useMemo(() => {
  //   if (data.length > 0) {
  //     return [...filterProducts(clothes.data), ...filterProducts(mobiles.data), ...filterProducts(watches.data)];
  //   }
  //   return [];
  // }, [clothes.data, data, mobiles.data, watches.data]);

  useEffect(() => {
    if (data.length > 0 && status === "succeeded") {
      dispatch(search_item(data));
      console.log("data", data);
      //console.log("status", list_to_watch);
    }
  }, [data, dispatch, status]);

  const [selectedColorIndex, setSelectedColorIndex] = useState(list_to_watch.map(() => 0));
  const [selectedsizeIndex, setSelectedsizeIndex] = useState(list_to_watch.map(() => 0));

  const handleColorChange = (index, colorIndex) => {
    const newColorIndices = [...selectedColorIndex];
    newColorIndices[index] = colorIndex;
    setSelectedColorIndex(newColorIndices);
  };

  const handleSizeChange = (index, sizeIndex) => {
    const newSizeIndices = [...selectedsizeIndex];
    newSizeIndices[index] = sizeIndex;
    setSelectedsizeIndex(newSizeIndices);
  };

  const handleButtonClickby = (item, index) => {
    const data = {
      Userid: user_id,
      Productid: item.id,
      ...(item.color && {
        color: item.color[selectedColorIndex[index]],
      }),
      ...(item.size && {
        size: item.size[selectedsizeIndex[index]],
      }),
    };
    dispatch(add_product_by(data));
    handleButtonClickdelete(item);
  };

  const handleButtonClickdelete = (item) => {
    const data1 = {
      id_product: item.id,
      user_id: user_id,
    };
    if (list_to_watch.length === 1) dispatch(search_item([]));
    dispatch(add_remove_product_watch(data1));
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [data]);

  if (status === "loading" || (data.length > 0 && list_to_watch.length === 0))
    return (
      <div className="d-flex justify-content-center mt-5 align-items-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  else if (status === "failed")
    return (
      <div className="d-flex justify-content-center mt-5 align-items-center">
        <p>Error load Data</p>
      </div>
    );
  else if (status === "succeeded" && list_to_watch.length > 0)
    return (
      <div className="items-watch">
        {list_to_watch.map((item, index1) => (
          <div data-aos="fade-up" key={index1} className="pt-2 mx-5 mb-5">
            <div className="show-watch row border rounded border-danger">
              <div className="col-md-6 px-5">
                <div id={`carouselExampleIndicators${index1}`} className="carousel slide border" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                    {item.img.map((image, index) => (
                      <button key={index} type="button" data-bs-target={`#carouselExampleIndicators${index1}`} data-bs-slide-to={index} className={index === 0 ? "active bg-danger" : "bg-danger"} aria-label={`Slide ${index}`}></button>
                    ))}
                  </div>

                  <div className="carousel-inner">
                    {item.img.map((image, index) => (
                      <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                        <img src={`data:image/jpeg;base64,${image}`} className="p-1" alt="..."></img>
                      </div>
                    ))}
                  </div>

                  {item.img.length > 1 ? (
                    <React.Fragment>
                      <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${index1}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-danger" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>

                      <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${index1}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-danger" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </React.Fragment>
                  ) : null}
                </div>
              </div>

              <div className="col-md-6  py-2 px-5">
                <div className="fw-bold d-flex justify-content-center mb-2 fs-3">{item.title}</div>

                <div className="d-flex justify-content-between">
                  {item.color ? (
                    <div>
                      <div>
                        <span className="fw-bold fs-4">Selected Color: </span> <span className="fw-bold fs-5">{item.color[selectedColorIndex[index1]]}</span>
                      </div>

                      <div className="ms-3 py-2 border rounded bg-secondary">
                        {item.color.length > 0
                          ? item.color.map((co, index) => (
                              <button
                                key={index}
                                type="button"
                                className="btn btn-circle btn-lg ms-2"
                                style={{
                                  backgroundColor: co,
                                  border: selectedColorIndex[index1] === index ? "2px solid red" : "none",
                                }}
                                onClick={() => handleColorChange(index1, index)}
                              ></button>
                            ))
                          : null}
                      </div>
                    </div>
                  ) : null}

                  {item.size ? (
                    <div>
                      <div>
                        <span className="fw-bold fs-4">Selected Size: </span> <span className="fw-bold fs-">{item.size[selectedsizeIndex[index1]]}</span>
                      </div>

                      <div className="ms-3 py-2 ">
                        {item.size
                          ? item.size.map((co, index) => (
                              <button
                                key={index}
                                type="button"
                                className="btn btn-rectangle btn-md ms-2"
                                style={{
                                  backgroundColor: "gray",
                                  border: selectedsizeIndex[index1] === index ? `2px solid red` : "none",
                                }}
                                onClick={() => handleSizeChange(index1, index)}
                              >
                                {item.size[index]}
                              </button>
                            ))
                          : null}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <span className="fw-bold fs-4 py-3">Price: </span> <span className="fw-bold fs-4 text-danger">{item.price}$</span>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn  btn-lg my-1 fs-3 p-2" style={{ backgroundColor: "blue", color: "white" }} onClick={() => handleButtonClickby(item, index1)}>
                    Add To Cart <i className="bi bi-cart-fill"></i>
                  </button>
                  <button type="button" className="btn  btn-lg my-1 fs-3 p-2" style={{ backgroundColor: "red", color: "white" }} onClick={() => handleButtonClickdelete(item)}>
                    Delete <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  else return <div className="d-flex fs-3 mt-5  justify-content-center align-items-center text-danger">No Items in Watch List</div>;
}
