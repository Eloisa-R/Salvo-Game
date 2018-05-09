export function fetchShips(id){
    return function (dispatch){
        fetch('http://localhost:8080/api/game_view/' + id, {headers: {'Access-Control-Allow-Origin':'*'}})
            .then(response => response.json())
            .then((data) => {

                dispatch({type: "FETCH_SHIPS_FULFILLED", shipsdata:data})
            });
    }
}