import axios from "axios";
import { useEffect, createContext, useReducer } from "react";
import { MainReducer } from "../Components/Reducers/MainReducer";

const Maincontext = createContext();

export const MainProvider = ({ children }) => {
  const initialState = {
    products: [],
    viewed: [],
    data: {},
    shareLinkCopied: false,
    loading: true,
  };

  const [state, dispatch] = useReducer(MainReducer, initialState);

  useEffect(() => {
    // setLoading(true);
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

  // useEffect(() => {
  //   const test = async () => {
  //     const { data } = await axios("https://fakestoreapi.com/carts");
  //     console.log(data);
  //   };
  //   test();
  // });

  console.log(state.products);

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
