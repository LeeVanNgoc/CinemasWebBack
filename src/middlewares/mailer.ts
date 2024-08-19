import nodemailer from "nodemailer";
import crypto from "crypto";

export const sendOTP = async (userEmail: string) => {
  const otp = crypto.randomInt(100000, 999999); // Tạo một mã OTP 6 chữ số

  // Cấu hình transporter với nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userEmail,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    console.log("Error sending OTP email:", error);
    return null;
  }
};
