"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Mail,
    KeyRound,
    ArrowRight,
    AlertCircle,
    CheckCircle,
    ShieldAlert,
    Info
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

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        // Simulated API call
        try {
            // Replace with actual password reset logic
            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsSubmitted(true);

            toast({
                title: "Reset Link Sent",
                description: "Check your email for instructions to reset your password.",
            });
        } catch (error) {
            setError('An error occurred. Please try again later.');
            toast({
                title: "Request Failed",
                description: "We couldn't process your request. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
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
                        Forgot Password
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {isSubmitted
                            ? "We've sent you instructions to reset your password"
                            : "Enter your email and we'll send you a link to reset your password"}
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
                                <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <KeyRound className="h-6 w-6 text-indigo-600" />
                                </div>
                            </div>
                            <CardDescription>
                                {isSubmitted
                                    ? "Please check your email for reset instructions"
                                    : "We'll email you a link to reset your password"}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {isSubmitted ? (
                                <div className="space-y-4">
                                    <Alert className="bg-indigo-50 border-indigo-200">
                                        <CheckCircle className="h-4 w-4 text-indigo-600" />
                                        <AlertTitle className="text-indigo-700 font-medium">Reset Link Sent</AlertTitle>
                                        <AlertDescription className="text-indigo-600">
                                            We've sent an email to <span className="font-medium">{email}</span> with instructions to reset your password.
                                        </AlertDescription>
                                    </Alert>

                                    <div className="mt-4 space-y-4">
                                        <div className="rounded-lg border border-gray-100 p-4">
                                            <div className="flex items-start">
                                                <Info className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                                                <div>
                                                    <h3 className="font-medium text-gray-700">Didn't receive the email?</h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Please check your spam folder. If you still don't see it, you can{' '}
                                                        <button
                                                            onClick={handleSubmit}
                                                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                                                            disabled={isLoading}
                                                        >
                                                            request another link
                                                        </button>.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-gray-100 p-4">
                                            <div className="flex items-start">
                                                <ShieldAlert className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                                                <div>
                                                    <h3 className="font-medium text-gray-700">Security Reminder</h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        The password reset link will expire in 30 minutes for security reasons.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => router.push('/login')}
                                        className="w-full mt-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 py-6 font-medium"
                                    >
                                        Return to Login
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
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            Email Address
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="name@example.com"
                                                className="pl-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        </div>
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
                                                Sending Reset Link...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <span>Send Reset Link</span>
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