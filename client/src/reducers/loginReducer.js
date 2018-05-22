export default function reducer(state={
    loginResponse: null,
    signUpResponse: null,
    signPost: false,
    signFetching: false,
    fetching: false,
    fetched: false,
    post: false,
    logOutSucceed: false,
    error: null
},action) {
    switch(action.type){
        case "LOGIN":{
            return {...state, fetching: true}
        }
        case "LOGIN_FULFILLED": {
            return {...state, post: true}

        } case "SIGN_UP": {
            return {...state, signFetching: true}
        } case "SIGN_UP_FULFILLED": {
        return {...state, signPost: true}
        } case "LOG_OUT_FULFILLED":{
         return {...state, logOutSucceed: true}
        }
    }
    return state;
}