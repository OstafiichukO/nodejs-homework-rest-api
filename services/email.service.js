const sgMail = require("@sendgrid/mail");
const { SEND_GRID_API_KEY, PORT } = require("../helpers/env");

const BASE_URL = `http://localhost:${PORT}/api`;

const sendEmail = async (userEmail, code) => {
  const link = `${BASE_URL}/users/verify/${code}`;
  sgMail.setApiKey(SEND_GRID_API_KEY);
  const msg = {
    to: userEmail, // Change to your recipient
    from: "issimo333@gmail.com", // Change to your verified sender
    subject: "Confirm your email",
    html: `<h4>Click on this link to confirm your registration ${link}</h4>`,
  };

  try {
    const result = await sgMail.send(msg);
    console.log("Result =>", result);
  } catch (e) {
    console.log("Error =>", e);
    throw e;
  }
};

module.exports = {
  sendEmail,
};
