// not implemented in this version of the app
// middleware for protected routes

const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../env'})

//have the server verify whether or not the key is valid or not
module.exports = (req, res, next) => {

    //try to decode the token
    //grabbing index one after the split
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        //verify and return the decoded value
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userInfoJWT = decoded;
        console.log(decoded)

        console.log("user is authorized!")

        //if successfully authentication, go to the next process
        next();

        //if failed, return json object with message
    } catch (error) {
        console.log("user is not authorized to view content")
        return res.json({
            message: 'You are not authorized to view this content'
        });
    }

};