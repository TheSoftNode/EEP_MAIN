"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { BusinessFormData, BusinessSignupForm } from '@/components/Auth/BusinessSignupForm';
import { AccountTypeSelection } from '@/components/Auth/AccountTypeSelection';
import { LearnerFormData, LearnerSignupForm } from '@/components/Auth/LearnerSignupForm';




export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [accountType, setAccountType] = useState('');
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Learner form data
    const [learnerFormData, setLearnerFormData] = useState<LearnerFormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        background: '',
        interests: '',
        skills: '',
        acceptedTerms: false
    });

    // Business form data
    const [businessFormData, setBusinessFormData] = useState<BusinessFormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        position: '',
        companySize: '',
        industry: '',
        acceptedTerms: false
    });

    const handleAccountTypeSelect = (type: string) => {
        setAccountType(type);
        setStep(2);
    };

    const handleLearnerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLearnerFormData({
            ...learnerFormData,
            [name]: value
        });
    };

    const handleBusinessInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBusinessFormData({
            ...businessFormData,
            [name]: value
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setBusinessFormData({
            ...businessFormData,
            [name]: value
        });
    };

    const handleLearnerCheckboxChange = (checked: boolean) => {
        setLearnerFormData({
            ...learnerFormData,
            acceptedTerms: checked
        });
    };

    const handleBusinessCheckboxChange = (checked: boolean) => {
        setBusinessFormData({
            ...businessFormData,
            acceptedTerms: checked
        });
    };

    const goBack = () => {
        if (step === 2) {
            setStep(1);
            setAccountType('');
            setError('');
        } else {
            router.push('/auth/login');
        }
    };

    const validateLearnerForm = () => {
        setError('');

        // Basic validation
        if (!learnerFormData.fullName || !learnerFormData.email || !learnerFormData.password || !learnerFormData.confirmPassword) {
            setError('Please fill in all required fields');
            return false;
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(learnerFormData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        if (learnerFormData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        if (learnerFormData.password !== learnerFormData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (!learnerFormData.acceptedTerms) {
            setError('You must accept the terms and conditions');
            return false;
        }

        // Learner-specific validation
        if (!learnerFormData.background || !learnerFormData.interests) {
            setError('Please fill in all learner profile fields');
            return false;
        }

        return true;
    };

    const validateBusinessForm = () => {
        setError('');

        // Basic validation
        if (!businessFormData.fullName || !businessFormData.email || !businessFormData.password || !businessFormData.confirmPassword) {
            setError('Please fill in all required fields');
            return false;
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(businessFormData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        if (businessFormData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        if (businessFormData.password !== businessFormData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (!businessFormData.acceptedTerms) {
            setError('You must accept the terms and conditions');
            return false;
        }

        // Business-specific validation
        if (!businessFormData.companyName || !businessFormData.position || !businessFormData.industry) {
            setError('Please fill in all business profile fields');
            return false;
        }

        return true;
    };

    const handleLearnerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateLearnerForm()) {
            return;
        }

        setIsLoading(true);

        // Simulated API call
        try {
            // Replace with actual registration logic
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast({
                title: "Learner Account Created Successfully",
                description: "Welcome to your AI learning journey!"
            });

            // Redirect to learner onboarding
            router.push('/learner/onboarding');
        } catch (error) {
            setError('Failed to create account. Please try again.');
            toast({
                title: "Signup Failed",
                description: "There was a problem creating your account.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBusinessSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateBusinessForm()) {
            return;
        }

        setIsLoading(true);

        // Simulated API call
        try {
            // Replace with actual registration logic
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast({
                title: "Business Account Created Successfully",
                description: "Your business account has been created successfully!"
            });

            // Redirect to business onboarding
            router.push('/business/onboarding');
        } catch (error) {
            setError('Failed to create account. Please try again.');
            toast({
                title: "Signup Failed",
                description: "There was a problem creating your account.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-white to-indigo-50 flex items-center justify-center pt-14 p-4">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 rounded-bl-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-tr from-indigo-50/50 to-violet-50/50 rounded-tr-[100px]"></div>

                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-violet-100/20 rounded-full blur-3xl"></div>

                {/* Animated elements */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-indigo-300/40 blur-sm"
                        style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.7,
                        }}
                    />
                ))}

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}>
                </div>
            </div>

            <div className="container max-w-6xl mx-auto z-10">
                <Button
                    onClick={goBack}
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-800 mb-6 transition-colors -ml-2 mt-3"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    <span>{step === 1 ? 'Back to Login' : 'Back to Account Selection'}</span>
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-700 via-violet-700 to-indigo-700 text-transparent bg-clip-text">
                        {step === 1 ? 'Create Your EEP Account' : accountType === 'learner' ? 'Learner Signup' : 'Business Signup'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {step === 1
                            ? 'Join the Enterprise Empowerment Platform and transform your AI journey'
                            : accountType === 'learner'
                                ? 'Set up your profile and start your AI learning journey'
                                : 'Connect with AI talent and enhance your business'}
                    </p>
                </motion.div>

                {/* Step 1: Choose account type */}
                {step === 1 && (
                    <AccountTypeSelection onSelectAccountType={handleAccountTypeSelect} />
                )}

                {/* Step 2: Registration form based on account type */}
                {step === 2 && accountType === 'learner' && (
                    <LearnerSignupForm
                        formData={learnerFormData}
                        error={error}
                        isLoading={isLoading}
                        handleInputChange={handleLearnerInputChange}
                        handleCheckboxChange={handleLearnerCheckboxChange}
                        handleSubmit={handleLearnerSubmit}
                    />
                )}

                {step === 2 && accountType === 'business' && (
                    <BusinessSignupForm
                        formData={businessFormData}
                        error={error}
                        isLoading={isLoading}
                        handleInputChange={handleBusinessInputChange}
                        handleSelectChange={handleSelectChange}
                        handleCheckboxChange={handleBusinessCheckboxChange}
                        handleSubmit={handleBusinessSubmit}
                    />
                )}

                {/* Footer information */}
                <motion.div
                    className="mt-8 text-center text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <p>
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}