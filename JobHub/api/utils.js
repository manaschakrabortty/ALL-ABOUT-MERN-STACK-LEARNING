require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports.sendMail = async (mailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'manas.tiu@gmail.com',
                pass: process.env.GMAIL_PASS
            }
        })

        await transporter.sendMail(mailOptions)
    }
    catch (err) {
        console.log(err)
    }
}