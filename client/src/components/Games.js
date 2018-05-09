import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {connect} from 'react-redux';
import {fetchGames} from "../actions/gamesAction";


const mapStateToProps = function(store) {
    return {
        gamesFetched: store.games.fetched,
        games: store.games.games,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGames: () => {dispatch(fetchGames())},
    };
};
 class Games extends React.Component{

  constructor(){
    super();
    this.state = {
      isLoading: true,
      // games: "",
      scores: [],
      columns: []
    }

    this.loadScores = this.loadScores.bind(this);
  }


    componentDidMount() {
      this.props.fetchGames();
      console.log(this.props.games)
    }

   loadScores(){
      fetch('http://localhost:8080/api/scores', {headers: {'Access-Control-Allow-Origin':'*'}})
          .then(response => response.json())
          .then((data) => {
              this.setState({scores:data, columns:[{dataField: 'email',
                      text: 'Username'}, {dataField: 'total', text: 'Total'},{dataField: 'wins', text: 'Won'}, {dataField: 'losses', text: 'Lost'},{dataField: 'ties', text: 'Ties'}], isLoading: false})
          })
   }


    render() {
      if (!this.props.gamesFetched) {
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
            {/*<BootstrapTable keyField='email' data={ this.state.scores } columns={ this.state.columns } />*/}
            </div>

      </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);