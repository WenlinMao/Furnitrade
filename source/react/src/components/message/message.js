import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './message.css';
import axios from 'axios';

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
            url: 'http://127.0.0.1:5000/contact_form/detail' + contact_form_id,
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
              var furniture_link = 'http://127.0.0.1:3000/furniture/'
                                  + data.furniture
              this.setState({
                title: data.title,
                buyer_username:  data.buyer_name,
                buyer_email: data.buyer_email,
                content: data.content,
                user:data.buyer_id,
                furniture_id: data.furniture,
                furniture_name: data.furniture_name,
                link: furniture_link,
              });
            }
        }).catch((error) => {
            console.log("get message error: " + error);
        });
    }

render(){
  return(
          <NavBar/>
          <div className="messagePage">
          <div className="heading">
              <h2>My Message</h2>
              <Wave/>
          </div>
            <a href={this.state.link}>
              <div className="myMessage">
                  <h3>{this.state.title}</h3>

                  <p>{this.state.content}</p>
              </div>
            </a>
      </div>

    );
}
}
export default Mymessage
