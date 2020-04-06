import React, { Component } from 'react';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

import Login from '../Login';
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
// const theme = createMuiTheme();
//     theme.typography.h3 = {
//         fontSize: '1.2rem',
//         '@media (min-width:600px)': {
//         fontSize: '1.5rem',
//     },
//     [theme.breakpoints.up('md')]: {
//         fontSize: '2.4rem',
//     }
// };

// const margin = {
//     margin: 15,
// };

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

                if(res.data.code === 200) {
                    // basically if Registration was 
                    let loginPage =[];
                    loginPage.push(
                        <Login parentContext={this} />
                    );
                    let loginMessage = "Account does not exist, Register Account";
                    this.props.parentContext.setState({
                        loginPage: loginPage,
                        loginMessage: loginMessage,
                        buttonLabel: "Register",
                        isLogin: true
                    });
                } 


                })
            .catch(err => console.log(err));


        
        // let loginPage =[];
        // loginPage.push(
        //     <Login parentContext = {this} />
        // )
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={useStyles.paper}>
                    <Avatar className={useStyles.avatar}>
                        <VpnKeyOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>

                    <form className={useStyles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="studentName"
                            label="Student's Name"
                            autoFocus
                            // floatingLabelText="Child Name"

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({childName: newValue})}
                            
                            //updated to
                            onChange = {(event) => this.setState({studentName: event.target.value})}/>

                        <br/>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="parentName"
                            label="Parent's Name"
                            autoFocus
                            // floatingLabelText="Parent Name"

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({parentName: newValue})} 

                            //updated to
                            onChange = {(event) => this.setState({parentName: event.target.value})}/>

                        <br/>

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

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({email: newValue})} 

                            //updated to
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
                            autoFocus
                            // floatingLabelText="Password"

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({password: newValue})} 

                            //updated to
                            onChange = {(event) => this.setState({password: event.target.value})}/>

                        <br/>

                        <Button label="Submit" primary={true} onClick={(event) => this.handleClick(event)}>Submit</Button>


                    </form>
                    
                </div>
            </Container>
        );
    }
}

export default Register;