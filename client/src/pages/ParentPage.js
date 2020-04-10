import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Schedule from "../components/Schedule";
// import ScheduleForm from "../components/ScheduleForm";
import HelpButton from "../components/HelpButton";
import NavBar from "../components/NavBar";
import {Redirect } from 'react-router-dom';
import TeacherSchedule from '../components/TeacherSchedule';


import 'typeface-roboto';

import AuthContext from "../utils/context"

class ParentPage extends Component {

    //bring in context for passing down globalstate
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            subect: " ",
            time: " ",
            data: " ",
            isLoggedIn:"",
            email:"",
            id:""
        }
    }

    componentDidMount() {

        console.log(this.context);
        let isLoggedIn = this.context.isLoggedIn;
        let email = this.context.email;
        let id = this.context.id;

        // when page loads, check state to see if user is logged in
        // redirect to login page or intiate call to database and render parent page content
        if (!this.context.isLoggedIn) {
            
            console.log("user not logged in");

            //redirect to login page??
            this.setState({
                isLoggedIn: false
            })

            
        } 
        
        // else {
            
        //     console.log("user logged in");

        //     //set logged in user variable for searching the database
        //     let loggedInUser = {
        //         email: email,
        //         id: id
        //     }

        //     console.log(loggedInUser)

        //     // add api call to database to return user/student/schedule info using the email address or id
        //     // then do other stuff
        // }

       
        let defaultSubject = "";
        let defaultTime = "";
        let defaultData = [];

        this.setState({
            subject: defaultSubject,
            time: defaultTime,
            data: defaultData
        })
    }



    render() {
        // if (!this.state.isLoggedIn) {
        //     return <Redirect to='/' />
        // }

        return (
            <div>
                <NavBar />
                <Typography
                    variant="h3"
                    color="inherit"
                    noWrap>
                        Parent
                </Typography>
                <TeacherSchedule dataType="Teacher" editPermission="DENIED"/>
                {console.log(this.context.id)}
                <TeacherSchedule dataType="Student" id={this.context.id} editPermission="ok"/>
                <br />
                <HelpButton />
            </div>   
        );
    }
}

export default ParentPage;