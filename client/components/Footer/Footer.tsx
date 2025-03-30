"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import Logo from '../Logo/Logo';

export const Footer = () =>
{
    const footerRef = useRef(null);
    const [email, setEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() =>
    {
        const observer = new IntersectionObserver(
            (entries) =>
            {
                entries.forEach(entry =>
                {
                    if (entry.isIntersecting)
                    {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.footer-animate');
        elements.forEach(el => observer.observe(el));

        // Use disconnect() instead of unobserve() for safer cleanup
        return () =>
        {
            observer.disconnect();
        };
    }, []);

    const getCurrentYear = () => new Date().getFullYear();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        setEmail(e.target.value);
    };

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();

        // Basic validation
        if (!email)
        {
            setSubscriptionStatus('Please enter your email address');
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
        {
            setSubscriptionStatus('Please enter a valid email address');
            return;
        }

        try
        {
            setIsSubmitting(true);
            // Make API call to subscribe endpoint
            const response = await axios.post('http://localhost:8000/api/v1/eep/newsletter/subscribe', { email });

            if (response.data.status === 'success')
            {
                setSubscriptionStatus('Thank you for subscribing!');
                setEmail('');
            }
        } catch (error)
        {
            console.error('Subscription error:', error);
            setSubscriptionStatus('Failed to subscribe. Please try again later.');
        } finally
        {
            setIsSubmitting(false);

            // Clear status message after 5 seconds
            setTimeout(() =>
            {
                setSubscriptionStatus('');
            }, 5000);
        }
    };

    return (
        <footer ref={footerRef} className="relative bg-slate-900 text-white overflow-hidden">
            {/* Sophisticated background */}
            <div className="absolute inset-0 z-0">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950"></div>

                {/* Abstract wave background */}
                <div className="absolute bottom-0 left-0 right-0 h-40 opacity-10">
                    <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            className="fill-indigo-600/10"
                        ></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            className="fill-cyan-600/10"
                            opacity="0.25"
                        ></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="fill-indigo-900/20"
                            opacity="0.25"
                        ></path>
                    </svg>
                </div>

                {/* Dot grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                    }}
                ></div>

                {/* Glowing accent */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl"></div>
                <div className="absolute top-10 -left-12 w-24 h-24 bg-cyan-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                {/* Main footer content */}
                <div className="pt-16 pb-10">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-12">
                        {/* Brand section */}
                        <div className="md:col-span-5 footer-animate" style={{ '--delay': '0s' } as React.CSSProperties}>
                            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 h-full">
                                <div className="flex items-center mb-4">
                                    <Logo
                                        variant="light"
                                        size="lg"
                                        showText={false}
                                        animate={false}
                                    />
                                    <Link href={"/"}>
                                        <div className="ml-3">
                                            <div className="flex items-center">
                                                <span className="text-2xl font-bold text-indigo-700">EEP</span>
                                                {/* <span className="ml-2 text-xs font-medium px-1.5 py-0.5 bg-indigo-900/50 border border-indigo-700/50 rounded-md text-indigo-300">BETA</span> */}
                                            </div>
                                            <span className="text-xs text-slate-400">Enterprise Empowerment Platform</span>
                                        </div>
                                    </Link>
                                </div>

                                <p className="text-slate-300 text-sm mb-6">
                                    The Enterprise Empowerment Platform elevates developer potential through
                                    AI-assisted guidance, structured project workflows, and real-time expert mentorship.
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/30 border border-slate-600/30">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-400">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                        </div>
                                        <a href="tel:+11234567890" className="text-slate-300 text-sm ml-2 hover:text-white transition-colors">+353 89 983 2147</a>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/30 border border-slate-600/30">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-400">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        </div>
                                        <a href="mailto:contact@eep.dev" className="text-slate-300 text-sm ml-2 hover:text-white transition-colors">info@hitoai.ai</a>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-700/30">
                                    <div className="flex space-x-4">
                                        <motion.a
                                            href="https://www.linkedin.com/company/hitoai-limited/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -3 }}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                                        >
                                            <FaLinkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                        </motion.a>
                                        <motion.a
                                            href="https://www.f6s.com/company/hitoai.ai/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -3 }}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                                        >
                                            <img
                                                src={"/socials/f6s-logo.png"}
                                                alt="F6S"
                                                className="h-6 w-6"
                                            />
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Links sections */}
                        <div className="md:col-span-7">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 h-full">
                                {/* Platform links */}
                                <div className="footer-animate" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                                    <div className="h-full bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 rounded-xl p-5">
                                        <h3 className="text-lg font-semibold text-white mb-3 pb-2 border-b border-slate-700/30 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-indigo-400">
                                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                                <line x1="12" y1="17" x2="12" y2="21"></line>
                                            </svg>
                                            Platform
                                        </h3>
                                        <ul className="space-y-2">
                                            <li>
                                                <a href="/#features" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Features
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/#how-it-works" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    How It Works
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/#pricing" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Pricing
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/documentation" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Documentation
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/api-reference" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    API
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/ai-workspace" className="text-white bg-gradient-to-r from-indigo-500 to-indigo-600 px-2.5 py-1 text-xs rounded-full inline-flex items-center mt-1">
                                                    <span className="mr-1">New</span>
                                                    AI Workspace
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Company links */}
                                <div className="footer-animate" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                                    <div className="h-full bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 rounded-xl p-5">
                                        <h3 className="text-lg font-semibold text-white mb-3 pb-2 border-b border-slate-700/30 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-indigo-400">
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                            </svg>
                                            Company
                                        </h3>
                                        <ul className="space-y-2">
                                            <li>
                                                <a href="/about" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    About Us
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/careers" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Careers
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/blog" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Blog
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/contact" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Contact
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Legal & Sign up */}
                                <div className="footer-animate" style={{ '--delay': '0.3s' } as React.CSSProperties}>
                                    <div className="h-full bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 rounded-xl p-5">
                                        <h3 className="text-lg font-semibold text-white mb-3 pb-2 border-b border-slate-700/30 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-indigo-400">
                                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                                <line x1="6" y1="1" x2="6" y2="4"></line>
                                                <line x1="10" y1="1" x2="10" y2="4"></line>
                                                <line x1="14" y1="1" x2="14" y2="4"></line>
                                            </svg>
                                            Legal
                                        </h3>
                                        <ul className="space-y-2">
                                            <li>
                                                <a href="/privacy-policy" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Privacy Policy
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/terms" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Terms of Service
                                                </a>
                                            </li>
                                        </ul>

                                        <div className="mt-5 pt-3 border-t border-slate-700/30">
                                            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Stay Updated</h4>
                                            <form onSubmit={handleSubscribe}>
                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        placeholder="Your email"
                                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 pl-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                        disabled={isSubmitting}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="absolute top-0 right-0 h-full px-3 text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                <polyline points="12 5 19 12 12 19"></polyline>
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                                {subscriptionStatus && (
                                                    <p className={`text-xs mt-2 ${subscriptionStatus.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}>
                                                        {subscriptionStatus}
                                                    </p>
                                                )}
                                                <p className="text-xs text-slate-400 mt-2">
                                                    Get notified about new features and updates.
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom copyright bar */}
                <div className="border-t border-slate-800 mt-10 pt-6 pb-8 footer-animate" style={{ '--delay': '0.4s' } as React.CSSProperties}>
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <div className="text-sm text-slate-400">
                                &copy; {getCurrentYear()} EEP. Powered by HitoAI Limited. All rights reserved.
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <select className="bg-slate-800 border border-slate-700 rounded-md text-xs text-slate-300 py-1 pl-2 pr-6 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="es">Español</option>
                                <option value="de">Deutsch</option>
                            </select>

                            <div className="flex items-center text-xs text-slate-400">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                                All systems operational
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
                .footer-animate {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                    transition-delay: var(--delay, 0s);
                }
                
                .animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </footer>
    );
};