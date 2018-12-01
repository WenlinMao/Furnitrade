import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import NavBar from '../../NavBar/NavBar';
import Wave from '../../common/Wave';
import './Furniture-new.css';
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
           redirect: false,
        };
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
        .catch((error) => {console.log("post error: " + error);});
      }
  
    newMethod() { this.render(); }

    render () {
        const check = "far fa-check-circle";
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

                        <div className="submit-wish-buttons">
                            {this.renderRedirect()}
                            <button onClick={this.setRedirect}>Add to wishlist</button>
                            <button type="button" onClick={this.handleSubmit}> Submit </button>
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