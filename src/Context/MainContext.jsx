import axios from "axios";
import { useEffect, createContext, useReducer } from "react";
import { MainReducer } from "../Components/Reducers/MainReducer";
import { auth } from "../firebase.config";

const Maincontext = createContext();

export const MainProvider = ({ children }) => {
  const initialState = {
    products: [],
    viewed: [],
    categories: [],
    data: {},
    shareLinkCopied: false,
    loading: true,
  };

  const [state, dispatch] = useReducer(MainReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios("https://fakestoreapi.com/products");
      dispatch({ type: "GET_PRODUCTS", payload: data });
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const res = await axios("https://fakestoreapi.com/products?limit=7");
      dispatch({ type: "GET_VIEWED", payload: res.data });
    };
    fetchRecentlyViewed();
  }, []);
  return (
    <Maincontext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </Maincontext.Provider>
  );
};

export default Maincontext;
