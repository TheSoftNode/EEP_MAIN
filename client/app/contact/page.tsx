"use client"

import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactInfoCards } from '@/components/Contact/ContactInfoCards';
import { LearnerContactForm } from '@/components/Contact/LearnerContactForm';
import { BusinessContactForm } from '@/components/Contact/BusinessContactForm';
import { SuccessMessage } from '@/components/Contact/SuccessMessage';
import { ContactCategoryCards } from '@/components/Contact/ContactCategoryCards';

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("learner");

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (formData: any) => {
        setIsSubmitting(true);

        try {
            const endpoint = activeTab === 'learner'
                ? 'http://localhost:8000/api/v1/eep/contact/learner'
                : 'http://localhost:8000/api/v1/eep/contact/business';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setIsSubmitted(true);
            console.log('Form submitted for:', activeTab);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Here you could add error handling UI
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setIsSubmitted(false);
    };

    const contactInfo = [
        { icon: <Mail className="w-4 h-4" />, title: "Email", content: "info@hitoai.ai" },
        { icon: "Phone", title: "Phone", content: "+353 89 983 2147" },
        { icon: "MapPin", title: "Address", content: "HITOAI Limited Sandyford, Dublin 18 Dublin, Ireland" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
            {/* Background effects components would go here */}
            <BackgroundEffects />

            {/* Content */}
            <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-600 text-xs font-semibold mb-3 border border-indigo-200/50">
                            <Mail className="w-3.5 h-3.5 mr-1.5" />
                            <span>Contact Us</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            Whether you're interested in our learning programs or seeking expert mentorship for your business projects,
                            our team is here to guide you every step of the way.
                        </p>
                    </div>

                    {/* Contact Info Cards */}
                    <ContactInfoCards contactInfo={contactInfo} />

                    {isSubmitted ? (
                        <SuccessMessage onReset={resetForm} />
                    ) : (
                        <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-md">
                            <Tabs defaultValue="learner" className="w-full" onValueChange={(value) => setActiveTab(value)}>
                                <TabsList className="grid w-full grid-cols-2 mb-8">
                                    <TabsTrigger value="learner" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                                        <span className="w-4 h-4 lucide-graduation-cap" /> {/* This will be replaced with the actual icon by ContactTabIcons */}
                                        <span>Prospective Learner</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="business" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                                        <span className="w-4 h-4 lucide-compass" /> {/* This will be replaced with the actual icon by ContactTabIcons */}
                                        <span>Business Partnership</span>
                                    </TabsTrigger>
                                </TabsList>

                                {/* Learner Form */}
                                <TabsContent value="learner">
                                    <LearnerContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                                </TabsContent>

                                {/* Business Form */}
                                <TabsContent value="business">
                                    <BusinessContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                                </TabsContent>
                            </Tabs>
                        </div>
                    )}

                    {/* Additional Contact Cards */}
                    <ContactCategoryCards />
                </div>
            </div>
        </div>
    );
};

// Background Effects Component
const BackgroundEffects = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-72 top-0 opacity-30"
            style={{
                backgroundImage: "radial-gradient(circle at 25% 100%, rgba(79, 70, 229, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)"
            }}>
        </div>

        {/* Professional grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/3 to-violet-500/3 transform rotate-45 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-500/3 to-purple-500/3 transform -rotate-12 rounded-full blur-3xl"></div>
    </div>
);

export default ContactPage;