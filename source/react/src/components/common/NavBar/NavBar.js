import React from 'react'
// import { Link } from 'gatsby'
import { Link } from 'react-router-dom'
import './NavBar.css'
import NavigationDrawer from '../NavigationDrawer';

const Profile = props => <Link to="./profile" {...props} />

class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        hasScrolled: false,
        auth: true,
        anchorEl: null,
    }
  }

    // Ask the window to check if the user has scrolled or not
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    // handle scroll
    handleScroll = (event) => {
        // get the value of scroll
        const scrollTop = window.pageYOffset

        // responsive action depending on the scroll value
        if (scrollTop > 50) {
        this.setState({ hasScrolled: true})
        } else {
        this.setState({ hasScrolled: false})
        }

    }

    handleChange = event => {
        this.setState ({auth: event.target.checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
    this.setState({anchorEl: null});
    };


  render () {
    return (
      // initialize the className depending on if the user has scrolled
      <div className={this.state.hasScrolled ? "Header HeaderScrolled" : "Header"}>
        <div className="Header-group">
          <Link to="/"><img src={require('../../../static/images/test-logo.jpg')} width="30"/></Link>
          <p> </p>
          <p> </p>
          <p> </p>
          <NavigationDrawer showLogout={this.props.hasLogin} buttonName="Profile" passLink={Profile} ></NavigationDrawer>
        </div>
      </div>
    );
  }
}

export default NavBar
