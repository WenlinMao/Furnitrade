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
    furnitureDelete: false,
    wishlistDelete: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    console.log("close");
    this.setState({ open: false });
  };

  // TODO: fix delete wishlist: url part.
  deleteWishList = () => {
    const token = localStorage.getItem('usertoken');
    let config = {
        headers: {"Authorization": `Bearer ${token}`},
        params: {
            furniture_id: this.props.furniture_id
        }
    }
    //   console.log(this.props.furniture_id);
    //   const token = localStorage.getItem('usertoken');
      axios.get('http://127.0.0.1:5000/user/delete_wishlist', config)
      .then((response) => {
        console.log(response.data);
        let code = response.data.status;
        if (code === 200) {
            this.handleClose();
            this.props.rerender();
        } else if(code === 615) {

        }
      }).catch((error) => {
          console.log("get furniture in subcategory: " + error);
      });

  };

  // deleteFuniture fixed
  deleteFurniture = () => {
    //   let reqData = {
    //       'furniture_id': this.props.furniture_id,
    //   }
      console.log(this.props.furniture_id);
      const token = localStorage.getItem('usertoken');
      axios({
          method: 'get',
          url: 'http://127.0.0.1:5000/furniture/delete/' + this.props.furniture_id,
          withCredentials: false,
          crossdomain: true,
        //   data: reqData,
          responseType: 'json',
          headers: {
              //"Content-Type": "application/x-www-form-urlencoded",
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
              "Authorization": `Bearer ${token}`
          }
      })
      .then((response) => {
          console.log(response.data);
          let code = response.data.status;
          if (code === 200) {
            //   this.setState({furnitureDelete: true});
              this.handleClose();
              this.props.rerender();
          } else if(code === 319) {
              this.setState({empty: true});
          }
      }).catch((error) => {
          console.log("get furniture in subcategory: " + error);
      });

  };

  handleDelete = () => {
      console.log("delete furniture");
      if (this.props.type === "wishlist"){
          this.deleteWishList();
      }
      else if (this.props.type === "furniture"){
          console.log("delete furniture");
	        this.deleteFurniture();
      }
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
          <DialogTitle id="alert-dialog-title">{"You are about to delete this. Are you sure to do so?"}</DialogTitle>
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
