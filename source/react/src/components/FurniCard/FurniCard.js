import React from 'react';
import './FurniCard.css';

import DeleteAlert from './deleteAlert/DeleteAlert';
import deletebutton from '../../static/images/delete-button.png';
/* Furniture card compoenent
- image: the image of furniture posted
- title: name of the furniture
- text: description of the furniture (could be replaced by a button)
*/


const Card = props => (
    <div className="Card">
        {
            props.fromMyFurniture ? 
            <div className="delete-button">
            {/* <input type="image" src={deletebutton}/> */}
            <DeleteAlert deletebutton={deletebutton}/>
            </div> : null
        }
        <a href="http://localhost:3000/">
            <img src={props.image} /></a>
        <h3>{props.title}</h3>
        <p>{props.text}</p>
    </div>
)

export default Card
