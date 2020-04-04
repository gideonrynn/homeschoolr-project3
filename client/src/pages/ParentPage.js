import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Schedule from "../components/Schedule";
import ScheduleForm from "../components/ScheduleForm";
import HelpButton from "../components/HelpButton";

class Parent extends Component {
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
                <Typography>Parent</Typography>
                <Schedule />
                <ScheduleForm />
                <HelpButton />
            </div>   
        );
    }
}

export default Parent;