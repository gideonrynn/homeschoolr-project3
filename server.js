const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const PORT = process.env.PORT || 3001;

//required dotenv to enable environmental variables such as MONGO_URI
require('dotenv').config({path:'.env'})

const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// set up connection to MongoDB/mlab
const dbConnect = async () => {

  // try to connect to the database and log connection
  try {
    const conn = await mongoose.connect("mongodb://localhost/homeschoolr" || process.env.MONGODB_URI, {
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

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
