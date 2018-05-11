import React from 'react';
import {connect} from 'react-redux';
import {fetchPlayers} from "../actions/playersAction";
import {addPlayer} from "../actions/playersAction";

const mapStateToProps = function(store) {
    return {
        playersFetched: store.players.fetched,
        playersResponse: store.players.playersResponse,
        playersPosted: store.players.post,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchPlayers: () => {dispatch(fetchPlayers())},
        addPlayer: (inputFn, inputLn, inputE) => {dispatch(addPlayer(inputFn, inputLn, inputE))},
    };
};
 class Players extends React.Component {

      constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

     handleSubmit(event) {
       event.preventDefault();

       let fnValue = document.getElementById("fnValue").value;
       let lnValue = document.getElementById("lnValue").value;
       let emailValue = document.getElementById("email").value;

       document.getElementById("fnValue").value = "";
       document.getElementById("lnValue").value = "";
       document.getElementById("email").value ="";

       if (fnValue !== '' && lnValue !== '' && emailValue !== '') {

           this.props.addPlayer(fnValue, lnValue, emailValue);

       } else {
           console.log("Oops, fill out all the data!");
       }
       }


   componentWillMount() {
     this.props.fetchPlayers();
   }

   componentDidUpdate(){
      if (this.props.playersPosted) {
          this.props.fetchPlayers();
      }
   }

    render() {

      if (!this.props.playersFetched) {
        return <p>Loading...</p>;
      }

      return (
          <div>
            <h3>Add New Players</h3>
            <form onSubmit={this.handleSubmit}>
               <label>
                      First name:
                <input type="text" id="fnValue"/>
                </label>
                <label>
                     Last name:
                <input type="text" id="lnValue"/>
                </label>
                <label>
                     E-mail:
                <input type="text" id="email"/>
                </label>
                <input type="submit" value="Add" />
            </form>
            <h2>Player List</h2>
            {this.props.playersResponse.map((player, index) =>
              <div key={index}>
                Name: {player.firstName} {player.lastName}, email: {player.userName}
              </div>
            )}
          </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Players);
