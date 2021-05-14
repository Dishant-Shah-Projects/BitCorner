const defaultState = {
    orderInfo:[],
    error: ''
}

const allOrderReducer = (state= defaultState, action={}) => {
    switch(action.type){
        case "REQUEST_ALL_ORDER_INFO":
            return Object.assign({}, state, {});
        case "REQUEST_ALL_ORDER_INFO_SUCCESS":
            return Object.assign({}, state, {orderInfo: action.payload});
        case "REQUEST_ALL_ORDER_INFO_FAIL":
            return Object.assign({}, state, {error: action.payload});
        default:
            return state
    }
}

export default allOrderReducer;