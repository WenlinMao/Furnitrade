import React from 'react'
import './FurniCard.css'

/* Furniture card compoenent
- image: the image of furniture posted
- title: name of the furniture
- text: description of the furniture (could be replaced by a button)
*/


const Card = props => (
    <div className="Card">
        <img src={props.image} />
        <h3>{props.title}</h3>
        <p>{props.text}</p>
    </div>
)

export default Card