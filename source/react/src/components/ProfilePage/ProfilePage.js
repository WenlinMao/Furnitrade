import React, { Component } from 'react';
import NavigationBar from '../common/NavigationBar';
import { Button, List } from "@material-ui/core";

// This is profile page - used to update and modify user info
// Goal & Requirements:
//      - Use container structure to divide page into a few parts
//      - Display should be "column"
//      - In each row, there could possibly be a new container, display can be
//        either "row" or "column"
//      - Use the theme colors provided in MainPage.js

// 2 major parts
//     - Part One: nav bar
//         - Nav bar should be the same
//         - title "furnitrade" and logo should redirect the user to MainPage
//         - drawer stays the same --(temporary) --(if you think you can update it, free
//           free to do so) 

//     - Part Two: user info
//         - Sub-part One - Left-hand-side
//             - User Photo - include a Button for uploading new photo if user 
//                 has no profile photo. Otherwise, the button is for changing 
//                 profile photo
//             - User First and Last Name - Under the photo, include a "save" or
//                 "update" button
//             - (Optional) brief introduction - brief introduction of user filled by user 
//                 himself or herself
//         - Sub-part Two - Right-hand-side
//             - Address information
//             - email information
//             - university information - should be a drop down menu which offers university List

// Note: 
//     - feel free to redesign the layout. Keep dis shit good looking tho. 
//     - feel free to use a new theme. Just make sure the color stays the same
class ProfilePage extends Component {
    render() {
      return (
  
        <div className="profile-page-container">
            {/* Major part one - nav bar */}
            <NavigationBar className="nav-bar"/>

            {/* Major part two - user info */}


        </div>
      );
    }
  }
  
  export default ProfilePage;