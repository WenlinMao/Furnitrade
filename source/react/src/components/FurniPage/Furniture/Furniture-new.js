import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import NavBar from '../../NavBar/NavBar';
import Wave from '../../common/Wave';
import './Furniture-new.css';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Slide } from 'react-slideshow-image';

// // TODO - just for testing
// import slide1 from '../../../static/images/img/slide1.png';
// import slide2 from '../../../static/images/img/slide2.png';
// import slide3 from '../../../static/images/img/slide3.png';
// import slide4 from '../../../static/images/img/slide4.png';
// import slide5 from '../../../static/images/img/slide5.png';
//
//
// const fadeImages = [
//     slide1,
//     slide2,
//   ];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: false,
    indicators: false,
    arrow: false
  }

  const propertiesMulti = {
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
           picture_view:[],
           description:'',
           name:'',
           price:'',
           content:'',
           seller_id:'',
           furniture_id:'',
           success: false,
           redirect: false,
           pictures: [],
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
            } else if (code === 400){
                localStorage.removeItem('usertoken');
                this.props.history.push("/Login");
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
                    description:data.description,
                    name:data.furniture_name,
                    price:data.price,
                    location:data.location,
                    seller_id:data.seller,
                    furniture_id:furnitureId,
                    success: false,
                    redirect: false,
                    pictures: data.images,
                    wishlistSuccess: false
                })
            } else if (code === 400){
              localStorage.removeItem('usertoken');
              this.props.history.push("/Login");
            }
        })
        .catch((error)=>{
        })
    }


    SlideShow = (props) => {

    }

    setRedirect = () => {
      this.setState({ redirect: true})
    }
    /* set Request Title */
    handleTitleInput = name => event => {
      this.setState({title: event.target.value});
    }

    /* set Request Content */
    handleRequestInput = name => event => {
      this.setState({request: event.target.value});
    }

    renderRedirect = () => {
      if (this.state.redirect) {return <Redirect to='/wishlist' />}
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
          console.log("succesfully save to wishlist");
          this.setState({wishlistSuccess: true});
        } else if (code === 400){
          localStorage.removeItem('usertoken');
          this.props.history.push("/Login");
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
          if (code === 200) {
            this.setState({"content": response.data.content})
            this.setState({success: true});
          } else if (code === 400){
            localStorage.removeItem('usertoken');
            this.props.history.push("/Login");
          }
      })
      .catch((error) => {console.log("post error: " + error);});
    }

    newMethod() { this.render(); }

    render () {
        const check = "far fa-check-circle";

        let config;
        if (this.state.pictures.length===0) {
          return null;
        } else if (this.state.pictures.length===1){
          config = properties;
        } else {
          config = propertiesMulti
        }

        let slide_show =
          <Slide {...config}>
            {
                this.state.pictures.map((each, index) =>
                    <img key={index} style={{width: "100%", height: "100%"}}
                    src={"https://s3.amazonaws.com/furnitrade-dev-attachments/" + each} />
                )
            }
          </Slide>

        return (
            <div className="furniture">
                <NavBar />

                <div className="furniture-container">

                    <div className="lhs-container">

                        {/* title part */}
                        <div className="title">
                            <h2>{this.state.name}</h2><Wave/>
                        {/* end of title tag */}
                        </div>

                        {/* slideshow part */}
                        <div className="slides">
                          {slide_show}
                        </div>
                    {/* end of LHS */}
                    </div>


                    <div className="rhs-container">

                        {/* description of the furniture */}
                        <div id="info">
                        <p>Price: ${this.state.price}</p>
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

                        {this.state.success?
                        <FormHelperText error={false}>Request successfully! <i className={check}></i></FormHelperText>
                        : null }
                        {this.state.wishlistSuccess?
                          <FormHelperText error={false}>Already saved to the wishlist! <i className={check}></i></FormHelperText>
                          : null }
                        <div className="submit-wish-buttons">
                            {this.renderRedirect()}
                            <button onClick={this.saveToWishlist}>Add to wishlist</button>
                            <button type="button" onClick={this.handleSubmit}> Contact Seller </button>
                        </div>

                    {/* end of RHS */}
                    </div>
                {/* end of furniture container */}
                </div>
            {/* end of furniture */}
            </div>

        /* end of return */
        );

    /* end of render function */
    }

/* end of file */
}

/* Export Furniture */
export default Furniture
