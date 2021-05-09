const defaultState = {
  isPending: false,
  balanceInfo: {},
  error: "",
  isLoaded: false,
};

const userBalanceReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "REQUEST_USER_BALANCE_PENDING":
      return Object.assign({}, state, { isLoaded: false });
    case "REQUEST_USER_BALANCE_SUCCESS":
      return Object.assign({}, state, {
        balanceInfo: action.payload,
        isPending: false,
        isLoaded: true,
      });
    case "REQUEST_USER_BALANCE_FAIL":
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true,
        isLoaded: true,
      });
    default:
      return state;
  }
};

export default userBalanceReducer;
