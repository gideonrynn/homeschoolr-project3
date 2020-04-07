// add axios calls here for user account creation and authentication
import axios from 'axios';


export default {
    
    // passes info and credentials entered by user to route that saves to db
    regUserCred: function(userInfo) {
     
        return axios.post("/api/register", userInfo);
    },

    // passes credentials entered by user to route that runs authentication using passport
    // passport will check db for existing user, and send back 
    authUserCred: function(userInfo) {
        
        return axios.post("/api/login", userInfo);
    }

    
};
  