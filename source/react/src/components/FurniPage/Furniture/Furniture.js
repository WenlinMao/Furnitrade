import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import NavBar from '../../NavBar/NavBar';
import Wave from '../../common/Wave';
import './Furniture.css';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Fade } from 'react-slideshow-image';

// TODO - just for testing
import slide1 from '../../../static/images/img/slide1.png';
import slide2 from '../../../static/images/img/slide2.png';
import slide3 from '../../../static/images/img/slide3.png';
import slide4 from '../../../static/images/img/slide4.png';
import slide5 from '../../../static/images/img/slide5.png';


const fadeImages = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5
  ];

  const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrow: true
  }

/* Furniture class:
    - A new page for a specific furniture
    - should have every detail information of
    - a furniture, such as ==> Title, category (can be hidden),
    - location, Price, description, dimension details, etc. */
class Furniture extends Component {
    constructor(props){
        super(props);
        this.state={
           picture:'test-propic.jpg',
           description:'Everything you need for storing and keeping things organized at home. Choose a ready-made combination or create your own, adapted to your style and belongings. This is just one of many, many possibilities.',
           name:'Table one',
           price:'0',
           content:'',
           seller_id:'5c00b5ebf661a90ae131e678',
           furniture_id:'5c00b5ebf661a90ae131e678',
           success: false,
        };
    }

    componentWillMount() {
        const furnitureId = this.props.location.pathname.substring(11);
        console.log(furnitureId);
        this.setState({furniture_id: furnitureId});
        const token = localStorage.getItem('usertoken');

        let config = {
          headers: {"Authorization": `Bearer ${token}`},
          params: {
            furniture_id : furnitureId // don't use this.state.furniture_id
          },
        }
        //add to history
        axios.get('http://127.0.1:5000/furniture/add_history', config)
        .then((response)=>{
            console.log("add to history",response.data);
            let code = response.data.status;
            if(code === 200) {
                console.log("succesfully added to history")
            }
        })
        .catch((error)=>{
        })

        // get defail information of the furniture
        let config1 = {
          headers: {"Authorization": `Bearer ${token}`},
          params: {
            furniture_id : furnitureId
          }// don't use this.state.furniture_id
        };

        axios.get('http://127.0.0.1:5000/furniture/detail', config1)
        .then((response)=>{
            console.log("get detail", response.data);
            let code = response.data.status;
            if(code === 200) {
                console.log("get detail successfully")
                var data = response.data
                this.setState({
                  picture:data.images,
                  description:data.description,
                  name:data.furniture_name,
                  price:data.price,
                  location:data.location,
                  seller_id:'5c00b5ebf661a90ae131e678',
                  furniture_id:'5c00b5ebf661a90ae131e678',
                  success: false,
                })
            } else if (code === 319) {
                // TODO: used to handle when the furniture has been delete
            }
        })
        .catch((error)=>{
        })

    }

    /* set Request Title */
    handleTitleInput = name => event => {
      this.setState({title: event.target.value});
    }

    /* set Request Content */
    handleRequestInput = name => event => {
      this.setState({request: event.target.value});
    }

    saveToWishlist = () => {
      const token = localStorage.getItem('usertoken');
      let config = {
        headers: {"Authorization": `Bearer ${token}`},
        params: {
            furniture_id : this.state.furniture_id // we can use this.state.furniture_id here
        },
      }
      // save to wishlist
      axios.get('http://127.0.1:5000/furniture/add_wishlist', config)
      .then((response)=>{
        console.log("save to wishlist",response.data);
        let code = response.data.status;
        if(code === 200) {
          console.log("succesfully save to wishlist")
        }
      })
      .catch((error)=>{
      })

    }

    handleSubmit = (e) => {
      e.preventDefault();
      let reqData = {
        'content': this.state.request,
        'title': this.state.title,
        'seller_id': this.state.seller_id,
        'furniture_id': this.state.furniture_id,
      };
      console.log(reqData);

      const token = localStorage.getItem('usertoken');
      axios({
          method: 'post',
          url: 'http://127.0.0.1:5000/contact_form/contact',
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
          if (code == 200) {
            this.setState({"content": response.data.content})
            this.setState({success: true});
          }
      })
      .catch((error) => {
          console.log("post error: " + error);
      });
    }

  newMethod() {
    this.render();
  }


render () {
    const check = "far fa-check-circle";
    return (
        <div className="furniture">
            <NavBar/>

            <div className="furniture-container">
            <div className="title">
                <h2>{this.state.name}</h2>
                <Wave/>
            {/* end of furni-page tag */}
            </div>


                {/* Photo container - pictures of furnitures */}
                {/* <div class="slider"> */}
                {/* <div className="atags">
                    <a href="#slide-1">1</a>
                    <a href="#slide-2">2</a>
                    <a href="#slide-3">3</a>
                    <a href="#slide-4">4</a>
                    <a href="#slide-5">5</a>
                </div> */}
                {/* <div class="slides">
                    <div className="slide" id="slide-1"><img src={test} alt="just for test - use data requested in the future"/></div>
                    <div className="slide" id="slide-2"><img src={test} alt="just for test - use data requested in the future"/></div>
                    <div className="slide" id="slide-3"><img src={test} alt="just for test - use data requested in the future"/></div>
                    <div className="slide" id="slide-4"><img src={test} alt="just for test - use data requested in the future"/></div>
                    <div className="slide" id="slide-5"><img src={test} alt="just for test - use data requested in the future"/></div>
                </div>
                <div id="info">
                <h3>{this.state.name}</h3>
                <p>{this.state.description}</p>
                <h6>${this.state.price}</h6>
                </div>
                </div>
                <div id="request">
                <form>
                <label>
                  Send a resuest:
                  <br/>
                  <textarea type="text" name="request" rows="4" cols="50"/>
                </label>
                <br/>

                <input type="submit" value="I want this!" />
              </form>

                </div> */}

            {/* slideshow part */}
             <Fade {...fadeProperties}>
                <div className="each-fade">
                    <div className="image-container">
                    <img src={fadeImages[0]} />
                    </div>
                    <h2>First Slide</h2>
                </div>
                <div className="each-fade">
                    <div className="image-container">
                    <img src={fadeImages[1]} />
                    </div>
                    <h2>Second Slide</h2>
                </div>
                <div className="each-fade">
                    <div className="image-container">
                    <img src={fadeImages[2]} />
                    </div>
                    <h2>Third Slide</h2>
                </div>
            </Fade>
          {/* End of furniture-container */}
          <p>${this.state.price}</p>
          </div>

          <div className="text-container">
            {/*The descriptions, category, price and request form*/}
            <div id="info">

            <p>{this.state.description}</p>
            </div>


              <TextField
                id="outlined-multiline-static"
                label="Title"
                multiline="False"
                rows="1"
                className={this.props.textField}
                onChange={this.handleTitleInput('title')}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="outlined-multiline-static"
                label="Write a request"
                multiline="True"
                rows="6"
                fullwidth="True"
                className={this.props.textField}
                onChange={this.handleRequestInput('request')}
                margin="normal"
                variant="outlined"
              />
              {
                  this.state.success
                  ?
                  <FormHelperText error={false}>Request successfully! <i className={check}></i></FormHelperText>
                  :
                  <div></div>
              }

              <div>
                <button onClick={this.saveToWishlist}>Add to wishlist</button>
              </div>
            <button type="button" onClick={this.handleSubmit}> Submit </button>

          {/* End of text-container */}
          </div>





        {/* End of the very last DIV tag */}
        </div>
    );

/* End of render */
}
/* End of class */
}

/* Export Furniture */
export default Furniture
