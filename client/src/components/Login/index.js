import React, { Component } from 'react';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AuthAPI from "../../utils/userAuthAPI";




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
        let userInfo = {
            "email":this.state.email,
            "password":this.state.password
        }    

        // takes credentials entered by user and passes to method that runs authentication on user credentials
        AuthAPI.authUserCred(userInfo)
            .then(res => {
                    // response will contain jwt token, user id, email, type (parent or teacher) **when this is set up in model
                    // represents info of user authorized to access certain pages on the site
                    console.log(res.data);

                    //testing only for receipt of data. originally tested with hardcoding parent type in to route, successfully added to test object
                    // delete if not needed
                    // if (res.data.type === "teacher") {
                    //     console.log("send me to the teacher view");
                    // } else {
                    //     console.log("send me to the parent view")
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
            <div>

                    <div>
                        {/* <Typography>Login</Typography> */}

                        <TextField
                            type="email"
                            helperText="Enter your Email"
                            // floatingLabelText="Email"

                            // this did not work for scd
                            // onChange = {(event, newValue) => this.setState({email: newValue})}

                            // updated to
                            onChange = {(event) => this.setState({email: event.target.value})}
                            />

                        <br/>

                        <TextField
                            type="password"
                            helperText="Enter your Password"
                            // floatingLabelText="Password"

                            // this did not work for scd
                            // onChange = {(event, newValue) => this.setState({password: newValue})}
                            
                            //updated to
                            onChange = {(event) => this.setState({password: event.target.value})}
                            />

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