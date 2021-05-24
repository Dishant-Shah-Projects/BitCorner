const defaultState = {
    isPending: false,
    currencies:[],
    error: ''
}

export const currencyReducer = (state= defaultState, action={}) => {
    switch(action.type){
        case "REQUEST_CURRENCY_INFO_PENDING":
            return Object.assign({}, state, {isPending: true});
        case "REQUEST_CURRENCY_INFO_SUCCESS":
            console.log("DEBUG HERE");
            console.log(action.payload);
            return Object.assign({}, state, {currencies: action.payload});
        case "REQUEST_CURRENCY_INFO_FAIL":
            return Object.assign({}, state, {error: action.payload});
        default:
            return state
    }
}
const defState = {
    isPending: false,
    bills:[],
    error: ''
}
export const billReducer = (state= defState, action={}) => {
    switch(action.type){
        case "REQUEST_BILL_INFO_PENDING":
            return Object.assign({}, state, {isPending: true});
        case "REQUEST_BILL_INFO_SUCCESS":
            return Object.assign({}, state, {isPending: false, bills: action.payload});
        case "REQUEST_BILL_INFO_FAIL":
            return Object.assign({}, state, {isPending: true, error: action.payload});
        default:
            return state
    }
}
const defsState = {
    isPending: false,
    bills:[],
    error: ''
}
export const billPayReducer = (state= defsState, action={}) => {
    switch(action.type){
        case "REQUEST_BILL_PAY_INFO_PENDING":
            return Object.assign({}, state, {isPending: true});
        case "REQUEST_BILL_PAY_INFO_SUCCESS":
            return Object.assign({}, state, {isPending: false, bills: action.payload});
        case "REQUEST_BILL_PAY_INFO_FAIL":
            return Object.assign({}, state, {isPending: true, error: action.payload});
        default:
            return state
    }
}

const initialState = {
    isPending: false,
    allBills:[],
    error: ''
}

export const allBillsReducer = (state= initialState, action={}) => {
    switch(action.type){
        case "REQUEST_ALL_BILL_PENDING":
            return Object.assign({}, state, {isPending: true});
        case "REQUEST_ALL_BILL_SUCCESS":
            return Object.assign({}, state, {isPending: false, allBills: action.payload});
        case "REQUEST_ALL_BILL_FAIL":
            return Object.assign({}, state, {isPending: true, error: action.payload});
        default:
            return state
    }
}