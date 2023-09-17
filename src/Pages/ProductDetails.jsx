import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.config";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiCartDownload } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import Maincontext from "../Context/MainContext";
import CartContext from "../Context/CartContext";
import ProductSlider from "../Components/ProductSlider";
import Loader from "../Components/Loader";

const ProductDetails = () => {
  const { data, shareLinkCopied, dispatch, loading } = useContext(Maincontext);
  //const isMounted = useRef(true);
  const navigate = useNavigate();
  const { cart, exist, count, cartDispatch } = useContext(CartContext);

  const params = useParams();
  useEffect(() => {
    const getData = async (id) => {
      const { data } = await axios(`https://fakestoreapi.com/products/${id}`);
      dispatch({ type: "GET_DATA", payload: data });
    };
    getData(+params.productId);
  }, [params.productId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "SET_DATA", payload: user.uid });
        //function to fetch cart data
        const fetchCart = async () => {
          try {
            //Create a ref to the cart collection in firebase
            const cartRef = collection(db, "cart");
            const q = query(
              cartRef,
              where("userRef", "==", user.uid),
              orderBy("timestamp", "desc")
            );
            const docSnap = await getDocs(q);
            let cart = [];
            docSnap.forEach((doc) => {
              return cart.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            //set the current user's cart from firebase to the cart in the cart reducer for display
            cartDispatch({ type: "GET_CART", payload: cart });
          } catch (error) {
            console.log(error);
          }
        };
        fetchCart();
      }
    });

    return unsubscribe;
  }, [auth, cart, cartDispatch, dispatch]);

  useEffect(() => {
    //Function check if current item alreay exists in the firebase cart collection
    const checkExistedItem = () => {
      //check using the some method there ID
      const itemExists = cart.some(
        (item) => item?.data?.productId === +params.productId
      );
      //If exists set check cart in the cart reducer to true
      if (itemExists) {
        cartDispatch({ type: "CHECK_CART", payload: true });
      } else {
        //else set to false
        cartDispatch({ type: "CHECK_CART", payload: false });
      }
    };
    checkExistedItem();
  }, [params.productId, exist, cart]);

  if (loading) {
    return <Loader />;
  }

  const addProductToCart = async () => {
    try {
      //clone productCopy
      const addedProduct = {
        ...data,
        productId: data.id,
        timestamp: serverTimestamp(),
        productImg: data.image,
        quantity: count,
      };
      delete addedProduct.rating;
      delete addedProduct.image;
      delete addedProduct.id;
      //check if item before adding it to cart
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const itemExists = cart.some(
            (item) => item?.data?.productId === addedProduct.productId
          );
          if (!itemExists) {
            await addDoc(collection(db, "cart"), addedProduct);
            cartDispatch({ type: "CHECK_CART", payload: false });
            navigate("/cart");
            toast.success("Item has been added to cart");
          } else {
            cartDispatch({ type: "CHECK_CART", payload: true });
          }
        } else {
          navigate("/sign-in");
          toast.info("Please sign in to get a cart");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Delete item from cart
  const removeProduct = async () => {
    deleteDoc;
    cartDispatch({ type: "CHECK_CART", payload: false });
  };

  if (loading) {
    return <Loader />;
  }
  const rating = data?.rating?.rate;

  return (
    <>
      <div className="w-10/12 mx-auto p-4 px-16 h-full bg-white rounded-2xl drop-shadow-md">
        <div className="flex items-center justify-between">
          <div
            style={{
              backgroundImage: `url(${data?.image})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "250px",
            }}
            className="w-[350px] h-[400px]"
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
            <p className="text-orange font-bold text-sm mb-2 uppercase">
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
              <Rating name="read-only" value={rating} readOnly />
              <p className="ml-4">({data?.rating?.count} verified ratings)</p>
            </div>
            <p className="text-sm text-darkGray">In stock</p>
            <h3 className="text-3xl mb-4 font-semibold mt-2">${data?.price}</h3>
            <div className="flex">
              <button className="flex justify-center items-center rounded-md bg-darkGray px-4 py-2 w-1/3 text-white hover:drop-shadow-md">
                <AiFillHeart className="text-2xl mr-2 text-white" />
                wishlist
              </button>
              {exist ? (
                <Link
                  to="/cart"
                  onClick={removeProduct}
                  className="flex justify-center items-center rounded-md w-1/2 bg-orange px-4 py-2 ml-8 text-white text-center hover:drop-shadow-lg"
                >
                  <BiCartDownload className="text-3xl mr-2" />
                  <p className="text-md">Product Added to cart</p>
                </Link>
              ) : (
                <button
                  onClick={addProductToCart}
                  className="flex justify-center items-center rounded-md w-1/3 bg-orange px-4 py-2 ml-8 text-white text-center hover:drop-shadow-lg"
                >
                  <BiCartDownload className="text-2xl mr-2" />
                  <p>Add to cart</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-10/12 mx-auto h-full bg-white mt-4 rounded-2xl font-lato drop-shadow-md">
        <h2 className="text-xl font-bold p-4">Product Details</h2>
        <hr className="border-darkGray" />
        <p className="p-4">{data.description}</p>
      </div>
      <div>
        <ProductSlider data={data} />
      </div>
    </>
  );
};

export default ProductDetails;
