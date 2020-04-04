import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import 'typeface-roboto';

import Table from "../components/Table";


class TeacherPage extends Component {

    constructor(props) {
        console.log("props", props);
        super(props)

        this.state={
            subject:'',
            text:'',
            nodemailerMessage:''
        }

    }

    componentWillMount(){

        let nodemailerMessage = "Send Email to Students here!"

        this.setState({
            nodemailerMessage: nodemailerMessage
        })
    }

    handleClick(event) {
        console.log("nodemailer event", event);

        let nodemailerMessage = "Email sent to Students!"

        this.setState({
            nodemailerMessage: nodemailerMessage
        })


        // Backend stuff here~ for nodeMailer


    }

    render() {
        return (
            <div>
                <Typography variant="h1" gutterBottom>Instructor</Typography>
                <br />

                <div className="nodeMailer">

                    <Typography variant="h4" gutterBottom>nodeMailer here</Typography>
                    <br />
                    <Typography variant="h5" gutterBottom>{this.state.nodemailerMessage}</Typography>
                    <br />

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

                    <Button varient="contained" color="primary" label="Submit" 
                        // style={margin} 
                        onClick={(event) => this.handleClick(event)}>Send</Button>



                </div>

                <Table />

            </div>
        );
    }
}

export default TeacherPage;
