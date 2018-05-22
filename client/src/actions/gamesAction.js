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