"use client"

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
    GitBranchIcon,
    CloudIcon,
    UsersIcon,
    BuildingIcon,
    GlobeIcon,
    BrainCircuitIcon,
    RocketIcon,
    DatabaseIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Benefit {
    icon: React.ElementType;
    title: string;
    description: string;
    details: string[];
}

export const BenefitsSection: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const benefits: Benefit[] = [
        {
            icon: GitBranchIcon,
            title: "Enterprise GitHub for Version Control",
            description: "Leverage enterprise-level GitHub for seamless collaboration",
            details: [
                "Advanced code management features",
                "Real-world AI project collaboration",
                "Professional version control workflows",
                "Team collaboration tools and features"
            ]
        },
        {
            icon: RocketIcon,
            title: "Enterprise Render for AI-Powered Development",
            description: "Deploy and scale AI-driven applications effortlessly",
            details: [
                "Enterprise Render platform access",
                "Robust cloud-based solutions",
                "Efficient deployment pipelines",
                "Scalable application infrastructure"
            ]
        },
        {
            icon: DatabaseIcon,
            title: "Enterprise-Grade PostgreSQL",
            description: "Master PostgreSQL for enterprise-level data management",
            details: [
                "Complex query optimization",
                "Advanced database management",
                "Enterprise data handling",
                "Performance tuning expertise"
            ]
        },
        {
            icon: UsersIcon,
            title: "Exclusive 1:1 AI Mentorship",
            description: "20 personalized mentorship sessions with Deep Tech experts",
            details: [
                "One-on-one guidance sessions",
                "Deep Tech startup expert mentoring",
                "Cutting-edge AI application training",
                "Industry best practices coaching"
            ]
        },
        {
            icon: BuildingIcon,
            title: "Get Hired by HitoAI Limited",
            description: "Join HitoAI Limited and work on industry-leading projects",
            details: [
                "Direct employment opportunities",
                "Work with AI industry leaders",
                "Professional project experience",
                "Career advancement paths"
            ]
        },
        {
            icon: GlobeIcon,
            title: "Expansive Network Access",
            description: "Connect with 5,000+ startups and initiatives",
            details: [
                "Extensive startup network access",
                "AI technology networking",
                "Career opportunity connections",
                "Industry partnership possibilities"
            ]
        },
        {
            icon: CloudIcon,
            title: "Enterprise-Grade Cloud Access",
            description: "Comprehensive cloud platform experience",
            details: [
                "AWS Enterprise Console access",
                "Microsoft Azure Enterprise platform",
                "Google Cloud Platform (GCP) Enterprise Support",
                "Cloud-based AI development tools"
            ]
        },
        {
            icon: BrainCircuitIcon,
            title: "AI Research & Development Support",
            description: "Push the boundaries of AI innovation",
            details: [
                "Enterprise cloud infrastructure",
                "Advanced AI development tools",
                "Research support and resources",
                "Innovation mentorship"
            ]
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section className="py-20 relative overflow-hidden bg-white">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Dot matrix pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}>
                </div>

                {/* Radial gradients */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-indigo-100/40 to-violet-100/40 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4 animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4 animate-pulse-slow"></div>

                {/* Connective lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(79, 70, 229, 0.05)" />
                            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.08)" />
                            <stop offset="100%" stopColor="rgba(79, 70, 229, 0.05)" />
                        </linearGradient>
                        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.05)" />
                            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.08)" />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,100 C150,200 250,0 500,100 C750,200 850,0 1000,100"
                        fill="none"
                        stroke="url(#lineGradient1)"
                        strokeWidth="2"
                        className="animate-wave-slow"
                    />
                    <path
                        d="M0,150 C150,50 250,250 500,150 C750,50 850,250 1000,150"
                        fill="none"
                        stroke="url(#lineGradient2)"
                        strokeWidth="2"
                        className="animate-wave-medium"
                    />
                </svg>
            </div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-600 mr-2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="text-indigo-700 font-medium text-sm">Exclusive Benefits</span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                        Key Benefits for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Learners & Businesses</span>
                    </h2>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded w-24 mx-auto mb-6"
                    />

                    <p className="mt-4 text-xl text-gray-500">
                        Exclusive advantages that empower developers and businesses with enterprise-level tools and connections
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {benefits.map((benefit, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Collapsible
                                open={expandedIndex === index}
                                onOpenChange={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            >
                                <Card className="border border-slate-200 hover:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:shadow-blue-500/10">
                                    <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-3">
                                            {/* Icon Section */}
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                                <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                            </div>

                                            {/* Content Section */}
                                            <div className="flex-1 space-y-2">
                                                <div>
                                                    <CardTitle className="text-base sm:text-lg font-semibold">
                                                        {benefit.title}
                                                    </CardTitle>
                                                    <CardDescription className="text-sm mt-1">
                                                        {benefit.description}
                                                    </CardDescription>
                                                </div>

                                                {/* Toggle Button */}
                                                <div className="flex justify-end">
                                                    <CollapsibleTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="hover:bg-blue-50"
                                                        >
                                                            {expandedIndex === index ? (
                                                                <ChevronUpIcon className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronDownIcon className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </CollapsibleTrigger>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CollapsibleContent>
                                        <CardContent className="pt-0 px-4 sm:px-6 pb-4">
                                            <ul className="space-y-2 mt-2 pl-4">
                                                {benefit.details.map((detail, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-sm sm:text-base text-gray-600 list-disc marker:text-blue-500"
                                                    >
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </CollapsibleContent>
                                </Card>
                            </Collapsible>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        className="group w-auto bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 border-0 shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/30"
                    >
                        <span className="flex items-center justify-center">
                            <span>Join the Enterprise Empowerment Program</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </Button>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
        
        @keyframes wave-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }
        
        @keyframes wave-medium {
          0% { transform: translateX(0); }
          100% { transform: translateX(100px); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-wave-slow {
          animation: wave-slow 25s linear infinite;
        }
        
        .animate-wave-medium {
          animation: wave-medium 20s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default BenefitsSection;