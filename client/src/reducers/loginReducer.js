export default function reducer(state={
    loginResponse: null,
    fetching: false,
    fetched: false,
    post: false,
    error: null
},action) {
    switch(action.type){
        case "LOGIN":{
            return {...state, fetching: true}
        }
        case "LOGIN_FULFILLED": {
            return {...state, post: true}

        }
    }
    return state;
}