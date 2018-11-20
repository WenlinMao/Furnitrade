import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {setLocal /*, getLocal*/} from '../../utils/util';
import axios from 'axios';

const styles = {
  list: {
    width: 250,
    textAlign: 'center',
  },
  fullList: {
    width: 'auto',
  },
};

class NavigationDrawer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        right: false
      };
    }

    NavigationDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };

    handleLogout = (e) => {
        setLocal("username", "");
        const token = localStorage.getItem('usertoken');
        // TODO: check what should happen if token is Null
        axios({
          method: 'get',
          url: 'http://127.0.0.1:5000/auth/logout',
          headers: {
              "Authorization": `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response);
          let code = response.data.status;
          if (code === 400){
              localStorage.removeItem('usertoken');
              this.props.redirectToLogin(true);
              this.props.logout();
          } else if (code === 200){
            this.props.redirectToHome(true);
            this.props.logout();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    render() {
      const { classes } = this.props;
      const sideList = (
        <div className={classes.list}>
          <List>
              <li>
                  {/* TODO - just for testing profile page */}
                  <Button component={this.props.passLink}>{this.props.buttonName}</Button>
              </li>
              <li>
                  <Button>My Furniture</Button>
              </li>
              <li>
                  <Button>Privacy</Button>
              </li>
              <li>
                <Button onClick={this.handleLogout}>Log out</Button>
              </li>
 
          </List>
          <Divider />
          <List></List>
        </div>
      );

      return (
        <div>
          {/* Button text --- */}

          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"> */}
          {/* Icon button - pop over from right */}
          <IconButton onClick={this.NavigationDrawer('right', true)} className="test" color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>

          <Drawer anchor="right" open={this.state.right} onClose={this.NavigationDrawer('right', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.NavigationDrawer('right', false)}
              onKeyDown={this.NavigationDrawer('right', false)}
            >
              {sideList}
            </div>
          </Drawer>
        </div>
      );
    }
  }

  NavigationDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(NavigationDrawer);
