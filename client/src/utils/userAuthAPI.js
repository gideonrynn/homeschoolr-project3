// add axios calls here for login, register, etc.
import axios from 'axios';

//list all methods to be used in login and register components
export default {
    
    // set up post methods for api/users/login (runs through passport.authenticate, which authenticates the request) and api/users/register

    regUserCred: function(userInfo) {
     
        return axios.post("/api/register", userInfo);
    },

    // authUserCred: function(userInfo) {
    //     console.log("authUserCred was run")
    //     return axios.post("/api/login", userInfo);
    // },

    // check database to see if any of these values exist
    // if not, create
    // postUserInfo: 
    // get method for user data?

    // Gets all users from database. will not need this in production, testing only
    getUserInfo: function() {
        return axios.get("/api/userinfo");
    }
    

};
  