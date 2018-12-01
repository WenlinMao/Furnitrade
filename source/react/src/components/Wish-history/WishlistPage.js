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
            ],
            empty: false
        };
    }

    componentWillMount() {
        const token = localStorage.getItem('usertoken');
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/user/get_wishlist',
            withCredentials: false,
            crossdomain: true,
            // data: reqData,
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
            } else if(code === 613) {
                this.setState({empty: true});
            } else if(code === 400) {
                localStorage.removeItem('usertoken');
                this.props.history.push('/login');
            }
        }).catch((error) => {
            console.log("get wishlist error: " + error);
        });

    }

  /*  handleClick = (id) => {

    }*/

    render() {
        return (
            <div>
                {/* Part one - NavBar - logic needed*/}
                <NavBar/>
                <div className="wishlist">
                    <h2>My Wishlist</h2>
                    <Wave/>
                {/* end of furni-page tag */}
                </div>

                {/* cards of furnitures wished,should be from backend*/}
                <div className="Card-group">
                {
                    this.state.empty
                    ?
                    <div>Your wishlist is empty.</div>
                    :
                    this.state.data.map(obj=>(
                        <Card
                            title={obj.title}
                            text={obj.price + obj.category}
                            img={obj.img}
                            type={"wishlist"}
                            // onClick={this.handleClick(obj.id)}
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
