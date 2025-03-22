
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Create a transporter with Hostinger SMTP settings
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
      // Send the email
      await transporter.sendMail({
        from: 'support@elitesitecreation.com', // Sender email
        to: 'support@elitesitecreation.com', // Receiver email
        subject: `Contact Form Submission from ${name}`, // Email subject
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4a90e2;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="padding: 15px; background-color: #f5f5f5; border-left: 4px solid #4a90e2;">${message}</p>
          </div>
        `, // HTML body
      });

      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
