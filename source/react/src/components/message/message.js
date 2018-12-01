import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './message.css';
import axios from 'axios';

class Mymessage extends Component {
    constructor(props){
        super(props);
        this.state={
          contact_form_id:'',
          Title:'',
          seller_id:'',
          content:'',
          furniture_id:'',
        };
      }
      componentWillMount() {
              const contactId = this.props.location.pathname.substring(8);
              console.log(contactId);
              this.setState({contact_form_id: contactId});
              const token = localStorage.getItem('usertoken');

              let config = {
                headers: {"Authorization": `Bearer ${token}`},
                params: {
                  contact_form_id : contactId // don't use this.state.furniture_id
                },
              }

              // get defail information of the furniture
              let config1 = {
                headers: {"Authorization": `Bearer ${token}`},
                params: {
                  contact_form_id : contactId
                }// don't use this.state.furniture_id
              };

              axios.get('http://127.0.0.1:5000/furniture/detail', config1)
              .then((response)=>{
                  console.log("get detail", response.data);
                  let code = response.data.status;
                  if(code === 200) {
                      console.log("get detail successfully")
                      var data = response.data
                      this.setState({
                        Title:data.Title,
                        content:data.content,
                        seller_id:'5c00b5ebf661a90ae131e678',
                        furniture_id:'5c00b5ebf661a90ae131e678',
                        success: false,
                        redirect: false,
                      })
                  }
              })
              .catch((error)=>{
              })
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
