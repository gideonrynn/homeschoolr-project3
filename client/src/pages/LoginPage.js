import React, { Component } from 'react';
// import { MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Login from '../components/Login';
import Register from '../components/Register';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// const margin = {
//     margin: 15
// };

class LoginPage extends Component {

    constructor(props){
        super(props);
        console.log("props", props);
        
        this.state={
            username:'',
            password:'',
            loginPage:[],
            loginMessage:'',
            buttonLabel: 'Register',
            isLogin: true
        }
    }

    componentWillMount(){
        let loginPage=[];
        loginPage.push(
            <Login parentContext={this} appContext={this.props.parentContext} key={loginPage.length}/>
        );

        let loginMessage = "Account does not exist, Register Account";

        this.setState({
            loginPage: loginPage,
            loginMessage: loginMessage
        })
    }

    handleClick(event){

        console.log("event" + event);

        let loginMessage ='';

        if(this.state.isLogin){
            let loginPage=[];
            loginPage.push(
                <Register parentContext={this}/>
            );

            loginMessage = "Cannot use this email";
            
            this.setState({
                loginPage: loginPage,
                loginMessage: loginMessage,
                buttonLabel: "Login",
                isLogin: false
            })
        } else {
            let loginPage=[];
            loginPage.push(
                <Login parentContext={this}/>
            );

            loginMessage = "Account does not exist, Register Account";

            this.setState({
                loginPage: loginPage,
                loginMessage: loginMessage,
                buttonLabel: "Register",
                isLogin: true
            })
        }
    }

    render() {
        return (
            <Grid container alignContent="center" className="loginPage">

                <Paper elevation={3}> 

                    {this.state.loginPage}

                    <div>
                        {this.state.loginMessage}
                            <div>
                                <Button label={this.state.buttonLabel} primary={true} 
                                // style={margin} 
                                onClick={(event) => this.handleClick(event)}>{this.state.buttonLabel}</Button>
                            </div>

                        {/* <MuiThemeProvider>
                            <div>
                                <Button label={this.state.buttonLabel} primary={true} 
                                // style={margin} 
                                onClick={(event) => this.handleClick(event)} />
                            </div>
                        </MuiThemeProvider> */}
                    </div>
                </Paper>
            </Grid>
        );
    }
}

export default LoginPage;