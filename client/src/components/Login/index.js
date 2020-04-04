import React, { Component } from 'react';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import API from "./utils/userAuthAPI"


// const theme = createMuiTheme();
//     theme.typography.h3 = {
//         fontSize: '1.2rem',
//         '@media (min-width:600px)': {
//         fontSize: '1.5rem',
//     },
//     [theme.breakpoints.up('md')]: {
//       fontSize: '2.4rem',
//     }
// };

// const margin = {
//     margin: 15
// };

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
        // let user = this;
        // let userInfo = {
        //     "email":this.state.email,
        //     "password":this.state.password
        // }

        //
        // API.postmethod()
        //     .then(res => {
        //  console.log();
        //         })
        //     .catch(err => console.log(err));


    }

    render() {
        return (
            <div>

                    <div>
                        {/* <Typography>Login</Typography> */}

                        <TextField
                            helperText="Enter your Email"
                            // floatingLabelText="Email"
                            onChange = {(event, newValue) => this.setState({email: newValue})}/>

                        <br/>

                        <TextField
                            type="password"
                            helperText="Enter your Password"
                            // floatingLabelText="Password"
                            onChange = {(event, newValue) => this.setState({password: newValue})}/>

                        <br/>

                        <Button varient="contained" color="primary" label="Submit" 
                        // style={margin} 
                        onClick={(event) => this.handleClick(event)}>Submit</Button>
                    
                    </div>
            </div>
        );
    }
}

export default Login;