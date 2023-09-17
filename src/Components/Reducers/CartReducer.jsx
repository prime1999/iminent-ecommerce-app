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

    case "TOTAL_PRICE":
      return {
        ...state,
        totalPrice: action.payload,
      };
    case "INCREMENT":
      return {
        ...state,
        count: state.count++,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count--,
      };
  }
};
