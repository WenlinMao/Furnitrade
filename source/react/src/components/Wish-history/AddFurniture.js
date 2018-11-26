import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';
import './AddFurniture.css';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import {setLocal, getLocal} from '../../utils/util';
import {UploadImg} from '../uploadImg/UploadImg';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// import '../uploadImg/UploadImg'
import categories from '../../static/data/category.json';


class Add extends Component{
  constructor(props) {
      super(props);
      this.state = {
          furniture_name: '',
          category: '',
          images:'',
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
      };
      this.child = React.createRef();
  }



    handleFurnitureNameInput = name => event => {
      this.setState({furniture_name: event.target.value});
    }

    handlePriceInput = name => event => {
      this.setState({price: event.target.value});
    }


    handleCategoryInput=name =>event =>{
      this.setState({category:event.target.value});
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

    // call back handle when uploadImg finished
    handleUploadImg = (img_pathes) => {
        console.log(img_pathes)

        // change image pathes in database after uploadImg to s3
        var token = getLocal("usertoken")
        let config = {
            headers: {"Authorization": `Bearer ${token}`},
            params: {
                img_pathes: img_pathes
            },
        }

        axios.get('http://127.0.0.1:5000/furniture/change_img', config)
        .then((response) => {
            let code = response.data.status;
            if (code === 200) {
                console.log(response);
            } else if (code === 400) {
                localStorage.removeItem('usertoken');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      let reqData = {
        'furniture_name': this.state.furniture_name,
        'price': this.state.price,
        'description': this.state.description,
        'address': this.state.address,
        'category': this.state.category,
        'image': this.img_pathes,
      };
      console.log(reqData);
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
              // trigger for render user page or non-user page
              setLocal("furniture_name", reqData.furniture_name);
              // set user jwt token for later access
              setLocal("usertoken", response.data.token);
              console.log("localStorgae", getLocal("furniture_name"));
              setLocal("price", reqData.price);
              console.log("localStorgae", getLocal("price"));
              setLocal("description", reqData.description);
              console.log("localStorgae", getLocal("description"));
              setLocal("address", reqData.address);
              console.log("localStorgae", getLocal("address"));

              // get token for userid
              var token = getLocal("usertoken")
              var jwt_decode = require('jwt-decode');
              var decoded = jwt_decode(token);
              console.log(decoded)
              // start execute upload image process
              this.child.current.beginUpload(decoded.user_id);
              // redirect to hompage
              this.props.history.push("/");
          }
      })
      .catch((error) => {
          console.log("post error: " + error);
      });
    }

    render(){
        const { classes } = this.props;

        return(
          <div>
              {/*part 1: Nav bar*/}
              <NavBar/>
              <div className="heading">
                <h2>Add your furniture</h2>
                <Wave/>
              </div>

              <form className="form" onSubmit={this.handleSubmit}>
                <TextField
                  id="standard-name"
                  label="Funiture Name"
                  className={this.props.textField}
                  onChange={this.handleFurnitureNameInput('funiture_name')}
                  margin="normal"
                />

                <TextField
                  id="standard-name"
                  label="$"
                  className={this.props.textField}
                  onChange={this.handlePriceInput('price')}
                  margin="normal"
                />

                <InputLabel htmlFor="age-simple">Age</InputLabel>
                <Select
                    value={this.state.category}
                    onChange={this.handleCategoryInput('value')}
                    inputProps={{
                      name: 'age',
                      id: 'age-simple',
                    }}
                  >


                        {categories.categories.map(category => (
                          <div>
                            {category.subcategories.sub.map(sub=>(
                              <MenuItem value={sub.list}>{sub.list}</MenuItem>
                            ))}
                          </div>
                        ))}


                      {/*<MenuItem value={"Bedroom"}>Bedroom</MenuItem>*/}
                      //<MenuItem value={"Cooktops"}>Cooktops</MenuItem>
                      //<MenuItem value={30}>Thirty</MenuItem>
                    </Select>

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
                <UploadImg resource_type="user"
                  name={this.state.username}
                  beforeUpload={this.handleBeforeUpload}
                  onUploadImg={this.handleUploadImg}
                  disabled={this.checkButtonStatus()}
                  ref={this.child}
                  />
                <button type="submit"> Submit </button>
              </form>

        {/* the very last div tag */}
        </div>
    )
  }

}
Add.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Add
