import { Component } from "react";
// import MuiThemeProvider from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from "../components/Header";



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

        )
    }
}