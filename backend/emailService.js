// emailService.js
const nodemailer = require('nodemailer');

// Create a transporter object using a free email service (Gmail in this example)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the email service
  auth: {
    user: 'kumar.jatinitp2019@gmail.com', // Replace with your Gmail address
    pass: 'fugxrcudykeqfdqz', // Replace with your Gmail password or app password
  },
});

// Function to send booking confirmation email
const sendBookingConfirmation = (recipientEmail, bookingDetails) => {
  const { groundName, slotName, startTime, endTime } = bookingDetails;

  const mailOptions = {
    from: 'kumar.jatinitp2019@gmail.com', // Sender address
    to: recipientEmail, // Recipient's email
    subject: 'Your Slot Booking Confirmation', // Subject line
    text: `Your booking for ${groundName} has been confirmed!\n\nSlot: ${slotName}\nTime: ${startTime} - ${endTime}`, // Plain text body
    html: `<p>Your booking for <strong>${groundName}</strong> has been confirmed!</p>
           <p>Slot: <strong>${slotName}</strong></p>
           <p>Time: <strong>${startTime} - ${endTime}</strong></p>`, // HTML body
  };

  // Send the email and return a promise
  return transporter.sendMail(mailOptions);
};

module.exports = { sendBookingConfirmation };
