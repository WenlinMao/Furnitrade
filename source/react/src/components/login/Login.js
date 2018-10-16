import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    button: {
        margin: theme.spacing.unit,
      },
    // menu: {
    //   width: 200,
    // },
  });

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    componentDidMount = () => {
        
    }

    handleNameInput = name => event => {
        this.setState({name: event.target.value});
    }

    handleSubmit = () => {
        
    }
    
    render() {
        const {classes} = this.props;

        return (
            <div className="login-container">
                <div className="login-title">Login</div>
                <form className={classes.container} noValidate autoComplete="on">
                    <TextField
                        id="name-input"
                        label="Username"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleNameInput('name')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                    />
                </form>
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Login 
                </Button>
            </div>

        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Login);