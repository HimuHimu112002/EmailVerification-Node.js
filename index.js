const express = require('express')
const User = require("./model/user.js")
const dbConnection = require('./config/db')
const emailValidation = require("./helpers/emailValidation.js")
const app = express();
require('dotenv').config()
const bcrypt = require('bcrypt');
const emailVerification = require('./helpers/emailVerification.js');
const emailVerificationTamplet = require('./helpers/verificationEmailTamplet.js');
const jwt = require('jsonwebtoken');


dbConnection();
// database er sathe connect
app.use(express.json())

app.post('/registration', async function (req, res) {

  // const {firstName,lastName,email,teliphone,addressOne,addressTwo,city,postCode,country,state,password} = req.body

  const {firstName,lastName,email,password} = req.body


  // for firstName and lastname ===========================
  if(!firstName || !lastName){
    return res.json({error: "FirstName and LastName Required"})
  }

  // for email validation
  if(emailValidation(email)){
    return res.json({error: "Email Required"})
  }

  let excitingUser = await User.find({email})
  if(excitingUser.length > 0){
    return res.json({error: "Email already in used"})
  }
  // for email validation User database name diye find kore email access
  // kore check korlam email ti db ase kina jodi thake alart dibe ======================

  // for password incrypt ======================
  bcrypt.hash(password, 10, function(err, hash) {
    // Store hash in your password DB.
    let user = new User({
      firstName ,
      lastName,
      email,
      // teliphone ,
      // addressOne,
      // addressTwo,
      // city,
      // postCode,
      // country,
      // state,
      password:hash,
    })
  
    user.save()

    let token = jwt.sign({email}, process.env.JWTSECRET,{ expiresIn: '1h'});
    // akhan theke token create hobe then emailVerificationTamplet er majh diye pass hobe
    emailVerification(
      user.email, 
      "Email verification", 
      emailVerificationTamplet(token),

      );
      
    res.json(user)
  });

  // for password incrypt=======================
  

})

app.post("/emailverification", async function(req, res){
  const {authorization} = req.headers
  // all value body theke asleo token asbe header theke 
  var decoded = jwt.verify(authorization, process.env.JWTSECRET);
  // token decoded kore real email ber korte hbe

  let upUpdateUser = await User.findOneAndUpdate({email:decoded.email},{verified:true},{new:true});

  res.json(upUpdateUser)
  //console.log("himu",decoded.email)
});

app.listen(8000)