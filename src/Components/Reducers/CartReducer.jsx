export const CartReducer = (state, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };
    case "CHECK_CART":
      return {
        ...state,
        exist: action.payload,
        loading: false,
      };
    case "INCREMENT":
      return {
        ...state,
        count: count++,
      };
    case "DECREMENT":
      return {
        ...state,
        count: count--,
      };
  }
};
