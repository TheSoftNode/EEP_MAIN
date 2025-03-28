"use client"

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronLeft, Building, Users, Handshake, RocketIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { BusinessApplicationForm } from '@/components/Application/BusinessApplicationForm';

export default function BusinessApplicationPage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 pt-12">
            <Head>
                <title>Business Application - Enterprise Empowerment Platform</title>
                <meta name="description" content="Apply as a business to connect with skilled AI developers from our Enterprise Empowerment Platform." />
            </Head>

            {/* Sophisticated background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Top and bottom borders */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>

                {/* Animated glass morphism effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-indigo-500/10 to-violet-600/0 blur-3xl"></div>

                {/* Orbital rings */}
                <motion.div
                    className="absolute w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-indigo-500/20"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 80,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                ></motion.div>

                <motion.div
                    className="absolute w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-violet-500/20"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                ></motion.div>

                {/* Floating particles */}
                <motion.div
                    className="absolute w-2 h-2 top-1/2 left-1/2 rounded-full bg-indigo-400 blur-sm opacity-60"
                    animate={{
                        x: [0, 400, 0],
                        y: [0, 100, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                ></motion.div>

                <motion.div
                    className="absolute w-1.5 h-1.5 top-1/2 left-1/2 rounded-full bg-violet-400 blur-sm opacity-60"
                    animate={{
                        x: [0, -300, 0],
                        y: [0, -150, 0],
                        rotate: -360
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                ></motion.div>

                <motion.div
                    className="absolute w-1 h-1 top-1/2 left-1/2 rounded-full bg-purple-400 blur-sm opacity-60"
                    animate={{
                        x: [0, 200, 0],
                        y: [0, -120, 0],
                        rotate: 180
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                ></motion.div>

                {/* Network connection pattern */}
                <div className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #a5b4fc 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}>
                </div>

                {/* Grid overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-800/[0.1] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>

                {/* Scan line effect */}
                <motion.div
                    className="absolute left-0 right-0 h-px bg-indigo-400/30 pointer-events-none"
                    animate={{
                        top: ["10%", "90%", "10%"],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                ></motion.div>
            </div>

            <div className="container relative z-10 mx-auto px-4 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-indigo-300 hover:text-indigo-100 transition-colors mb-8"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    <span>Back to Home</span>
                </Link>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-4 text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Business</span> Partnership
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Connect with skilled AI developers and find talent for your enterprise needs
                        </p>
                    </motion.div>

                    {/* Process timeline */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                                <RocketIcon className="w-5 h-5 mr-2 text-indigo-400" />
                                Partnership Process
                            </h2>
                            <div className="flex flex-col md:flex-row justify-between items-start">
                                <div className="flex flex-col items-center text-center mb-6 md:mb-0">
                                    <div className="w-12 h-12 rounded-full bg-indigo-900/80 flex items-center justify-center mb-2 border border-indigo-500/30">
                                        <Building className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h3 className="text-indigo-300 font-medium">Submit Application</h3>
                                    <p className="text-gray-400 text-sm mt-1">Share your business needs</p>
                                </div>

                                <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 self-center"></div>

                                <div className="flex flex-col items-center text-center mb-6 md:mb-0">
                                    <div className="w-12 h-12 rounded-full bg-indigo-900/80 flex items-center justify-center mb-2 border border-indigo-500/30">
                                        <Users className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h3 className="text-indigo-300 font-medium">Talent Matching</h3>
                                    <p className="text-gray-400 text-sm mt-1">Find skilled developers</p>
                                </div>

                                <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 self-center"></div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-indigo-900/80 flex items-center justify-center mb-2 border border-indigo-500/30">
                                        <Handshake className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h3 className="text-indigo-300 font-medium">Collaboration</h3>
                                    <p className="text-gray-400 text-sm mt-1">Start working together</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <BusinessApplicationForm />
                    </motion.div>

                    <motion.div
                        className="mt-12 text-center text-gray-400 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <p>Have questions about business partnerships?</p>
                        <p>Contact us at <a href="mailto:partnerships@hitoai.com" className="text-indigo-400 hover:text-indigo-300 hover:underline">partnerships@hitoai.com</a></p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}