import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import 'typeface-roboto';

// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles({
//     root: {
//       width: '100%',
//       maxWidth: 500,
//     },
// });

import Table from "../components/Table";

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

class TeacherPage extends Component {

    constructor(props) {
        console.log("props", props);
        super(props)
        this.state={
            childName:'',
            parentName:'',
            email:''
        }
    }

    componentWillMount(){

    }

    handleClick() {

    }

    render() {
        return (
            <MuiThemeProvider>
                <Typography variant="h1" gutterBottom>Instructor</Typography>
                <br />

                {/* Node Mailer here */}
                {/* <TextField></TextField> */}
                <Typography variant="h4" gutterBottom>nodeMailer here</Typography>

                <TextField
                    type="subject"
                    helperText="Enter the Subject"
                    onChange = {(event, newValue) => this.setState({subject: newValue})}
                    // labelWidth={100}
                    />
                <br />

                <TextField
                    type="text"
                    helperText="Enter email Text"
                    onChange = {(event, newValue) => this.setState({text: newValue})} 
                    // labelWidth={100} 
                    multiline/>
                <br />
                <br />

                <Table />

            </MuiThemeProvider>
        );

    }
}

export default TeacherPage;
