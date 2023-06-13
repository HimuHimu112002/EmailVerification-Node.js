const nodemailer = require("nodemailer");
async function emailVerification(email,subject,template, token){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: "hztiguvkccuvlrbi",
          // google chorome er pass
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'oreby', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: template, // html body
      });
}

module.exports = emailVerification