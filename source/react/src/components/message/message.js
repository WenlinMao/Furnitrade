import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './message.css';
import axios from 'axios';link

class Mymessage extends Component {
    constructor(props){
        super(props);
        this.state={
          title: '',
          buyer_username: '',
          buyer_email: '',
          content:'',
          user:'',
          link:'',
          furniture_id:'',
          furniture_name: '',
        };
      }
    componentWillMount() {
        const contact_form_id = this.props.location.pathname.substring(8);
        console.log(contact_form_id)
        const temp= '';
        const token = localStorage.getItem('usertoken');

        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/contact_form/detail/' + contact_form_id,
            withCredentials: false,
            crossdomain: true,
            responseType: 'json',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            var data = response.data;
            let code = response.data.status;
            if (code === 200) {
              this.setState({
                title: data.title,
                buyer_username:  data.buyer_name,
                buyer_email: data.buyer_email,
                content: data.content,
                user:data.buyer_id,
                link:'',
                furniture_id: data.furniture,
                furniture_name: data.furniture_name,
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
