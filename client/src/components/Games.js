import React from 'react';
import {connect} from 'react-redux';
import {fetchGames} from "../actions/gamesAction";
import {fetchScores} from "../actions/scoresAction";
import GameList from "./GameList"
import LeaderBoard from "./LeaderBoard"
import Login from "./Login"

const mapStateToProps = function(store) {
    return {
        gamesFetched: store.games.fetched,
        games: store.games.games,
        scoresFetched: store.scores.fetched,
        scores: store.scores.scores,
        columns: store.scores.columns,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGames: () => {dispatch(fetchGames())},
        fetchScores: () => {dispatch(fetchScores())},
    };
};
 class Games extends React.Component{


    componentWillMount() {
      this.props.fetchGames();
      this.props.fetchScores();

    }


    render() {
      if (!(this.props.gamesFetched && this.props.scoresFetched)) {
        return <p>Loading...</p>;
      }
      return (
       <div className="game-page-wrapper">
         <div className="games-container">
            <GameList games={this.props.games.games}/>
            <LeaderBoard scores={ this.props.scores } columns={ this.props.columns }/>
        </div>
        <div className="login">
            <Login/>
        </div>
       </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);