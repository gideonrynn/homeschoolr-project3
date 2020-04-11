import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import SelectSubj from '../SelectSubj';
import SelectTime from '../SelectTime';

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

class ScheduleForm extends Component {

  constructor(props) {
      super(props);
      console.log("props",props);
      this.state = {
        subject: " ",
        time: " ",
      }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    
    console.log("event", event);

    // send to database 

    /* this.setState({
      subject: " ",
      time: " ", 
    });*/
  };

  render() {
    return(
      <div>
        <MuiThemeProvider>
          <div>
            <Typography>Schedule A Subject</Typography>
              <SelectSubj
                onChange = {(event, newValue) => this.setState({subject: newValue})} />
                <Typography>Start Time</Typography>
              <SelectTime 
                onChange = {(event, newValue) => this.setState({time: newValue})} />
              <Typography>End Time</Typography>
              <SelectTime 
                onChange = {(event, newValue) => this.setState({time: newValue})} />
              <Button 
                label = "Schedule Class"
                primary = {true}
                onClick = {(event) => this.handleFormSubmit(event)} />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default ScheduleForm;