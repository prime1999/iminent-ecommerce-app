import axios from "axios";
import { useEffect, createContext, useReducer } from "react";
import { MainReducer } from "../Components/Reducers/MainReducer";

const Maincontext = createContext();

export const MainProvider = ({ children }) => {
  const initialState = {
    products: [],
    viewed: [],
    categories: [],
    category: ["mens clothing, womens clothing, jewelery, electronics"],
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

  //get products by category

  const getCategory = async (value) => {
    const { data } = await axios(
      `https://fakestoreapi.com/products/category/${value}`
    );
    dispatch({ type: "GET_PRODUCTS", payload: data });
  };

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const res = await axios("https://fakestoreapi.com/products?limit=7");
      dispatch({ type: "GET_VIEWED", payload: res.data });
    };
    fetchRecentlyViewed();
  }, []);

  useEffect(() => {
    const setHolder = () => {
      initialState.category.forEach((category) => {});
    };
    setHolder();
  });
  return (
    <Maincontext.Provider
      value={{
        ...state,
        getCategory,
        dispatch,
      }}
    >
      {children}
    </Maincontext.Provider>
  );
};

export default Maincontext;
