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

                dispatch({type: "FETCH_SHIPS_FULFILLED", shipsdata:data})
            })
            .catch(error => dispatch({type: "FETCH_SHIPS_REJECTED", shipsdata: "error"}));
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

            // dispatch({type: "LOGIN_FULFILLED", logindata: data});
            // dispatch(fetchGames());
        })
        .catch(error => {console.log(error)});
    }
}