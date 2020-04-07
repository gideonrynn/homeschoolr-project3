import React, { Component } from 'react';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AuthAPI from "../../utils/userAuthAPI";
import AuthContext from "../../utils/context"




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

    //bring in context for passing down globalstate
    static contextType = AuthContext;
    
    constructor(props){
        console.log("props", props);
        super(props);
        this.state={
            email:'',
            password:'',
            isLoggedIn:''
        }
    }


    handleClick(event){
        console.log("event", event);

        let userInfo = {
            "email":this.state.email,
            "password":this.state.password
        }    

        // take credentials entered by user and send for authentication
        AuthAPI.authUserCred(userInfo)

            .then(res => {
                    // response will contain jwt token, user id, email
                    // will contain type (parent or teacher) **when this is set up in model** 
                    // represents info of user authorized to access certain pages on the site
                    console.log(res.data);

                    // if response contains token (which is provided when a user has been authenticated)
                    if (res.data.token) {
                    
                        //set state that shows user is logged in
                        this.setState({
                            isLoggedIn: true
                        })
                        
                        // pass info to globalstate so that other components and pages can see this user is logged in
                        // **Testing Only** remove "parent"
                        this.context.updatedState(
                            this.state.isLoggedIn, 
                            res.data.id, 
                            res.data.email, 
                            "parent")
                        
                    }
                    // add routing logic below or above?
                    // if (res.data.type === "teacher") {
                    //     push to teacher view
                    // } else {
                    //     push to parent view
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