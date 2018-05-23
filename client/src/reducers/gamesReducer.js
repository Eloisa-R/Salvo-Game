import React from 'react';

export default function reducer(state={
    games: null,
    fetching: false,
    fetched: false,
    error: null,
    gameCreated: false,
    newGame: null,
    gPcreated: false,
    joinGamedata: null,
},action) {
    switch(action.type){
        case "FETCH_GAMES":{
            return {...state, fetching: true}
        }
        case "FETCH_GAMES_FULFILLED":{
            return {...state, fetching: false, fetched:true, games: action.gamesdata}
        }
        case "CREATE_GAME_FULFILLED":{
            return {...state, gameCreated: true, newGame: action.newGamedata}
        } case "JOIN_GAME_FULFILLED": {
            return {...state, gPcreated: true, joinGamedata: action.joinGamedata}
        }
    }
    return state;
}