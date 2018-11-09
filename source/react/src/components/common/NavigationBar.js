import React from 'react';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavigationDrawer from './NavigationDrawer';
import testLogo from '../../static/images/test-logo.jpg';
import { Link } from 'react-router-dom'
// import Button from '@material-ui/core/Button';
import "./NavigationBar.css";

// Temporary style TODO
const Main = props => <Link to="./" {...props} />
const Profile = props => <Link to="./profile" {...props} />

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
  };

  class NavigationBar extends React.Component {
      state = {
          auth: true,
          anchorEl: null,
      };

      handleChange = event => {
          this.setState ({auth: event.target.checked});
      };

      handleMenu = event => {
          this.setState({anchorEl: event.currentTarget});
      };

      handleClose = () => {
        this.setState({anchorEl: null});
      };

    //   render *TODO*
      render() {
        // These field may be used in the future so PLEASE DO NOT delete
        // const { classes } = this.props;
        // const { anchorEl } = this.state;
        // const open = Boolean(anchorEl);
        // console.log("in bar", this.props.hasLogin);
        return (
            <div>
                {/* App bar */}
                <AppBar position = 'fixed' color="inherit">
                    <Toolbar>
                        <div className="nav-container">

                            {/* This logo image should redirect the user to the MainPage - TODO */}

                            <div className="logo">
                                <a href="http://localhost:3000/">
                                    <img className="logo-img" title="logo-img" src={testLogo} width="40px" height="40px"
                                    alt = "The logo of Furnitrade Platform."/>
                                </a>
                            </div>

                            {/* This text should redirect the user to the MainPage - TODO */}
                            <div className="title">
                                <Typography className="furnitrade-title" variant = 'title'
                                color = 'secondary' component={Main}>
                                Furnitrade </Typography>
                            </div>

                            <div className="nav-drawer">
                                <NavigationDrawer showLogout={this.props.hasLogin} buttonName="Profile" passLink={Profile} ></NavigationDrawer>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
      }
  }

  NavigationBar.propTypes = {
    classes: propTypes.object.isRequired,
  };

export default withStyles(styles)(NavigationBar)
// export default NavigationBar;
