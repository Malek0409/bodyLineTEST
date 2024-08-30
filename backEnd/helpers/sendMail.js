

import nodemailer from "nodemailer";
 


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS:true,
    auth: {
    user: 'malek6khadhri@gmail.com',
    pass: 'awff pnjj ljrq auck'
  }
});

export default function sendConfirmationEmail (email, code) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject:"Confirmation d'Email",
    text: `Your confirmation code is ${code}`
  };

  return transporter.sendMail(mailOptions);
};

