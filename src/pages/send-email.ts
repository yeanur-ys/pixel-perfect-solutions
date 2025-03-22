import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com', // Hostinger SMTP server
      port: 465, // Port for SSL/TLS
      secure: true, // Use SSL/TLS
      auth: {
        user: 'support@elitesitecreation.com', // Your Hostinger email
        pass: 'Pen&paper_17518', // Your Hostinger email password
      },
    });

    try {
      await transporter.sendMail({
        from: 'support@elitesitecreation.com', // Sender email
        to: 'elitesitecreation@gmail.com', // Receiver email
        subject: `Contact Form Submission from ${name}`, // Email subject
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Email body
      });

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
