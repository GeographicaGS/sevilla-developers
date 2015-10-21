var express = require('express');
var router = express.Router();
var emailjs   = require("emailjs");

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    'status' : 'alive'
  })
});

router.post('/join',function(req,res,next){
  var email = req.body.email;

  if (email)
    email = email.trim();

  if (!email || !validateEmail(email)){

    setTimeout(function(){
      res.status(400);
      res.json({
        error: 'Invalid parameters'
      });
    },1000);
  } 
  else{
    
    var server  = emailjs.server.connect({
      user:    process.env.SMTP_USERNAME, 
      password: process.env.SMTP_PASSWORD, 
      host:    process.env.SMTP_HOST, 
      ssl:     true
    });

    var text = "Gracias por enviarnos tu solicitud.\n\nPor ahora tenemos que darte de alta manualmente, "+
        " danos unos minutos y te enviaremos una invitación para que te unas al team de "+
        "#Slack [https://sevilla-developers.slack.com].\n\n" +
        "Si tienes dudas mándanos un email a " + process.env.MANAGER_EMAIL_ADDR;

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
      text:    text, 
      //from:    process.env.MANAGER_EMAIL_ADDR, 
      from : "Sevilla Developers <no-reply@sevilla-developers.com>",
      to:      email,
      cc:    process.env.MANAGER_EMAIL_ADDR,
      subject: "Sevilla Developers - Join Request"
    }, 
    function(err, message) { 
      console.log(err || message); 
      if (err){
        res.status(500);
        res.json({
          error: message
        });
      }

      res.json({
        error: null
      });
    });
  }
});

module.exports = router;
