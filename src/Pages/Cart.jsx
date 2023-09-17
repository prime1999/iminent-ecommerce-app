import { useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";
import CartDesign from "../Components/CartDesign";
import CartContext from "../Context/CartContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Components/Loader";

const Cart = () => {
  const { cart, count, totalPrice, loading, cartDispatch } =
    useContext(CartContext);
  useEffect(() => {
    const getCart = async () => {
      try {
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
    getCart();
  }, [cart]);

  useEffect(() => {
    const totalPrice = cart.reduce(
      (total, cart) => total + cart?.data?.price,
      0
    );
    cartDispatch({ type: "TOTAL_PRICE", payload: totalPrice });
  }, [cart, cartDispatch]);

  const handleDelete = async (id) => {
    //get the item to be deleted in firestore and delete it
    const docRef = doc(db, "cart", id);
    await deleteDoc(docRef);
    //update the cart to show on the UI
    const updatedCart = cart.filter((cart) => cart?.id !== id);
    cartDispatch({ type: "GET_CART", payload: updatedCart });
    //throw a success message if delete is successfull
    toast.success("Item removed from cart");
  };

  //Increase the counter by 1
  const handleIncrement = useCallback(
    async (id) => {
      try {
        //increase the count
        cartDispatch({ type: "INCREMENT" });
        //check for any item in the cart that have th id as the id passed in
        const item = cart.filter((cart) => cart.id === id);
        //get the quantity and price value from the item that matches the search
        const { quantity, price } = item[0].data;
        const { ...itemCopy } = item[0].data;
        //delete the quantity after iterating through the object
        delete itemCopy.quantity;
        //create the object to be passed to update the current one in firestore
        const newItem = {
          ...itemCopy,
          //calulate the price as the quantity increase
          price: Math.ceil(+((price * (quantity + 1)) / quantity)),
          quantity: quantity + 1,
        };
        //get a ref to the item to be updated in firestore and update it
        const docRef = doc(db, "cart", id);
        await updateDoc(docRef, newItem);
      } catch (error) {
        // Handle the error here, such as showing an error message to the user
        console.error("Error updating document:", error);
      }
    },
    [cartDispatch, cart, count]
  );
  //Decrease the counter by 1
  const handleDecrement = useCallback(
    async (id) => {
      try {
        //increase the count
        cartDispatch({ type: "DECREMENT" });
        //check for any item in the cart that have th id as the id passed in
        const item = cart.filter((cart) => cart.id === id);
        //get the quantity and price value from the item that matches the search
        const { quantity, price } = item[0].data;
        const { ...itemCopy } = item[0].data;
        //delete the quantity after iterating through the object
        delete itemCopy.quantity;
        //create the object to be passed to update the current one in firestore
        const newItem = {
          ...itemCopy,
          //calulate the price as the quantity increase
          price: +((price * (quantity - 1)) / quantity).toFixed(2),
          quantity: quantity - 1,
        };
        //get a ref to the item to be updated in firestore and update it
        const docRef = doc(db, "cart", id);
        await updateDoc(docRef, newItem);
      } catch (error) {
        // Handle the error here, such as showing an error message to the user
        console.error("Error updating document:", error);
      }
    },
    [cartDispatch, cart, count]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-11/12 mx-auto mt-4">
        <h1 className="text-3xl fint-poppins font-bold text-center mb-8">
          Your Cart{" "}
        </h1>
        {cart.length > 0 ? (
          <div className="flex">
            <div className="p-8 bg-white mr-4 shadow-md w-9/12">
              <AnimatePresence>
                {cart?.map((cart) => (
                  <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    key={cart.id}
                  >
                    <CartDesign
                      handleDecrement={handleDecrement}
                      handleIncrement={handleIncrement}
                      handleDelete={handleDelete}
                      cart={cart}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="bg-white shadow-md w-1/4 h-48 font-lato">
              <div className="py-4 px-4 border-b">
                <h1 className="font-bold uppercase">Order Summary</h1>
              </div>
              <div className="flex justify-between items-center py-4 px-4 border-b">
                <h3 className="font-bold">Subtotal</h3>
                <h1 className="font-bold text-lg">${totalPrice}</h1>
              </div>
              <div className="flex justify-center items-center py-4 px-4">
                <Link className="w-full text-center font-bold text-white rounded-md uppercase bg-[#FFA500] py-2 px-2 hover:bg-[#FF7518]">
                  <h1>Checkout (${totalPrice})</h1>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="font-poppins text-center">
              <h1 className="font-bold text-3xl mb-8">Your cart is empty</h1>
              <Link
                to="/"
                className="bg-orange font-semibold px-4 py-4 text-white rounded-md hover:bg-[#EC5800]"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
