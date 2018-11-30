import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './message.css';

class Mymessage extends Component {
    constructor(props){
        super(props);
        this.state={
          message:'A request message for you',
          user:'',
          link:"http://localhost:3000/",
        };
      }
    componentWillMount() {
        const token = localStorage.getItem('usertoken');
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/contact_form/detail/'
            withCredentials: false,
            crossdomain: true,
            // data: reqData,
            responseType: 'json',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            let code = response.data.status;
            if (code === 200) {
              this.setState({
                data:response.data
              });
            }
        }).catch((error) => {
            console.log("get message error: " + error);
        });
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
