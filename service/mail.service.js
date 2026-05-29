const fs = require("fs")
const path = require("path")
const transporter = require("../config/mail.config")

const dotenv = require('dotenv')


dotenv.config()
const{GMAIL_USER, APP_NAME} = process.env


exports.sendVerificationEmail = async(to, name, code) => {
    const templatePath = path.join(__dirname, "..", "templates", "verification.html")

    let html = fs.readFileSync(templatePath, 'utf8')


    html = html
           .replace("{{name}}", name)
           .replace("{{code}}", code)
           .replace("{{Year}}", new Date().getFullYear())

  
   const mailOptions = {
     from: `${APP_NAME} <${GMAIL_USER}>`,
     to,
     subject: "Verify Email 📩",
     html,
   };

   return transporter.sendMail(mailOptions)

}

exports.sendAccountDeletionEmail = async(to, name, code) => {
     const templatePath = path.join(__dirname, "..", "templates", "accountDeletion.html")

    let html = fs.readFileSync(templatePath, 'utf8')

      html = html
           .replace("{{name}}", name)
           .replace("{{code}}", code)
           .replace("{{Year}}", new Date().getFullYear());

           const mailOptions = {
               from: `${APP_NAME} <${GMAIL_USER}>`,
                to,
                subject: "Confirm Account Deletion 🚮",
                html, 
           };

        return transporter.sendMail(mailOptions)
}

exports.sendPasswordResetEmail = async(to, name, code) => {
      const templatePath = path.join(__dirname, "..", "templates", "passwordReset.html")
      let html = fs.readFileSync(templatePath, 'utf8')

      html = html
           .replace("{{name}}", name)
           .replace("{{code}}", code)
           .replace("{{Year}}", new Date().getFullYear());

           const mailOptions = {
               from: `${APP_NAME} <${GMAIL_USER}>`,
                to,
                subject: "Reset Your Password 🔑",
                html, 
           };

        return transporter.sendMail(mailOptions)
}