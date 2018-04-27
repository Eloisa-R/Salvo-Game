import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

    interface Player {
      first_name: string;
      last_name: string;
      username: string;
    }

    interface AppProps {
    }

    interface AppState {
      players: Array<Player>;
      isLoading: boolean;
    }

 class App extends React.Component<AppProps, AppState> {

      constructor(props: AppProps) {
        super(props);

        this.state = {
          players: [],
          isLoading: false
        };
      }

   componentDidMount() {
     this.setState({isLoading: true});

     fetch('http://localhost:8080/players')
       .then(response => response.json())
       .then((data) => {
       this.setState({players: data, isLoading: false})});

   }

    render() {
      const {players, isLoading} = this.state;

      if (isLoading) {
        return <p>Loading...</p>;
      }

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div>
            <h2>Player List</h2>
            {this.state.players.map((player, index) =>
              <div key={index}>
                {player.firstName} {player.lastName}: {player.userName}
              </div>
            )}
          </div>
        </div>
      );
    }
}

export default App;
