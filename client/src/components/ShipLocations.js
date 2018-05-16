import React from 'react';
import {connect} from 'react-redux';
import {fetchShips} from "../actions/shipsAction";
import Grid from "./Grid"

const mapStateToProps = function(store) {
    return {
        shipsFetched: store.ships.fetched,
        gamePlayerResponse: store.ships.gamePlayerResponse,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGamePlayer: (id) => {dispatch(fetchShips(id))},
    };
};
class ShipLocations extends React.Component{
    constructor(){
        super();
    this.getOponentId = this.getOponentId.bind(this);
    }


    getOponentId(){
        //the params.id and the id in the JSON response are different types, so the comparison needs to be like this (!=)
        //otherwise, !== would return any of the ids in the JSON
        let oponentObject = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id != this.props.match.params.id);
        return oponentObject[0].id;
    }

    getPlayeremail(){
       let playerObj = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id == this.props.match.params.id);
       return playerObj[0].player.email;
    }

    getOponentemail(){
        let oponentObj = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id != this.props.match.params.id);
        return oponentObj[0].player.email;
    }



    componentWillMount(){
        this.props.fetchGamePlayer(this.props.match.params.id);
    }

    componentDidUpdate(){
        if (this.props.gamePlayerResponse !== null) {


        }

    }


    render(){
        if (!this.props.shipsFetched) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <h3>Ship Locations!</h3>
                <div>Hello, player {this.getPlayeremail()}</div>
                <div>Your oponent is {this.getOponentemail()}</div>
                {this.props.gamePlayerResponse.ships.map((ship, index) =>
                    <div key={index}>{ship.type}, {ship.locations}</div>
                )}
                <div className="gridContainer">
                    <Grid data={this.props.gamePlayerResponse} title={"My Ships"} gridType={"sh"} playerId={this.props.match.params.id} oponentId={this.getOponentId()}/>
                    <Grid data={this.props.gamePlayerResponse} title={"Salvoes I Fired"} gridType={"sa"} playerId={this.props.match.params.id} oponentId={this.getOponentId()}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ShipLocations);