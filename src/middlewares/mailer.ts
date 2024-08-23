import nodemailer from "nodemailer";
import crypto from "crypto";
import { getTicketDetailsByCode } from "../services/ticketsService";

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

export const sendingBill = async (userEmail: string, ticketCode: string) => {
  try {
    // Lấy thông tin vé
    const ticketDetails = await getTicketDetailsByCode(ticketCode);

    if (ticketDetails.errCode !== 0) {
      return {
        errCode: ticketDetails.errCode,
        message: ticketDetails.message,
      };
    }

    const ticket = ticketDetails.ticket;
    console.log(ticket);

    if (ticket) {
      const planScreen = ticket;

      // Tạo nội dung bill
      const billContent = `
      Thank you for purchasing tickets from us!

      Bill Details:
      --------------
      Ticket Code: ${ticket.ticketCode}
      User Code: ${ticket.userCode}
      Seats: ${ticket.seats}
      Bank: ${ticket.bank}
      Total Price: $${ticket.totalPrice}

      We hope you enjoy your experience!
    `;
      // Screening Details:
      // ------------------
      // Movie Code: ${planScreen.movieCode}
      // Room Code: ${planScreen.roomCode}
      // Date: ${planScreen.dateScreen}
      // Start Time: ${planScreen.startTime}
      // End Time: ${planScreen.endTime}
      // Cấu hình transporter với nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Tùy chọn gửi mail
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: "Thank you for buying tickets, here is your bill",
        text: billContent,
      };

      // Gửi email
      await transporter.sendMail(mailOptions);

      return {
        errCode: 0,
        message: "Bill sent successfully to customer",
      };
    } else {
      return {
        errCode: 2,
        message: "Ticket not found",
      };
    }
  } catch (error) {
    console.log("Error sending bill email:", error);
    return {
      errCode: 3,
      message: `Error sending bill: ${error}`,
    };
  }
};
