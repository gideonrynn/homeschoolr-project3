import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import {
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

// URL from backend API
const URL = ' ';

const todayDate = moment();

const makeQueryString = (currentDate, currentViewName) => {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  const start = moment(currentDate).startOf(currentViewName.toLowerCase());
  const end = start.clone().endOf(currentViewName.toLowerCase());
  return encodeURI(`${URL}?filter=[["EndDate", ">", "${start.format(format)}"],["StartDate", "<", "${end.format(format)}"]]`);
};

const mapAppointmentData = appointment => ({
  ...appointment,
  startDate: appointment.StartDate,
  endDate: appointment.EndDate,
  title: appointment.Text,
});

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // loading: true,
      currentDate: '2017-05-23',
      currentViewName: 'Day',
    };
    this.loadData = this.loadData.bind(this);
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName, loading: true });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate, loading: true });
    };
  }

   componentDidMount() {
    this.loadData();
  } 

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const { currentDate, currentViewName } = this.state;
    const queryString = makeQueryString(currentDate, currentViewName);
    /* if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return; 
    } */
    fetch(queryString)
      .then(response => response.json())
      .then(({ data }) => {
        setTimeout(() => {
          this.setState({
            data,
            loading: false,
          });
        }, 600);
      })
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  render() {
    const {
      data,
      currentDate, currentViewName,
    } = this.state;

    const formattedData = data
      ? data.map(mapAppointmentData) : [];

    return (
      <Paper>
        <Scheduler
          data={formattedData}
          height={660}
        >
            <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <DayView
            startDayHour={8}
            endDayHour={15}
          />
          <Appointments />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
          />
          <AppointmentForm readOnly />
        </Scheduler>
      </Paper>
    );
  }
}

export default Schedule;