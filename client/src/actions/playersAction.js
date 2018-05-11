export function fetchPlayers(){
    return function (dispatch){
        fetch('http://localhost:8080/rest/players', {headers: {'Access-Control-Allow-Origin':'*'}})
            .then(response => response.json())
            .then((data) => {

                dispatch({type: "FETCH_PLAYERS_FULFILLED", playersdata:data})
            });
    }
}

export function addPlayer(inputFn, inputLn, inputE){
    return function(dispatch){
        fetch('http://localhost:8080/rest/players', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            dataType: "json",
            body: JSON.stringify({
                firstName: inputFn,
                lastName: inputLn,
                userName: inputE,
            })
        }).then(response => response.ok === true)
            .then((data) => {
                dispatch({type: "ADD_PLAYER_FULFILLED"})
            })
    }
}