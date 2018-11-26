import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';
import Button from '@material-ui/core/Button';
import Card from '../FurniCard/FurniCard';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },

});
class MyFurniture extends Component {

    render() {
        return (
            <div>
                {/* Part one - NavBar - logic needed*/}
                <NavBar/>
                <div className="my-furni">
                    <h2>My Furnitures</h2>
                    {/* Part 3 - fixed "add" button - post a new furniture */}
                    <button>+</button>
                    <Wave/>
                {/* end of furni-page tag */}
                </div>

                {/* cards of furnitures already added, now display 4 furnitures*/}
                <div className="Card-group">
                <Card
                    title="Furniture1"
                    text="First wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />


                <Card
                    title="Furniture2"
                    text="Second wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />

                <Card
                    title="Furniture3"
                    text="Third wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />

                <Card
                    title="Furniture4"
                    text="Forth wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />

                    {/* Should send request for wished furnitures */}
                </div>
            
            {/* end of  DIV */}
            </div>
        );
    }
}

export default MyFurniture;
