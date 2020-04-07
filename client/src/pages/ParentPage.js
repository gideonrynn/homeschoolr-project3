import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Schedule from "../components/Schedule";
import ScheduleForm from "../components/ScheduleForm";
// import HelpButton from "../components/HelpButton";
import NavBar from "../components/NavBar";

import 'typeface-roboto';

class ParentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subect: " ",
            time: " ",
            data: " ",
        }
    }

    componentWillMount() {
        let defaultSubject = "";
        let defaultTime = "";
        let defaultData = [];

        this.setState({
            subject: defaultSubject,
            time: defaultTime,
            data: defaultData
        })
    }

    render() {
        return (
            <div>
                <NavBar />
                <Typography>Parent</Typography>
                <Schedule />
                <ScheduleForm />
            </div>   
        );
    }
}

export default ParentPage;