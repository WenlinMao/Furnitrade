import React, {Component} from 'react';
import NavBar from '../NavBar/NavBar';
import Card from '../FurniCard/FurniCard';
import Wave from '../common/Wave';
import './FurniPage.css';

/* Furniture page class */
class FurniPage extends Component {
    constructor(props) {
        super(props);
    }


/* Render part */
render () {
    return (
        <div className="furni-sub-cate">
            {/* TODO - should check for loginStatus */}
            <NavBar />
            <div className="furni">
            <div className="furni-page">
                <h2>Sub-category Title</h2>
            
                <Wave/>
            {/* end of furni-page tag */}
            </div>
            </div>

                    {/* TODO - data of this section should be read in through a JSON file requested from the back-end */}
                    <div className="Card-group">
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 1"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 2"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 3"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 4"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 5"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 6"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 7"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 8"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 9"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 10"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 11"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 12"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 13"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 14"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 15"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 16"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 17"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 18"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 19"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                    <Card 
                        title="Furniture-demo" 
                        text="description for Furniture 20"
                        image={require('../../static/images/wallpaper1.png')}
                    />
                </div>
        {/* End of the last DIV  - everything should be above this tag */}
        </div>
    );
}

/* End of class FurniturePage */
}

/* Export FurniturePage */
export default FurniPage