import { createContext, useReducer } from "react";
import { CartReducer } from "../Components/Reducers/CartReducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialState = {
    cart: [],
    product: {},
    loading: true,
    totalPrice: 0,
    count: 1,
    exist: false,
  };

  const [state, cartDispatch] = useReducer(CartReducer, initialState);
  return (
    <CartContext.Provider
      value={{
        ...state,
        cartDispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
