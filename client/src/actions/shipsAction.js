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