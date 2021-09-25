const nodemailer = require('nodemailer');

module.exports = async options=>{
    //first create transporter
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER_NAME,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    //define mail options 
    const mailOptions = {
        from:"probable siid.dot", 
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    //send email
   await transporter.sendMail(mailOptions)
}
