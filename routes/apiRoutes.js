const router = require("express").Router();
const db = require("../models");
const nodemailer = require("nodemailer");

//Retrieve all user information
router.get("/users", (req, res) => {
  db.User.find({})
  .then(schedule => res.json(schedule))
  .catch(err => res.status(422).end());
})

//Retreive the model schedule posted by the teacher
router.get("/schedule", (req, res) => {
    db.Schedule.find({})
    .then(schedule => res.json(schedule))
    .catch(err => res.status(422).end());
})

//Post a model schedule using an array of event objects, remember to give this one an array
router.post("/schedule", (req, res) => {
    db.Schedule.create(req.body)
      .then(schedule => res.json(schedule))
      .catch(err => res.status(422).end());
  });

//Add an event to the schedule 
router.post("/addevent", (req, res) => {
  db.Schedule.update({$push: {event: req.body}})
    .then(schedule => res.json(schedule))
    .catch(err => res.status(422).end());
});

//Delete an event from the schedule
router.delete("/deleteevent/:id", (req, res) => {
  db.Schedule.update({$pull: {id: req.params.id}})
    .then(schedule => res.json(schedule))
    .catch(err => res.status(422).end());
});

//Retreive a list of students
router.get("/roster", (req, res) => {
  db.Student.find({})
  .then(schedule => res.json(schedule))
  .catch(err => res.status(422).end());
})

//Add a student, remember that this needs to include their schedules
router.post("/roster", (req, res) => {
  db.Student.create(req.body)
  .then(student => res.json(student))
  .catch(err => res.status(422).end());
})

//Add an event to the student's schedule
router.post("/updatestudentschedule/:id", (req, res) => {
  db.Student.update({ _id: req.params.id },
    { $push: { schedule: req.body } })
  .then(student => res.json(student))
  .catch(err => res.status(422).end());
})

//Send an email with nodemailer

//EXAMPLE REQ.BODY:
// {
// 	"recipient" : "kevinsuh2018@u.northwestern.edu",
// 	"title" : "Test",
// 	"message": "Message"
// }

router.post("/email", (req, res) => {
    console.log("/email post")
    //Unpack the req.body object
    const recipient = req.body.recipient
    const title = req.body.title
    const message = req.body.message



    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'noreplyhomeschoolr@gmail.com',
            pass: 'homeschoolr12345'
          }
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: "noreplyhomeschoolr@gmail.com", // sender address
          to: recipient, // list of receivers
          subject: title, // Subject line
          text: message, // plain text body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      
      main().catch(console.error);

      res.send("email sent")
})

module.exports = router;