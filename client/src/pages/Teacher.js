import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles';

// import Table from "../components/Table";

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
                <Typography>Instructor</Typography>
                <br />

                {/* Node Mailer here */}
                {/* <TextField></TextField> */}

                <br />

                <Table />

            </MuiThemeProvider>
        );
    }
}

export default TeacherPage;