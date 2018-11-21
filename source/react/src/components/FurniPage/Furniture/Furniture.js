import React, {Component} from 'react';
import NavBar from '../../NavBar/NavBar';
import Wave from '../../common/Wave';
import './Furniture.css';

// TODO - just for testing
import test from '../../../static/images/wallpaper1.png';




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
                <div class="slider">
                <div className="atags">
                    <a href="#slide-1">1</a>
                    <a href="#slide-2">2</a>
                    <a href="#slide-3">3</a>
                    <a href="#slide-4">4</a>
                    <a href="#slide-5">5</a>
                </div>
                <div class="slides">
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

                </div>
                {/* <article>
                    <header><h1>{this.state.name}</h1></header>
                    <p>{this.state.description}</p>
                    <img src={require("../../../static/images/"+this.state.picture)} alt="furniture display" width="200" height="200"/>
                </article>
                <form>
                <label>
                    Send a resuest:
                    <br/>
                    <textarea type="text" name="request" rows="4" cols="50"/>
                </label>
                <br/>

                <input type="submit" value="I want this!" />
                </form> */}


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
