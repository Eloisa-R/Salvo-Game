export default function reducer(state={
    games: null,
    fetching: false,
    fetched: false,
    error: null
},action) {
    switch(action.type){
        case "FETCH_GAMES":{
            return {...state, fetching: true}
        }
        case "FETCH_GAMES_FULFILLED":{
            return {...state, fetching: false, fetched:true, games: action.gamesdata}
        }
    }
    return state;
}