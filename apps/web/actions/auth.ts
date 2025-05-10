"use server";

import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins/magic-link";

// import { render } from "@react-email/components";
import nodemailer from "nodemailer";
// import { Email } from "@/components/email";

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: "parthkapoor004@gmail.com",
    pass: process.env.GMAIL_PASSWORD!,
  },
});

// const createEmailHTML = async (url: string) => (
//   await render(<Email url={url} >
// )

export const auth = betterAuth({
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await transporter.sendMail({
          from: "parthkapoor004@gmail.com",
          to: email,
          subject: "Hopster Login",
          text: "Hello world?", // plain‑text body
          html: "<b>Hello world?</b>", // HTML body
        });
      },
    }),
  ],
});
