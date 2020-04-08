// add axios calls here for user account creation and authentication
import axios from 'axios';


export default {
    
    // Retreives a list of all the users
    getUsers: function() {
     
        return axios.get("/api/users");
    },

    email: function(data) {
        return axios.post("/api/email", data);
    }

    
};