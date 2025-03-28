"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Eye,
    EyeOff,
    Mail,
    User,
    Building,
    Lock,
    AlertCircle,
    Briefcase,
    Globe,
    ArrowRight,
    Users
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface BusinessFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
    position: string;
    companySize: string;
    industry: string;
    acceptedTerms: boolean;
}

interface BusinessSignupFormProps {
    formData: BusinessFormData;
    error: string;
    isLoading: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    handleCheckboxChange: (checked: boolean) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export const BusinessSignupForm: React.FC<BusinessSignupFormProps> = ({
    formData,
    error,
    isLoading,
    handleInputChange,
    handleSelectChange,
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
                        <CardTitle className="text-2xl font-bold">Business Registration</CardTitle>
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Building className="h-6 w-6 text-indigo-600" />
                        </div>
                    </div>
                    <CardDescription>
                        Register your business to connect with AI talent
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

                        {/* Business-specific fields */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-medium border-b border-gray-200 pb-2">Business Information</h3>

                            <div className="space-y-2">
                                <Label htmlFor="companyName" className="text-sm font-medium">
                                    Company Name <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        placeholder="Your company name"
                                        className="pl-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="position" className="text-sm font-medium">
                                        Your Position <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="position"
                                            name="position"
                                            type="text"
                                            placeholder="CEO, CTO, HR Manager, etc."
                                            className="pl-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="companySize" className="text-sm font-medium">
                                        Company Size
                                    </Label>
                                    <div className="relative">
                                        <Select
                                            value={formData.companySize}
                                            onValueChange={(value) => handleSelectChange('companySize', value)}
                                        >
                                            <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white transition pl-10 py-6 h-auto">
                                                <SelectValue placeholder="Select company size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                                <SelectItem value="11-50">11-50 employees</SelectItem>
                                                <SelectItem value="51-200">51-200 employees</SelectItem>
                                                <SelectItem value="201-500">201-500 employees</SelectItem>
                                                <SelectItem value="500+">500+ employees</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="industry" className="text-sm font-medium">
                                    Industry <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="industry"
                                        name="industry"
                                        type="text"
                                        placeholder="Healthcare, Finance, Technology, etc."
                                        className="pl-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                        value={formData.industry}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                                    <span>Create Business Account</span>
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
