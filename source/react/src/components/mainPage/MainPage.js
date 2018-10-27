import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavigationBar from '../common/NavigationBar';
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

// log-in link
const MyLink = props => <Link to="./Register" {...props} />
const MyLink1 = props => <Link to="./Login" {...props} />

var textStyle = {
  fadeIn: {
    animation: 'x 3s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
};

const MainTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#42668f',
      main: '#134074',
      dark: '#0d2c51',
    },
    secondary: {
      light: '#61a5c5',
      main: '#3A8FB7',
      dark: '#286480',
    },
    inherit: {
      light: '#f7ca7f',
      main: '#F6BD60',
      dark: '#ac8443',
    },
  },
    typography: {
      fontFamily: '"Righteous", sans-serif',
    },
  });

  class MainPage extends Component {
    render() {
      return (

        <div className="main-page">
          <MuiThemeProvider theme = {MainTheme}>

            <NavigationBar className="nav-bar"/>
            {/* <div className = "img-intro"> */}
              {/* <img src = {landing}></img> */}
              {/* TODO */}


              <StyleRoot>
              <div className="slogan-container" style={textStyle.fadeIn}>

                <Typography className="furnitrade" variant = 'display4' color = 'inherit'>Furnitrade </Typography>
                <Typography className="slogan" variant = 'subheading' color = 'inherit'>
                Trade Dat Shit. Yea, Dat's Right. I Know What U Want Babbee. <br/>Be fucking
                surprised. Biatch </Typography>
                <Button className="login-button" color="inherit" component={MyLink}>Sign Up</Button>
                <br/>
                <Button className="login-button" color="inherit" component={MyLink1}>Log In</Button>

              </div>
              </StyleRoot>


            {/* </div> */}

          </MuiThemeProvider>
        </div>
      );
    }
  }

  export default withStyles(textStyle)(MainPage)
  // export default MainPage;
