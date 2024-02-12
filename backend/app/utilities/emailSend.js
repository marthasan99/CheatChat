const nodemailer = require("nodemailer");

async function emailSend(userMail, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "Blog site email service",
    to: userMail,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<h2>http://localhost:1010/api/v1/backend/auth/tokencheck/${token}</h2>`,
  });
}

module.exports = emailSend;
