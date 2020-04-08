import React, { Component } from "react";
import Button from "@material-ui/core/Button";


import "typeface-roboto";

class HelpBtn extends Component {
    state = {
        nodemailerMessage: "Send a help email!"
    };
    
    emailData: {
        
    }

    

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
    }
}