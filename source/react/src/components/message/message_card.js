import React from 'react';
import './message_card.css';

const Mcard = props =>(
  <div className="message">
      <h2>{props.title}</h2>
      <p> A message from {props.username} </p>
      <a href={"http://localhost:3000/message/" + props.contact_form_id}>
      <footer>Click here to go to your message..</footer>
      </a>
  </div>
)

export default Mcard
