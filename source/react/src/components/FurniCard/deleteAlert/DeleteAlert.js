import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import './DeleteAlert.css';

class DeleteAlert extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* <Button onClick={this.handleClickOpen}></Button> */}
        <input type="image" src={this.props.deletebutton} onClick={this.handleClickOpen}/>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"You are about to delete this furniture post. Are you sure to do so?"}</DialogTitle>
          <DialogActions>
            <button onClick={this.handleClose}>Yes</button>
            <button onClick={this.handleClose}>Cancel</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteAlert;
