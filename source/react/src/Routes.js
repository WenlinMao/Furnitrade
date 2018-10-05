import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPage from './components/MainPage';

export default () =>
    <Switch>
        <Route path = "/" exact component = {MainPage}/>
    </Switch>;