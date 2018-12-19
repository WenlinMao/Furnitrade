import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
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
            empty: false,
            redirect: false,
        };
    }

    componentWillMount() {
        // const token = localStorage.getItem('usertoken');
        // let config = {
        //     headers: {"Authorization": `Bearer ${token}`},
        // }

        // axios.get('http://127.0.0.1:5000/user/get_my_furnitures', config)
        // .then((response) => {
        //     console.log(response.data);
        //     let code = response.data.status;
        //     if (code === 200) {
        //         var furnicard_view=[];
        //         var data = JSON.parse(response.data.result);
        //         console.log(data)
        //         for (var i = 0; i < data.length; i++) {
        //             var furniture = data[i];
        //             furnicard_view.push(
        //                 <Card
        //                     title={furniture.furniture_name}
        //                     text={"$" + furniture.price}
        //                     image={"https://s3.amazonaws.com/furnitrade-dev-attachments/"
        //                               + furniture.product_image[0]}
        //                     fromMyFurniture={true}
        //                     type={"furniture"}
        //                     furniture_id={furniture.furniture_id}
        //                 />
        //             )
        //         }
        //         this.setState({furnicard_view});
        //     } else if(code === 613) {
        //         this.setState({empty: true});
        //     } else if(code === 400) {
        //         localStorage.removeItem('usertoken');
        //         this.props.history.push('/login');
        //     }
        // }).catch((error) => {
        //     console.log("my furniture error: " + error);
        // })
        this.getFurnitureList();
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    getFurnitureList = () => {
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
                            type={"furniture"}
                            furniture_id={furniture.furniture_id}
                            rerender={this.rerender}
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

    rerender = () => {
        this.getFurnitureList();
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/addfurniture' />
        }
    }

    render() {
        return (
          <div>
            {/* Part one - NavBar - logic needed*/}
            <NavBar/>
            <div className="my-furni">
                <h2>My Furniture</h2>
                {/* Part 3 - fixed "add" button - post a new furniture */}
                {this.renderRedirect()}
                <button onClick={this.setRedirect}>+</button>
                <Wave/>
            {/* end of furni-page tag */}
            </div>
            {
              /* render h2 or furnicard based on empty state */
              this.state.empty
              ?
              <div className="my-furni">
                <h2>You haven't posted anything yet.</h2>
              </div> :
              <div className="Card-group">
                  {this.state.furnicard_view}
              </div>
            }
          </div>
        );
    }
}

export default MyFurniture;
