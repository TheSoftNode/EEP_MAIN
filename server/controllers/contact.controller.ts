import { Request, Response } from 'express';
import Email from '../emails/email';
import catchAsync from '../utils/catchAsync';

// Handle learner contact form submissions
export const submitLearnerContact = catchAsync(async (req: Request, res: Response) => {
    try {
        const { fullName, email, phone, programInterest, message } = req.body;

        // Validate required fields
        if (!fullName || !email || !programInterest || !message) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all required fields"
            });
        }

        const from = `${fullName}<${email}>`;
        const to = process.env.ADMIN_EMAIL || "theo.uche2023@gmail.com";
        // const to = process.env.ADMIN_EMAIL || "fstatazizi@gmail.com";

        const data = {
            contact: {
                fullName,
                email,
                phone: phone || "Not provided",
                programInterest,
                message
            },
            date: new Date().toISOString()
        };

        // Send email to admin
        const sendMailToAdmin = new Email(to, data, from);
        await sendMailToAdmin.send("learner-contact-admin.ejs", "New Learner Inquiry", []);

        // Send confirmation email to user
        const sendMailToUser = new Email(email, data, to);
        await sendMailToUser.send("learner-contact-confirmation.ejs", "Thank you for your interest in EEP 🎉", []);

        res.status(200).json({
            status: "success",
            message: "Thank you for reaching out! We'll get back to you soon."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to submit your message. Please try again later."
        });
    }
});

// Handle business contact form submissions
export const submitBusinessContact = catchAsync(async (req: Request, res: Response) => {
    try {
        const { fullName, email, company, projectType, projectStatus, projectDetails } = req.body;

        // Validate required fields
        if (!fullName || !email || !company || !projectDetails) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all required fields"
            });
        }

        const from = `${fullName}<${email}>`;
        const to = process.env.ADMIN_EMAIL || "theo.uche2023@gmail.com";
        // const to = process.env.ADMIN_EMAIL || "fstatazizi@gmail.com";

        const data = {
            contact: {
                fullName,
                email,
                company,
                projectType: projectType || "Not specified",
                projectStatus: projectStatus || "Not specified",
                projectDetails
            },
            date: new Date().toISOString()
        };

        // Send email to admin
        const sendMailToAdmin = new Email(to, data, from);
        await sendMailToAdmin.send("business-contact-admin.ejs", "New Business Partnership Inquiry", []);

        // Send confirmation email to user
        const sendMailToUser = new Email(email, data, to);
        await sendMailToUser.send("business-contact-confirmation.ejs", "Thank you for your interest in EEP Business Partnership", []);

        res.status(200).json({
            status: "success",
            message: "Thank you for reaching out! We'll get back to you soon about your project."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to submit your message. Please try again later."
        });
    }
});