import React, { useState } from 'react';
import { User, Mail, Building2, Code, Compass, Lightbulb, Send, ChevronDown } from 'lucide-react';

interface BusinessContactFormProps {
    onSubmit: (formData: any) => Promise<void>;
    isSubmitting: boolean;
}

export const BusinessContactForm: React.FC<BusinessContactFormProps> = ({ onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        projectType: '',
        projectStatus: '',
        projectDetails: ''
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
                    <label className="text-sm font-medium text-gray-700">Contact Person</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                            placeholder="Jane Smith"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Business Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                            placeholder="jane@company.com"
                        />
                    </div>
                </div>

                {/* Company */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Company/Organization</label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                            placeholder="Company Inc."
                        />
                    </div>
                </div>

                {/* Project Type */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Project Type</label>
                    <div className="relative">
                        <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                        >
                            <option value="">Select project type</option>
                            <option value="ai-implementation">AI Implementation</option>
                            <option value="cloud-migration">Cloud Migration</option>
                            <option value="data-analytics">Data Analytics Solution</option>
                            <option value="software-development">Software Development</option>
                            <option value="process-automation">Process Automation</option>
                            <option value="other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Current Project Status */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Current Project Status</label>
                <div className="relative">
                    <Compass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                        name="projectStatus"
                        value={formData.projectStatus}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                    >
                        <option value="">Select current status</option>
                        <option value="concept">Concept/Idea Stage</option>
                        <option value="planning">Planning Phase</option>
                        <option value="early-development">Early Development</option>
                        <option value="ongoing">Ongoing Project with Challenges</option>
                        <option value="scaling">Scaling Existing Solution</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Project Details */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Project Details & Mentorship Needs</label>
                <div className="relative">
                    <Lightbulb className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                        name="projectDetails"
                        value={formData.projectDetails}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm"
                        placeholder="Describe your project, current challenges, and how our mentorship could benefit your development process..."
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
                        <Send className="mr-2 h-4 w-4" /> Request Mentorship
                    </>
                )}
            </button>
        </form>
    );
};

export default BusinessContactForm;