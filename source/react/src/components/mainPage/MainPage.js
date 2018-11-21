import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import {Link} from 'react-router-dom';
import {getLocal} from '../../utils/util';
import Wave from '../common/Wave';
import FurniCategory from '../FurniCategory/FurniCategory';
import styled from 'styled-components'
import './MainPage.css';
import categories from '../../static/data/category.json';

const SectionCaption = styled.p`
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
  color: #BDBDBD;
  text-align: center;
  position: relative;
`

const SectionCategory = styled.div`
  max-width: 800px;
  margin: 0 auto 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  padding: 0 20px;
  position: relative;
  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

  class MainPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasLogin: false
      }
    }

    // check if the user has logged in
    componentWillMount() {
      if(getLocal("username") !== "" ){
        this.setState({hasLogin: true});
         // TODO: GET request
      }
      else {
        this.setState({hasLogin: false});
      }
    }

    logout = () => {
      this.setState({hasLogin: false});
    }
    render() {
      return (
        <div>
          <NavBar logout={this.logout}/>
          <div className="Index">
            <div className="Index-group">
              <h1>Furnitrade </h1>
              <p>Furniture Trade Platform</p>
              <p>Best Trading Platform ever. Make your life easier. Finding your desired furnitures at the most inexpensive price and best quality! </p>
              {!this.state.hasLogin ?
                <Link to="./Register">Register</Link>: null
              }

              {/* logos */}
              <div className="logos">
                <img src={require("../../static/images/fb_logo.png")} alt = "this is a logo for other platforms" width="50"/>
                <img src={require("../../static/images/mail_logo.png")} alt = "this is a logo for other platforms" width="50"/>
                <img src={require("../../static/images/ins_logo.png")} alt = "this is a logo for other platforms" width="50"/>
                <img src={require("../../static/images/youtube_logo.png")} alt = "this is a logo for other platforms" width="50"/>
                <img src={require("../../static/images/twi_logo.png")} alt = "this is a logo for other platforms" width="50"/>
              </div>
            </div>
            <Wave/>
          {/* End of Index DIV */}
          </div>

          {/* Section of About US */}

          {/* Section of categories */}
          <section id="category">
          <SectionCaption>Furniture Categories</SectionCaption>
          <SectionCategory>
            {categories.categories.map(category => (
              <div className="one-category">
              <FurniCategory 
                title={category.title}
                image={category.image}
                subcategories={category.subcategories}
              />
              </div>
            ))}
          </SectionCategory>
          </section>

        {/* Final DIV - add everything above this DIV */}
        </div>
      );
    }
  }

  export default MainPage
  // export default MainPage;
