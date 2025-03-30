"use client"

import React, { useState } from 'react';
import {
    UploadCloud,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    FileIcon,
    X,
    User,
    Mail,
    Phone,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from 'next/navigation';
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
    interests: string;
    cv: File | null;
    acceptedTerms: boolean;
    acceptedPayment: boolean;
    acceptedHiringPolicy: boolean;
}

export const LearnerApplicationForm: React.FC = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        interests: '',
        cv: null,
        acceptedTerms: false,
        acceptedPayment: false,
        acceptedHiringPolicy: false
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const router = useRouter()

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

        if (!formData.cv) {
            newErrors.cv = 'CV is required';
        }

        if (!formData.acceptedTerms) {
            newErrors.acceptedTerms = 'You must accept the terms and conditions';
        }

        if (!formData.acceptedPayment) {
            newErrors.acceptedPayment = 'You must acknowledge the payment terms';
        }

        if (!formData.acceptedHiringPolicy) {
            newErrors.acceptedHiringPolicy = 'You must acknowledge the assessment and hiring policy';
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
        formDataToSend.append("interests", formData.interests);
        if (formData.cv) {
            formDataToSend.append("cv", formData.cv);
        }
        formDataToSend.append("acceptedTerms", formData.acceptedTerms.toString());
        formDataToSend.append("acceptedPayment", formData.acceptedPayment.toString());
        formDataToSend.append("acceptedHiringPolicy", formData.acceptedHiringPolicy.toString());

        setIsSubmitting(true);
        try {
            // Simulated API call
            // const response = await fetch('https://hitoai-backend.onrender.com/api/v1/eep/apply', {
            //     method: 'POST',
            //     body: formDataToSend
            // });
            const response = await fetch('http://localhost:8000/api/v1/eep/apply', {
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
                description: "We'll review your application and get back to you soon.",
            });

            router.push("/application-status")

            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                interests: '',
                cv: null,
                acceptedTerms: false,
                acceptedPayment: false,
                acceptedHiringPolicy: false
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    cv: 'File size should not exceed 5MB'
                }));
                return;
            }

            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    cv: 'Please upload a PDF or Word document'
                }));
                return;
            }

            setFormData(prev => ({ ...prev, cv: file }));
            setErrors(prev => ({ ...prev, cv: undefined }));
        }
    };

    const removeFile = () => {
        setFormData(prev => ({ ...prev, cv: null }));
    };

    return (
        <Card className="border-2 border-indigo-200 bg-white shadow-2xl relative overflow-hidden">
            {/* Top gradient border */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>

            {/* Subtle background accents */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
            </div>

            <CardHeader className="pb-8 text-center space-y-4 relative z-10">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                    Apply Now
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                    Start your journey towards becoming an AI and cloud technology expert
                </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
                    {/* Input fields with icons */}
                    <div className="space-y-6">
                        <div className="relative">
                            <Label htmlFor="fullName" className="text-sm font-medium mb-2 block text-gray-700">
                                Full Name
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
                                Email Address
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
                                    placeholder="Enter your email address"
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

                        {/* Interests Textarea */}
                        <div className="relative">
                            <Label htmlFor="interests" className="text-sm font-medium mb-2 block text-gray-700">
                                Your Interests
                            </Label>
                            <div className="relative">
                                <textarea
                                    id="interests"
                                    value={formData.interests}
                                    onChange={(e) => {
                                        setFormData(prev => ({ ...prev, interests: e.target.value }));
                                        setErrors(prev => ({ ...prev, interests: undefined }));
                                    }}
                                    className={`w-full min-h-[120px] p-4 rounded-md border ${errors.interests ? "border-red-500" : "border-indigo-200"
                                        } focus:border-indigo-500 resize-none bg-white`}
                                    placeholder="Tell us about your interests and what you hope to achieve..."
                                />
                            </div>
                            {errors.interests && (
                                <p className="text-sm text-red-500 mt-1">{errors.interests}</p>
                            )}
                        </div>

                        {/* CV Upload Section */}
                        <div className="space-y-2">
                            <Label htmlFor="cv" className="text-gray-700">Upload CV</Label>
                            {!formData.cv ? (
                                <div className="flex items-center justify-center w-full">
                                    <Label
                                        htmlFor="cv"
                                        className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-md tracking-wide uppercase border-2 border-indigo-300 cursor-pointer hover:bg-indigo-50 transition-colors"
                                    >
                                        <UploadCloud className="w-8 h-8 text-indigo-500" />
                                        <span className="mt-2 text-[0.8rem] sm:text-base leading-normal text-indigo-600 font-medium">Select a file</span>
                                        <span className="text-[0.7rem] sm:text-sm text-gray-500 mt-1">PDF or Word document, max 5MB</span>
                                        <Input
                                            id="cv"
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                        />
                                    </Label>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-4 border-2 border-indigo-200 bg-indigo-50 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <FileIcon className="h-4 w-4 sm:w-6 sm:h-6 text-indigo-500" />
                                        <span className="text-[0.7rem] sm:text-sm font-medium text-gray-700">{formData.cv.name}</span>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={removeFile}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                            {errors.cv && (
                                <p className="text-sm text-red-500 mt-1">{errors.cv}</p>
                            )}
                        </div>
                    </div>

                    {/* Application Agreement Form */}
                    <div className="space-y-6 border-2 border-indigo-200 rounded-lg p-6 bg-indigo-50/50">
                        <h3 className="text-xl font-bold text-indigo-900">Application Agreement Form</h3>

                        {/* 1. Terms and Conditions Agreement */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-indigo-800">1. Terms and Conditions Agreement</h4>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center h-5">
                                    <Checkbox
                                        id="terms"
                                        checked={formData.acceptedTerms}
                                        onCheckedChange={(checked: boolean) => {
                                            setFormData(prev => ({ ...prev, acceptedTerms: checked }));
                                            setErrors(prev => ({ ...prev, acceptedTerms: undefined }));
                                        }}
                                        className="h-4 w-4 border-2 border-indigo-300"
                                    />
                                </div>
                                <div className="flex items-baseline space-x-2">
                                    <Label htmlFor="terms" className="text-sm text-gray-700">I accept the terms and conditions of HitoAI Limited.</Label>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="link" className="p-0 h-auto font-normal text-indigo-600 text-sm">
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

                        {/* 2. Program Cost & Payment Agreement */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-indigo-800">2. Program Cost & Payment Agreement</h4>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center h-5">
                                    <Checkbox
                                        id="payment"
                                        checked={formData.acceptedPayment}
                                        onCheckedChange={(checked: boolean) => {
                                            setFormData(prev => ({ ...prev, acceptedPayment: checked }));
                                            setErrors(prev => ({ ...prev, acceptedPayment: undefined }));
                                        }}
                                        className="h-4 w-4 border-2 border-indigo-300"
                                    />
                                </div>
                                <Label htmlFor="payment" className="text-sm text-gray-700">
                                    I am aware that upon acceptance of the offer, the cost of the 3-month program is €700, which must be paid by April 1st.
                                </Label>
                            </div>
                            {errors.acceptedPayment && (
                                <p className="text-sm text-red-500">{errors.acceptedPayment}</p>
                            )}
                        </div>

                        {/* 3. Assessment and Hiring Policy */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-indigo-800">3. Assessment and Hiring Policy</h4>
                            <div className="flex items-start space-x-2">
                                <div className="flex items-center h-5 mt-1">
                                    <Checkbox
                                        id="hiringPolicy"
                                        checked={formData.acceptedHiringPolicy}
                                        onCheckedChange={(checked: boolean) => {
                                            setFormData(prev => ({ ...prev, acceptedHiringPolicy: checked }));
                                            setErrors(prev => ({ ...prev, acceptedHiringPolicy: undefined }));
                                        }}
                                        className="h-4 w-4 border-2 border-indigo-300"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="hiringPolicy" className="text-sm text-gray-700">
                                        I acknowledge that applicants will be evaluated based on their assessment scores, and the outcomes are as follows:
                                    </Label>
                                    <ul className="mt-2 ml-6 text-sm text-gray-700 list-disc space-y-1">
                                        <li><span className="font-semibold text-indigo-800">90% or higher:</span> Direct hiring by HitoAI Limited or its industry partners.</li>
                                        <li><span className="font-semibold text-indigo-800">80% - 90%:</span> Certificate of Achievement and job support through HitoAI's network.</li>
                                        <li><span className="font-semibold text-indigo-800">70% - 80%:</span> Eligible for an internship upon a written request.</li>
                                    </ul>
                                </div>
                            </div>
                            {errors.acceptedHiringPolicy && (
                                <p className="text-sm text-red-500">{errors.acceptedHiringPolicy}</p>
                            )}
                        </div>

                        {/* 4. Declaration & Signature */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-indigo-800">4. Declaration & Signature</h4>
                            <p className="text-sm text-gray-700">
                                By submitting this form, I confirm that I have read, understood, and agreed to the terms stated above.
                            </p>
                        </div>
                    </div>

                    <Alert className="bg-amber-50 text-amber-900 border-2 border-amber-200">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800 font-semibold">Program Cost</AlertTitle>
                        <AlertDescription className="text-amber-700">
                            €700 - Please do not make any payment until your application has been approved.
                        </AlertDescription>
                    </Alert>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-lg shadow-lg transition-all duration-300"
                            disabled={isSubmitting || !formData.acceptedTerms || !formData.acceptedPayment || !formData.acceptedHiringPolicy}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Application
                                    <CheckCircle2 className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default LearnerApplicationForm;