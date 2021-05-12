const defaultState = {
  loading: 0,
  toastData: null,
};

const globalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "START_LOADER":
      return {
        ...state,
        loading: state.loading + 1,
      };
    case "STOP_LOADER":
      return {
        ...state,
        loading: state.loading - 1,
      };
    case "SET_TOAST_DATA":
      return {
        ...state,
        toastData: action.payload,
      };
    case "CLEAR_TOAST_DATA":
      return {
        ...state,
        toastData: null,
      };
    default:
      return state;
  }
};
export default globalReducer;
