require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_PASSWORD_APP,
    },
  });

  let info = await transporter.sendMail({
    from: '"Nguyễn Phú An 👻" <foo@example.com>',
    to: dataSend.reciverEmail,
    subject: "Thông Tin Đặt Lịch Khám Bệnh",
    text: "Hello world?",
    html: `
    
    <h3>Xin chào ${dataSend.patientName}</h3>
    <h4>Bạn nhận đc email này vì đặt lich khám bênh online trên homecare</h4>
    <h4>Thông tin đặt lịch khám bệnh</h4>
    <div>Thời gian: ${dataSend.time}</div>
    <div>Bác Sĩ: ${dataSend.nameDoctor}</div>
    <p>Nếu các thông tin trên là sự thật và hoàn tất thủ túc đặt lịch khám bệnh</p>
    <p><a href=${dataSend.linkto}>Click Here!</a></p>
    <p>Xin chân thành cảm ớn</p>
    `,
  });
};
module.exports = {
  sendSimpleEmail,
};
