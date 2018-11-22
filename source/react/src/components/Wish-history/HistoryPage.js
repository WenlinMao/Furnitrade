import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import Card from '../FurniCard/FurniCard';

/* History page and wishlist page share the same css */
import './WishhistPage.css';

class HistoryPage extends Component {

    render() {
        return (
            <div>
                {/* Part one - NavBar - logic needed*/}
                <NavBar/>
                <div className="wishhist">
                    <h2>Recently Viewed History</h2>
                    <Wave/>
                {/* end of furni-page tag */}
                </div>

                {/* cards of furnitures viewing history, Limited to 4, need backend*/}
                <div className="Card-group">
                <Card
                    title="Furniture1"
                    text="First wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                />


                <Card
                    title="Furniture2"
                    text="Second wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                />

                <Card
                    title="Furniture3"
                    text="Third wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                />

                <Card
                    title="Furniture4"
                    text="Forth wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                />
                </div>

            {/* end of  DIV */}
            </div>
        );
    }
}

export default HistoryPage;
