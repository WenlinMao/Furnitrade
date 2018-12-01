import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './message.css';
import axios from 'axios';
import Mcard from './message_card';

class message_set extends Component{
  constructor(props){
      super(props);
      this.state={
        data:[
          {
            user:'abcd',
            contact_form_id:'asdfasdfa',
          },
        ],
      };
    }

    render() {
            // console.log("state", this.state.data)
            return (
                <div>
                    {/* Part one - NavBar - logic needed*/}
                    <NavBar/>
                    <div className="heading">
                        <h2>My messages</h2>
                        <Wave/>
                    {/* end of furni-page tag */}
                    </div>

                    {/* cards of furnitures wished,should be from backend*/}
                    <div className="Card-group">
                    {
                        this.state.empty
                        ?
                        <div>No message to display.</div>
                        : this.state.data.length === 0 ?
                          null :
                          this.state.data.map(obj=>(
                            <Mcard
                              user={obj.user}
                              contact_form_id={obj.contact_form_id}
                            />)
                          )


                    }
                    </div>

                {/* end of  DIV */}
                </div>
            );
        }
}
export default message_set
