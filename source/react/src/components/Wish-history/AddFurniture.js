import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './AddFurniture.css';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import {getLocal} from '../../utils/util';
import {UploadImg} from '../uploadImg/UploadImg';

// import '../uploadImg/UploadImg'
import categories from '../../static/data/category.json';


class Add extends Component{
  constructor(props) {
      super(props);
      this.state = {
          furniture_name: '',
          category: '',
          subcategory: '',
          image:'',
          price: '',
          is_delivery_inclued: '',
          location: '',
          seller: '',
          description: '',
          furniture_nameError: false,
          priceError: false,
          descriptionError: false,
          addressError: false,
          errorMsg: '',
          furniture_id: '',
      };
      this.child = React.createRef();
  }



    /* set Furniture Name */
    handleFurnitureNameInput = name => event => {
      this.setState({furniture_name: event.target.value});
    }

    handlePriceInput = name => event => {
      this.setState({price: event.target.value});
    }


    handleCategoryInput = name => event =>{
      this.setState({category:event.target.value});
    }

    handleSubcategoryInput = name => event => {
      this.setState({subcategory: event.target.value});
    }

    /* render subcategories */
    renderSubcategoryInput = () => {
      /* get all subcategories */
      var subs = categories.categories.map(category => (
        category.title === this.state.category ?
        category.subcategories.sub.map(sub => sub.list ) :null));

      /* remove all null subcategories */
      for( var i = 0; i < subs.length; i++){
        if ( subs[i] === null) { subs.splice(i, 1); i--;}
      }

      /* return the subcategory of category in the state */
      return (
        <div className="styled-select blue semi-square">{subs.map((sub) =>
          <select onChange={this.handleSubcategoryInput('subcate')} value={this.state.subcategory}>
            <option value="" hidden>Choose your category</option>
            {sub.map((subcate => <option value={subcate}>{subcate}</option>)
          )}</select>
        )}</div>
      );
    }

    handleDescriptionInput = name => event => {
      this.setState({description: event.target.value});
    }

    handleAddressInput = name => event => {
      this.setState({address: event.target.value});
    }

    // returm true if any of inputs are invalid
    checkButtonStatus = () => {

    }

    handleBeforeUpload = (files) => {
        this.setState({
            filesToBeSent: files
        });
        console.log(this.state.filesToBeSent)
    }

    // call back handle when uploadImg finished
    handleUploadImg = (img_pathes) => {
        console.log(img_pathes)

        // change image pathes in database after uploadImg to s3
        var token = getLocal("usertoken")
        let reqData = {
            "img_pathes": img_pathes,
            "furniture_id": this.state.furniture_id,
        };
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/furniture/change_img',
            // TODO: fix bug when change withCredentials to true
            withCredentials: false,
            crossdomain: true,
            data: reqData,
            responseType: 'json',
            headers: {
                //"Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            let code = response.data.status;
            if (code === 200) { console.log(response);}
            else if (code === 400) { localStorage.removeItem('usertoken'); this.props.history.push('/login');}
        })
        /* report any error encountered */
        .catch((error) => { console.log(error);});
    }

    /* submit user's updated infor to database */
    handleSubmit = (e) => {
      /* get all current user infor (updated) */
      e.preventDefault();
      let reqData = {
        'furniture_name': this.state.furniture_name,
        'price': this.state.price,
        'description': this.state.description,
        'address': this.state.address,
        'category': this.state.subcategory,
        'image': this.img_pathes,
      };
      console.log(reqData);

      /* get user from local storage */
      const token = localStorage.getItem('usertoken');
      axios({
              method: 'post',
              url: 'http://127.0.0.1:5000/furniture/post',
              withCredentials: false,
              crossdomain: true,
              data: reqData,
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
              // successfully register and login
              // start execute upload image process
              this.setState({"furniture_id": response.data.furniture_id})
              this.child.current.beginUpload(this.state.furniture_id);
              // redirect to hompage
              this.props.history.push("/");
          }
      })
      .catch((error) => {
          console.log("post error: " + error);
      });
    }

  newMethod() {
    this.render();
  }

    render(){
        const { classes } = this.props;

        return(
          <div>
              {/*part 1: Nav bar*/}
              <NavBar/>
              <div className="heading">
                <h2>Add your furniture</h2>

              </div>

              <div className="addfurniture-container">
              <div className='lhs'>
                <TextField
                  id="standard-name"
                  label="Funiture Name"
                  className={this.props.textField}
                  onChange={this.handleFurnitureNameInput('funiture_name')}
                  margin="normal"
                />

                <div class="styled-select blue semi-square">
                  <select
                    value={this.state.category}
                    onChange={this.handleCategoryInput('category')}
                    >
                    <option value="" hidden>Choose your category</option>
                    {categories.categories.map(category => (
                      <option value={category.title}>{category.title}</option>
                    ))}
                  </select>

                {/* end of DIVs */}
                </div>
                {/* Now we have category stored in category, extract the corresponding subcategories */}
                {this.renderSubcategoryInput()}

                <br/>
                <UploadImg resource_type="furniture"
                  name={this.state.username}
                  beforeUpload={this.handleBeforeUpload}
                  onUploadImg={this.handleUploadImg}
                  disabled={this.checkButtonStatus()}
                  ref={this.child}
                  limit={5}
                  />

                </div>

                <div className="rhs">
                <TextField
                  id="outlined-multiline-static"
                  label="Add a description"
                  multiline
                  rows="5"
                  className={this.props.textField}
                  onChange={this.handleDescriptionInput('description')}
                  margin="normal"
                  variant="outlined"
                />


                <TextField
                  id="outlined-multiline-flexible"
                  label="Add an address"
                  multiline
                  rowsMax="4"
                  onChange={this.handleAddressInput('address')}
                  className={this.props.textField}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  id="standard-name"
                  label="$"
                  className={this.props.textField}
                  onChange={this.handlePriceInput('price')}
                  margin="normal"
                />

                <br/>
                <button type="submit" onClick={this.handleSubmit}> Submit </button>
                </div>


              </div>

        {/* the very last div tag */}
        </div>
    )
  }

}
Add.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Add
