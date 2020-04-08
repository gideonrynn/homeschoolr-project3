import React, { Component } from 'react';
// import { MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Login from '../components/Login';
import Register from '../components/Register';

// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

// import NavBar from "../components/NavBar";


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

// const classes = useStyles();

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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={useStyles.paper}>
                    <form className={useStyles.form} noValidate>
                        {this.state.loginPage}

                        <Grid container>
                            <Grid item>
                                <Typography>
                                    {this.state.loginMessage}
                                </Typography>
                            </Grid>
                            <br />
                            <Grid item>
                                <Button 
                                    // type="register"
                                    fullWidth
                                    varient="contained"
                                    color="primary"
                                    label={this.state.buttonLabel}
                                    onClick={(event) => this.handleClick(event)}
                                >
                                    {this.state.buttonLabel}
                                </Button>
                            </Grid>                                   
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default LoginPage;