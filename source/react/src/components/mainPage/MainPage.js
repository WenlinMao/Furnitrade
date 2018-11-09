import React, { Component } from 'react';
import NavBar from '../common/NavBar/NavBar';
import {Link} from 'react-router-dom';
import {getLocal} from '../../utils/util';
import Wave from '../common/Wave';
import "./MainPage.css";

  class MainPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasLogin: false
      }
    }

    // Easy hack; 别的方法试了一下,不好使,先用这个方法。
    // check if the user has logged in
    componentWillMount() {
      if(getLocal("username") !== "" ){
        this.setState({hasLogin: true});
         // TODO: GET request
      }
      else {
        this.setState({hasLogin: false});
      }
    }

    render() {
      return (
        <div>
          <NavBar/>
          <div className="Index">
            <div className="Index-group">
              <h1>Furnitrade </h1>
              <p>Furniture Trade Platform</p>
              <p>Best Trading Platform ever. Make your life easier. Finding your desired furnitures at the most inexpensive price and best quality! </p>
              {
                !this.state.hasLogin ?
                <div className="login-signup-group">
                  <Link to="./Login">Login</Link>
                  <Link to="./Register">Register</Link>
              </div> : null
              }
              
            </div>
            <Wave/>          

          {/* End of Index DIV */}
          </div>

        {/* Final DIV - add everything above this DIV */}
        </div>
      );
    }
  }

  export default MainPage
  // export default MainPage;
