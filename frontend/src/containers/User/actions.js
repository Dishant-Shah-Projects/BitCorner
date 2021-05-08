import Axios from "axios";
import {BASE_URL} from '../../constants.js'

export const requestBankInfo = () => (dispatch) => {
    dispatch({type: "REQUEST_BANK_INFO_PENDING"})
    Axios.get((BASE_URL + "/bank"))
    .then((response) => response)
    .then((data) => dispatch ({type:"REQUEST_BANK_INFO_SUCCESS", payload: data}))
    .catch((error) => dispatch({type: "REQUEST_BANK_INFO_FAIL", payload: error}))
}