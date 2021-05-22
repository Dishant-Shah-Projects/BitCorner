import Axios from "axios";


export const requestCurrencyInfo = () => (dispatch) => {
    dispatch({type: "REQUEST_CURRENCY_INFO_PENDING"})
    Axios.get(("/currency"))
    .then((response) =>response)
    .then((data) => dispatch ({type:"REQUEST_CURRENCY_INFO_SUCCESS", payload: data.data}))
    .catch((error) => dispatch({type: "REQUEST_CURRENCY_INFO_FAIL", payload: error}))
}
export const requestBillInfo = () => (dispatch) => {
    dispatch({type: "REQUEST_BILL_INFO_PENDING"})
    Axios.get(("/bill/own"))
    .then((response) => response)
    .then((data) => dispatch ({type:"REQUEST_BILL_INFO_SUCCESS", payload: data.data}))
    .catch((error) => dispatch({type: "REQUEST_BILL_INFO_FAIL", payload: error}))
}
export const requestBillPayInfo = () => (dispatch) => {
    dispatch({type: "REQUEST_BILL_PAY_INFO_PENDING"})
    Axios.get(("/bill/pay"))
    .then((response) => response)
    .then((data) => dispatch ({type:"REQUEST_BILL_PAY_INFO_SUCCESS", payload: data.data}))
    .catch((error) => dispatch({type: "REQUEST_BILL_PAY_INFO_FAIL", payload: error}))
}