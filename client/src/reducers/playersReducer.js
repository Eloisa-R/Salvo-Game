export default function reducer(state={
    playersResponse: null,
    fetching: false,
    fetched: false,
    post: false,
    error: null
},action) {
    switch(action.type){
        case "FETCH_PLAYERS":{
            return {...state, fetching: true}
        }
        case "FETCH_PLAYERS_FULFILLED":{
            return {...state, fetching: false, fetched:true, post: false, playersResponse: action.playersdata}
        }
        case "ADD_PLAYER_FULFILLED": {
            return {...state, post: true}

        }
    }
    return state;
}