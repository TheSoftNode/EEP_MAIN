"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Eye,
    EyeOff,
    Lock,
    ArrowRight,
    AlertCircle,
    CheckCircle,
    ShieldCheck
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';

// This component is for the actual password reset page after a user clicks the link from their email
export default function ResetPasswordPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Password strength indicators
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordFeedback, setPasswordFeedback] = useState('');

    // Calculate password strength
    const checkPasswordStrength = (password: string) => {
        if (!password) {
            setPasswordStrength(0);
            setPasswordFeedback('');
            return;
        }

        let strength = 0;
        let feedback = '';

        // Length check
        if (password.length >= 8) {
            strength += 1;
        }

        // Contains uppercase
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }

        // Contains lowercase
        if (/[a-z]/.test(password)) {
            strength += 1;
        }

        // Contains number
        if (/[0-9]/.test(password)) {
            strength += 1;
        }

        // Contains special character
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        }

        // Set feedback based on strength
        if (strength < 2) {
            feedback = 'Weak password';
        } else if (strength < 4) {
            feedback = 'Moderate password';
        } else {
            feedback = 'Strong password';
        }

        setPasswordStrength(strength);
        setPasswordFeedback(feedback);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!password || !confirmPassword) {
            setError('Please enter both password fields');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (passwordStrength < 3) {
            setError('Please use a stronger password with a mix of letters, numbers, and special characters');
            return;
        }

        setIsLoading(true);

        // Simulated API call
        try {
            // Replace with actual password reset logic
            // In a real implementation, you would use a token from the URL params
            // For example: const { token } = router.query;
            const token = "dummy-token"; // Example only

            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsSuccess(true);

            toast({
                title: "Password Reset Successfully",
                description: "Your password has been reset. You can now log in with your new password.",
            });
        } catch (error) {
            setError('Failed to reset password. This link may have expired. Please request a new reset link.');
            toast({
                title: "Reset Failed",
                description: "We couldn't reset your password. Please try again or request a new link.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Get the strength color
    const getStrengthColor = () => {
        if (passwordStrength < 2) return 'bg-red-500';
        if (passwordStrength < 4) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    // Get the strength text color
    const getStrengthTextColor = () => {
        if (passwordStrength < 2) return 'text-red-700';
        if (passwordStrength < 4) return 'text-yellow-700';
        return 'text-green-700';
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-white to-indigo-50 flex items-center justify-center p-4">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-96 bg-indigo-50/80 rounded-br-[100px]"></div>
                <div className="absolute bottom-0 right-0 w-full h-96 bg-indigo-50/80 rounded-tl-[100px]"></div>

                <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-200/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-violet-200/30 rounded-full blur-xl"></div>

                <motion.div
                    className="absolute w-8 h-8 rounded-full bg-indigo-300/30 blur-sm"
                    animate={{
                        x: [0, 300, 0],
                        y: [0, 200, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ top: '30%', left: '10%' }}
                />

                <motion.div
                    className="absolute w-6 h-6 rounded-full bg-violet-300/30 blur-sm"
                    animate={{
                        x: [0, -200, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ top: '60%', right: '15%' }}
                />
            </div>

            <div className="container max-w-md mx-auto z-10">
                <Button
                    onClick={() => router.push('/login')}
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-800 mb-6 transition-colors -ml-2"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    <span>Back to Login</span>
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-700 via-violet-700 to-indigo-700 text-transparent bg-clip-text">
                        {isSuccess ? 'Password Reset Complete' : 'Create New Password'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {isSuccess
                            ? "Your password has been reset successfully"
                            : "Please enter a strong, secure password for your account"}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-indigo-50">
                        <CardHeader className="space-y-1">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-2xl font-bold">{isSuccess ? 'Success' : 'New Password'}</CardTitle>
                                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                    {isSuccess ? (
                                        <CheckCircle className="h-6 w-6 text-indigo-600" />
                                    ) : (
                                        <Lock className="h-6 w-6 text-indigo-600" />
                                    )}
                                </div>
                            </div>
                            <CardDescription>
                                {isSuccess
                                    ? "You can now log in with your new password"
                                    : "Create a secure password you'll remember"}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {isSuccess ? (
                                <div className="space-y-4">
                                    <Alert className="bg-green-50 border-green-200">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <AlertTitle className="text-green-700 font-medium">Password Reset Complete</AlertTitle>
                                        <AlertDescription className="text-green-600">
                                            Your password has been successfully reset. You can now login with your new credentials.
                                        </AlertDescription>
                                    </Alert>

                                    <div className="rounded-lg border border-gray-100 p-4 mt-4">
                                        <div className="flex items-start">
                                            <ShieldCheck className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                                            <div>
                                                <h3 className="font-medium text-gray-700">Security Tip</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    For added security, make sure to use different passwords for your other accounts and enable two-factor authentication.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => router.push('/login')}
                                        className="w-full py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium mt-4"
                                    >
                                        <div className="flex items-center justify-center">
                                            <span>Continue to Login</span>
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center text-sm">
                                            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium">
                                            New Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="pl-10 pr-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                                value={password}
                                                onChange={handlePasswordChange}
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

                                        {/* Password strength meter */}
                                        {password && (
                                            <div className="mt-1">
                                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${getStrengthColor()} transition-all duration-300`}
                                                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <p className={`text-xs mt-1 ${getStrengthTextColor()}`}>
                                                    {passwordFeedback}
                                                </p>
                                                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                                                    <li className="flex items-center">
                                                        <div className={`w-1 h-1 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div>
                                                        At least 8 characters
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className={`w-1 h-1 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div>
                                                        Contains uppercase letter
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className={`w-1 h-1 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div>
                                                        Contains number
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className={`w-1 h-1 rounded-full ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div>
                                                        Contains special character
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                            Confirm Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="pl-10 pr-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
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

                                        {/* Password match indicator */}
                                        {confirmPassword && (
                                            <p className={`text-xs mt-1 ${confirmPassword === password
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                                }`}>
                                                {confirmPassword === password
                                                    ? 'Passwords match'
                                                    : 'Passwords do not match'}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Setting New Password...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <span>Reset Password</span>
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col justify-center py-4 px-6 bg-gray-50 rounded-b-xl border-t border-gray-100">
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Remember your password?{' '}
                                    <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                        Back to Login
                                    </Link>
                                </p>
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}