"use client"

import React, { FC } from 'react';
import { CheckCircle, Zap, Users, Lightbulb, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection: FC = () => {
    // Core benefits offered by the platform
    const coreBenefits = [
        {
            title: "AI-Assisted Guidance",
            description: "Leverage cutting-edge AI to receive personalized recommendations and insights throughout your development journey.",
            icon: <Lightbulb className="h-5 w-5" />
        },
        {
            title: "Expert Mentorship",
            description: "Connect with industry leaders who provide tailored advice and support for your specific business goals.",
            icon: <Users className="h-5 w-5" />
        },
        {
            title: "Integrated Project Management",
            description: "Streamline workflows with comprehensive tools designed to enhance productivity and collaboration.",
            icon: <Zap className="h-5 w-5" />
        },
        {
            title: "Personalized Learning Paths",
            description: "Access customized resources and learning experiences to upskill your team efficiently.",
            icon: <Rocket className="h-5 w-5" />
        }
    ];

    // Key features that make the platform special
    const keyFeatures = [
        "Real-time collaboration tools",
        "AI-powered workspace guidance",
        "Interactive milestone tracking",
        "Data-driven decision making",
        "Step-by-step development assistance",
        "Customizable workflow templates",
        "Progress analytics and insights",
        "Resource optimization tools"
    ];

    return (
        <div className="relative py-20 flex flex-col items-center justify-center overflow-hidden bg-slate-100/80">
            {/* Sophisticated background elements - inspired by ComingSoon page */}
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
            <div className="relative z-10 px-4 w-full max-w-6xl mx-auto">
                {/* Main Content Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-50 p-6 sm:p-8 mb-8">
                    {/* About Section Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-600 text-xs font-semibold mb-3 border border-indigo-200/50">
                            <span>About Us</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            <span>Enterprise </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Empowerment</span>
                            <span> Platform</span>
                        </h1>

                        {/* Platform Description - Using your provided text */}
                        <div className="mx-auto max-w-3xl mb-6">
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                The Enterprise Empowerment Platform is designed to fast-track your innovation and
                                development journey through AI-assisted guidance and expert mentorship. Whether you're
                                building a startup, launching a product, or upskilling your team, this platform provides
                                a structured ecosystem that supports every step of your growth.
                            </p>
                        </div>
                        <div className="mx-auto max-w-3xl">
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                With integrated project management tools, real-time collaboration features, and
                                personalized learning paths, you can streamline workflows, enhance productivity, and
                                make smarter decisions faster. Empower your enterprise with the tools and support
                                needed to turn ideas into impactful outcomes.
                            </p>
                        </div>
                    </div>

                    {/* Core Benefits Section */}
                    <div className="mb-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                            Core
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600"> Benefits</span>
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coreBenefits.map((benefit, index) => (
                                <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-indigo-50 transition-all duration-300 hover:shadow-md hover:border-indigo-100">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/40 mb-4">
                                        <div className="text-indigo-600">
                                            {benefit.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-gray-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Features Section */}
                    <div className="bg-gradient-to-br from-indigo-50/80 to-violet-50/80 rounded-xl p-6 border border-indigo-100/40">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                            Platform
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600"> Features</span>
                        </h2>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {keyFeatures.map((feature, i) => (
                                <div key={i} className="flex items-start p-3 bg-white/70 rounded-lg border border-gray-100 shadow-sm">
                                    <div className="flex-shrink-0 p-0.5 rounded-full bg-gradient-to-br from-indigo-200 to-violet-200 mr-2">
                                        <div className="flex items-center justify-center h-3.5 w-3.5 rounded-full text-white bg-gradient-to-br from-indigo-600 to-violet-600">
                                            <CheckCircle className="h-2.5 w-2.5" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-xl sm:text-2xl font-bold mb-2">Ready to empower your enterprise?</h2>
                            <p className="text-indigo-100 text-sm">Start your journey with our platform today.</p>
                        </div>
                        <Button
                            className="whitespace-nowrap bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg"
                        >
                            Get Started
                            <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;