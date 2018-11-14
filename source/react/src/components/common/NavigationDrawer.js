import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {setLocal, getLocal} from '../../utils/util';
import {Link} from 'react-router-dom'
import axios from 'axios';

// main link
const Main = props => <Link to="./" {...props} />

const styles = {
  list: {
    width: 250,
    textAlign: 'center',
  },
  fullList: {
    width: 'auto',
  },
};

// const MyLink = props => <Link to="./login" {...props} />

class NavigationDrawer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        right: false,
        hasLogin: false,
      };
    }

    componentWillMount() {
      this.setState({
        hasLogin: this.props.hasLogin
      });
    }
    NavigationDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };

    // Temporay hack
    handleLogout = (e) => {
        setLocal("username", "");
        this.setState({
          showLogout: false
        });
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
              // redirect to login (following line not working)
              //this.props.history.push("/Login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
        }

    render() {
      // console.log("in drawer", this.props.showLogout);
      const { classes } = this.props;
      const sideList = (
        <div className={classes.list}>
          <List>
              <li>
                  <Button color="secondary" component={Main}>Home</Button>
              </li>
              <li>
                {
                  this.state.hasLogin
                  ?
                  <Button color="secondary" component={this.props.passLink}>{this.props.buttonName}</Button>
                  :
                  <div></div>
                }
              </li>
              <li>
                  <Button color="secondary">About Us</Button>
              </li>
              <li>
                  <Button color="secondary">Category</Button>
              </li>
              <li>
                  <Button color="secondary">Privacy</Button>
              </li>
              {
                this.state.hasLogin
                ?
                <li>
                  <Button color="secondary" onClick={this.handleLogout}>Log out</Button>
                </li>
                :
                <div></div>
              }
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
            <MenuIcon color="secondary"/>
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
