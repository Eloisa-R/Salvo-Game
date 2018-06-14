export default function reducer(state={
    gamePlayerResponse: null,
    allShipsArray: [],
    mySalvoesArray: [],
    mySunkenArray: [],
    fetching: false,
    fetched: false,
    placed: false,
    placedResponse: null,
    salvoSubData: null,
    failed: false,
    salvosSub: false,
    error: null,
    prov_array: [],
},action) {
    switch(action.type){
        case "FETCH_SHIPS":{
            return {...state, fetching: true}
        }
        case "FETCH_SHIPS_FULFILLED":{
            return {...state, fetching: false, fetched:true, gamePlayerResponse: action.shipsdata,
                allShipsArray:action.allShips, mySalvoesArray:action.mySalvoesArray, mySunkenArray:action.mySunkenArray}
        } case "FETCH_SHIPS_REJECTED":{
            return {...state, fetching: false, fetched: true, failed: true, gamePlayerResponse: action.shipsdata}
        } case "UPDATE_GRID_FULFILLED":{
            return {...state, prov_array: action.arraydata}
        } case "PLACE_SHIPS_FULFILLED":{
            return {...state, placed:true, placedResponse:action.placedata}
        } case "FIRE_SALVOES_FULFILLED":{
            return {...state, salvosSub: true, salvoSubData:action.salvodata}
        }
    }
    return state;
}