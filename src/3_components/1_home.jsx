/* eslint-disable react-hooks/exhaustive-deps */
import "./shared.css";
import Card from "../4_shared/card";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchhome } from "../6_redux_state_manegment/product";
import { useInView } from "react-intersection-observer";

function Home() {
  const { data, status, hasMore } = useSelector((state) => state.product.home);

  const dispatch = useDispatch();
  const { ref: loaderRef, inView } = useInView();

  if (hasMore && status !== "loading") {
    dispatch(fetchhome(data.length / 8 + 1));
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

  if (status === "loading" && data.length < 8) return loading;

  if (status === "failed" && data.length < 8) return error;

  return (
    <div className="p-3 pt-0">
      {/*Various Offers   */}
      <div>
        <div className="p-4 pt-0">
          <h3>Various Offers</h3>
        </div>

        <div className="row">
          <div className="list_offers">
            {data.map((card) => (
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

export default Home;
