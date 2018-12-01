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
        let config = {
            headers: {"Authorization": `Bearer ${token}`},
        }

        axios.get('http://127.0.0.1:5000/user/get_my_furnitures')
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
                          text={furniture.price}
                          image={"https://s3.amazonaws.com/furnitrade-dev-attachments/"
                                    + furniture.product_image[0]}
                          furniture_id={furniture.furniture_id}
                      />
                    )
                }
                this.setState({furnicard_view});
            } else if(code === 321) {
                this.setState({notFound: true});
            } else if(code === 400) {
                localStorage.removeItem('usertoken');
                this.props.history.push('/login');
            }
        }).catch((error) => {

        })




        // const token = localStorage.getItem('usertoken');
        // axios({
        //     method: 'get',
        //     url: 'http://127.0.0.1:5000/user/get_my_furnitures',
        //     withCredentials: false,
        //     crossdomain: true,
        //     // data: reqData,
        //     responseType: 'json',
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // }).then((response) => {
        //     console.log(response.data);
        //     let code = response.data.status;
        //     if (code === 200) {
        //       this.setState({
        //         data:response.data
        //       });
        //     } else if(code === 613) {
        //         this.setState({empty: true});
        //     } else if(code === 400) {
        //         localStorage.removeItem('usertoken');
        //         this.props.history.push('/login');
        //     }
        // }).catch((error) => {
        //     console.log("get wishlist error: " + error);
        // });

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
                <Card
                    title="Furniture1"
                    text="First wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />


                <Card
                    title="Furniture2"
                    text="Second wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />

                <Card
                    title="Furniture3"
                    text="Third wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />

                <Card
                    title="Furniture4"
                    text="Forth wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />

                    {/* Should send request for wished furnitures */}
                </div>

            {/* end of  DIV */}
            </div>
        );
    }
}

export default MyFurniture;
