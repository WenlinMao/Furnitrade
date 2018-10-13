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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                password: '',
                password_comfirm:''
            }
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
            <div className="register-container">
                <div className="register-title">Create Your Furnitrade Account</div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="name-input"
                        label="Username"
                        className={classes.textField}
                        value={this.state.user.name}
                        onChange={this.handleNameInput('name')}
                        margin="normal"
                        variant="outlined"
                        required={true}
                    />
                    <TextField
                        id="email-input"
                        label="Email Address"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        required={true}
                    />
                    <TextField
                        id="password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        required={true}
                    />
                     <TextField
                        id="reenter-password-input"
                        label="Comfirm Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        required={true}
                    />
                </form>
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Create Account
                </Button>
            </div>

        );
    }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Register);



