import {fetchGames} from "./gamesAction";

export function fetchShips(id){
    return function (dispatch){
        fetch('http://localhost:8080/api/game_view/' + id, {headers: {'Access-Control-Allow-Origin':'*'}, credentials: 'include'})
            .then(response =>

            {if (response.ok) {
                return response;
            } else {
                console.log(response);
                throw new Error('Something went wrong, request failed with status ' + response.status);
            }
            })
            .then(response => response.json())
            .then((data) => {
                let allShipArray = getAPIShipsinOne(data);
                let mySalvoesArray = getMySalvoesLocation(id,data);
                let mySunkenArray = getMySunkenShips(id, data);
                dispatch({type: "FETCH_SHIPS_FULFILLED", shipsdata:data, allShips:allShipArray, mySalvoesArray:mySalvoesArray, mySunkenArray:mySunkenArray})
            })
            // .catch(error => dispatch({type: "FETCH_SHIPS_REJECTED", shipsdata: "error"}
            //     console.log(response)
            // ));
        ;
    }
}
export function placeShips(GPid, shipList){
    return function (dispatch){
     const body = JSON.stringify(shipList);
    fetch('http://localhost:8080/api/games/players/' + GPid + '/ships',
        {
        method: 'POST',
        body: body,
        mode: 'cors',
        headers: {
            'Accept': '*/*',
            "Content-type": "application/json; charset=UTF-8",
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: "include"
        })
        .then(response =>  {if (response.ok) {
            console.log(response)
            return response.data;
        } else {
            throw new Error('Something went wrong, request failed with status ' + response.status);
        }
        })
        .then((data) => {

            dispatch({type: "PLACE_SHIPS_FULFILLED", placedata: data});
            dispatch(fetchShips(GPid));
        })
        .catch(error => {console.log(error)});
    }
}

export function updateGrid(arrayElement){
    return function (dispatch) {
        dispatch({type: "UPDATE_GRID_FULFILLED", arraydata:arrayElement});
    }
}

export function getAPIShipsinOne(data){
    let shipsArray = [];
    data.ships.forEach((element) => {
        element.locations.forEach((location) => {shipsArray.push(location)})
    });
    return shipsArray;
}

export function getMySalvoesLocation(id, data){
    let mySalvoesDict = data.salvoes[id];
    let mySalvoesArray = [];
    for (let key in mySalvoesDict) {
        mySalvoesDict[key].forEach((element) => {
            mySalvoesArray = mySalvoesArray.concat(element)
        })
    }
    return mySalvoesArray;
}

export function getMySunkenShips(id, data){
    var mySunkenShipsDict;

    for (let key in data.salvoes) {
        if (key != id) {
            mySunkenShipsDict = data.salvoes[key]
        }
    }
    let mySunkenArray = [];
    for (let key in mySunkenShipsDict) {
        mySunkenShipsDict[key].forEach((element) => {
            mySunkenArray = mySunkenArray.concat(element)
        })
    }
    return mySunkenArray;
}