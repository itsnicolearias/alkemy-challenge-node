import nodemailer from 'nodemailer'
import { envConfig } from './envConfig.js'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: envConfig.mail.user, // generated ethereal user
      pass: envConfig.mail.password // generated ethereal password
    },
  });

transporter.verify().then(() => {
    console.log('Ready to send emails')
})
