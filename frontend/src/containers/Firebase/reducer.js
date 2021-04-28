const defaultState = {
  user: null,
  isLoggedIn: true,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { ...state, user: action.payload, isLoggedIn: true };
    case "SIGNOUT":
      return { ...state, user: null, isLoggedIn: false };
    default:
      return state;
  }
};
export default authReducer;
