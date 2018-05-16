import React from 'react';

class GameList extends React.Component{

    render(){
        return(
            <div>
            <h3>List of games</h3>
        {this.props.games.map((game, index) =>
            <div key={index}>
                Game id: {game.id}, created on: {game.created.slice(0,10)} at {game.created.slice(11,16)}, players: {game.gamePlayers.map((gp) => gp.player.email + " ")}
            </div>
        )}
            </div>
        )
    }
}

export default GameList;