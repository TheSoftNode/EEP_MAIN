import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    GitBranchIcon,
    CloudIcon,
    UsersIcon,
    BuildingIcon,
    GlobeIcon,
    RocketIcon,
    DatabaseIcon,
    BarChart3Icon,
    LightbulbIcon,
    CodesandboxIcon,
    ShieldIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from 'lucide-react';

// Define the Benefit interface
interface Benefit {
    icon: React.ElementType;
    title: string;
    description: string;
    details: string[];
}

export const CombinedBenefitsSection: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [expandedBusinessIndex, setExpandedBusinessIndex] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'learners' | 'businesses'>('learners');
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isDropupOpen, setIsDropupOpen] = useState(false);
    const dropupRef = useRef<HTMLDivElement>(null);

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

    //     const benefitElements = document.querySelectorAll('.benefit-card');
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

        const benefitElements = document.querySelectorAll('.benefit-card');
        benefitElements.forEach(el => observer.observe(el));

        // Use disconnect() instead for safer cleanup
        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropupRef.current && !dropupRef.current.contains(event.target as Node)) {
                setIsDropupOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const learnerBenefits: Benefit[] = [
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
        }
    ];

    const businessBenefits: Benefit[] = [
        {
            icon: CodesandboxIcon,
            title: "AI-Ready Solutions",
            description: "Implement custom AI solutions tailored to your business needs",
            details: [
                "Pre-built AI components",
                "Custom implementation assistance",
                "Integration with existing systems",
                "Scalable architecture patterns"
            ]
        },
        {
            icon: UsersIcon,
            title: "Access to Skilled Developers",
            description: "Connect with our network of trained AI developers",
            details: [
                "Pre-vetted talent pool",
                "Skill-matched developers",
                "Project-based assignments",
                "Ongoing developer support"
            ]
        },
        {
            icon: BarChart3Icon,
            title: "Measurable ROI",
            description: "Track project progress and performance metrics",
            details: [
                "Custom KPI dashboards",
                "Performance benchmarking",
                "Business impact assessments",
                "ROI calculation frameworks"
            ]
        },
        {
            icon: ShieldIcon,
            title: "Enterprise-Grade Security",
            description: "Build AI solutions with security best practices",
            details: [
                "Data protection protocols",
                "Compliance-ready frameworks",
                "Secure development practices",
                "Regular security audits"
            ]
        },
        {
            icon: LightbulbIcon,
            title: "Innovation Partnership",
            description: "Access ongoing innovation support from our AI experts",
            details: [
                "Innovation workshops",
                "AI trend analysis",
                "Competitive advantage strategies",
                "Future-proofing consultations"
            ]
        },
        {
            icon: BuildingIcon,
            title: "Enterprise Scalability",
            description: "Build AI solutions that grow with your business",
            details: [
                "Scalable architecture designs",
                "Growth-ready infrastructure",
                "Performance optimization",
                "Enterprise integration patterns"
            ]
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section ref={sectionRef} className="py-16 relative overflow-hidden">
            {/* Sophisticated cyclical background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Light circular gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>

                {/* Central cyclical element */}
                <div className="absolute w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[30px] border-indigo-50/40 animate-slow-spin"></div>
                <div className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[20px] border-blue-50/30 animate-slow-spin-reverse"></div>
                <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-purple-50/20 animate-slow-spin"></div>

                {/* Orbital elements */}
                <div className="absolute w-4 h-4 top-1/2 left-1/2 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/30 animate-orbit"></div>
                <div className="absolute w-3 h-3 top-1/2 left-1/2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30 animate-orbit-reverse"></div>
                <div className="absolute w-2 h-2 top-1/2 left-1/2 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shadow-purple-500/30 animate-orbit-small"></div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}>
                </div>
            </div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
                        <RocketIcon className="w-4 h-4 text-indigo-600 mr-2" />
                        <span className="text-indigo-700 font-medium text-sm">Exclusive Benefits</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        Key Benefits for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Learners & Businesses</span>
                    </h2>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded w-24 mx-auto mb-6"
                    />

                    <p className="mt-4 text-base sm:text-lg text-gray-500">
                        Exclusive advantages that empower both developers and businesses with enterprise-level tools
                    </p>
                </div>

                {/* Tabs for user types - shows both content simultaneously */}
                <Tabs defaultValue="learners" onValueChange={(value) => setActiveTab(value as 'learners' | 'businesses')}>
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-slate-100 p-1 rounded-lg">
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
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Learner Benefits - Always visible, but highlighted when active */}
                        <motion.div
                            animate={{
                                scale: activeTab === 'learners' ? 1 : 0.98,
                                opacity: activeTab === 'learners' ? 1 : 0.8,
                            }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-indigo-700 mb-2">For Developers</h3>
                                <div className="h-1 w-16 bg-indigo-500 mx-auto rounded-full"></div>
                            </div>

                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {learnerBenefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="benefit-card"
                                    >
                                        <Card className={`h-full border hover:border-indigo-300 transition-all duration-300 overflow-hidden ${expandedIndex === index ? 'shadow-md shadow-indigo-100' : 'shadow-sm'
                                            }`}>
                                            <CardHeader className="p-4">
                                                <div className="flex items-start gap-3">
                                                    {/* Icon Section */}
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                                        <benefit.icon className="w-5 h-5 text-white" />
                                                    </div>

                                                    {/* Content Section */}
                                                    <div className="flex-1 space-y-1">
                                                        <CardTitle className="text-base font-semibold">
                                                            {benefit.title}
                                                        </CardTitle>
                                                        <p className="text-sm text-gray-500">
                                                            {benefit.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Toggle Button */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute top-3 right-2 p-1 h-auto hover:bg-indigo-50"
                                                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                                >
                                                    {expandedIndex === index ? (
                                                        <ChevronUpIcon className="h-4 w-4 text-indigo-600" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4 text-indigo-600" />
                                                    )}
                                                </Button>
                                            </CardHeader>

                                            {/* Expandable Content */}
                                            {expandedIndex === index && (
                                                <CardContent className="p-4 pt-0 bg-indigo-50/50">
                                                    <ul className="space-y-1 pl-4">
                                                        {benefit.details.map((detail, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="text-sm text-gray-600 list-disc marker:text-indigo-500"
                                                            >
                                                                {detail}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            )}
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Business Benefits - Always visible, but highlighted when active */}
                        <motion.div
                            animate={{
                                scale: activeTab === 'businesses' ? 1 : 0.98,
                                opacity: activeTab === 'businesses' ? 1 : 0.8,
                            }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-blue-700 mb-2">For Businesses</h3>
                                <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full"></div>
                            </div>

                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {businessBenefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="benefit-card"
                                    >
                                        <Card className={`h-full border hover:border-blue-300 transition-all duration-300 overflow-hidden ${expandedBusinessIndex === index ? 'shadow-md shadow-blue-100' : 'shadow-sm'
                                            }`}>
                                            <CardHeader className="p-4">
                                                <div className="flex items-start gap-3">
                                                    {/* Icon Section */}
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                                                        <benefit.icon className="w-5 h-5 text-white" />
                                                    </div>

                                                    {/* Content Section */}
                                                    <div className="flex-1 space-y-1">
                                                        <CardTitle className="text-base font-semibold">
                                                            {benefit.title}
                                                        </CardTitle>
                                                        <p className="text-sm text-gray-500">
                                                            {benefit.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Toggle Button */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute top-3 right-2 p-1 h-auto hover:bg-blue-50"
                                                    onClick={() => setExpandedBusinessIndex(expandedBusinessIndex === index ? null : index)}
                                                >
                                                    {expandedBusinessIndex === index ? (
                                                        <ChevronUpIcon className="h-4 w-4 text-blue-600" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4 text-blue-600" />
                                                    )}
                                                </Button>
                                            </CardHeader>

                                            {/* Expandable Content */}
                                            {expandedBusinessIndex === index && (
                                                <CardContent className="p-4 pt-0 bg-blue-50/50">
                                                    <ul className="space-y-1 pl-4">
                                                        {benefit.details.map((detail, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="text-sm text-gray-600 list-disc marker:text-blue-500"
                                                            >
                                                                {detail}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            )}
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </Tabs>

                {/* <div className="text-center mt-12">
                    <Button
                        size="lg"
                        className="group bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 border-0 shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/30"
                    >
                        <span className="flex items-center justify-center">
                            <span>Join the Enterprise Empowerment Program</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </Button>
                </div> */}
                <div className="text-center mt-8">
                    <div className="relative inline-block z-20" ref={dropupRef}>
                        {/* Drop-up menu */}
                        <div className={`absolute left-0 right-0 bottom-full mb-2 bg-gray-50 border border-slate-700 rounded-lg shadow-xl z-50 py-1 dropdown-menu ${isDropupOpen ? 'active' : ''}`}>
                            <a
                                href="/learner-application"
                                className="dropdown-item flex items-center px-4 py-2 text-sm text-slate-800 hover:bg-indigo-600/20 hover:text-slate-800 transition-colors duration-150"
                            >
                                <span className="w-6 h-6 mr-2 flex items-center justify-center rounded-full bg-indigo-800/20">
                                    <svg className="w-3.5 h-3.5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 1v6M12 17v6M4.2 4.2l4.2 4.2M15.6 15.6l4.2 4.2M1 12h6M17 12h6M4.2 19.8l4.2-4.2M15.6 8.4l4.2-4.2" />
                                    </svg>
                                </span>
                                Start as a Learner
                            </a>
                            <a
                                href="/business-application"
                                className="dropdown-item flex items-center px-4 py-2 text-sm text-slate-800 hover:bg-blue-600/20 hover:text-slate-800 transition-colors duration-150"
                            >
                                <span className="w-6 h-6 mr-2 flex items-center justify-center rounded-full bg-blue-700/20">
                                    <svg className="w-3.5 h-3.5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
                                    </svg>
                                </span>
                                Start as a Business
                            </a>
                        </div>

                        <button
                            onClick={() => setIsDropupOpen(!isDropupOpen)}
                            onMouseEnter={() => setIsDropupOpen(true)}
                            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-lg shadow-indigo-900/50 transition-all"
                        >
                            <div className="flex items-center">
                                <span className="mr-2 font-medium">Join Now & Power Up Your AI Journey</span>
                                <ChevronUpIcon className={`h-4 w-4 transition-transform duration-300 ${isDropupOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
        .benefit-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
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
          from { transform: rotate(0deg) translateX(400px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(400px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          from { transform: rotate(0deg) translateX(300px) rotate(0deg); }
          to { transform: rotate(-360deg) translateX(300px) rotate(360deg); }
        }
        
        @keyframes orbit-small {
          from { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }
        
        .animate-slow-spin {
          animation: slow-spin 120s linear infinite;
        }
        
        .animate-slow-spin-reverse {
          animation: slow-spin-reverse 90s linear infinite;
        }
        
        .animate-orbit {
          animation: orbit 60s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 45s linear infinite;
        }
        
        .animate-orbit-small {
          animation: orbit-small 30s linear infinite;
        }

        .dropdown-menu {
        opacity: 0;
        transform: translateY(-8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        z-index: 50;
        }

        .dropdown-menu.active {
        opacity: 1;
        transform: translateY(0);
        }

        .dropdown-item {
        transform: translateX(-10px);
        opacity: 0;
        transition: all 0.3s ease;
        }

        .dropdown-menu.active .dropdown-item {
        transform: translateX(0);
        opacity: 1;
        }

        .dropdown-menu.active .dropdown-item:nth-child(1) {
        transition-delay: 0.1s;
        }

        .dropdown-menu.active .dropdown-item:nth-child(2) {
        transition-delay: 0.2s;
        }
      `}</style>
        </section>
    );
};

export default CombinedBenefitsSection;