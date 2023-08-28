import { ENV } from "../config.js";
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

let config = {
    service: 'gmail',
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD
    }
}

let transporter = nodemailer.createTransport(config);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})


export const registerMail = async (req, res) => {
    const { username, email, text, subject } = req.body;

    let response = {
        body: {
            name: username,
            intro: text || `Hello ${username} You have successfully signed up!`,
            outro: "Need help, or have questions? Just reply to this email, we\'d love to help."
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: ENV.EMAIL,
        to: email,
        subject: subject || "Signup Successful",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
}
