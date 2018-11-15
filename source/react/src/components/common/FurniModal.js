/** Modal component
 * This modal component shows detailed information of each furniture
 * and a contact form
*/
import React, { Component } from 'react';
import NavigationBar from '../common/NavigationBar';
import { Button, TextField } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const MainTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#42668f',
      main: '#134074',
      dark: '#0d2c51',
    },
    secondary: {
      light: '#61a5c5',
      main: '#3A8FB7',
      dark: '#286480',
    },
    inherit: {
      light: '#f7ca7f',
      main: '#F6BD60',
      dark: '#ac8443',
    },
  },
  typography: {
    fontFamily: '"Righteous", sans-serif',
  },
});

class FurniModal extends Component{
  constructor(props){
    super(props);
    this.state={
       picture:'test-propic.jpg',
       description:'this is a table with subarashi anime.',
       name:'Table one',
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

render(){

  return(
  <MuiThemeProvider theme = {MainTheme}>
  <div class="furniture-container">
  <NavigationBar/>
  <article>
  <header>
  <h1>{this.state.name}</h1>
  </header>
  <p>{this.state.description}</p>
  <img src={require("../../static/images/"+this.state.picture)} alt="furniture image"
  width="200" height="200"/>
  </article>
  <form>
  <label>
    Send a resuest:
    <br/>
    <textarea type="text" name="request" />
  </label>
  <br/>
  <input type="submit" value="Submit" />
</form>
  </div>
  </MuiThemeProvider>
);
}

}
export default FurniModal;
