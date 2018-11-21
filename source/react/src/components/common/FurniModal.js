/** Modal component
 * This modal component shows detailed information of each furniture
 * and a contact form
*/
import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave'
// import { Button, TextField } from "@material-ui/core";
//import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import "./FurniModal.css";
import axios from 'axios';
import {getLocal} from '../../utils/util';


class FurniModal extends Component{
  constructor(props){
    super(props);
    this.state={
       picture:'test-propic.jpg',
       description:'this is a table with subarashi anime.',
       name:'Table one',
       price:'88',
       request:'',
       hasLogin:false
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

render(){

  return(
  <div className="furniture-container">
  <NavBar hasLogin={this.state.hasLogin}/>
  <div className="intro">
  <article>
  <header>
  <h4>{this.state.name}</h4>
  </header>

  <img src={require("../../static/images/"+this.state.picture)} alt="furniture display"
  width="200" height="200"/>
    <p>{this.state.description}</p>
  <footer>  <p id="price">${this.state.price}</p></footer>
  </article>
  </div>
  <form>
  <label>
    Send a resuest:
    <br/>
    <textarea type="text" name="request" rows="10" cols="40"/>
  </label>
  <br/>

  <input type="submit" value="I want this!" />
</form>
  </div>

);
}

}
export default FurniModal;
