import React, { useEffect, useRef, useState } from "react";
import Card from "../4_shared/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchMobiles } from "../6_redux_state_manegment/product";
import { useInView } from "react-intersection-observer";

function Mobiles() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSortOrder, setSelectedSortOrder] = useState("mix");

  const { data, status, hasMore } = useSelector((state) => state.product.mobiles);

  const dispatch = useDispatch();
  const { ref: loaderRef } = useInView();

  if (hasMore && status !== "loading") {
    dispatch(fetchMobiles(data.length / 8 + 1));
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
      {/*mobiles   */}
      <div>
        <div className="p-4 pt-0 d-flex">
          <h3 className="me-auto">Mobiles Offers</h3>
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
              <option value="samsung">Samsung</option>
              <option value="iphone">Iphone</option>
              <option value="xiaomi">Xiaomi</option>
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

export default Mobiles;
