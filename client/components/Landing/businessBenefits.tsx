"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BuildingIcon,
    BarChart3Icon,
    LightbulbIcon,
    ShieldIcon,
    CodesandboxIcon,
    UsersIcon,
    ClockIcon,
    TargetIcon
} from 'lucide-react';

export const BusinessBenefitsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Animation effect for benefit cards
    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach(entry => {
    //                 if (entry.isIntersecting) {
    //                     entry.target.classList.add('animate-in');
    //                 }
    //             });
    //         },
    //         { threshold: 0.1 }
    //     );

    //     const benefitElements = document.querySelectorAll('.business-benefit-card');
    //     benefitElements.forEach(el => observer.observe(el));

    //     return () => {
    //         benefitElements.forEach(el => observer.unobserve(el));
    //     };
    // }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const benefitElements = document.querySelectorAll('.business-benefit-card');
        benefitElements.forEach(el => observer.observe(el));

        // Use disconnect() instead for safer cleanup
        return () => {
            observer.disconnect();
        };
    }, []);

    const businessBenefits = [
        {
            icon: CodesandboxIcon,
            title: "AI-Ready Solutions",
            description: "Implement custom AI solutions tailored to your specific business needs with pre-built components and expert guidance.",
            gradient: "from-blue-500 to-indigo-500"
        },
        {
            icon: UsersIcon,
            title: "Access to Skilled Developers",
            description: "Connect with our network of skilled AI developers who have been trained in modern enterprise tools and approaches.",
            gradient: "from-indigo-500 to-violet-500"
        },
        {
            icon: BarChart3Icon,
            title: "Measurable ROI",
            description: "Track project progress and performance metrics to ensure your AI investments deliver tangible business results.",
            gradient: "from-violet-500 to-purple-500"
        },
        {
            icon: ClockIcon,
            title: "Accelerated Time-to-Market",
            description: "Reduce development cycles with our streamlined processes and ready-to-integrate AI components.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: ShieldIcon,
            title: "Enterprise-Grade Security",
            description: "Build AI solutions with security best practices baked in from the start, protecting your data and systems.",
            gradient: "from-pink-500 to-red-500"
        },
        {
            icon: LightbulbIcon,
            title: "Innovation Partnership",
            description: "Access ongoing innovation support from our AI experts to keep your solutions at the cutting edge.",
            gradient: "from-red-500 to-orange-500"
        },
        {
            icon: TargetIcon,
            title: "Strategic AI Roadmapping",
            description: "Develop a clear path forward for your AI initiatives with expert guidance on prioritization and implementation.",
            gradient: "from-orange-500 to-amber-500"
        },
        {
            icon: BuildingIcon,
            title: "Enterprise Scalability",
            description: "Build AI solutions that grow with your business, from proof-of-concept to full enterprise deployment.",
            gradient: "from-amber-500 to-yellow-500"
        }
    ];

    return (
        <section ref={sectionRef} className="py-20 relative overflow-hidden bg-white">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>

                {/* Subtle patterns */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-100/30 to-violet-100/30 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
                        <BuildingIcon className="w-4 h-4 text-indigo-600 mr-2" />
                        <span className="text-indigo-700 font-medium text-sm">For Enterprises</span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                        Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Businesses</span> with AI
                    </h2>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded w-24 mx-auto mb-6"
                    />

                    <p className="mt-4 text-xl text-gray-600">
                        Our platform empowers enterprises to implement effective AI solutions with dedicated talent and support
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {businessBenefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="business-benefit-card relative group"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <Card className="h-full border border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-md hover:shadow-indigo-100 transition-all duration-300 group-hover:translate-y-[-3px]">
                                <CardHeader className="pt-6 px-6">
                                    <div className="mb-4">
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center`}>
                                            <benefit.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg font-semibold">{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 pb-6">
                                    <p className="text-gray-600">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-md shadow-indigo-500/20 group">
                        <span className="mr-2">Request Business Consultation</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Button>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
        .business-benefit-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
        </section>
    );
};

export default BusinessBenefitsSection;