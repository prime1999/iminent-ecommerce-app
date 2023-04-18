import { useState, useEffect, useRef, useContext } from "react";
import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { toast } from "react-toastify";
import CartContext from "../Context/CartContext";

const CardDesign = ({ product }) => {
  const [productCopy, setProductCopy] = useState({ ...product });
  const isMounted = useRef(true);
  const navigate = useNavigate();
  const { cart, cartDispatch } = useContext(CartContext);
  //update the productCopy data anf add the uerRef(userId) if a user is logged in
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setProductCopy({ ...productCopy, userRef: user.uid });
          //function to fetch cart data
          const fetchCart = async () => {
            try {
              //Create a ref to the cart collection in firebase
              const cartRef = collection(db, "cart");
              const q = query(
                cartRef,
                where("userRef", "==", auth.currentUser.uid),
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
              cartDispatch({ type: "GET_CART", payload: cart });
            } catch (error) {
              console.log(error);
            }
          };
          fetchCart();
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const checkIfItemIsAdded = async (Id) => {
    try {
      //check if item befor adding it to cart
      const itemExists = cart.some((item) => item?.data?.productId === Id);
      if (itemExists) {
        cartDispatch({ type: "CHECK_CART", payload: true });
      } else {
        cartDispatch({ type: "CHECK_CART", payload: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container font-poppins">
      <div
        onClick={() => checkIfItemIsAdded(product.id)}
        className="relative mx-4 w-[220px] border h-[400px] bg-white  my-4 hover:shadow-xl"
      >
        <Link to={`/product-details/${product.id}`}>
          <div className="flex justify-center items-center pt-8">
            <img src={product.image} alt="" className="w-[150px]" />
          </div>
          <div className="absolute bottom-0 bg-white p-4 w-full">
            <h2 className="font-bold text-md">{product.title}</h2>
            <p className="my-2 text-darkGray">{`$${product.price}`}</p>
            <div className="flex justify-between mb-4">
              <Rating name="read-only" value={product.rating.rate} readOnly />
              <p className="text-darkGray font-lato">
                ({product.rating.count})
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CardDesign;
