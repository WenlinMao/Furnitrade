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
            data: '',
            empty: false
        };
    }

    componentWillMount() {
       this.getWishlist();

    }

    getWishlist = () => {
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
            // let data = JSON.parse(response.data.result);
            // console.log("data,", data);
            let code = response.data.status;
            if (code === 200) {
                let data = JSON.parse(response.data.result);
                console.log("data,", data);
              this.setState({
                data: data,
                empty: false
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

    rerender = () => {
        this.getWishlist();
    }

    render() {
        // console.log("state", this.state.data)
        return (
            <div>
              {/* Part one - NavBar - logic needed*/}
              <NavBar/>
              <div className="wishlist">
                  <h2>My Wishlist</h2>
                  <Wave/>
              {/* end of furni-page tag */}
              </div>

              {
                this.state.empty
                ?
                <div className="wishlist">
                  <h2>Your wishlist is empty.</h2>
                </div> :
                <div className="Card-group">
                  {
                    this.state.data.length === 0 ?
                    null :
                    this.state.data.map(obj=>(
                      <Card
                          fromMyFurniture={true}
                          type={"wishlist"}
                          title={obj.furniture_name}
                          text={"$"+obj.price + " " + obj.category}
                          image={"https://s3.amazonaws.com/furnitrade-dev-attachments/"
                          +obj.product_image[0]}
                          furniture_id={obj.furniture_id}
                          rerender={this.rerender}
                      />))
                  }
                </div>
              }
            {/* end of  DIV */}
            </div>
        );
    }
}

export default WishlistPage;
