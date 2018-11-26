import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar';
import Wave from '../../common/Wave';
import './Furniture.css';

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
           description:'this is a table with baby shark dudududududu.',
           name:'Table one',
           price:'0',
           request:'',
        };
        this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
    this.setState({request: event.target.value});
    }

    handleSubmit(event){
      alert('An request was submitted: ' + this.state.request);
        event.preventDefault();
    }


render () {
    return (
        <div className="furniture">
            <NavBar/>
            <div className="furniture-container">



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



