export function fetchScores(){
    return function (dispatch){
        fetch('http://localhost:8080/api/scores', {headers: {'Access-Control-Allow-Origin':'*'}, credentials: 'include'})
            .then(response => response.json())
            .then((data) => {
                dispatch({type: "FETCH_SCORES_FULFILLED", scoresdata:data})
            })
    }
}