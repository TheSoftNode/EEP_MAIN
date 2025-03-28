"use client"

import React, { useEffect, useState, FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Code, ArrowRight, Bell, CheckCircle } from 'lucide-react';

interface ComingSoonSectionProps {
    title?: string;
    description?: string;
    launchDateString?: string;
    features?: string[];
    showCountdown?: boolean;
    showSubscribe?: boolean;
    badgeText?: string;
}

const ComingSoonSection: FC<ComingSoonSectionProps> = ({
    title = "Coming Soon",
    description = "We're working hard to bring you this feature. Our team is developing something amazing that will transform your development experience.",
    launchDateString = "2025-04-30T00:00:00",
    features = [
        "AI-powered workspace & project guidance",
        "Interactive milestone tracking",
        "Real-time mentor interaction",
        "Step-by-step development assistance"
    ],
    showCountdown = true,
    showSubscribe = true,
    badgeText = "Under Development"
}) => {
    const [email, setEmail] = useState<string>('');
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    /// Parse the launch date from the string
    const launchDateValue = new Date(launchDateString).getTime();

    useEffect(() => {
        const calculateTimeLeft = (): void => {
            const now = new Date().getTime();
            const difference = launchDateValue - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        // Initial calculation
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [launchDateValue]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            // Here you would typically handle the email subscription
            console.log('Subscribing email:', email);
        }
    };

    return (
        <div className="relative  py-20 flex flex-col items-center justify-center overflow-hidden bg-slate-100/80">
            {/* Sophisticated background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/20 via-slate-200/30 to-slate-100/20"></div>

                {/* Glass morphism effect */}
                <div className="absolute inset-0 backdrop-blur-[100px]"></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                {/* Wave patterns */}
                <svg className="absolute w-full" style={{ top: '10%' }} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgba(79, 70, 229, 0.03)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,186.7C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                {/* Geometric elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 transform rotate-45 rounded-lg blur-xl"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 transform -rotate-12 rounded-full blur-xl"></div>

                    <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white/20 rounded-full shadow-[inset_10px_-10px_30px_rgba(255,255,255,0.2)] backdrop-blur-sm border border-white/10"></div>
                    <div className="absolute bottom-1/4 right-1/5 w-12 h-12 bg-white/10 rounded-full shadow-[inset_10px_-10px_20px_rgba(255,255,255,0.15)] backdrop-blur-sm border border-white/10"></div>

                    <div className="absolute top-40 left-1/3 w-64 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent rotate-[30deg]"></div>
                    <div className="absolute bottom-40 right-1/3 w-72 h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent -rotate-[20deg]"></div>
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 px-4 w-full max-w-3xl mx-auto">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-50 p-6 sm:p-8">
                    {/* Heading with status badge */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-600 text-xs font-semibold mb-3 border border-indigo-200/50">
                            <Code className="w-3.5 h-3.5 mr-1.5" />
                            <span>{badgeText}</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {title.split(' ').map((word, i, arr) =>
                                i === arr.length - 1 ?
                                    <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{word}</span> :
                                    <span key={i}>{word + ' '}</span>
                            )}
                        </h1>

                        <p className="text-sm text-gray-600 max-w-lg mx-auto">
                            {description}
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    {showCountdown && (
                        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-8">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Minutes', value: timeLeft.minutes },
                                { label: 'Seconds', value: timeLeft.seconds }
                            ].map((item, index) => (
                                <div key={index} className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg p-2 sm:p-3 text-center border border-indigo-100/40">
                                    <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                        {String(item.value).padStart(2, '0')}
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Feature Highlights */}
                    {features.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">What to expect:</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-start p-2 bg-white/50 rounded-lg border border-gray-100">
                                        <div className="flex-shrink-0 p-0.5 rounded-full bg-gradient-to-br from-indigo-200 to-violet-200 mr-2">
                                            <div className="flex items-center justify-center h-3.5 w-3.5 rounded-full text-white bg-gradient-to-br from-indigo-600 to-violet-600">
                                                <CheckCircle className="h-2.5 w-2.5" />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-700">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notification Form */}
                    {showSubscribe && !isSubscribed ? (
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                    <Bell className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
                                    Get notified when we launch
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-grow text-sm"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        className="whitespace-nowrap text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                                    >
                                        Notify Me
                                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    ) : showSubscribe && isSubscribed ? (
                        <div className="bg-green-50 rounded-xl p-4 border border-green-100 text-center">
                            <CheckCircle className="h-5 w-5 mx-auto mb-2 text-green-500" />
                            <h3 className="text-sm font-semibold text-green-800 mb-1">Thanks for subscribing!</h3>
                            <p className="text-xs text-green-600">We'll notify you as soon as we launch.</p>
                        </div>
                    ) : null}
                </div>


            </div>
        </div>
    );
};

export default ComingSoonSection;