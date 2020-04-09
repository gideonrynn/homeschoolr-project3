import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import API from "../../utils/API"


import "typeface-roboto";

class HelpBtn extends Component {
    /* state = {
        nodemailerMessage: "Send a help email!"
    }; 
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]:value
        });
    }; 
    postEmail = () => {
        API.postEmail({
            recipient: "", // teacher email
            title: "Help Needed!",
            message: ""
        })
    } */

    handleClick(event) {
        event.preventDefault()
        console.log("nodemailer event", event);
    
        let nodemailerMessage = "Ask the teacher for assistance!"
    
        this.setState({
            nodemailerMessage: nodemailerMessage
        })
    
        API.getUsers()
        .then((res) => {
            for (let user of res.data) {
                if (user.userType === "teacher") {
                    console.log(user)
                    console.log(this.state.subject)
                    API.email(
                        {
                            recipient : user.email,
                            title : "Parent Help Needed!",
                            message: this.state.text
                        }
                    )
                }
            }
        })
    }

    render() {

        return (
            <div>
               <Button
                type="submit"
                variant="contained"
                onClick={(event) => this.handleClick(event)}>Contact Instructor</Button> 
            </div>   
        )
    }
}

export default HelpBtn;