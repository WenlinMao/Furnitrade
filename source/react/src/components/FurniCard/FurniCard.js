import React from 'react'
import './FurniCard.css'

/* Furniture card compoenent
- image: the image of furniture posted
- title: name of the furniture
- text: description of the furniture (could be replaced by a button)
*/


const Card = props => (
    <div className="Card">
        <a href={props.link}>
        <img src={props.image} alt="This is the furniture representation passed in through JSON requested from the back-end"/>
        </a>
        <h3>{props.title}</h3>
        <p>{props.text}</p>
    </div>
)

export default Card
