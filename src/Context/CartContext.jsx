import { createContext, useReducer } from "react";
import { CartReducer } from "../Components/Reducers/CartReducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialState = {
    cart: null,
    product: {},
    count: 1,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);
  return (
    <CartContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
