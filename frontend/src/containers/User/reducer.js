const defaultState = {
    isPending: false,
    bankInfo:[],
    error: ''
}

const bankReducer = (state= defaultState, action={}) => {
    switch(action.type){
        case "REQUEST_BANK_INFO_PENDING":
            return Object.assign({}, state, {isPending: true});
        case "REQUEST_BANK_INFO_SUCCESS":
            return Object.assign({}, state, {bankInfo: action.payload, isPending: false});
        case "REQUEST_BANK_INFO_FAIL":
            return Object.assign({}, state, {error: action.payload, isPending: true});
        default:
            return state
    }
}

export default bankReducer;