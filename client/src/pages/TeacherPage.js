import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

import 'typeface-roboto';

import Table from "../components/Table";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        alignItems: 'center',
      },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
      alignItems: 'center',

    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

class TeacherPage extends Component {

    constructor(props) {
        console.log("props", props);
        super(props)

        this.state={
            subject:'',
            text:'',
            nodemailerMessage:''
        }

    }

    componentWillMount(){

        let nodemailerMessage = "Send Email to Students here!"

        this.setState({
            nodemailerMessage: nodemailerMessage
        })
    }

    handleClick(event) {
        console.log("nodemailer event", event);

        let nodemailerMessage = "Email sent to Students!"

        this.setState({
            nodemailerMessage: nodemailerMessage
        })


        // Backend stuff here~ for nodeMailer


    }

    render() {
        return (
            <Container component="main" maxWidth="lg">
                <CssBaseline />

                <div className={useStyles.paper}>
                    <br />
                    <br />
                    <Typography variant="h6" color="inherit" noWrap>
                        Instructor
                    </Typography>
                    <br />
                    <form className={useStyles.form} noValidate>
                        <Avatar className={useStyles.avatar}>
                            <EmailOutlinedIcon />
                        </Avatar>
                        {/* <Typography variant="h4" gutterBottom>nodeMailer here</Typography>
                        <br /> */}
                        <Typography variant="h6" gutterBottom>{this.state.nodemailerMessage}</Typography>
                        <br />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="subject"
                            label="Enter the Subject"
                            onChange = {(event, newValue) => this.setState({subject: newValue})}
                            // labelWidth={100}
                            />
                        <br />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="text"
                            label="Enter email Text"
                            onChange = {(event, newValue) => this.setState({text: newValue})} 
                            // labelWidth={100} 
                            multiline/>
                        <br />
                        <br />

                        <Button 
                            type="submit"
                            fullWidth
                            varient="contained"
                            color="primary"
                            label="Send Email" 
                            onClick={(event) => this.handleClick(event)}
                        >
                            Send Email
                        </Button>

                    </form>

                </div>

                <br />

                <Table />

            </Container>
        );
    }
}

export default TeacherPage;
