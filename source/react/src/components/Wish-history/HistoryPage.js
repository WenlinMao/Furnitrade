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
            data: '',
            empty: true
        };
    }

    componentWillMount() {
        const token = localStorage.getItem('usertoken');
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/user/get_history',
            withCredentials: false,
            crossdomain: true, 
            responseType: 'json',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            // console.log(response.data);
            let data = JSON.parse(response.data.result);
            // console.log(data);
            let code = response.data.status;
            if (code === 200) {
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
            console.log("get history error: " + error);
        });
    }

    handleClear = () => {
        const token = localStorage.getItem('usertoken');
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/user/clear_history',
            withCredentials: false,
            crossdomain: true, 
            responseType: 'json',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
           let code = response.data.status;
           if(code === 200) {
               this.setState({
                   data: '',
                   empty: true 
               })
           }
        }).catch((error) => {
            console.log("clear history error: " + error);
        });
    }
  
    render() {
        // console.log("data ", this.state.data);
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
                    this.state.empty || this.state.data.length === 0 
                    ?
                    <div>You didn't view any furniture recently.</div>
                    :
                    this.state.data.map(obj=>(
                        <Card
                            fromMyFurniture={false}
                            type={"history"}
                            title={obj.furniture_name}
                            text={"$"+obj.price + obj.category}
                            image={"https://s3.amazonaws.com/furnitrade-dev-attachments/"
                            +obj.product_image[0]}
                            furniture_id={obj.furniture_id}
                        />)
                    )
                }
                </div>
                {
                    this.state.empty 
                    ?
                    null
                    :
                    <button type="button" onClick={this.handleClear}>Clear History</button>
                }

            {/* end of  DIV */}
            </div>
        );
    }
}

export default HistoryPage;
