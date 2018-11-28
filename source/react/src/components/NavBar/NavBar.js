import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import logo from '../../static/images/logo_v1.svg';
import {getLocal} from '../../utils/util';
import { Redirect } from 'react-router-dom';


class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        hasScrolled: false,
        hasLogin: false,
        redirectToLogin: false,
        redirectToHome: false
    }
  }

  // Check if user has logged in
  componentWillMount() {
    if(getLocal("username") !== "" ){
      this.setState({hasLogin: true});
    }
    else {
      this.setState({hasLogin: false});
    }
  }

    // Ask the window to check if the user has scrolled or not
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    // handle scroll
    handleScroll = (event) => {
        // get the value of scroll
        const scrollTop = window.pageYOffset;

        // responsive action depending on the scroll value
        if (scrollTop > 50) {
        this.setState({ hasScrolled: true})
        } else {
        this.setState({ hasScrolled: false})
        }

    }

    redirectToHome = (flag) => {
      if(flag) {
        this.setState({redirectToHome: true});
      }
    }

    redirectToLogin= (flag) => {
      if(flag) {
        this.setState({redirectToLogin: true});
      }
    }

    renderRedirectToHome = () => {
      if (this.state.redirectToHome) {
        this.setState({redirectToHome: false});
        return <Redirect to='/' />
      }
    }

    renderRedirectToLogin = () => {
        if (this.state.redirectToLogin) {
          this.setState({redirectToLogin: false});
          return <Redirect to='/login' />
        }
    }

    logout = () => {
        this.setState({hasLogin: false});
        this.props.logout();
    }

  render () {
    return (
      // initialize the className depending on if the user has scrolled
      <div className={this.state.hasScrolled ? "Header HeaderScrolled" : "Header"}>
        <div>
          {this.renderRedirectToHome()}
          {this.renderRedirectToLogin()}
        </div>
        <div className="Header-group">
          <Link to="/"><embed src={logo} width="70"></embed></Link>

          <a href='./'>Home</a>
          {/* These two links should be udpated in the future - to onClick => scroll */}
          <a href='#category'>Category</a>
          <a href='./'>About Us</a>
          {
            !this.state.hasLogin ?
            <div className="login-button">
            <Link to="./Login"><button>Login</button></Link> </div>:
            <div className="drawer-button">
            <NavigationDrawer
              redirectToHome={this.redirectToHome}
              redirectToLogin={this.redirectToLogin}
              logout={this.logout}
            >
            </NavigationDrawer></div>
          }
        </div>
      </div>
    );
  }
}

export default NavBar
