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

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

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


class TeacherRegister extends Component {

    constructor(props){
        super(props);
        console.log("props", props);

        this.state={
            studentName:'',
            parentName:'',
            email:'',
            password:'',
            userType:'',
            message:'',
        }

    }

    handleClick(event){
        console.log("event", event);
        event.preventDefault();
        

        // more backend stuff
        // let user = this;
        let userInfo = {
            "studentName": "",
            "parentName":this.state.parentName,
            "email":this.state.email,
            "password":this.state.password,
            "userType":"teacher"
        }
        
        // takes info entered by user and passes to method that posts to the database
        // if 
        AuthAPI.regUserCred(userInfo)
            .then(res => {

                if (res.data.message) {
                    return this.setState({message: res.data.message})
                }
                if (res.data.errors[0].msg) {
                    return this.setState({message: res.data.errors[0].msg})
                }

                if(res.data.code === 200) {
                    // basically if Registration was success
                    return(
                        <Login />
                    )

                } 

            })
            .catch(err => this.setState({message: err.data}));

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
                        Register as Teacher
                    </Typography>

                        <TextField
                            classes={useStyles.form}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="parentName"
                            label="Your Name"
                            autoFocus
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
                        <div> {this.state.message} </div>

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

export default TeacherRegister;