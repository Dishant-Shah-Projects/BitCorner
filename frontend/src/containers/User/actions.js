import { ContactSupportOutlined } from "@material-ui/icons";
import Axios from "axios";

export const requestBankInfo = () => (dispatch) => {
  dispatch({ type: "REQUEST_BANK_INFO_PENDING" });
  Axios.get("/bank")
    .then((response) => response)
    .then((data) =>
      dispatch({ type: "REQUEST_BANK_INFO_SUCCESS", payload: data })
    )
    .catch((error) =>
      dispatch({ type: "REQUEST_BANK_INFO_FAIL", payload: error })
    );
};

export const requestUserInfo = () => (dispatch) => {
  dispatch({ type: "REQUEST_USER_INFO_PENDING" });
  Axios.get("/user")
    .then((response) => response)
    .then((data) =>
      dispatch({ type: "REQUEST_USER_INFO_SUCCESS", payload: data?.data })
    )
    .catch((error) =>
      dispatch({ type: "REQUEST_USER_INFO_FAIL", payload: error })
    );
};

export const requestUserBalance = () => (dispatch) => {
  dispatch({ type: "REQUEST_USER_BALANCE_PENDING" });
  Axios.get("/balance")
    .then((response) => response)
    .then((data) =>
      dispatch({ type: "REQUEST_USER_BALANCE_SUCCESS", payload: data })
    )
    .catch((error) =>
      dispatch({ type: "REQUEST_USER_BALANCE_FAIL", payload: error })
    );
};
export const requestOnUpdate = () => (dispatch) => {
  Axios.get("/balance")
    .then((response) => response)
    .then((data) =>
      dispatch({ type: "REQUEST_USER_BALANCE_SUCCESS", payload: data })
    )
    .catch((error) =>
      dispatch({ type: "REQUEST_USER_BALANCE_FAIL", payload: error })
    );
};
export const requestOrderInfo = () => (dispatch) => {
  dispatch({ type: "REQUEST_ORDER_INFO" });
  Axios.get("/order")
    .then((response) => response)
    .then((data) =>
      dispatch({ type: "REQUEST_ORDER_INFO_SUCCESS", payload: data })
    )
    .catch((error) =>
      dispatch({ type: "REQUEST_ORDER_INFO_FAIL", payload: error })
    );
};

export const requestAllOrderInfo = () => (dispatch) => {
  dispatch({ type: "REQUEST_ALL_ORDER_INFO" });
  Axios.get("/order/all")
    .then((response) => response)
    .then((data) =>
      dispatch({ type: "REQUEST_ALL_ORDER_INFO_SUCCESS", payload: data })
    )
    .catch((error) =>
      dispatch({ type: "REQUEST_ALL_ORDER_INFO_FAIL", payload: error })
    );
};

export const requestMarketPrice = () => (dispatch,getState) => {
  dispatch({ type: "REQUEST_MARKET_PRICE" });
  getState().auth.user.getIdToken(true).then((idToken) => {
    let headers = {'Authorization':`Bearer ${idToken}`};
    let url = process.env.REACT_APP_API_URL+'marketprice';
    fetch(url,{method:'GET',headers:headers})
    .then((response) => response.json()
    .then(data => {
        let marketPrice = {};
        data.forEach((item) => {
        marketPrice[item.id] = item;
    })
    dispatch({ type: "REQUEST_MARKET_PRICE_SUCCESS", payload: marketPrice })})) 
    .catch((error) =>
      dispatch({ type: "REQUEST_MARKET_PRICE_FAIL", payload: error })
    );
  });
};