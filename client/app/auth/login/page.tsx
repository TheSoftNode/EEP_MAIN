"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    LogIn,
    Mail,
    Eye,
    EyeOff,
    Github,
    Linkedin,
    Fingerprint,
    Lock,
    ArrowRight,
    AlertCircle
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
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);

        // Simulated API call
        try {
            // Replace with actual authentication logic
            setTimeout(() => {
                // Simulate login success
                toast({
                    title: "Login Successful",
                    description: "Welcome back to the Enterprise Empowerment Platform!",
                });
                router.push('/dashboard');
            }, 1500);
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            toast({
                title: "Login Failed",
                description: "Please check your credentials and try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-white to-indigo-50 flex items-center justify-center pt-20  p-4">
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

            <div className="container max-w-6xl mx-auto z-10">
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    {/* Left panel - branding and information */}
                    <div className="flex-1 max-w-md mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center lg:text-left"
                        >
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold mb-2 tracking-tight bg-gradient-to-r from-indigo-700 via-violet-700 to-indigo-700 text-transparent bg-clip-text">
                                    Enterprise Empowerment Platform
                                </h1>
                                <p className="text-gray-600">
                                    Access your AI development workspace and collaboration tools
                                </p>
                            </div>

                            <div className="hidden lg:block">
                                <div className="bg-gradient-to-br from-indigo-100 to-white p-6 rounded-2xl shadow-sm border border-indigo-50 mb-8">
                                    <h3 className="font-medium text-indigo-800 mb-2">Why Join EEP?</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="mr-3 mt-1 bg-indigo-100 rounded-full p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-600">Access advanced AI tools and development environments</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="mr-3 mt-1 bg-indigo-100 rounded-full p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-600">Connect with businesses looking for AI talent</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="mr-3 mt-1 bg-indigo-100 rounded-full p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-600">Collaborate with experts and accelerate your learning</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 hidden lg:block">
                                New to our platform? <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">Create an account</Link>
                            </p>
                        </motion.div>
                    </div>

                    {/* Right panel - login form */}
                    <div className="flex-1 w-full max-w-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-indigo-50">
                                <CardHeader className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <LogIn className="h-6 w-6 text-indigo-600" />
                                        </div>
                                    </div>
                                    <CardDescription>
                                        Enter your credentials to access your account
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleLogin} className="space-y-4">
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
                                                />
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label htmlFor="password" className="text-sm font-medium">
                                                    Password
                                                </Label>
                                                <Link href="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-800">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="pl-10 pr-10 py-6 bg-gray-50 border-gray-200 focus:bg-white transition"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
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

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                checked={rememberMe}
                                                onCheckedChange={(checked) => setRememberMe(checked === true)}
                                            />
                                            <label
                                                htmlFor="remember"
                                                className="text-sm text-gray-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Remember me for 30 days
                                            </label>
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
                                                    Signing in...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <span>Sign in</span>
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </div>
                                            )}
                                        </Button>

                                        <div className="relative my-4">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-gray-200"></span>
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                                            >
                                                <Github className="mr-2 h-4 w-4" />
                                                GitHub
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                                            >
                                                <Linkedin className="mr-2 h-4 w-4" />
                                                LinkedIn
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex flex-col sm:flex-row justify-center sm:justify-between py-4 px-6 bg-gray-50 rounded-b-xl border-t border-gray-100">
                                    <div className="flex items-center mb-4 sm:mb-0">
                                        <Fingerprint className="h-5 w-5 text-indigo-600 mr-2" />
                                        <span className="text-xs text-gray-500">Secure login with 2FA available</span>
                                    </div>
                                    <div className="text-center sm:text-right">
                                        <p className="text-sm text-gray-600 block lg:hidden">
                                            New to our platform? <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">Sign up</Link>
                                        </p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}