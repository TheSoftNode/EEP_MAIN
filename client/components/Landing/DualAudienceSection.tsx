import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import {
    BrainCircuitIcon,
    BuildingIcon,
    GitBranchIcon,
    RocketIcon,
    GlobeIcon,
    UsersIcon,
    DatabaseIcon,
    ServerIcon,
    CodeIcon
} from 'lucide-react';

export const DualAudienceSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'learners' | 'businesses'>('learners');
    const sectionRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

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

    //     const cardElements = document.querySelectorAll('.audience-card');
    //     cardElements.forEach(el => observer.observe(el));

    //     return () => {
    //         cardElements.forEach(el => observer.unobserve(el));
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

        const cardElements = document.querySelectorAll('.audience-card');
        cardElements.forEach(el => observer.observe(el));

        // Use disconnect() instead for safer cleanup
        return () => {
            observer.disconnect();
        };
    }, []);

    const learnerAudience = {
        benefits: [
            {
                icon: BrainCircuitIcon,
                title: "AI Skill Mastery",
                description: "Learn cutting-edge AI techniques with hands-on guidance"
            },
            {
                icon: UsersIcon,
                title: "Expert Mentorship",
                description: "Get personalized feedback from industry professionals"
            },
            {
                icon: GitBranchIcon,
                title: "Project Portfolio",
                description: "Build impressive projects that demonstrate your abilities"
            },
            {
                icon: GlobeIcon,
                title: "Career Networking",
                description: "Connect with top companies seeking AI talent"
            }
        ],
        cta: "Join as a Learner",
        gradient: "from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600"
    };

    const businessAudience = {
        benefits: [
            {
                icon: BuildingIcon,
                title: "Talent Access",
                description: "Connect with skilled AI developers trained in your stack"
            },
            {
                icon: ServerIcon,
                title: "Enterprise Solutions",
                description: "Custom AI implementations for your business needs"
            },
            {
                icon: DatabaseIcon,
                title: "Data Management",
                description: "Secure and efficient data solutions for AI applications"
            },
            {
                icon: RocketIcon,
                title: "Accelerated Development",
                description: "Get your AI projects from concept to production faster"
            }
        ],
        cta: "Partner as a Business",
        gradient: "from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
    };

    const fadeVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
            {/* Advanced dynamic background */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50">
                {/* Central cyclical element */}
                <div className="absolute w-[800px] h-[800px] -top-[400px] left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-50 to-slate-100 border border-indigo-100/50 shadow-inner shadow-indigo-500/5"></div>

                <div className="absolute w-[1200px] h-[1200px] top-1/3 left-1/2 -translate-x-1/2 rounded-full border-[40px] border-indigo-50/50 animate-slow-spin"></div>

                <div className="absolute w-full h-full top-0 left-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]">
                    <div className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}>
                    </div>
                </div>

                {/* Orbital elements */}
                <div className="absolute w-[150px] h-[150px] top-1/3 left-1/3 rounded-full border border-indigo-200/30 animate-slow-spin-reverse"></div>
                <div className="absolute w-4 h-4 top-1/3 left-1/3 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/30 animate-orbit"></div>

                <div className="absolute w-[100px] h-[100px] bottom-1/4 right-1/4 rounded-full border border-blue-200/30 animate-slow-spin"></div>
                <div className="absolute w-3 h-3 bottom-1/4 right-1/4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30 animate-orbit-reverse"></div>

                {/* Bottom wave decoration */}
                <svg className="absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgba(99, 102, 241, 0.03)" d="M0,224L40,229.3C80,235,160,245,240,234.7C320,224,400,192,480,181.3C560,171,640,181,720,197.3C800,213,880,235,960,229.3C1040,224,1120,192,1200,181.3C1280,171,1360,181,1400,186.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                </svg>
            </div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
                        <CodeIcon className="w-4 h-4 text-indigo-600 mr-2" />
                        <span className="text-indigo-700 font-medium text-sm">Who We Serve</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        One Platform, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Two Audiences</span>
                    </h2>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded w-20 mx-auto mb-4"
                    />

                    <p className="text-base md:text-lg text-gray-600">
                        Connecting AI learners with businesses to create opportunities for both
                    </p>
                </div>

                {/* Tabs for user types */}
                <div className="flex justify-center mb-8">
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) => setActiveTab(value as 'learners' | 'businesses')}
                        className="w-full max-w-md"
                    >
                        <TabsList className="grid w-full grid-cols-2 bg-indigo-50 p-1 rounded-lg">
                            <TabsTrigger
                                value="learners"
                                className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                            >
                                For Learners
                            </TabsTrigger>
                            <TabsTrigger
                                value="businesses"
                                className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                            >
                                For Businesses
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Always show both sections, but highlight the active one */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Learners Section */}
                    <motion.div
                        animate={{
                            scale: activeTab === 'learners' ? 1 : 0.95,
                            opacity: activeTab === 'learners' ? 1 : 0.7,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`rounded-2xl border ${activeTab === 'learners' ? 'border-indigo-200 shadow-lg shadow-indigo-100/50' : 'border-gray-200'} overflow-hidden`}
                    >
                        <div className="p-6">
                            <div className="mb-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">For Developers & AI Learners</h3>
                                <p className="text-gray-600">Accelerate your career with structured learning and mentorship</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {learnerAudience.benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="audience-card flex items-start p-3 rounded-lg bg-white shadow-sm border border-gray-100"
                                    >
                                        <div className="w-8 h-8 rounded-md bg-indigo-100 flex items-center justify-center flex-shrink-0 mr-3">
                                            <benefit.icon className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900">{benefit.title}</h4>
                                            <p className="text-xs text-gray-600 mt-1">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <Button
                                    onClick={() => router.push("/application")}
                                    className={`w-full bg-gradient-to-r ${learnerAudience.gradient} shadow-md shadow-indigo-500/20 group`}
                                >
                                    <span className="mr-2">{learnerAudience.cta}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Businesses Section */}
                    <motion.div
                        animate={{
                            scale: activeTab === 'businesses' ? 1 : 0.95,
                            opacity: activeTab === 'businesses' ? 1 : 0.7,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`rounded-2xl border ${activeTab === 'businesses' ? 'border-blue-200 shadow-lg shadow-blue-100/50' : 'border-gray-200'} overflow-hidden`}
                    >
                        <div className="p-6">
                            <div className="mb-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">For Businesses & Enterprises</h3>
                                <p className="text-gray-600">Access skilled AI developers and enterprise-grade solutions</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {businessAudience.benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="audience-card flex items-start p-3 rounded-lg bg-white shadow-sm border border-gray-100"
                                    >
                                        <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0 mr-3">
                                            <benefit.icon className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900">{benefit.title}</h4>
                                            <p className="text-xs text-gray-600 mt-1">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <Button
                                    onClick={() => router.push("/business-application")}
                                    className={`w-full bg-gradient-to-r ${businessAudience.gradient} shadow-md shadow-blue-500/20 group`}
                                >
                                    <span className="mr-2">{businessAudience.cta}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
        .audience-card {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes slow-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes slow-spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(75px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(75px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          to { transform: rotate(-360deg) translateX(50px) rotate(360deg); }
        }
        
        .animate-slow-spin {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: slow-spin 60s linear infinite;
        }
        
        .animate-slow-spin-reverse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: slow-spin-reverse 45s linear infinite;
        }
        
        .animate-orbit {
          animation: orbit 12s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 10s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default DualAudienceSection;