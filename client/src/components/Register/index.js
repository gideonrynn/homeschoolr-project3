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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Login from '../Login';
import AuthAPI from "../../utils/userAuthAPI";


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


class Register extends Component {

    constructor(props){
        super(props);
        console.log("props", props);

        this.state={
            studentName:'',
            parentName:'',
            email:'',
            password:'',
            accountType:''

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
            "password":this.state.password,
            "accountType":this.state.accountType
        }
        
        // takes info entered by user and passes to method that posts to the database
        // if 
        AuthAPI.regUserCred(userInfo)
            .then(res => {
                //  this can include if statement below
                console.log(res.data);

                if(res.data.code === 200) {
                    // basically if Registration was success
                    return(
                        <Login />
                    )
                    // let loginPage =[];
                    // loginPage.push(
                    //     <Login parentContext={this} />
                    // );
                    // let loginMessage = "Account does not exist, Register Account";
                    // this.props.parentContext.setState({
                    //     loginPage: loginPage,
                    //     loginMessage: loginMessage,
                    //     buttonLabel: "Register",
                    //     isLogin: true
                    // });
                } 
                // else {
                //     let loginMessage = "Account creation failed, Please try again."
                //     this.props.setState({
                //         loginMessage: loginMessage
                // })}
            })
            .catch(err => console.log(err));

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

                        <TextField
                            classes={useStyles.form}
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
                            classes={useStyles.form}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="parentName"
                            label="Parent's Name"
                            // floatingLabelText="Parent Name"

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({parentName: newValue})} 

                            //updated to
                            onChange = {(event) => this.setState({parentName: event.target.value})}/>

                        <br/>

                        <TextField
                            classes={useStyles.form}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            type="email"
                            // floatingLabelText="Email"

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({email: newValue})} 

                            //updated to
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

                            //this did not work for scd
                            // onChange = {(event, newValue) => this.setState({password: newValue})} 

                            //updated to
                            onChange = {(event) => this.setState({password: event.target.value})}/>

                        <br/>

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Account Type</FormLabel>
                            <RadioGroup aria-label="accountType" name="accoutType" row onChange={(event) => this.setState({accountType: event.target.value})}>
                                <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                                <FormControlLabel value="parent" control={<Radio />} label="Parent" />
                            </RadioGroup>
                        </FormControl>


                        <br/>

                        <Button 
                            type="submit"
                            fullWidth
                            varient="contained"
                            color="primary"
                            label="Submit" 
                            onClick={(event) => this.handleClick(event)}
                        >
                            Submit
                        </Button>



                    
                </div>
            </Container>
        );
    }
}

export default Register;