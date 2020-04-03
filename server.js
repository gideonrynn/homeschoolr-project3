const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const path = require("path");
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/users");
const passport = require("./config/passport");

//required dotenv to enable environmental variables such as MONGO_URI
require('dotenv').config({path:'.env'})

const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//change secret for production - add to .env?
//use session to track login status
app.use(session({ 
  secret: "keyboard cat", 
  resave: true, 
  saveUninitialized: true })
);

//middleware required to initialize passport
app.use(passport.initialize());

//middleware required for persistent login sessions
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// set up connection to MongoDB/mlab
const dbConnect = async () => {

  // try to connect to the database and log connection
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/homeschoolr", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`)

      } catch (err) {

      //if connection fails, log the error message in the terminal and shut down process
      console.log(`Error: ${err.message}`);
      process.exit(1);
    }
}

console.log(process.env.MONGODB_URI);
dbConnect();

// API routes here
app.use("/api", apiRoutes);
app.use("/api", userRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
