export const TimeReducer = (state, action) => {
  switch (action.type) {
    case "COUNT_DOWN":
      return {
        ...state,
        countDown: action.payload,
      };
    case "STOP_COUNT":
      return {
        ...state,
        countDown: action.payload,
      };
    default:
      return state;
  }
};
