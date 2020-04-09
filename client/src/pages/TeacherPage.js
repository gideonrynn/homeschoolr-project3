import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import API from "../utils/API";

import 'typeface-roboto';

import Table from "../components/Table";

// import ScheduleForm from "../components/ScheduleForm";
import NavBar from "../components/NavBar";

import AuthContext from "../utils/context"

// import teacherSchedule from "../components/TeacherSchedule";
import TeacherSchedule from '../components/TeacherSchedule';
// import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

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

    //bring in context for passing down globalstate
    static contextType = AuthContext;

    constructor(props) {
        console.log("props", props);
        super(props)

        this.state={
            subject:'',
            text:'',
            nodemailerMessage:'',
            isLoggedIn:'',
            email:'',
            id:''
        }

    }

    componentWillMount(){

        console.log(this.context);
        let isLoggedIn = this.context.isLoggedIn;
        let email = this.context.email;
        let id = this.context.id;

        // when page loads, check state to see if user is logged in
        // redirect to login page or intiate call to database and render parent page content
        if (!isLoggedIn) {
            
            console.log("user not logged in");

            //redirect to login page??
            
        } else {
            
            console.log("user logged in");

            //set logged in user variable for searching the database
            let loggedInUser = {
                email: email,
                id: id
            }

            console.log(loggedInUser)

            // add api call to database to return user/student/schedule info using the email address or id
            // then do other stuff
        }

        let nodemailerMessage = "Send Email to Students here!"

        this.setState({
            nodemailerMessage: nodemailerMessage,
            isLoggedIn: this.context.isLoggedIn
        })
        
    }

    handleClick(event) {
        event.preventDefault()
        console.log("nodemailer event", event);

        let nodemailerMessage = "Email sent to Students!"

        this.setState({
            nodemailerMessage: nodemailerMessage
        })

        // Backend stuff here~ for nodeMailer

        API.getUsers()
        .then((res) => {
            for (let user of res.data) {
                if (user.userType === "parent") {
                    console.log(user)
                    console.log(this.state.subject)
                    API.email(
                        {
                            recipient : user.email,
                            title : this.state.subject,
                            message: this.state.text
                        }
                    )
                }
            }
        })


    }

    render() {
        return (
            <Container component="main" maxWidth="lg">
                <NavBar />
                <CssBaseline />

                <div className={useStyles.paper}>
                    <br />
                    <br />
                    <Typography variant="h3" color="inherit" noWrap>
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
                            onChange = {event => this.setState({subject: event.target.value})}
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
                            onChange = {event => this.setState({text: event.target.value})} 
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

                        {/* Recommened schedule here */}
                        
                        <div>
                            <Avatar className={useStyles.avatar}>
                                <ScheduleOutlinedIcon />
                            </Avatar>
                            <Typography variant="h6" gutterBottom>Create Recommended Schedule</Typography>
                            <br />
                            
                            <TeacherSchedule />
                            <br />
                            <br />

                        </div>

                    </form>

                </div>

                <br />

                <Table />

            </Container>
        );
    }
}

export default TeacherPage;
