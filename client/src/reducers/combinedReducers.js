import {combineReducers} from 'redux';

import games from "./gamesReducer";
import ships from "./shipsReducer";
import players from "./playersReducer";
import scores from "./scoresReducer";

export default combineReducers({games, ships, players,scores,})