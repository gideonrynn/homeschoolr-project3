import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Schedule from "../components/Schedule";
// import ScheduleForm from "../components/ScheduleForm";
import HelpButton from "../components/HelpButton";
import NavBar from "../components/NavBar";

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

    componentWillMount() {

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
        return (
            <div>
                <NavBar />
                <Typography>Parent</Typography>
                <Schedule />
                <HelpButton />
            </div>   
        );
    }
}

export default ParentPage;