import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MainPage from './components/mainPage/MainPage';
import './App.css';
import Routes from './Routes';

class App extends Component {
  render() {
    return (

      <div>
        <header className="App-header">
          <Routes/>
        </header>
      </div>
    );
  }
}

export default App;
