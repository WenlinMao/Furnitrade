import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';
import Button from '@material-ui/core/Button';
import Card from '../FurniCard/FurniCard';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

const styles = theme => ({
  fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },

});

/* Card component in MyFurniture has "fromMyFurniture" prop - render delete button */
class MyFurniture extends Component {

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

   /* componentWillMount() {
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
    
    }*/

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
                {
                    this.state.empty || this.state.data.length === 0 
                    ?
                    <div>You haven't post any furniture.</div>
                    :
                    this.state.data.map(obj=>(
                        <Card
                            title={obj.title}
                            text={obj.price + obj.category}
                            img={obj.img}
                            // onClick={this.handleClick(obj.id)}
                        />)
                    )
                }
                    {/* Should send request for wished furnitures */}
                </div>
            {/* end of  DIV */}
            </div>
        );
    }
}

export default MyFurniture;
