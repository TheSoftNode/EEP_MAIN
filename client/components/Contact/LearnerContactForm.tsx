import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, MessageSquare, Send, ChevronDown } from 'lucide-react';

interface LearnerContactFormProps {
    onSubmit: (formData: any) => Promise<void>;
    isSubmitting: boolean;
}

export const LearnerContactForm: React.FC<LearnerContactFormProps> = ({ onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        programInterest: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                </div>

                {/* Program Interest */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Program Interest</label>
                    <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            name="programInterest"
                            value={formData.programInterest}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                        >
                            <option value="">Select program</option>
                            <option value="ai-track">AI Development Track</option>
                            <option value="cloud-track">Cloud Computing Track</option>
                            <option value="data-track">Data Science Track</option>
                            <option value="general">General Information</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                        placeholder="Tell us about your career goals and how we can help you achieve them..."
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
    );
};

export default LearnerContactForm;