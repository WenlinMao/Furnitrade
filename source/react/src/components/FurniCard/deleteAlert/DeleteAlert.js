import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import DialogTitle from '@material-ui/core/DialogTitle';
import './DeleteAlert.css';

/* TODO - delete function to be completed */
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

  handledelete(e) {
	let reqData = {
        	'furniture_id': this.state.furniture_id,
	}
		axios({
              	method: 'get',
              	url: 'http://127.0.0.1:5000/user/delete_wishlist',
              	withCredentials: false,
              	crossdomain: true,
              	data: reqData,
              	responseType: 'json',
              	headers: {
                //"Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Authorization": `Bearer`
              }
      	});
}


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
            <button onClick={this.handleDelete}>Delete</button>
            <button onClick={this.handleClose}>Cancel</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteAlert;
