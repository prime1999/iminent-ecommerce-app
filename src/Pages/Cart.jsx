import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";
import CartDesign from "../Components/CartDesign";
import CartContext from "../Context/CartContext";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const Cart = () => {
  const { cart, loading, cartDispatch } = useContext(CartContext);
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
  }, []);

  const handleDelete = async (id) => {
    const docRef = doc(db, "cart", id);
    await deleteDoc(docRef);
    const updatedCart = cart.filter((cart) => cart?.id !== id);
    cartDispatch({ type: "GET_CART", payload: updatedCart });
    toast.success("Item removed from cart");
  };

  if (loading) {
    return <Loader />;
  }

  console.log(cart);

  return (
    <>
      <div className="w-11/12 mx-auto mt-4">
        <h1 className="text-3xl fint-poppins font-bold text-center mb-8">
          Your Cart{" "}
        </h1>
        {cart.length > 0 ? (
          <div className="flex">
            <div className="p-8 w-9/12">
              {cart?.map((cart) => (
                <div key={cart.id}>
                  <CartDesign handleDelete={handleDelete} cart={cart} />
                </div>
              ))}
            </div>
            <div>dfv</div>
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
