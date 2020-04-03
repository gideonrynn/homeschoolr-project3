const router = require("express").Router();
const db = require("../models");
const nodemailer = require("nodemailer");

//Retreive the model schedule posted by the teacher
router.get("/schedule", (req, res) => {
    db.Schedule.find({})
    .then(schedule => res.json(schedule))
    .catch(err => res.status(422).end());
})

//Post a schedule using an array of event objects
router.post("/schedule", (req, res) => {
    db.Schedule.create(req.body)
      .then(schedule => res.json(schedule))
      .catch(err => res.status(422).end());
  });

//Send an email with nodemailer
router.post("/email", (req, res) => {
    console.log("/email post")
    //Unpack the req.body object
    const sender = req.body.sender
    const recipient = req.body.recipient
    const title = req.body.title
    const message = req.body.message



    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
          }
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: sender, // sender address
          to: recipient, // list of receivers
          subject: title, // Subject line
          text: message, // plain text body
        });

        console.log(sender)
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      
      main().catch(console.error);
})

module.exports = router;