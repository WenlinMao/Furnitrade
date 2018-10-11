import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };
  
  class NavigationDrawer extends React.Component {
    state = {
      right: false,
    };
  
    NavigationDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };
  
    render() {
      const { classes } = this.props;
  
      const sideList = (
        <div className={classes.list}>
          <List>
              <li>
                  <Button>Company</Button>
              </li>
              <li>
                  <Button>About Us</Button>
              </li>
              <li>
                  <Button>Category</Button>
              </li>
          </List>
          <Divider />
          <List></List>
        </div>
      );
  
      return (
        <div>
          {/* Button text --- */}
          <Button onClick={this.NavigationDrawer('right', true)}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Button>
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
  