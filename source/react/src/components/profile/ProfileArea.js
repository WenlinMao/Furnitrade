import React, {PropsTypes} from 'react';

const ProfileArea = (props) => {
    return (
        <div>
            <h1>Profile for {props.username}</h1>

            <ul>
                <li>Email: {props.emailAddress}</li>
                <li>Address: {props.address}</li>
            </ul>
        </div>
    )
};

export default ProfileArea;
