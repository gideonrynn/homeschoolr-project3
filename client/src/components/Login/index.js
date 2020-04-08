import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import AuthAPI from "../../utils/userAuthAPI";
import AuthContext from "../../utils/context";

import { withRouter } from 'react-router-dom'

// import {Redirect } from 'react-router-dom'
// import {Link } from 'react-router-dom'


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

class Login extends Component {

    //bring in context for passing down globalstate
    static contextType = AuthContext;
    
    constructor(props){
        console.log("props", props);
        super(props);
        this.state={
            email:'',
            password:'',
            isLoggedIn:'',
            userType:''
        }
    }

    // pass info to globalstate so that other components and pages can see this user is logged in
    updateState = (res) => {

        //set state that shows user is logged in
        this.context.updatedState(
            this.state.isLoggedIn, 
            res.data.id, 
            res.data.email, 
            res.data.userType)
            // .setState({
            //     userType: res.data.userType
            // })

        console.log(this.context)
        
     }

     
     sendUserToPage () {
     
        const { history } = this.props;

        if (history && this.state.isLoggedIn === true && this.state.userType == "teacher") {
            
            history.push("/teacher")
            
        } else if (history && this.state.isLoggedIn === true && this.state.userType == "parent") {
            
            history.push("/parent")
            
        }

    }



    handleClick(event){
        console.log("event", event);
        event.preventDefault();

        let userInfo = {
            "email":this.state.email,
            "password":this.state.password
        }    

        // take credentials entered by user and send for authentication
        AuthAPI.authUserCred(userInfo)

            .then(res => {
                    // response will contain jwt token, user id, email
                    // represents info of user authorized to access certain pages on the site
                    console.log(res.data);

                    // if response contains token (which is provided when a user has been authenticated)
                    if (res.data.token) {

                        console.log("is authenticated user, update isLoggedIn to true")

                        //update the local state and user type
                        this.setState({
                            isLoggedIn: true,
                            userType: res.data.userType
                        })

                        //update global state
                        this.updateState(res);

                        //direct to appropriate page
                        this.sendUserToPage()
                    }

                })

            .catch(err => console.log(err));
        
        }

    render() {
        // if (this.state.isLoggedIn === true) {
        //     return <Redirect to='/teacher' />
        // } 

        // if (this.state.isLoggedIn === true && this.state.userType == "teacher") {
        //     return <Redirect to='/teacher' />
        // } else if (this.state.isLoggedIn === true && this.state.userType == "parent") {
        //     return <Redirect to='/parent' />
        // }


        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={useStyles.paper}>
                    <Avatar className={useStyles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                        <TextField
                            classes={useStyles.form}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            type="email"
                            autoFocus
                            // floatingLabelText="Email"

                            // this did not work for scd
                            // onChange = {(event, newValue) => this.setState({email: newValue})}

                            // updated to
                            onChange = {(event) => this.setState({email: event.target.value})}
                            />

                        <br/>

                        <TextField
                            classes={useStyles.form}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            // floatingLabelText="Password"

                            // this did not work for scd
                            // onChange = {(event, newValue) => this.setState({password: newValue})}
                            
                            //updated to
                            onChange = {(event) => this.setState({password: event.target.value})}
                            />

                        <br/>
                    
                        <Button 
                            type="submit"
                            fullWidth
                            varient="contained"
                            color="primary"
                            label="Submit" 
                            onClick={(event) => this.handleClick(event)}
                        >
                            Sign In
                        </Button>
                </div>
            </Container>
        )
            

        }

        
}

export default withRouter(Login);