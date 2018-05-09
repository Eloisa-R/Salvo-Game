import {combineReducers} from 'redux';

import games from "./gamesReducer";
import gameView from "./gameViewReducer";
import players from "./playersReducer";
import scores from "./scoresReducer";

export default combineReducers({games, gameView, players,scores,})