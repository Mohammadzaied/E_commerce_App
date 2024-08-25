import "./shared.css";
import Card from "../4_shared/card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  // const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product.home);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchClothes());
  //   }
  //   if (status === "succeeded") {
  //     dispatch(search_item(36));
  //   }
  //   //console.log("im in clothes");
  // }, [dispatch, status]);

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
