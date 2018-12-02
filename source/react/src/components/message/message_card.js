import React from 'react';
import './message_card.css';

const Mcard = props =>(
  <a href={"http://localhost:3000/message/" + props.contact_form_id}>
    <div className="message">
        <h2>{props.title}</h2>
        <p> A message from {props.username} </p>
    </div>
  </a>
)

export default Mcard
