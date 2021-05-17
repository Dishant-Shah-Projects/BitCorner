const defaultState = {
    marketPriceInfo:{},
    error: ''
}

const marketPriceReducer = (state= defaultState, action={}) => {
    switch(action.type){
        case "REQUEST_MARKET_PRICE":
            return Object.assign({}, state, {});
        case "REQUEST_MARKET_PRICE_SUCCESS":
            return Object.assign({}, state, {marketPriceInfo: action.payload});
        case "REQUEST_MARKET_PRICE_FAIL":
            return Object.assign({}, state, {error: action.payload});
        default:
            return state
    }
}

export default marketPriceReducer;