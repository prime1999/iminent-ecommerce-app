import { useContext } from "react";
import Maincontext from "../Context/MainContext";
import CardDesign from "./CardDesign";
import Loader from "./Loader";

const Cards = () => {
  const { products, loading } = useContext(Maincontext);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="mt-4 font-poppins text-2xl font-bold">Shop</h1>
      <div className="mx-auto flex flex-wrap">
        {products.map((product) => (
          <div key={product.id}>
            <CardDesign product={product} />
          </div>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default Cards;
