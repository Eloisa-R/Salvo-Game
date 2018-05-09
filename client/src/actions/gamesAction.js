export function fetchGames(){
    return function (dispatch){
         fetch('http://localhost:8080/api/games', {headers: {'Access-Control-Allow-Origin':'*'}})
            .then(response => response.json())
            .then((data) => {
               dispatch({type: "FETCH_GAMES_FULFILLED", gamesdata:data})
            });
    }
}