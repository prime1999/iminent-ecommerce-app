import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import CartContext from "../Context/CartContext";

const Cart = () => {
  //const [cart, setCart] = useState(null);
  const { cart, dispatch } = useContext(CartContext);

  useEffect(() => {
    const getCart = async () => {
      try {
        const cartRef = collection(db, "cart");
        const q = query(cartRef, orderBy("timestamp", "desc"));
        const docSnap = await getDocs(q);
        let cart = [];
        docSnap.forEach((doc) => {
          return cart.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        dispatch({ type: "GET_CART", payload: cart });
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, []);
  return (
    <div>
      <h1>Cart </h1>
      {cart?.map((cart) => (
        <div key={cart.id}>
          <img src={cart?.data?.productImg} alt="" className="w-24" />
          <h1>{cart?.data?.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default Cart;
