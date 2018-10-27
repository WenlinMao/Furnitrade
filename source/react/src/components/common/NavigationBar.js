import React from 'react';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavigationDrawer from './NavigationDrawer';
import testLogo from '../../static/images/test-logo.jpg';

// Temporary style TODO
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

        return (
            <div>

                {/* App bar */}
                <AppBar position = 'fixed' color="inherit">
                    <Toolbar>
                        <div className="nav-container">

                            {/* This logo image should redirect the user to the MainPage - TODO */}
                            <div className="logo">
                              
                                <img title="logo-img" src={testLogo} width="64px" height="64px"
                                alt = "The logo of Furnitrade Platform."/>
                            </div>

                            {/* This text should redirect the user to the MainPage - TODO */}
                            <div className="title">
                                <Typography variant = 'title' color = 'secondary'>
                                Furnitrade </Typography>
                            </div>

                            <div className="nav-drawer"> <NavigationDrawer/> </div>
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
