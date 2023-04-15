import { useContext, useEffect } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import { Link, useParams } from "react-router-dom";
import { BiCartDownload } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import Maincontext from "../Context/MainContext";

const ProductDetails = () => {
  const { data, shareLinkCopied, dispatch, loading } = useContext(Maincontext);

  const params = useParams();
  useEffect(() => {
    const getData = async (id) => {
      const { data } = await axios(`https://fakestoreapi.com/products/${id}`);
      console.log(data);
      dispatch({ type: "GET_DATA", payload: data });
    };

    getData(+params.productId);
  }, [params.productId]);

  if (loading) {
    return <h3>Loading</h3>;
  }

  return (
    <>
      <div className="w-10/12 mx-auto p-4 px-16 h-full bg-white rounded-2xl drop-shadow-md">
        <div className="flex items-center justify-between">
          <div
            style={{
              background: `url(${data.image}) center no-repeat`,
              backgroundSize: "cover",
            }}
            className="w-[300px] h-[400px]"
          >
            <Tooltip
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                dispatch({ type: "SET_LINK", payload: true });
                setTimeout(() => {
                  dispatch({ type: "SET_LINK", payload: false });
                }, 2000);
              }}
              title={shareLinkCopied ? "copied" : "copy link"}
            >
              <IconButton>
                <BsFillShareFill className="text-black" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="font-poppins w-9/12 ml-8">
            <p className="text-orange font-bold text-sm mb-2">
              {data.category}
            </p>
            <h2 className="font-bold w-8/12 text-lg">{data.title}</h2>
            <p className="text-sm mt-4 mb-2">
              Brand:{" "}
              <Link to="/" className="text-blue">
                Iminent-store
              </Link>
            </p>
            <div className="flex items-center text-sm mb-2">
              <Rating name="read-only" value={data?.rating?.rate} readOnly />
              <p className="ml-4">({data?.rating?.count} verified ratings)</p>
            </div>
            <p className="text-sm text-darkGray">In stock</p>
            <h3 className="text-3xl mb-4 font-semibold mt-2">${data?.price}</h3>
            {/* <div>
              <form className="sizes">
                <input type="checkbox" id="small" />
                <label htmlFor="small">SM</label>
                <input type="checkbox" id="medium" />
                <label htmlFor="medium">M</label>
                <input type="checkbox" id="large" />
                <label htmlFor="large">L</label>
                <input type="checkbox" id="x-large" />
                <label htmlFor="x-large">XL</label>
              </form>
            </div> */}
            <div className="flex">
              <button className="flex justify-center items-center rounded-md bg-darkGray px-4 py-2 w-1/3 text-white hover:drop-shadow-md">
                <AiFillHeart className="text-2xl mr-2 text-white" />
                wishlist
              </button>
              <button className="flex justify-center items-center rounded-md w-1/3 bg-orange px-4 py-2 ml-8 text-white text-center hover:drop-shadow-lg">
                <BiCartDownload className="text-2xl mr-2" />
                <p>Add to cart</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-10/12 mx-auto h-full bg-white mt-4 rounded-2xl font-lato drop-shadow-md">
        <h2 className="text-xl font-bold p-4">Product Details</h2>
        <hr className="border-darkGray" />
        <p className="p-4">{data.description}</p>
      </div>
    </>
  );
};

export default ProductDetails;
