import React from 'react';
import './FurniCard.css';

import DeleteAlert from './deleteAlert/DeleteAlert';
import deletebutton from '../../static/images/delete-button.png';

/* Furniture card compoenent
- image: the image of furniture posted
- title: name of the furniture
- text: description of the furniture (could be replaced by a button)
- delete alert: used to delete a furniture post
*/


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return(

            <div className="Card">
                {
                    this.props.fromMyFurniture ?
                    <div className="delete-button">
                    {/* <input type="image" src={deletebutton}/> */}
                    <DeleteAlert deletebutton={deletebutton} type={this.props.type}
                    furniture_id={this.props.furniture_id} rerender={this.props.rerender}/>
                    </div> : null
                }
                <a href={"http://localhost:3000/furniture/" + this.props.furniture_id}>
                    <img src={this.props.image} />
                </a>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.text}</p>

            </div>

        );
    }
}
export default Card;
