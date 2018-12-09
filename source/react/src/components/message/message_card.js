import React from 'react';
import './message_card.css';

const Mcard = props =>(
  <div className="messageCard">
    <a href={"http://localhost:3000/message/" + props.contact_form_id}>
      <div className="message">
          <h5>{props.title}</h5>
          <p> A message from {props.username} </p>
      </div>
    </a>
  </div>
)

export default Mcard
