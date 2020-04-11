import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    Toolbar,
    Appointments,
    AppointmentTooltip,
    ViewSwitcher,
    AppointmentForm,
    ConfirmationDialog,
    EditRecurrenceMenu,
    AllDayPanel,
    DragDropProvider,
    TodayButton,


} from '@devexpress/dx-react-scheduler-material-ui';

import moment from  "moment"
import API from '../../utils/API';

// import { appointments } from '../../../demo-data/month-appointments';

// stuff that needs something to tell time
const currentDate = moment();

// Sample Data 
// const schedulerData = [
//     { startDate: '2020-04-08T09:45', endDate: '2020-04-08T11:00', title: 'Meeting' },
//     { startDate: '2020-04-08T12:00', endDate: '2020-04-08T13:30', title: 'Go to a gym' },
// ];


// sample data structure
// const recurrenceAppointments = [{
//         title: 'Website Re-Design Plan',
//         startDate: new Date(2018, 5, 25, 9, 15),
//         endDate: new Date(2018, 5, 25, 11, 30),
//         id: 100,
//         rRule: 'FREQ=DAILY;COUNT=3',
//         exDate: '20180628T063500Z,20180626T061500Z',
//     }, {
//         title: 'Book Flights to San Fran for Sales Trip',
//         startDate: new Date(2018, 5, 25, 12, 11),
//         endDate: new Date(2018, 5, 25, 13, 0),
//         id: 101,
//         rRule: 'FREQ=DAILY;COUNT=4',
//         exDate: '20180627T091100Z',
//         allDay: true,
//     }, {
//         title: 'Install New Router in Dev Room',
//         startDate: new Date(2018, 5, 25, 13, 30),
//         endDate: new Date(2018, 5, 25, 14, 35),
//         id: 102,
//         rRule: 'FREQ=DAILY;COUNT=5',
//     }, {
//         title: 'Approve Personal Computer Upgrade Plan',
//         startDate: new Date(2018, 5, 26, 10, 0),
//         endDate: new Date(2018, 5, 26, 11, 0),
//         id: 3,
//         location: 'Room 2',
//     }, {
//         title: 'Final Budget Review',
//         startDate: new Date(2018, 5, 27, 11, 45),
//         endDate: new Date(2018, 5, 27, 13, 20),
//         id: 4,
//         location: 'Room 2',
//     }, {
//         title: 'New Brochures',
//         startDate: new Date(2018, 5, 26, 14, 40),
//         endDate: new Date(2018, 5, 26, 15, 45),
//         id: 5,
//         location: 'Room 2',
//     }, {
//         title: 'Install New Database',
//         startDate: new Date(2018, 5, 28, 9, 45),
//         endDate: new Date(2018, 5, 28, 11, 15),
//         id: 6,
//         location: 'Room 1',
//     }, {
//         title: 'Approve New Online Marketing Strategy',
//         startDate: new Date(2018, 5, 29, 11, 45),
//         endDate: new Date(2018, 5, 29, 13, 5),
//         id: 7,
//         location: 'Room 3',
//     }, {
//         title: 'Create Icons for Website',
//         startDate: new Date(2018, 5, 29, 10, 0),
//         endDate: new Date(2018, 5, 29, 11, 30),
//         id: 12,
//         location: 'Room 2',
//     }
// ];

