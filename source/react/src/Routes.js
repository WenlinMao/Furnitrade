import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Register from './components/register/Register';
import Login from './components/login/Login.js';

export default () =>
    <Switch>
        <Route path = "/" exact component = {MainPage}/>
        <Route path = "/register" component = {Register} />
        <Route path = "/login" component = {Login} />
    </Switch>;