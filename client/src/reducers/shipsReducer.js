export default function reducer(state={
    gamePlayerResponse: null,
    fetching: false,
    fetched: false,
    failed: false,
    error: null,
    prov_array: [],
},action) {
    switch(action.type){
        case "FETCH_SHIPS":{
            return {...state, fetching: true}
        }
        case "FETCH_SHIPS_FULFILLED":{
            return {...state, fetching: false, fetched:true, gamePlayerResponse: action.shipsdata}
        } case "FETCH_SHIPS_REJECTED":{
            return {...state, fetching: false, fetched: true, failed: true, gamePlayerResponse: action.shipsdata}
        } case "UPDATE_GRID_FULFILLED":{
            return {...state, prov_array: action.arraydata}
        }
    }
    return state;
}