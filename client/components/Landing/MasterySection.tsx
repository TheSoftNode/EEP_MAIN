import React, { useEffect, useRef, useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { masteryModules } from '@/data/eep-data';

export const MasterySection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [isDropupOpen, setIsDropupOpen] = useState(false);
    const dropupRef = useRef<HTMLDivElement>(null);

    // Handle card expansion
    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // useEffect(() => {
    //     // Apply the animation delay based on index
    //     document.querySelectorAll('.mastery-card').forEach((card, index) => {
    //         (card as HTMLElement).style.setProperty('--index', index.toString());
    //     });
    // }, []);

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

    return (
        <section ref={sectionRef} className="py-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
            {/* Sophisticated background with animated elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Top and bottom borders */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>

                {/* Animated glass morphism effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-indigo-500/10 to-purple-600/0 blur-3xl"></div>

                {/* Orbital rings */}
                <div className="absolute w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-indigo-500/20 slow-spin"></div>
                <div className="absolute w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-blue-500/20 slow-spin-reverse"></div>

                {/* Floating particles */}
                <div className="absolute w-2 h-2 top-1/2 left-1/2 particle-orbit-large rounded-full bg-indigo-400 blur-sm opacity-60"></div>
                <div className="absolute w-1.5 h-1.5 top-1/2 left-1/2 particle-orbit-medium rounded-full bg-blue-400 blur-sm opacity-60"></div>
                <div className="absolute w-1 h-1 top-1/2 left-1/2 particle-orbit-small rounded-full bg-purple-400 blur-sm opacity-60"></div>

                {/* Neural network pattern */}
                <div className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #a5b4fc 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}>
                </div>

                {/* Grid overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-800/[0.1] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>

            </div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-indigo-900/50 border border-indigo-500/30 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-400 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                        <span className="text-indigo-300 font-medium text-sm">AI Mastery Track</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        What You&apos;ll <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Master</span> in the Enterprise Program
                    </h2>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded w-20 mx-auto mb-4"
                    />

                    <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                        Comprehensive skills and technologies you&apos;ll master during the program
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {masteryModules.map((module, index) => {
                        const isExpanded = expandedIndex === index;
                        return (
                            <div
                                key={`mastery-card-${index}`}
                                className="mastery-card opacity-0"
                            >
                                <Card className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden group">
                                    {/* Top border with gradient */}
                                    <div className={`h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500 ${isExpanded ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'} transition-opacity`}></div>

                                    <CardHeader className="p-4 pb-3 cursor-pointer group" onClick={() => toggleExpand(index)}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isExpanded ? 'shadow-lg shadow-indigo-500/30' : ''
                                                    }`}>
                                                    <module.icon className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <CardTitle className={`text-sm font-bold transition-colors duration-300 ${isExpanded ? 'text-indigo-300' : 'text-white group-hover:text-indigo-300'
                                                        }`}>
                                                        {module.title}
                                                    </CardTitle>
                                                </div>
                                            </div>

                                            {/* Toggle icon with rotation animation */}
                                            <div className="text-indigo-400">
                                                <motion.div
                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ChevronDownIcon className="h-5 w-5" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    {/* Use AnimatePresence to handle animation mounting/unmounting properly */}
                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                key={`content-${index}`}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                style={{ overflow: "hidden" }}
                                            >
                                                <CardContent className="px-4 pt-0 pb-4">
                                                    <div className="pl-12">
                                                        <p className="text-sm text-gray-300 leading-relaxed">
                                                            {module.description}
                                                        </p>

                                                        {/* Additional topics */}
                                                        <ul className="mt-2 space-y-1">
                                                            {Array.from({ length: 3 }).map((_, i) => (
                                                                <li key={`topic-${index}-${i}`} className="text-xs text-indigo-300 flex items-center">
                                                                    <span className="w-1 h-1 bg-indigo-400 rounded-full mr-2"></span>
                                                                    <span>Topic {i + 1}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </CardContent>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                {/* <div className="text-center mt-8">
                    <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-lg shadow-indigo-900/50 transition-all">
                        <div className="flex items-center">
                            <span className="mr-2 font-medium">Join Now & Power Up Your AI Journey</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </button>
                </div> */}

                <div className="text-center mt-8">
                    <div className="relative inline-block z-20" ref={dropupRef}>
                        {/* Drop-up menu */}
                        <div className={`absolute left-0 right-0 bottom-full mb-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 py-1 dropdown-menu ${isDropupOpen ? 'active' : ''}`}>
                            <a
                                href="/learner-application"
                                className="dropdown-item flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-indigo-600/20 hover:text-white transition-colors duration-150"
                            >
                                <span className="w-6 h-6 mr-2 flex items-center justify-center rounded-full bg-indigo-500/20">
                                    <svg className="w-3.5 h-3.5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 1v6M12 17v6M4.2 4.2l4.2 4.2M15.6 15.6l4.2 4.2M1 12h6M17 12h6M4.2 19.8l4.2-4.2M15.6 8.4l4.2-4.2" />
                                    </svg>
                                </span>
                                Start as a Learner
                            </a>
                            <a
                                href="/business-application"
                                className="dropdown-item flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-blue-600/20 hover:text-white transition-colors duration-150"
                            >
                                <span className="w-6 h-6 mr-2 flex items-center justify-center rounded-full bg-blue-500/20">
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
            <style>{`
        .mastery-card {
          animation: fadeIn 0.5s ease-out forwards;
          animation-delay: calc(var(--index, 0) * 50ms);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        
        .slow-spin {
          animation: spin 80s linear infinite;
        }
        
        .slow-spin-reverse {
          animation: spin-reverse 60s linear infinite;
        }
        
        .particle-orbit-large {
          animation: orbit-large 40s linear infinite;
        }
        
        .particle-orbit-medium {
          animation: orbit-medium 30s linear infinite;
        }
        
        .particle-orbit-small {
          animation: orbit-small 20s linear infinite;
        }
        
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        
        @keyframes orbit-large {
          from { transform: rotate(0deg) translateX(400px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(400px) rotate(-360deg); }
        }
        
        @keyframes orbit-medium {
          from { transform: rotate(0deg) translateX(300px) rotate(0deg); }
          to { transform: rotate(-360deg) translateX(300px) rotate(360deg); }
        }
        
        @keyframes orbit-small {
          from { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          to { transform: rotate(120deg) translateX(200px) rotate(-120deg); }
        }
      `}</style>
        </section>
    );
};

// Add this to your component mounting


export default MasterySection;