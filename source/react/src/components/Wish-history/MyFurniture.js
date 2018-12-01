import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';
import axios from 'axios';
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

/* Card component in MyFurniture has "fromMyFurniture" prop - render delete button */
class MyFurniture extends Component {

    constructor(props){
        super(props);
        this.state = {
            furnicard_view: [],
            empty: false
        };
    }

    componentWillMount() {
        const token = localStorage.getItem('usertoken');
        let config = {
            headers: {"Authorization": `Bearer ${token}`},
        }

        axios.get('http://127.0.0.1:5000/user/get_my_furnitures', config)
        .then((response) => {
            console.log(response.data);
            let code = response.data.status;
            if (code === 200) {
                var furnicard_view=[];
                var data = JSON.parse(response.data.result);
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    var furniture = data[i];
                    furnicard_view.push(
                        <Card
                            title={furniture.furniture_name}
                            text={"$" + furniture.price}
                            image={"https://s3.amazonaws.com/furnitrade-dev-attachments/"
                                      + furniture.product_image[0]}
                            fromMyFurniture={true}
                            furniture_id={furniture.furniture_id}
                        />
                    )
                }
                this.setState({furnicard_view});
            } else if(code === 613) {
                this.setState({empty: true});
            } else if(code === 400) {
                localStorage.removeItem('usertoken');
                this.props.history.push('/login');
            }
        }).catch((error) => {
            console.log("my furniture error: " + error);
        })
    }

  	handledelete(e) {
      	let reqData = {
              	'furniture_id': this.state.furniture_id,
      	}
    		axios({
          	method: 'get',
          	url: 'http://127.0.0.1:5000/user/delete_wishlist',
          	withCredentials: false,
          	crossdomain: true,
          	data: reqData,
          	responseType: 'json',
          	headers: {
                //"Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Authorization": `Bearer`
            }
        })
    }

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
                        this.state.empty
                        ?
                        <div>Category is empty.</div>
                        :
                        this.state.furnicard_view
                    }
                    {/* Should send request for wished furnitures */}
                </div>

            {/* end of  DIV */}
            </div>
        );
    }
}

export default MyFurniture;
