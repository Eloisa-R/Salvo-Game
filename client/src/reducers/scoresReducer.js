export default function reducer(state={
    scores: null,
    columns: [{dataField: 'email', text: 'Username'}, {dataField: 'total', text: 'Total'},
        {dataField: 'wins', text: 'Won'}, {dataField: 'losses', text: 'Lost'},{dataField: 'ties', text: 'Ties'}],
    fetching: false,
    fetched: false,
    error: null
},action) {
    switch(action.type){
        case "FETCH_SCORES":{
            return {...state, fetching: true}
        }
        case "FETCH_SCORES_FULFILLED":{
            return {...state, fetching: false, fetched:true, scores: action.scoresdata}
        }
    }
    return state;
}