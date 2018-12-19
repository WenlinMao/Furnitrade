import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './AddFurniture.css';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import {getLocal} from '../../utils/util';
import {UploadImg} from '../uploadImg/UploadImg';
import Button from '@material-ui/core/Button';

// import '../uploadImg/UploadImg'
import categories from '../../static/data/category.json';
import FormHelperText from '@material-ui/core/FormHelperText';

// regular expression for price
const priceRegex = /^\d+(.\d{1,2})?$/;

class Add extends Component{
  constructor(props) {
      super(props);
      this.state = {
          furniture_name: '',
          category: '',
          subcategory: '',
          price: '',
          location: '',
          description: '',
          furniture_nameError: false,
          priceError: false,
          descriptionError: false,
          addressError: false,
          errorMsg: '',
          furniture_id: '',
          is_upload_image: false,
      };
      this.child = React.createRef();
  }



    /* set Furniture Name */
    handleFurnitureNameInput = name => event => {
      this.setState({furniture_name: event.target.value});
    }

    // handle price input
    handlePriceInput = name => event => {

      // set price if input matches price regex
      // TODO: might submit invalid price value to database even though we show
      // error message
      this.setState({price: event.target.value});
      if (event.target.value.match(priceRegex)) {
        this.setState({
          price: event.target.value,
          priceError: false,
        });
      }
      else {
        this.setState({
          priceError: true,
        });
      }

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
      this.setState({location: event.target.value});
    }

    handleBeforeUpload = (files) => {
        var is_upload_image = false

        if (!files || files.length<=0){
            is_upload_image = false
        } else {
            is_upload_image = true
        }
        this.setState({is_upload_image});
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
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            let code = response.data.status;
            if (code === 200) { console.log(response);}
            else if (code === 400) {
              localStorage.removeItem('usertoken');
              this.props.history.push('/login');
            }
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
        'address': this.state.location,
        'category': this.state.subcategory,
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
              alert("Post an item successfully");
          } else if (code === 400){
              localStorage.removeItem('usertoken');
              this.props.history.push("/Login");
          }
      })
      .catch((error) => {
          console.log("post error: " + error);
      });
    }

  newMethod() {
    this.render();
  }

  // returm true if any of inputs are invalid
  checkButtonStatus = () => {
    let emptyStatus =
      this.state.furniture_name === ""
      || this.state.category === ""
      || this.state.subcategory === ""
      || this.state.location === ""
      || this.state.price === ""
      || this.state.description === ""
      || this.state.is_upload_image === false;

    let errorStatus = this.state.priceError;

    return emptyStatus || errorStatus;
  }

  render(){
    return(
      <div>
          {/*part 1: Nav bar*/}
          <NavBar/>
          <div className="heading">
          <h2>Add your furniture</h2>
            <Wave/>
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

            <p>Pick your category: </p>
            <div className="selects">
              <div class="styled-select blue semi-square">
                <select
                  value={this.state.category}
                  onChange={this.handleCategoryInput('category')}
                  >
                  <option value="" hidden>Choose a category</option>
                  {categories.categories.map(category => (
                    <option value={category.title}>{category.title}</option>
                  ))}
                </select>
              </div>

              {/* Now we have category stored in category, extract the corresponding subcategories */}
              {this.state.category === "" ?
              <div class="styled-select blue semi-square">
              <select><option>Choose a subcategory</option></select></div>
              :this.renderSubcategoryInput()}

            {/* end of DIVs */}
            </div>

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

            </div>

            <div className="rhs">
            <UploadImg resource_type="furniture"
              inputClass="from-add-furniture"
              beforeUpload={this.handleBeforeUpload}
              onUploadImg={this.handleUploadImg}
              hint={"Upload Images (up to 5)"}
              ref={this.child}
              limit={5}
              />

            <TextField
              id="outlined-multiline-flexible"
              label="Add an address"
              multiline
              rowsMax="4"
              onChange={this.handleAddressInput('location')}
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
              error={this.state.priceError}
            />
            {
                this.state.priceError
                ?
                <FormHelperText error={true}>Please input a valid pirce</FormHelperText>
                :
                <div></div>
            }
            {
              this.checkButtonStatus()?
              <Button
                className = "register-button"
                disabled={this.checkButtonStatus()}
                variant="contained" > Submit </Button> :
              <button
                  type="submit"
                  onClick={this.handleSubmit}
                  disabled={this.checkButtonStatus()}
                  variant="contained">
                  Submit</button>
            }
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
