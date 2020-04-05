import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Login from '../Login';
import AuthAPI from "../../utils/userAuthAPI"

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
        super(props);
        console.log("props", props);

        this.state={
            studentName:'',
            parentName:'',
            email:'',
            password:''
        }

    }

    handleClick(event){
        console.log("event", event);
        

        // more backend stuff
        // let user = this;
        let userInfo = {
            "studentName": this.state.studentName,
            "parentName":this.state.parentName,
            "email":this.state.email,
            "password":this.state.password
        }
        
        // takes info entered by user and passes to method that posts to the database
        // if 
        AuthAPI.regUserCred(userInfo)
            .then(res => {
                //  this can include if statement below
                console.log(res.data);
                })
            .catch(err => console.log(err));

        // here i need something to check if response is 200
        // if(response.data.code == 200) {
        //     // basically if Registration was 
        //     let loginPage =[];
        //     loginPage.push(
        //         <Login parentContext={this} />
        //     );
        //     let loginMessage = "Account does not exist, Register Account";
        //     self.props.parentContext.setState({
        //         loginPage: loginPage,
        //         loginMessage: loginMessage,
        //         buttonLabel: "Register",
        //         isLogin: true
        //     });
        // } 
        let loginPage =[];
        loginPage.push(
            <Login parentContext = {this} />
        )
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        {/* <Typography>Register</Typography> */}

                        <TextField
                            helperText="Enter your Child's Name"
                            // floatingLabelText="Child Name"

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({childName: newValue})}
                            
                            //updated to
                            onChange = {(event) => this.setState({studentName: event.target.value})}/>

                        <br/>

                        <TextField
                            helperText="Enter your Name"
                            // floatingLabelText="Parent Name"

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({parentName: newValue})} 

                            //updated to
                            onChange = {(event) => this.setState({parentName: event.target.value})}/>

                        <br/>

                        <TextField
                            helperText="Enter your Email"
                            type="email"
                            // floatingLabelText="Email"

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({email: newValue})} 

                            //updated to
                            onChange = {(event) => this.setState({email: event.target.value})} 
                            />

                        <br/>

                        <TextField
                            type = "password"
                            helperText="Enter your Password"
                            // floatingLabelText="Password"

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({password: newValue})} 

                            //updated to
                            onChange = {(event) => this.setState({password: event.target.value})}/>

                        <br/>

                        <Button label="Submit" primary={true} style={margin} onClick={(event) => this.handleClick(event)}>Submit</Button>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Register;