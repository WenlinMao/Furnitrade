import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import logo from '../../static/images/logo_v1.svg';

const Profile = props => <Link to="./profile" {...props} />


class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        hasScrolled: false,
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

  render () {
    return (
      // initialize the className depending on if the user has scrolled
      <div className={this.state.hasScrolled ? "Header HeaderScrolled" : "Header"}>
        <div className="Header-group">
          <Link to="/"><embed src={logo} width="70"></embed></Link>


          {/* <a>Home</a>
          <a>Category</a>
          <a>About Us</a> */}
          <a href='./'>Home</a>
          
          {/* These two links should be udpated in the future - to onClick => scroll */}
          <a href='./'>Category</a>
          <a href='./'>About Us</a>
          {
            !this.props.hasLogin ?
            <Link to="./Login"><button>Login</button></Link> : 
            <NavigationDrawer showLogout={this.props.hasLogin} buttonName="Profile" passLink={Profile} ></NavigationDrawer>
          }
        </div>
      </div>
    );
  }
}

export default NavBar
