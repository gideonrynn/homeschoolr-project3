import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import API from "../../utils/API"
import "typeface-roboto";
import { Typography } from "@material-ui/core";

class HelpBtn extends Component {
    
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
                    console.log(this.state.text)
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
                <form noValidate autoComplete="off">
                    <Typography variant="h6">Need Help?</Typography>
                    <TextField
                        id="outlined-basic"
                        label="Trouble creating a schedule or explaining class content to your child? Email questions to your classroom teacher."
                        variant="outlined"
                        type="text"
                        multiline
                        fullWidth
                        onChange={event => this.setState({text: event.target.value})} />
                    <Button
                        type="submit"
                        variant="outlined"
                        onClick={(event) => this.handleClick(event)}>Contact Instructor
                    </Button>
                </form>
            </div>   
        )
    }
}

export default HelpBtn;