import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Players from './Players';
import Games from './Games';
import ShipLocations from "./ShipLocations";


 class App extends React.Component{

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Battleships</h1>
          </header>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Players}/>
              <Route path="/games" component={Games}/>
              <Route path="/shiplocations/:id" component={ShipLocations}/>
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
}

export default App;
