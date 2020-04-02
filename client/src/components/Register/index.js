import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Login from '../Login';


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
    margin: 15,
};

class Register extends Component {

    constructor(props){
        // Data(props);
        console.log("props", props);

        this.state={
            childName:'',
            parentName:'',
            email:'',
            password:''
        }
    }

    handleClick(event){
        console.log("event", event);

        // more backend stuff
        // let user = this;
        // let userInfo = {
        //     "childName": this.state.childName,
        //     "parentName":this.state.parentName,
        //     "email":this.state.email,
        //     "password":this.state.password
        // }

        
        // API.postmethod()
        //     .then(res => {
        //          console.log();
        //          this can include if statement below
        //         })
        //     .catch(err => console.log(err));

        // here i need something to check if response is 200
        if(response.data.code == 200) {
            // basically if Registration was 
            let loginPage =[];
            loginPage.push(
                <Login parentContext={this} />
            );
            let loginMessage = "Account does not exist, Register Account";
            self.props.parentContext.setState({
                loginPage: loginPage,
                loginMessage: loginMessage,
                buttonLabel: "Register",
                isLogin: true
            });
        } 
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <Typography>Register</Typography>

                        <TextField
                            hintText="Enter your Child's Name"
                            floatingLabelText="Child Name"
                            onChange = {(event, newValue) => this.setState({childName: newValue})} />

                        <br/>

                        <TextField
                            hintText="Enter your Name"
                            floatingLabelText="Parent Name"
                            onChange = {(event, newValue) => this.setState({parentName: newValue})} />

                        <br/>

                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event, newValue) => this.setState({email: newValue})} />

                        <br/>

                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event, newValue) => this.setState({password: newValue})} />

                        <br/>

                        <Button label="Submit" primary={true} style={margin} onClick={(event) => this.handleClick(event)}/>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Register;