import React from 'react';
import './message_card.css';

const Mcard = props =>(
  <div className="message">

      <p>Here is a request for you from {props.user}</p>
      <a href={"http://localhost:3000/message/" + props.contact_form_id}>
      <footer>Click here to go to your message..</footer>
      </a>
  </div>
)

export default Mcard
