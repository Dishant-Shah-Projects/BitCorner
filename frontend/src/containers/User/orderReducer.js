const defaultState = {
    orderInfo:[],
    error: ''
}

const orderReducer = (state= defaultState, action={}) => {
    switch(action.type){
        case "REQUEST_ORDER_INFO":
            return Object.assign({}, state, {});
        case "REQUEST_ORDER_INFO_SUCCESS":
            return Object.assign({}, state, {orderInfo: action.payload});
        case "REQUEST_ORDER_INFO_FAIL":
            return Object.assign({}, state, {error: action.payload});
        default:
            return state
    }
}

export default orderReducer;