import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import Register from './components/register/Register';
import Login from './components/mainPage/login/Login.js';
import FurniModal from './components/common/FurniModal';
import ProfilePage from './components/profilePage/ProfilePage.js';
import FurniPage from './components/FurniPage/FurniPage.js';
import WishlistPage from './components/Wish-history/WishlistPage.js';
import HistoryPage from './components/Wish-history/HistoryPage.js';
import MyFurniture from './components/Wish-history/MyFurniture.js';
import AddFurniture from './components/Wish-history/AddFurniture.js';
import message_set from './components/message/message_set.js';
import message from './components/message/message.js';
import PrivacyPage from './components/PrivacyPage/PrivacyPage.js'
// Don't know the reason but once added, the logo messed up
import furniture from './components/FurniPage/Furniture/Furniture-new.js';

export default () =>
    <Switch>
        <Route path = "/" exact component = {MainPage}/>
        <Route path = "/register" component = {Register} />
        <Route path = "/login" component = {Login} />
        <Route path ="/FurniModal" component={FurniModal}/>
        {/* Testing - profile page */}
        <Route path = "/profile" component = {ProfilePage} />

        {/* Testing - wishlist and history page */}
        <Route path = "/wishlist" component = {WishlistPage} />
        <Route path = "/history" component = {HistoryPage} />
        <Route path = "/myfurniture" component = {MyFurniture} />

        {/* Tesing - furnipage (Subcategory with furnitures) */}
        <Route path = "/furniPage" component = {FurniPage} />

        {/* Testing - specific furniture */}
        <Route path = "/furniture" component = {furniture} />
        <Route path = "/addfurniture" component = {AddFurniture} />
        <Route path = "/mymessages" component = {message_set} />
        <Route path = "/message" component = {message} />

        {/* PrivacyPage */}
        <Route path = "/privacy" component = {PrivacyPage} />
    </Switch>;
