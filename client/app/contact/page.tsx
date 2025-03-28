"use client"

import React, { useState, useEffect } from 'react';
import { Building2, Mail, MessageSquare, User, Briefcase, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            console.log('Form submitted');
        }, 1500);
    };

    const contactInfo = [
        { icon: <Mail className="w-4 h-4" />, title: "Email", content: "info@hitoai.com" },
        { icon: <Phone className="w-4 h-4" />, title: "Phone", content: "+353 89 983 2147" },
        { icon: <MapPin className="w-4 h-4" />, title: "Address", content: "HITOAI Limited Sandyford, Dublin 18 Dublin, Ireland" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
            {/* Background effects - lighter and more subtle */}
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
                    }}
                ></div>

                {/* Subtle decorative elements */}
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/3 to-violet-500/3 transform rotate-45 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-500/3 to-purple-500/3 transform -rotate-12 rounded-full blur-3xl"></div>
            </div>

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
                            Have questions about the Enterprise Empowerment Platform? Our team is here to help you
                            transform your business and accelerate your innovation journey.
                        </p>
                    </div>

                    {/* Contact Info Cards - More compact */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {contactInfo.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center flex-1 min-w-[180px] max-w-[240px] transition-all hover:shadow-md hover:border-indigo-100">
                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 mb-2">
                                    {item.icon}
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                                <p className="text-gray-600 text-xs sm:text-sm">{item.content}</p>
                            </div>
                        ))}
                    </div>

                    {isSubmitted ? (
                        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-md text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                            <p className="text-gray-600 mb-4">Thank you for reaching out. Our team will get back to you shortly.</p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition-colors"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-md">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Name */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Company Name</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                                                placeholder="Company Inc."
                                            />
                                        </div>
                                    </div>

                                    {/* Industry */}
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Industry</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <select
                                                required
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                                            >
                                                <option value="">Select industry</option>
                                                <option value="technology">Technology</option>
                                                <option value="healthcare">Healthcare</option>
                                                <option value="finance">Finance</option>
                                                <option value="education">Education</option>
                                                <option value="retail">Retail</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                                            placeholder="How can the Enterprise Empowerment Platform help with your business needs?"
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg text-white font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center justify-center text-sm"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;