import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './message.css';

class Mymessage extends Component {
    constructor(props){
        super(props);
        this.state={
          message:'',
          user:'',
          link:"http://localhost:3000/",
        };
      }

render(){
  return(
      <div>
          <NavBar/>
          <div className="heading">
              <h2>A request message for you</h2>
              <Wave/>
          </div>
            <div className="message">
                <a href={this.state.link}>
                <p>Here is a message for you about the request you have from{this.state.user}</p>
                <p>Hi, I want to get your stuff</p>
                <footer>Click the banner to go to your furniture..</footer>
                </a>
            </div>

      </div>

    )
}
}
export default Mymessage
