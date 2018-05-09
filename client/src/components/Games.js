import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {connect} from 'react-redux';
import {fetchGames} from "../actions/gamesAction";
import {fetchScores} from "../actions/scoresAction";


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
        <div className="games-container">
        <h3>List of games</h3>
        {this.props.games.map((game, index) =>
          <div key={index}>
        Game id: {game.id}, created on: {game.created.slice(0,10)} at {game.created.slice(11,16)}, players: {game.gamePlayers.map((gp) => gp.player.email + " ")}
          </div>
        )}
            <h3>Leaderboard</h3>
            <div className="leaderboard">
            <BootstrapTable keyField='email' data={ this.props.scores } columns={ this.props.columns } />
            </div>

      </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);