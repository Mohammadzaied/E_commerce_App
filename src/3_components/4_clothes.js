import "./shared.css";
import Card from "../4_shared/card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Clothes() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSortOrder, setSelectedSortOrder] = useState("mix");

  // const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product.clothes);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchClothes());
  //   }
  // }, [dispatch, status]);

  // filter type
  let filteredCards = selectedType === "all" ? data : data.filter((cards) => cards.brand === selectedType);

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
  if (status === "loading")
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (status === "failed")
    return (
      <div className="d-flex justify-content-center align-items-center">
        <p>Error load Data</p>
      </div>
    );

  return (
    <div className="p-3 pt-0">
      {/*Clothes Offers   */}
      <div>
        <div className="p-4 pt-0 d-flex">
          <h3 className="me-auto">Clothes Offers</h3>
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
              <option value="Dress">Dress</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Pullover">Pullover</option>
              <option value="Sweatpants">Helikon Tex</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="list_offers">
            {filteredCards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clothes;
