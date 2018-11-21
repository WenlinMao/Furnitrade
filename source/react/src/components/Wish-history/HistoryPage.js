import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';

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

                {/* cards of furnitures wished */}
                <div className="Card-group">
                    {/* Should send request for wished furnitures */}
                </div>

            {/* end of  DIV */}
            </div>
        );
    }
}

export default HistoryPage;