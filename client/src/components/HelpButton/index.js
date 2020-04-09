import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import API from "../../utils/API"
import "typeface-roboto";
import { Typography } from "@material-ui/core";

/* const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const classes = useStyles(); */

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
                <form /* className={classes.root} */ noValidate autoComplete="off">
                    <Typography>Having trouble with creating a schedule or explaining content to your child? Use this form to email questions to your classroom teacher.</Typography>
                    <TextField
                        id="outlined-basic"
                        label="Any issues?"
                        variant="outlined"
                        type="text"
                        multiline
                        fullWidth
                        onChange={event => this.setState({text: event.target.value})} />
                        <br />
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