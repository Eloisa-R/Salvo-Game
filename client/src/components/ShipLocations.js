import React from 'react';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import {fetchShips} from "../actions/shipsAction";
import {placeShips} from "../actions/shipsAction";
import {logOut} from "../actions/loginAction";
import Grid from "./Grid"

const mapStateToProps = function(store) {
    return {
        shipsFetched: store.ships.fetched,
        gamePlayerResponse: store.ships.gamePlayerResponse,
        getShipsFailed: store.ships.failed,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGamePlayer: (id) => {dispatch(fetchShips(id))},
        logOut: () => {dispatch(logOut())},
        placeShips: (gpID, shipList) => {dispatch(placeShips(gpID, shipList))},
    };
};
class ShipLocations extends React.Component{
    constructor(){
        super();
    this.getOponentId = this.getOponentId.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    }


    getOponentId(){
        //the params.id and the id in the JSON response are different types, so the comparison needs to be like this (!=)
        //otherwise, !== would return any of the ids in the JSON
        let oponentObject = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id != this.props.match.params.id);
        if (oponentObject.length === 0) {
            return "no oponent yet"
        }else {
            return oponentObject[0].id;
        }

    }

    getPlayeremail(){
       let playerObj = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id == this.props.match.params.id);
       return playerObj[0].player.email;
    }

    getOponentemail(){
        let oponentObj = this.props.gamePlayerResponse.gamePlayers.filter(gp => gp.id != this.props.match.params.id);
        if (oponentObj.length === 0) {
            return "no one yet!"
        } else {
            return oponentObj[0].player.email;
        }

    }

    handleLogOut(){
        this.props.logOut();
        this.props.history.push(`/games`);

    }

    componentWillMount(){
        this.props.fetchGamePlayer(this.props.match.params.id);
    }



    render(){
        if (!this.props.shipsFetched) {
            return <p>Loading...</p>;
        } else if (this.props.getShipsFailed) {
            return <p> You're not authorised to see this information.</p>;
        } else if ((this.props.shipsFetched) && !(this.props.getShipsFailed)) {return (
            <div className="main-ships-container">
                <div className="ships-data">
                    <div>
                        <h3>Ship Locations!</h3>
                        <div>Hello, player {this.getPlayeremail()}</div>
                        <div>Your oponent is {this.getOponentemail()}</div>
                        {this.props.gamePlayerResponse.ships.map((ship, index) =>
                            <div key={index}>{ship.type}, {ship.locations}</div>
                        )}
                    </div>
                    <div className="logout-btn"><button onClick={this.handleLogOut}>Log Out</button></div>
                </div>
                {this.props.placeShips("84", [ { "type": "DESTROYER", "locations": ["A1", "B1", "C1"]},
                    { "type": "PATROL_BOAT", "locations": ["H5", "H6"]}
                ])}
                <div className="gridContainer">
                    <Grid data={this.props.gamePlayerResponse} title={"My Ships"} gridType={"sh"} playerId={this.props.match.params.id} oponentId={this.getOponentId()}/>
                    <Grid data={this.props.gamePlayerResponse} title={"Salvoes I Fired"} gridType={"sa"} playerId={this.props.match.params.id} oponentId={this.getOponentId()}/>
                </div>
            </div>
        );}

    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ShipLocations);