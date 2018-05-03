import React from 'react';

 class Games extends React.Component{

  constructor(){
    super();
    this.state = {
      isLoading: true,
      games: ""
    }
    this.loadGames = this.loadGames.bind(this)
  }

  loadGames(){
    fetch('http://localhost:8080/api/games', {headers: {'Access-Control-Allow-Origin':'*'}})
           .then(response => response.json())
           .then((data) => {
           this.setState({games: data, isLoading: false})});

   }

   componentDidMount(){
     this.loadGames();
   }

    render() {
      if (this.state.isLoading) {
        return <p>Loading...</p>;
      }
      return (
        <div>
        <h3>List of games</h3>
        {this.state.games.map((game, index) =>
          <div key={index}>
        Game id: {game.id}, created on: {game.created.slice(0,10)} at {game.created.slice(11,16)}, players: {game.gamePlayers.map((gp) => gp.player.email + " ")}
          </div>
        )}
      </div>
      );
    }
}

export default Games;