// to allow drag schedule
const dragDisableIds = new Set([3, 8, 10, 12]);
const allowDrag = ({ id }) => !dragDisableIds.has(id);
const appointmentComponent = (props) => {
    if (allowDrag(props.data)) {
        return <Appointments.Appointment {...props} />;
    } 
        return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
};

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            // data: schedulerData,
            data: [],
            currentDate: currentDate,

            addedAppointment: {},
            appointmentChanges: {},
            editingAppointmentId: undefined,
        };

        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointmentId = this.changeEditingAppointmentId.bind(this);

    }
    //Pull the list of events from the database and add it to this.state.data, which holds the events for the schedule
    componentDidMount() {
        if (this.props.dataType === "Teacher"){
            API.getSchedule().then(res => {
                this.setState({...this.state, data: res.data})
                console.log(res.data)
                console.log(this.state)
            })
        }
        if (this.props.dataType === "Student"){
            API.getOneUser(this.props.id).then(res => {
                this.setState({...this.state, data: res.data[0].schedule})
                console.log(res.data[0].schedule)
                console.log(this.state)
            })
        }
    }
    changeAddedAppointment(addedAppointment) {
        this.setState({ addedAppointment });
    }
    
    changeAppointmentChanges(appointmentChanges) {
        this.setState({ appointmentChanges });
    }

    changeEditingAppointmentId(editingAppointmentId) {
        this.setState({ editingAppointmentId });
    }

    commitChanges({ added, changed, deleted }) {
        //This conditional ends at line 245
        console.log(this.props.editPermission)
        if (this.props.editPermission === "ok") {

        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }

            let dataID = 0

            //Make a data object that the database can understand
            const DBdata = data.map(event => {
                console.log(event)

                function timeConverter(scheduleTime, modify) {
                    const timeString = JSON.stringify(scheduleTime)
                    const timeArray = timeString.split(":")
                    let hour = timeArray[0][timeArray[0].length - 2] + timeArray[0][timeArray[0].length - 1]
                    if (modify) {
                        hour = (parseInt(hour) - 5).toString()
                        if (hour.length === 1) {
                            hour = "0" + hour
                        }
                    }
                    return hour + ":" + timeArray[1][0] + timeArray[1][1]
                }

                dataID++
                console.log(dataID)

                const today = moment().format().substr(0, 10)
                console.log(today)

                console.log(event.id)

                let data

                if (event.hasOwnProperty("allDay")) {
                    console.log("modify")
                    data = {
                        title: event.title,
                        startDate: today + "T" + timeConverter(event.startDate, true),
                        endDate: today + "T" + timeConverter(event.endDate, true),
                        id: dataID
                    }
                }
                else {
                    data = {
                        title: event.title,
                        startDate: today + "T" + timeConverter(event.startDate, false),
                        endDate: today + "T" + timeConverter(event.endDate, false),
                        id: dataID
                    }
                }
                return data
            })

            console.log(DBdata)

            if (this.props.dataType === "Teacher"){
                API.reupload(DBdata).then(res => {
                    console.log(res.data)
                    this.setState({...this.state, data: res.data})
                })
            }
            else if (this.props.dataType === "Student"){
                API.reuploadStudentEvent(this.props.id, DBdata)
                .then(response => API.getOneUser(this.props.id))
                .then(res => {
                    console.log(res.data[0].schedule)
                    this.setState({...this.state, data: res.data[0].schedule})
                })
            }


            //Send the new data object to the database
            

            return { data };
        });
        }
      }


    render() {
        const {
            currentDate, data, addedAppointment, appointmentChanges, editingAppointmentId,
        } = this.state;

        return (
            <Paper>
                <Scheduler data={data} height={600}>

                    <ViewState currentDate={currentDate}/>

                    {/* controlled mode */}
                    <EditingState
                        onCommitChanges={this.commitChanges}

                        addedAppointment={addedAppointment}
                        onAddedAppointmentChange={this.changeAddedAppointment}

                        appointmentChanges={appointmentChanges}
                        onAppointmentChangesChange={this.changeAppointmentChanges}

                        editingAppointmentId={editingAppointmentId}
                        onEditingAppointmentIdChange={this.changeEditingAppointmentId}
                    />

                    <IntegratedEditing />

                    <DayView startDayHour={7} endDayHour={16}/>
                    <WeekView startDayHour={7} endDayHour={16}/>
                    <AllDayPanel />
                    <EditRecurrenceMenu />

                    <Toolbar />
                    <ViewSwitcher />

                    <ConfirmationDialog />

                    {/* allow drag */}
                    <Appointments 
                        appointmentComponent={appointmentComponent}
                    />
                    <DragDropProvider
                        allowDrag={allowDrag}
                    />
                    
                    <TodayButton />

                    <AppointmentTooltip
                        showCloseButton
                        showOpenButton
                    />

                    <AppointmentForm
                        // readOnly
                    />
                </Scheduler>
            </Paper>
        );
    }
}