export function fetchGames(){
    return function (dispatch){
        //I need to add "credentials: include" because when we log in, spring sends back a session ID and it's stored as a cookie
        //in order to get the info as logged in users, we have to send this session ID in all the other requests afterwards
         fetch('http://localhost:8080/api/games', {headers: {'Access-Control-Allow-Origin':'*'}, credentials: 'include'} )
            .then(response => response.json())
            .then((data) => {
               dispatch({type: "FETCH_GAMES_FULFILLED", gamesdata:data})
            });
    }
}

export function createGame() {
    return function (dispatch){
        fetch('http://localhost:8080/api/games', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': '*/*',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: "include"
        })
            .then(response =>  {if (response.ok) {
                console.log(response)
                return response;
            } else {
                throw new Error('Something went wrong, request failed with status ' + response.status);
            }
            })
            .then(response => response.json())
            .then((data) => {

                dispatch({type: "CREATE_GAME_FULFILLED", newGamedata: data});
                dispatch(fetchGames());
            })
            .catch(error => {console.log(error)});

    }
}

export function joinGame(gameId) {
    return function (dispatch){
        fetch('http://localhost:8080/api/games/' + gameId + '/players', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': '*/*',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: "include"
        })
            .then(response =>  {if (response.ok) {
                console.log(response)
                return response;
            } else {
                throw new Error('Something went wrong, request failed with status ' + response.status);
            }
            })
            .then(response => response.json())
            .then((data) => {

                dispatch({type: "JOIN_GAME_FULFILLED", joinGamedata: data});
                dispatch(fetchGames());
            })
            .catch(error => {console.log(error)});

    }
}