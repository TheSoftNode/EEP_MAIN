"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Eye,
    EyeOff,
    Mail,
    User,
    Lock,
    AlertCircle,
    GraduationCap,
    Code,
    ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export interface LearnerFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    background: string;
    interests: string;
    skills: string;
    acceptedTerms: boolean;
}

interface LearnerSignupFormProps {
    formData: LearnerFormData;
    error: string;
    isLoading: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCheckboxChange: (checked: boolean) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export const LearnerSignupForm: React.FC<LearnerSignupFormProps> = ({
    formData,
    error,
    isLoading,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
        >
            <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-indigo-50">
                <CardHeader className="space-y-1">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold">Learner Registration</CardTitle>
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-indigo-600" />
                        </div>
                    </div>
                    <CardDescription>
                        Create your account to start your AI development journey
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center text-sm">
                                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Common registration fields */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-medium">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        className="pl-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email Address <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="pl-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                    Confirm Password <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Learner-specific fields */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Learner Profile</h3>

                            <div className="space-y-2">
                                <Label htmlFor="background" className="text-sm font-medium">
                                    Background/Education <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Textarea
                                        id="background"
                                        name="background"
                                        placeholder="Your educational background and relevant experience"
                                        className="min-h-24 bg-gray-50 border-gray-200 focus:bg-white transition"
                                        value={formData.background}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="interests" className="text-sm font-medium">
                                    AI Interests <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Textarea
                                        id="interests"
                                        name="interests"
                                        placeholder="What areas of AI are you most interested in?"
                                        className="min-h-24 bg-gray-50 border-gray-200 focus:bg-white transition"
                                        value={formData.interests}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="skills" className="text-sm font-medium">
                                    Skills & Technologies
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="skills"
                                        name="skills"
                                        type="text"
                                        placeholder="Python, TensorFlow, PyTorch, NLP, etc."
                                        className="pl-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                    />
                                    <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={formData.acceptedTerms}
                                    onCheckedChange={(checked) => handleCheckboxChange(checked === true)}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I accept the terms and conditions <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-xs text-gray-500">
                                        By creating an account, you agree to our{' '}
                                        <Link href="/terms" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                            Privacy Policy
                                        </Link>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full mt-6 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span>Create Learner Account</span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};
