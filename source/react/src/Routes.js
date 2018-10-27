import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import Register from './components/register/Register';
import Login from './components/mainPage/login/Login.js';

export default () =>
    <Switch>
        <Route path = "/" exact component = {MainPage}/>
        <Route path = "/register" component = {Register} />
        <Route path = "/login" component = {Login} />
        <Route path = "/profile" component = {Profile} />
    </Switch>;
