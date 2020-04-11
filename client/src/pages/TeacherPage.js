import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';


import API from "../utils/API";

import 'typeface-roboto';

import Table from "../components/Table";

// import ScheduleForm from "../components/ScheduleForm";
import NavBar from "../components/NavBar";

import AuthContext from "../utils/context"

// import teacherSchedule from "../components/TeacherSchedule";
import TeacherSchedule from '../components/TeacherSchedule';
// import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';


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

        // when page loads, check state to see if user is logged in
        if (this.context.isLoggedIn === false) {
            
            console.log("user not logged in");
            this.setState({
                isLoggedIn: false
            })

        } 
        

        let nodemailerMessage = "Email Parents"

        this.setState({
            nodemailerMessage: nodemailerMessage,
            isLoggedIn: this.context.isLoggedIn
        })
        
    }

    handleClick(event) {
        event.preventDefault()
        console.log("nodemailer event", event);

        let nodemailerMessage = "Emails Sent"

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

        if (this.state.isLoggedIn === false) {
            console.log("redicrect to / from teacher")
            return <Redirect to='/' />
        }

        return (

            <div component="main">
                <NavBar />
                <CssBaseline />
                <br />

                <Paper>
                    <br /><br />
                    <Typography variant="h4" noWrap align="center">
                        Class Roster
                    </Typography>
                    <br />

                    <Table />
                    <br />

                </Paper>
                <br />

                <Paper>
                    <div>
                        <br />
                        <Typography variant="h6" gutterBottom align="center">{this.state.nodemailerMessage}</Typography>
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
                    </div>
                </Paper>
                <br />
                <Paper>
                    <div>
                        <br />
                        <Typography variant="h6" gutterBottom align="center">Post A Schedule</Typography>
                        <br />
                        
                        <TeacherSchedule dataType="Teacher" editPermission="ok"/>
                        <br />
                        <br />
                    </div>
                </Paper>


                
                <br />

            </div>
        );
    }
}

export default TeacherPage;
