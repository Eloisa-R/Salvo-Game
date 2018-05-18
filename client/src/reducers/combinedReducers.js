import {combineReducers} from 'redux';

import games from "./gamesReducer";
import ships from "./shipsReducer";
import players from "./playersReducer";
import scores from "./scoresReducer";
import login from "./loginReducer"

export default combineReducers({games, ships, players, scores, login})