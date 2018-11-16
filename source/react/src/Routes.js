import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import Register from './components/register/Register';
import Login from './components/mainPage/login/Login.js';
import FurniModal from './components/common/FurniModal';
import ProfilePage from './components/profilePage/ProfilePage.js';
import FurniPage from './components/FurniturePage/FurniPage.js';

export default () =>
    <Switch>
        <Route path = "/" exact component = {MainPage}/>
        <Route path = "/register" component = {Register} />
        <Route path = "/login" component = {Login} />
        <Route path ="/FurniModal" component={FurniModal}/>
        {/* Testing - profile page */}
        <Route path = "/profile" component = {ProfilePage} />
        <Route path = "/furniPage" component = {FurniPage} />
    </Switch>;
