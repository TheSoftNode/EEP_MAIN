import { Request, Response } from 'express';
import Email from '../emails/email';
import catchAsync from '../utils/catchAsync';

export const subscribeToNewsletter = catchAsync(async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({
                status: "error",
                message: "Please provide an email address"
            });
        }

        // Check if the email is in a valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "error",
                message: "Please provide a valid email address"
            });
        }

        const from = process.env.ADMIN_EMAIL || "noreply@eep.dev";
        const to = email;

        const data = {
            email,
            date: new Date().toISOString()
        };

        // Send confirmation email to the subscriber
        const sendMailToSubscriber = new Email(to, data, from);
        await sendMailToSubscriber.send("newsletter-subscription.ejs", "Thank you for subscribing to EEP updates! 🚀", []);

        // Send notification to admin
        const adminEmail = process.env.ADMIN_EMAIL || "theo.uche2023@gmail.com";
        const adminData = {
            subscriberEmail: email,
            date: new Date().toISOString()
        };
        const sendMailToAdmin = new Email(adminEmail, adminData, from);
        await sendMailToAdmin.send("admin-new-subscriber.ejs", "New Newsletter Subscriber", []);

        res.status(200).json({
            status: "success",
            message: "Thank you for subscribing to our newsletter!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to subscribe. Please try again later."
        });
    }
});