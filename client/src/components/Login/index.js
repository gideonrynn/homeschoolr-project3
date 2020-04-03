import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import axios from 'axios';

const theme = createMuiTheme();
    theme.typography.h3 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    }
};

const margin = {
    margin: 15
};

class Login extends Component {
    
    constructor(props){
        console.log("props", props);
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    handleClick(event){
        console.log("event", event);

        // Backend stuff might look like this to start off?
        // let apiBaseUrl = "http://localhost:3001/api/"; ???
        // let user = this;
        // let userInfo = {
        //     "email":this.state.email,
        //     "password":this.state.password
        // }

        // axios post here
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        {/* <Typography>Login</Typography> */}

                        <TextField
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            onChange = {(event, newValue) => this.setState({email: newValue})}/>

                        <br/>

                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event, newValue) => this.setState({password: newValue})}/>

                        <br/>

                        <Button varient="contained" color="primary" label="Submit" 
                        style={margin} 
                        onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;