const defaultState = {
  isPending: true,
  userInfo: {},
  error: "",
  isLoaded: false,
};

const userInfoReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "REQUEST_USER_INFO_PENDING":
      return Object.assign({}, state, { isLoaded: false });
    case "REQUEST_USER_INFO_SUCCESS":
      return Object.assign({}, state, {
        userInfo: action.payload,
        isPending: false,
        isLoaded: true,
      });
    case "REQUEST_USER_INFO_FAIL":
      return Object.assign({}, state, {
        error: action.payload,
        isPending: true,
        isLoaded: true,
      });
    default:
      return state;
  }
};

export default userInfoReducer;
