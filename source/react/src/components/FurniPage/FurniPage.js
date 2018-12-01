import React, {Component} from 'react';
import NavBar from '../NavBar/NavBar';
import Card from '../FurniCard/FurniCard';
import Wave from '../common/Wave';
import './FurniPage.css';
import axios from 'axios';

/* Furniture page class */
/* Sub category */
class FurniPage extends Component {

    /* TODO - need to pass in data through props in the future */
    constructor(props) {
        super(props);
        this.state = {
          // data: [
          //     {
          //         title: 'furniture',
          //         id: '1',
          //         img:require('../../static/images/wallpaper1.png'),
          //         price: '$20',
          //         category: "Electronics"
          //     },
          //     {
          //         title: 'furniture',
          //         id: '1',
          //         img:require('../../static/images/wallpaper1.png'),
          //         price: '$20',
          //         category: "Electronics"
          //     },
          //     {
          //         title: 'furniture',
          //         id: '1',
          //         img:require('../../static/images/wallpaper1.png'),
          //         price: '$20',
          //         category: "Electronics"
          //     },
          // ],
          category: "",
          data: [],
          furnicard_view: [],
          empty: false,
          notFound: false,
        }
    }

    /* list first ten furtures in the subcategory */
    componentWillMount() {
        this.setState({notFound: false});

        let subcategory = this.props.location.pathname.substring(11);
        this.setState({category: subcategory})
        console.log(subcategory);
        const token = localStorage.getItem('usertoken');

        let config = {
            headers: {"Authorization": `Bearer ${token}`},
            params: {
                category_name : subcategory
            },
        }

        axios.get('http://127.0.0.1:5000/category/', config)
        .then((response) => {
            console.log(response.data);
            let code = response.data.status;
            if (code === 200) {
              var furnicard_view=[];
              // this.setState({
              //   data:
              // });
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
            console.log("get furniture in subcategory: " + error);
        });
    }


/* Render part */
render () {
    return (
        <div className="furni-sub-cate">
            {/* TODO - should check for loginStatus */}
            <NavBar />
            <div className="furni">
            <div className="furni-page">
                <h2>{this.state.category}</h2>
                <Wave/>
            {/* end of furni-page tag */}
            </div>
            </div>
                    {/* TODO - data of this section should be read in through a JSON file requested from the back-end */}
                    <div className="Card-group">
                    {
                        this.state.empty || this.state.furnicard_view.length === 0
                        ?
                        <div>Category is empty.</div>
                        :
                        <div>this.state.furnicard_view</div>

                      
                    }



                </div>

            {/* TODO - Should be a section of shit like "all rights reserved" */}
        {/* End of the last DIV  - everything should be above this tag */}
        </div>
    );
}

/* End of class FurniturePage */
}

/* Export FurniturePage */
export default FurniPage
