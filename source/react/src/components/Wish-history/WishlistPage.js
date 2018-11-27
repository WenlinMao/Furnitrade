import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import Card from '../FurniCard/FurniCard';
import axios from 'axios';
import {getLocal} from '../../utils/util';

/* History page and wishlist page share the same css */
import './WishhistPage.css';

class WishlistPage extends Component {
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
  
  /*  componentWillMount() {
        const token = localStorage.getItem('usertoken');
        // const decoded = jwt_decode(token);
        // change the logic later
        let reqData = {
            
        };
        axios({
            method: 'get',
            url: '',
            withCredentials: false,
            crossdomain: true,
            data: reqData,
            responseType: 'json',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            let code = response.data.status;
            if (code === 200) {
              this.setState({
                data:response.data 
              });
            }
        }).catch((error) => {
            console.log("get wishlist: " + error);
        });
    
    }*/

  /*  handleClick = (id) => {
        
    }*/

    render() {
        return (
            <div>
                {/* Part one - NavBar - logic needed*/}
                <NavBar/>
                <div className="wishhist">
                    <h2>My Wishlist</h2>
                    <Wave/>
                {/* end of furni-page tag */}
                </div>

                {/* cards of furnitures wished,should be from backend*/}
                <div className="Card-group">
                {
                    this.state.data.length === 0 
                    ?
                    <div>Your wishlist is empty.</div>
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

export default WishlistPage;
