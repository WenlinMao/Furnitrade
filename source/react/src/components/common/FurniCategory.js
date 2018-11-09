import React from 'react';
import FurniCard from './FurniCard';
import './FurniCategory.css';


class FurniCategory extends React.Component {
    // states initialization

    // functions

    // render 
    render() {
        return (
            <div className="category-container">
                    <h2>My Works</h2>
                <div className="category-group">
                <FurniCard 
                    title="cate1" 
                    text="description for category1"
                    image={require('../../static/images/test-logo.jpg')}
                />
                <FurniCard 
                    title="cate2" 
                    text="description for category2"
                    image={require('../../static/images/test-logo.jpg')}
                />
                <FurniCard 
                    title="cate3" 
                    text="description for category3"
                    image={require('../../static/images/test-logo.jpg')}
                />
                <FurniCard 
                    title="cate4" 
                    text="description1 for category4"
                    image={require('../../static/images/test-logo.jpg')}
                />
                </div>
            </div>
        );
    }
}

FurniCategory.protoTypes = {
    classes: protoTypes.object.isRequired,
};
