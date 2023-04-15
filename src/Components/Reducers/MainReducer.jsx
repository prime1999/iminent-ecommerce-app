export const MainReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case "GET_VIEWED":
      return {
        ...state,
        viewed: action.payload,
        loading: false,
      };
    case "GET_DATA":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "SET_LINK":
      return {
        ...state,
        shareLinkCopied: action.payload,
      };
    default:
      return state;
  }
};
