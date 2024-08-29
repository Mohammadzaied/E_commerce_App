/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Card from "../4_shared/card";
import "./shared.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatches } from "../6_redux_state_manegment/product";
import { useInView } from "react-intersection-observer";

function Watches() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSortOrder, setSelectedSortOrder] = useState("mix");
  //const dispatch = useDispatch();
  const { data, status, hasMore } = useSelector((state) => state.product.watches);

  const dispatch = useDispatch();
  const { ref: loaderRef, inView } = useInView();

  if (hasMore && status !== "loading") {
    dispatch(fetchWatches(data.length / 8 + 1));
  }

  const loading = (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const error = (
    <div className="d-flex justify-content-center align-items-center">
      <p>Error load Data</p>
    </div>
  );

  // filter type
  let filteredCards = selectedType === "all" ? data : data.filter((cards) => cards.brand.toLowerCase() === selectedType.toLowerCase());

  // filter price
  filteredCards = [...filteredCards].sort((a, b) => {
    if (selectedSortOrder === "lowest") {
      return a.price - b.price;
    } else if (selectedSortOrder === "highest") {
      return b.price - a.price;
    } else {
      return null;
    }
  });
  const handleSelectChange = (e, setFilter) => {
    setFilter(e.target.value);
  };
  if (status === "loading" && data.length < 8) return loading;

  if (status === "failed" && data.length < 8) return error;

  return (
    <div className="p-3 pt-0">
      {/*Watches   */}
      <div>
        <div className="p-4 pt-0 d-flex">
          <h3 className="me-auto">Watch Offers</h3>
          <div className="d-flex">
            <label
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginRight: "5px",
              }}
            >
              Price:{" "}
            </label>
            <select style={{ height: "30px", marginRight: "30px" }} id="priceFilter" value={selectedSortOrder} onChange={(e) => handleSelectChange(e, setSelectedSortOrder)}>
              <option value="mix">Mix</option>
              <option value="lowest">Lowest Price</option>
              <option value="highest">Highest Price</option>
            </select>

            <label
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginRight: "5px",
              }}
            >
              Type:
            </label>
            <select style={{ height: "30px", marginRight: "30px" }} id="typeFilter" value={selectedType} onChange={(e) => handleSelectChange(e, setSelectedType)}>
              <option value="all">All</option>
              <option value="Rolex">Rolex</option>
              <option value="Smart">Smart</option>
              <option value="Apple">Apple</option>
              <option value="Smart">Smart</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="Trouvaille">Trouvaille</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="list_offers">
            {filteredCards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
            <div ref={loaderRef} />
          </div>
        </div>
        {status === "loading" && loading}
        {status === "failed" && error}
      </div>
    </div>
  );
}

export default Watches;
