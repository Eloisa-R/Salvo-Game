import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Players from './Players';
import Games from './Games';


 class App extends React.Component{

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Players}/>
              <Route path="/games" component={Games}/>
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
}

export default App;
