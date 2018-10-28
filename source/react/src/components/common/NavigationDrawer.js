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
// import {Link} from 'react-router-dom'

const styles = {
    list: {
      width: 250,
      textAlign:'center',
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
        showLogout: false
      };
    }

    componentWillMount() {
      this.setState({showLogout: this.props.showLogout});
    }
    NavigationDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };

    // Temporay hack 
    handleLogout = (e) => {
      setLocal("username", "");
      this.setState({showLogout: false});
    }

    render() {
      console.log("in drawer", this.props.showLogout);
      const { classes } = this.props;
      const sideList = (
        <div className={classes.list}>
          <List>
              <li>
                  {/* TODO - just for testing profile page */}
                  <Button color="secondary" component={this.props.passLink}>{this.props.buttonName}</Button>
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
                this.state.showLogout
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
