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
import AuthContext from "../../utils/context"


import AuthAPI from "../../utils/userAuthAPI";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
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
            isLoggedIn:''
        }
    }


    handleClick(event){
        console.log("event", event);

        let userInfo = {
            "email":this.state.email,
            "password":this.state.password
        }    

        // take credentials entered by user and send for authentication
        AuthAPI.authUserCred(userInfo)

            .then(res => {
                    // response will contain jwt token, user id, email
                    // will contain type (parent or teacher) **when this is set up in model** 
                    // represents info of user authorized to access certain pages on the site
                    console.log(res.data);

                    // if response contains token (which is provided when a user has been authenticated)
                    if (res.data.token) {
                    
                        //set state that shows user is logged in
                        this.setState({
                            isLoggedIn: true
                        })
                        
                        // pass info to globalstate so that other components and pages can see this user is logged in
                        // **Testing Only** remove "parent"
                        this.context.updatedState(
                            this.state.isLoggedIn, 
                            res.data.id, 
                            res.data.email, 
                            "parent")
                        
                    }
                    // add routing logic below or above?
                    // if (res.data.type === "teacher") {
                    //     push to teacher view
                    // } else {
                    //     push to parent view
                    // }
                    
                })
            .catch(err => console.log(err));
        
        // if(response.data.code == 200) {
        //     let parentPage =[];
        //     parentPage.push(
        //         <ParentPage parentContext={this} />

        //     );
        // }
        }

    render() {
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

                    <form className={useStyles.form} noValidate>
                        <TextField
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
                    </form>
                </div>
            </Container>
        );
    }
}

export default Login;