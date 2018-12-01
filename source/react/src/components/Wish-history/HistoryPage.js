import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import Card from '../FurniCard/FurniCard';
import axios from 'axios';

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
            ],
            empty: false
        };
    }

    componentWillMount() {
        const token = localStorage.getItem('usertoken');
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/user/get_history',
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
            console.log("get history error: " + error);
        });
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
                    this.state.empty
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
