import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';

class MyFurniture extends Component {

    render() {
        return (
            <div>
                {/* Part one - NavBar - logic needed*/}
                <NavBar/>
                <div className="my-furni">
                    <h2>My Furnitures</h2>
                    <Wave/>
                {/* end of furni-page tag */}
                </div>

                {/* cards of furnitures wished */}
                <div className="Card-group">
                    {/* Should send request for wished furnitures */}
                </div>

                {/* Part 3 - fixed "add" button - post a new furniture */}

            {/* end of  DIV */}
            </div>
        );
    }
}

export default MyFurniture;