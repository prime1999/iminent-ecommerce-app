export const MainReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: [...state.category, action.payload],
        loading: false,
      };
    case "GET_VIEWED":
      return {
        ...state,
        viewed: action.payload,
        loading: false,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case "GET_DATA":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "SET_DATA":
      return {
        ...state,
        data: { ...state.data, userRef: action.payload },
        loading: false,
      };
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
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
