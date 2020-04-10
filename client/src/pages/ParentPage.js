import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
// import Schedule from "../components/Schedule";
// import ScheduleForm from "../components/ScheduleForm";
import HelpButton from "../components/HelpButton";
import NavBar from "../components/NavBar";
// import {Redirect } from 'react-router-dom';
import TeacherSchedule from '../components/TeacherSchedule';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import AuthContext from "../utils/context"
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

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
        /* else {
            console.log("user logged in");
            set logged in user variable for searching the database
            let loggedInUser = {
                email: email,
                id: id
            }
            console.log(loggedInUser)
        } */

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
        /* if (!this.state.isLoggedIn) {
            return <Redirect to='/' />
        } */
        
        return (
            <div >
                <NavBar />
                <br />
                <Container>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Typography variant="h3">Suggested Plan</Typography>
                        <br />
                        <Paper >
                            <TeacherSchedule dataType="Teacher" editPermission="DENIED"/>
                            {console.log(this.context.id)}
                        </Paper> 
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h3">Your Plan</Typography>
                        <br />
                        <Paper >
                          <TeacherSchedule dataType="Student" id={this.context.id} editPermission="ok"/>  
                        </Paper> 
                    </Grid> 
                </Grid>
                <br />
                <br />
                <Grid item xs={12}>
                    <HelpButton />
                </Grid>
                
                </Container>   
            </div>
        );

        
    }
}

export default ParentPage;