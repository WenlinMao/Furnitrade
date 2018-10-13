import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavigationDrawer from './NavigationDrawer';

// Temporary style TODO
const styles = {
    root: {
      flexGrow: 1,
      // Set width of tool AppBar
      width:'100%',
    },
    grow: {
      flexGrow: 1,
      // "Furnitrade" set center
      textAlign: 'center',
    },
    menuButton: {
      width: "400",
      marginLeft: -12,
      marginRight: 20,
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
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className = {classes.root}>

                {/* App bar */}
                <AppBar position = 'static' >
                    <Toolbar>
                        <Typography variant = 'h6' color = 'inherit' className = {classes.grow}>
                        Furnitrade </Typography>
                        <NavigationDrawer></NavigationDrawer>
                    </Toolbar>
                </AppBar>
            </div>
        );
      }
  }

  NavigationBar.PropTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(NavigationBar)
