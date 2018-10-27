import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileArea from './ProfileArea.js';

class Profile extends React.Component {
    render() {
        return (
            <div>
                <ProfileArea
                    username="Mao Li"
                    emailAddress="mal131@ucsd.edu"
                    address="9500 Gilman Dr."
                />
            </div>
        );
    }
}

Profile.propsTypes = {};

export default Profile;
