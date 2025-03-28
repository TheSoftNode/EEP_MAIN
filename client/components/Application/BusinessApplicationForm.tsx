"use client"

import React, { useState } from 'react';
import {
    Building,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    User,
    Mail,
    Phone,
    Briefcase,
    Users,
    Globe,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import TermsAndConditions from '../utils/TermsAndConditions';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    companyName: string;
    position: string;
    companySize: string;
    industry: string;
    requirements: string;
    acceptedTerms: boolean;
}

export const BusinessApplicationForm: React.FC = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        position: '',
        companySize: '',
        industry: '',
        requirements: '',
        acceptedTerms: false
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (!formData.position.trim()) {
            newErrors.position = 'Position is required';
        }

        if (!formData.industry.trim()) {
            newErrors.industry = 'Industry is required';
        }

        if (!formData.acceptedTerms) {
            newErrors.acceptedTerms = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast({
                title: "Validation Error",
                description: "Please check all required fields",
                variant: "destructive"
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("companyName", formData.companyName);
        formDataToSend.append("position", formData.position);
        formDataToSend.append("companySize", formData.companySize);
        formDataToSend.append("industry", formData.industry);
        formDataToSend.append("requirements", formData.requirements);
        formDataToSend.append("acceptedTerms", formData.acceptedTerms.toString());

        setIsSubmitting(true);
        try {
            // Simulated API call
            const response = await fetch('https://hitoai-backend.onrender.com/api/v1/eep/business/apply', {
                method: 'POST',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            toast({
                title: "Application Submitted",
                description: "We'll review your business needs and get back to you soon.",
            });
            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                companyName: '',
                position: '',
                companySize: '',
                industry: '',
                requirements: '',
                acceptedTerms: false
            });
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "Please try again later",
                variant: "destructive"
            });
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="border-2 border-indigo-200 bg-white shadow-2xl relative overflow-hidden">
            {/* Top gradient border */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-500"></div>

            {/* Subtle background accents */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-100 rounded-full opacity-50 blur-3xl"></div>
            </div>

            <CardHeader className="pb-8 text-center space-y-4 relative z-10">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
                    Business Partnership
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                    Connect with skilled AI developers and find talent for your business needs
                </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-indigo-900 border-b border-indigo-200 pb-2">Contact Information</h3>
                        <div className="relative">
                            <Label htmlFor="fullName" className="text-sm font-medium mb-2 block text-gray-700">
                                Contact Person's Full Name
                            </Label>
                            <div className="relative">
                                <Input
                                    id="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, fullName: e.target.value }));
                                        setErrors(prev => ({ ...prev, fullName: undefined }));
                                    }}
                                    className={`pl-12 py-6 ${errors.fullName ? "border-red-500" : "border-indigo-200"} focus:border-indigo-500 bg-white`}
                                    placeholder="Enter your full name"
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                            </div>
                            {errors.fullName && (
                                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        <div className="relative">
                            <Label htmlFor="email" className="text-sm font-medium mb-2 block text-gray-700">
                                Business Email
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, email: e.target.value }));
                                        setErrors(prev => ({ ...prev, email: undefined }));
                                    }}
                                    className={`pl-12 py-6 ${errors.email ? "border-red-500" : "border-indigo-200"} focus:border-indigo-500 bg-white`}
                                    placeholder="Enter your business email"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="relative">
                            <Label htmlFor="phone" className="text-sm font-medium mb-2 block text-gray-700">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, phone: e.target.value }));
                                        setErrors(prev => ({ ...prev, phone: undefined }));
                                    }}
                                    className={`pl-12 py-6 ${errors.phone ? "border-red-500" : "border-indigo-200"} focus:border-indigo-500 bg-white`}
                                    placeholder="Enter your phone number"
                                />
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                            </div>
                            {errors.phone && (
                                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                            )}
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-indigo-900 border-b border-indigo-200 pb-2">Company Information</h3>
                        <div className="relative">
                            <Label htmlFor="companyName" className="text-sm font-medium mb-2 block text-gray-700">
                                Company Name
                            </Label>
                            <div className="relative">
                                <Input
                                    id="companyName"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, companyName: e.target.value }));
                                        setErrors(prev => ({ ...prev, companyName: undefined }));
                                    }}
                                    className={`pl-12 py-6 ${errors.companyName ? "border-red-500" : "border-indigo-200"} focus:border-indigo-500 bg-white`}
                                    placeholder="Enter your company name"
                                />
                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                            </div>
                            {errors.companyName && (
                                <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
                            )}
                        </div>

                        <div className="relative">
                            <Label htmlFor="position" className="text-sm font-medium mb-2 block text-gray-700">
                                Your Position
                            </Label>
                            <div className="relative">
                                <Input
                                    id="position"
                                    type="text"
                                    value={formData.position}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, position: e.target.value }));
                                        setErrors(prev => ({ ...prev, position: undefined }));
                                    }}
                                    className={`pl-12 py-6 ${errors.position ? "border-red-500" : "border-indigo-200"} focus:border-indigo-500 bg-white`}
                                    placeholder="Enter your position"
                                />
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                            </div>
                            {errors.position && (
                                <p className="text-sm text-red-500 mt-1">{errors.position}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Label htmlFor="companySize" className="text-sm font-medium mb-2 block text-gray-700">
                                    Company Size
                                </Label>
                                <div className="relative">
                                    <select
                                        id="companySize"
                                        value={formData.companySize}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, companySize: e.target.value }));
                                            setErrors(prev => ({ ...prev, companySize: undefined }));
                                        }}
                                        className={`w-full pl-12 py-6 border rounded-md appearance-none ${errors.companySize ? "border-red-500" : "border-indigo-200"} focus:border-indigo-500 bg-white`}
                                    >
                                        <option value="">Select company size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-500">201-500 employees</option>
                                        <option value="500+">500+ employees</option>
                                    </select>
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                                </div>
                                {errors.companySize && (
                                    <p className="text-sm text-red-500 mt-1">{errors.companySize}</p>
                                )}
                            </div>

                            <div className="relative">
                                <Label htmlFor="industry" className="text-sm font-medium mb-2 block text-gray-700">
                                    Industry
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="industry"
                                        type="text"
                                        value={formData.industry}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, industry: e.target.value }));
                                            setErrors(prev => ({ ...prev, industry: undefined }));
                                        }}
                                        className={`pl-12 py-6 ${errors.industry ? "border-red-500" : "border-indigo-200"} focus:border-indigo-500 bg-white`}
                                        placeholder="Enter your industry"
                                    />
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                                </div>
                                {errors.industry && (
                                    <p className="text-sm text-red-500 mt-1">{errors.industry}</p>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <Label htmlFor="requirements" className="text-sm font-medium mb-2 block text-gray-700">
                                Business Requirements
                            </Label>
                            <div className="relative">
                                <textarea
                                    id="requirements"
                                    value={formData.requirements}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, requirements: e.target.value }));
                                        setErrors(prev => ({ ...prev, requirements: undefined }));
                                    }}
                                    className={`w-full p-4 rounded-lg border ${errors.requirements ? "border-red-500" : "border-indigo-200"} focus:border-indigo-500 bg-white`}
                                    placeholder="Describe your business requirements"
                                    rows={4}
                                />
                            </div>
                            {errors.requirements && (
                                <p className="text-sm text-red-500 mt-1">{errors.requirements}</p>
                            )}
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">1. Terms and Conditions Agreement</h4>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={formData.acceptedTerms}
                                onCheckedChange={(checked: boolean) => {
                                    setFormData(prev => ({ ...prev, acceptedTerms: checked }));
                                    setErrors(prev => ({ ...prev, acceptedTerms: undefined }));
                                }}
                            />
                            <div className="flex items-baseline space-x-2">
                                <Label htmlFor="terms" className="text-sm">I accept the terms and conditions of HitoAI Limited.</Label>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="link" className="p-0 h-auto font-normal text-blue-500 text-sm">
                                            (Review Terms)
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>Terms and Conditions</DialogTitle>
                                            <DialogDescription>
                                                Please read these terms carefully before applying
                                            </DialogDescription>
                                        </DialogHeader>
                                        <TermsAndConditions />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        {errors.acceptedTerms && (
                            <p className="text-sm text-red-500">{errors.acceptedTerms}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 rounded-lg transition-all duration-300"
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin mr-2" size={20} />
                            ) : (
                                <CheckCircle2 className="mr-2" size={20} />
                            )}
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};