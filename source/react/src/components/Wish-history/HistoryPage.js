import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import Card from '../FurniCard/FurniCard';

/* History page and wishlist page share the same css */
import './WishhistPage.css';

class HistoryPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {
                    title: 'furniture', 
                    id: '1',
                    img:require('../../static/images/wallpaper1.png'), 
                    price: '$20',
                    category: "Electronics"
                }, 
                {
                    title: 'furniture', 
                    id: '1',
                    img:require('../../static/images/wallpaper1.png'), 
                    price: '$20',
                    category: "Electronics"
                },
                {
                    title: 'furniture', 
                    id: '1',
                    img:require('../../static/images/wallpaper1.png'), 
                    price: '$20',
                    category: "Electronics"
                },
            ]
        };
    }

    componentWillMount() {
        
    }
    
    handleClick = (id) => {
        
    }
  
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
                {
                    this.state.data.length === 0 
                    ?
                    <div>You didn't view any furniture recently.</div>
                    :
                    this.state.data.map(obj=>(
                        <Card
                            title={obj.title}
                            text={obj.price + obj.category}
                            img={obj.img}
                            onClick={this.handleClick(obj.id)}
                        />)
                    )
                }
                </div>

            {/* end of  DIV */}
            </div>
        );
    }
}

export default HistoryPage;
