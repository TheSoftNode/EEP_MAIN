import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export default class Email {
  to: string;
  // name: string;
  data: object;
  from: string;

  constructor(to: string, data: object, from: string) {
    this.to = to;
    this.data = data;
    this.from = from;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Send Actual Email
  async send(template: string, subject: string, attachments = []) {
    //get the path to the email template file
    const emailTemplatePath = path.join(
      __dirname,
      "../emails/mailTemplates",
      template
    );

    //Render the email template with EJS
    const html: string = await ejs.renderFile(emailTemplatePath, this.data);

    // Define mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      attachments: attachments

    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async thankYou() {
    await this.send("message-applicant.ejs", "Thank you for reaching out!");
  }

  async newApplication() {
    await this.send("new-application.ejs", "New Portfolio Message!");
  }

  async learnerContactConfirmation() {
    await this.send("learner-contact-confirmation.ejs", "Thank you for your interest in EEP 🎉");
  }

  async learnerContactAdmin() {
    await this.send("learner-contact-admin.ejs", "New Learner Inquiry");
  }

  async businessContactConfirmation() {
    await this.send("business-contact-confirmation.ejs", "Thank you for your interest in EEP Business Partnership");
  }

  async businessContactAdmin() {
    await this.send("business-contact-admin.ejs", "New Business Partnership Inquiry");
  }

  async businessApplicationConfirmation() {
    await this.send("business-application-confirmation.ejs", "Thank you for your EEP Business Partnership Application");
  }

  async businessApplicationAdmin() {
    await this.send("business-application-admin.ejs", "New Business Partnership Application");
  }

  async newsletterSubscriptionConfirmation() {
    await this.send("newsletter-subscription.ejs", "Thank you for subscribing to EEP updates! 🚀");
  }

  async newsletterSubscriptionAdmin() {
    await this.send("admin-new-subscriber.ejs", "New Newsletter Subscriber");
  }
}
