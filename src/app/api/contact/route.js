import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"${data.name}" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: data.email,
      subject: "Message from My Website Contact Form",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 40px auto;
              padding: 20px;
              background-color: #fff;
              border: 2px solid #48AEDD;
              border-radius: 10px;
            }
            .email-header {
              text-align: center;
              background-color: #48AEDD;
              color: white;
              font-weight: 900;
              padding: 10px;
              border-radius: 10px;
              font-size: 20px;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              margin-bottom: 10px;
              font-size: 16px;
            }
            li b {
              color: #223740;
            }
            .message {
              background-color: #48AEDD;
              color: white;
              padding: 10px;
              border-radius: 8px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">Safwen Cherif Portfolio</div>
            <ul>
              <li><b>Name:</b> ${data.name}</li>
              <li><b>Email:</b> ${data.email}</li>
              <li><b>Phone:</b> ${data.phoneNumber}</li>
              <li><b>Subject:</b> ${data.subject}</li>
              <li><b>Message:</b> <div class="message">${data.message}</div></li>
            </ul>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({
      error: false,
      message: "Message successfully sent ✅",
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json({
      error: true,
      message: "Email sending failed ❌",
    });
  }
}
