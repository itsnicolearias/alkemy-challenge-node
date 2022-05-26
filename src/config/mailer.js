import nodemailer from 'nodemailer'
import { enviromentConfig } from './enviromentConfig.js'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: enviromentConfig.mail.user, // generated ethereal user
      pass: enviromentConfig.mail.password // generated ethereal password
    },
  });

transporter.verify().then(() => {
    console.log('Ready to send emails')
})
