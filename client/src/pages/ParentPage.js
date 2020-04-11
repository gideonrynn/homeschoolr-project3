import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import HelpButton from "../components/HelpButton";
import NavBar from "../components/NavBar";
import { Redirect } from 'react-router-dom';
import TeacherSchedule from '../components/TeacherSchedule';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import AuthContext from "../utils/context"
import Container from '@material-ui/core/Container';
// import e from "express";



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

        // when page loads, check state to see if user is logged in
        if(this.context.isLoggedIn === true) {
            this.setState({
                isLoggedIn: true
            })
            console.log("context is true in parent page")
        } else if(this.context.isLoggedIn === false){
            this.setState({
                isLoggedIn: false
            })

            console.log("context is false in parent page")
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

        if (this.state.isLoggedIn === false) {
            console.log("redirect to / from parent")
            return <Redirect to='/' />
            
        }


        return (
            <div >
                <NavBar />

                <br />
                <br />
                <Grid item xs={12}>
                    <HelpButton />
                </Grid>
                <br />

                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Typography variant="h4" align="center">Suggested Plan</Typography>
                        <br />
                        <Paper >
                            <TeacherSchedule dataType="Teacher" editPermission="DENIED"/>
                            {console.log(this.context.id)}
                        </Paper> 
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" align="center">Your Plan</Typography>
                        <br />
                        <Paper >
                          <TeacherSchedule dataType="Student" id={this.context.id} editPermission="ok"/>  
                        </Paper> 
                    </Grid> 
                </Grid>
                <br />
            </div>
        );

        
    }
}

export default ParentPage;