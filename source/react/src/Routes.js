import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import Register from './components/register/Register';
import Login from './components/mainPage/login/Login.js';
<<<<<<< HEAD
import Profile from './components/ProfilePage/ProfilePage.js'
=======
import Profile from './components/ProfilePage/ProfilePage';
>>>>>>> 0429ae69c5cd8152e2ddeaac942899134144d6ea

export default () =>
    <Switch>
        <Route path = "/" exact component = {MainPage}/>
        <Route path = "/register" component = {Register} />
        <Route path = "/login" component = {Login} />

        {/* Testing - profile page */}
        <Route path = "/profile" component = {Profile} />
    </Switch>;
