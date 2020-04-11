// add axios calls here for user account creation and authentication
import axios from 'axios';


export default {
    
    // Retreives a list of all the users
    getUsers: function() {
     
        return axios.get("/api/users");
    },

    email: function(data) {
        return axios.post("/api/email", data);
    },

    getSchedule: function() {
        return axios.get("/api/schedule")
    },

    //Data should be array of events or single event object
    postSchedule: function(data) {
        return axios.post("/api/schedule", data)
    },

    //Needs the correct event id in the url
    deleteFromSchedule: function() {
        return axios.delete("/api/deleteevent:id")
    },

    //Reupload a schedule i.e. delete everything and put a new one up
    reupload: function(data) {
        return axios.post("api/schedule/reupload", data)
    },

    //Get a user's information
    getOneUser: function(id) {
        return axios.get("/api/users/" + id)
    },

    //Push an event to a student's schedule
    postStudentEvent: function(id, data) {
        return axios.post("/api/updatestudentschedule/" + id, data)
    },

    //Push an event to a student's schedule
    reuploadStudentEvent: function(id, data) {
        return axios.post("/api/reuploadstudentschedule/" + id, data)
    }
    
};