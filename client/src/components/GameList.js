import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

class GameList extends React.Component{

    render(){
        return(
            <div>
            <h3>List of games</h3>
            <ReactTable keyField='id' data={ this.props.games.games } minRows = {0} columns={
                [{accessor: 'created', Header: 'Created on',
                    Cell: text => (
                        new Date(text.value).getHours() + ':' + new Date(text.value).getMinutes() + ', '
                        + new Date(text.value).getDate() + '-' + (new Date(text.value).getMonth() + 1) + '-'
                        + new Date(text.value).getFullYear())

                }, {accessor: 'id', Header: 'Game number'},
                    {accessor: 'gamePlayers[0].player.email', Header: 'Player 1'},
                {accessor: 'gamePlayers[1].player.email', Header: 'Player 2'}, {accessor: 'gamePlayers', Header: 'Actions',
                    Cell: button => (
                        this.props.games.player.id === "null"?
                            <div>Login required</div>:
                            button.value[1]? (button.value[0].player.id === this.props.games.player.id?
                                <a href={`/shiplocations/${button.value[0].id}`}>Play</a>:
                                button.value[1].player.id === this.props.games.player.id?
                                    <a href={`/shiplocations/${button.value[1].id}`}>Play</a>:"") :
                                button.value[0].player.id === this.props.games.player.id?
                                    (<a href={`/shiplocations/${button.value[0].id}`}>Start game</a>)
                                    :(<button onClick={() => this.props.joinGame(button.original.id)}>Join game</button>)
                    )
                }] } showPagination={false}/>
            </div>
        )
    }
}

export default GameList;