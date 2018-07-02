import React from 'react';
import {connect} from 'react-redux';
import {fetchGames} from "../actions/gamesAction";
import {createGame} from "../actions/gamesAction";
import {joinGame} from "../actions/gamesAction";
import {fetchScores} from "../actions/scoresAction";
import {logOut} from "../actions/loginAction";
import GameList from "./GameList"
import LeaderBoard from "./LeaderBoard"
import Login from "./Login"
import SignUp from "./SignUp"

const mapStateToProps = function(store) {
    return {
        gamesFetched: store.games.fetched,
        games: store.games.games,
        scoresFetched: store.scores.fetched,
        scores: store.scores.scores,
        columns: store.scores.columns,
        loginSucceeded: store.login.post,
        gamesColums: store.games.gamesColums,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGames: () => {dispatch(fetchGames())},
        fetchScores: () => {dispatch(fetchScores())},
        logOut: () => {dispatch(logOut())},
        newGame: () => {dispatch(createGame())},
        joinGame: (gameId) => {dispatch(joinGame(gameId))},
    };
};
 class Games extends React.Component{


     constructor(){
         super();
         this.state={
             clickedLogin: true,
             clickedLeadBoard: false,
             clickedGameList: false
         }
         this.clickLogin = this.clickLogin.bind(this);
         this.clickSignUp = this.clickSignUp.bind(this);
         this.displayLoginOrLogout = this.displayLoginOrLogout.bind(this);
         this.showLeaderBoard = this.showLeaderBoard.bind(this);
         this.showGameList = this.showGameList.bind(this);

     }

    componentWillMount() {
      this.props.fetchGames();
      this.props.fetchScores();

    }

    clickSignUp(){
        this.setState({clickedLogin: false});
    }

     clickLogin(){
         this.setState({clickedLogin: true});

     }

     displayLoginOrLogout(){
         if (this.props.games.player.username === "null") {
             return <div className="login">
                 {this.state.clickedLogin ?
                     <Login clickProp={this.clickSignUp}/>
                     :
                     <SignUp clickProp={this.clickLogin}/>
                 }
             </div>
         } else {
             return <div className="logout"><div className="logout-box"><h4>Hello, {this.props.games.player.username}</h4><button onClick={this.props.logOut}>Log Out</button>
             </div></div>
         }

     }

     showLeaderBoard() {
     this.setState({clickedLeadBoard: true, clickedGameList: false})
     }

     showGameList() {
     this.setState({clickedGameList: true, clickedLeadBoard: false})
    }


    render() {
      if (!(this.props.gamesFetched && this.props.scoresFetched)) {
        return <p>Loading...</p>;
      }
      return (
       <div className="game-page-wrapper">
         <div className="games-container">
             <div className="side-menu">
                 {this.props.games.player.username === "null"? <div></div>
                     :<button onClick={() => {this.showGameList(); this.props.newGame()}}>New Game</button>}
             <button onClick={this.showLeaderBoard}>Leader Board</button>
             <button onClick={this.showGameList}>List of Games</button>
             </div>
             <div className="board-or-gamelist">
             {this.state.clickedLeadBoard?
                 <LeaderBoard scores={ this.props.scores } columns={ this.props.columns }/>:
                    this.state.clickedGameList? <GameList games={this.props.games} joinGame={this.props.joinGame}/>: <div></div>}
             </div>
         </div>
         <div>
           {this.displayLoginOrLogout()}
         </div>
       </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);