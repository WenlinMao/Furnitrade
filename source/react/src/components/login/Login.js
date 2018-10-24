import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// * import navbar
import NavigationBar from '../common/NavigationBar';

// TODO: apply CORRECT navibar theme
// TODO: Temporary styles
// TODO: Background re-design

const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    /*
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },*/
    dense: {
      marginTop: 16,
    },
    /*
    button: {
        margin: theme.spacing.unit,
      },*/
    // menu: {
    //   width: 200,
    // },
  };

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    // TODO:
    componentDidMount = () => {

    }

    handleNameInput = name => event => {
        this.setState({name: event.target.value});
    }

    handleSubmit = () => {

    }

    render() {
        // might be used in future
        const {classes} = this.props;

        return (
              <div class='login-container'>
                  // implement NavigationBar
                  <NavigationBar/>

                  /* TODO: change font-family of title */
                  <div class="login-title">
                    <Typography variant = 'h1' color = 'inherit'>Login </Typography>
                  </div>
                  <form class="login-form" noValidate autoComplete="on">
                      <TextField
                          id="name-input"
                          label="Username"
                          value={this.state.name}
                          onChange={this.handleNameInput('name')}
                          margin="normal"
                          variant="outlined"
                      />
                      <TextField
                          id="password-input"
                          label="Password"
                          type="password"
                          margin="normal"
                          variant="outlined"
                      />
                  </form>

                  {/* TODO: button color adjustment*/ }
                  <div class="login-button">
                    <Button type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                  </div>
              </div>

        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Login);
