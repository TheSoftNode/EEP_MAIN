import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // The threshold for swipe detection
    const minSwipeDistance = 50;

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

        const testimonialElements = document.querySelectorAll('.testimonial-card');
        testimonialElements.forEach(el => observer.observe(el));

        // Use disconnect() instead for safer cleanup
        return () => {
            observer.disconnect();
        };
    }, []);

    const testimonials = [
        {
            content: "Through EEP, I am able to learn coding faster. It is so convenient to just install and set up environment and dependencies, ask AI about my code, as well as deploy my application for testing in just one platform.",
            author: "Thang Dang",
            role: "IoT Programmer and Developer",
            avatar: "/testmonials/profile-photo.png",
            gradient: "from-blue-50 to-indigo-50",
            border: "border-blue-100",
            iconColor: "text-blue-400"
        },
        {
            content: "As a mentor in the EEp program, I've witnessed firsthand the incredible impact this initiative has on participants. The program not only equips individuals with cutting-edge AI knowledge but also fosters an environment of collaboration and growth. It's been a rewarding experience to guide and support talented learners as they explore the integration of AI into education. The EEp program empowers participants to think creatively, tackle real-world challenges, and develop the skills necessary to make a meaningful impact in the education sector. I'm proud to be part of such an innovative and forward-thinking program.",
            author: "Shenal Elekuttige",
            role: "Mentor",
            avatar: "/testmonials/shenalphoto.jpg",
            gradient: "from-indigo-50 to-violet-50",
            border: "border-indigo-100",
            iconColor: "text-indigo-400"
        },
        {
            content: `Excited to share my latest achievement! 
I successfully completed the Enterprise Engagement Program (EEP) in Software Development with a Focus on AI-Enabled Technology from HitoAI Limited.
During this incredible journey, I had the opportunity to work on cutting-edge AI,gaining hands-on experience in developing intelligent systems and integrating IoT solutions. This experience has deepened my understanding of AI algorithms, IoT connectivity, and real-world problem-solving.

This journey has significantly enhanced my skills in software development and AI integration, and I'm excited to apply these skills to future projects.`,
            author: "Swati Mandaokar",
            role: "Software Developer",
            avatar: "/testmonials/professional-photo.jpg",
            gradient: "from-violet-50 to-purple-50",
            border: "border-violet-100",
            iconColor: "text-violet-400"
        },
        {
            content: `EEP accelerated my growth as a full-stack developer and helped me bridge the gap into AI and IoT. Their structured mentorship and hands-on projects gave me the confidence to build smarter systems—now I ship code faster and think like an engineer.`,
            author: "Jibin John",
            role: "Software Developer",
            avatar: "/testmonials/jibin.jpg",
            gradient: "from-blue-50 to-indigo-50",
            border: "border-blue-100",
            iconColor: "text-blue-400"
        },
        {
            content: `The Enterprise Engagement Program (EEP) at HitoAI was an incredible learning experience that provided hands-on exposure to AI-enabled software development. Over three months, I had the opportunity to work on real-world projects, developing REST APIs, integrating AI-powered solutions, and deploying applications. The program helped me enhance my technical skills and gain practical experience in AI-driven development.`,
            author: "Aswanth  Manoharan",
            role: "Software Developer",
            avatar: "/testmonials/aswanth.jpeg",
            gradient: "from-blue-50 to-indigo-50",
            border: "border-blue-100",
            iconColor: "text-blue-400"
        },
    ];

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Touch event handlers for swipe functionality
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        }
        if (isRightSwipe) {
            goToPrevious();
        }

        // Reset values
        setTouchStart(0);
        setTouchEnd(0);
    };

    // Add this state at the top with your other useState declarations (near line 8)
    const [displayCount, setDisplayCount] = useState(3); // Default to desktop view

    // Add this useEffect right after your existing useEffect (around line 37)
    useEffect(() => {
        // This code only runs in the browser after component mounts
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDisplayCount(1); // Mobile: show 1
            } else if (window.innerWidth < 1024) {
                setDisplayCount(2); // Tablet: show 2
            } else {
                setDisplayCount(3); // Desktop: show 3
            }
        };

        // Set initial value
        handleResize();

        // Add event listener for window resizing
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Then replace the existing displayedTestimonials calculation (lines 127-139) with this:
    const displayedTestimonials = [];
    for (let i = 0; i < displayCount; i++) {
        const index = (currentIndex + i) % testimonials.length;
        displayedTestimonials.push(testimonials[index]);
    }

    return (
        <section id="testimonials" ref={sectionRef} className="py-16 relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            {/* Sophisticated background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Subtle patterns */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23667eea' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    }}
                ></div>

                {/* Soft gradient blobs */}
                <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-100/10 to-indigo-200/5 rounded-[40%] blur-3xl"></div>
                <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tr from-violet-100/10 to-violet-200/5 rounded-[40%] blur-3xl"></div>

                {/* Subtle waves */}
                <svg className="absolute top-0 left-0 right-0 w-full h-48 text-indigo-50" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" fillOpacity="1" d="M0,192L60,176C120,160,240,128,360,133.3C480,139,600,181,720,186.7C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>

                {/* Floating quote marks */}
                <div className="absolute top-20 left-10 opacity-5">
                    <Quote size={80} />
                </div>
                <div className="absolute bottom-20 right-10 opacity-5 transform rotate-180">
                    <Quote size={80} />
                </div>

                {/* Animation keyframes */}
                <style>{`
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.8; }
                        50% { opacity: 1; }
                    }
                    
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    
                    .testimonial-card {
                        opacity: 0;
                        transform: translateY(15px);
                        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                    }
                    
                    .animate-in {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .quote-icon {
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .quote-icon::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
                        transform: translateX(-100%);
                    }
                    
                    .testimonial-card:hover .quote-icon::before {
                        animation: shimmer 2s infinite;
                    }

                    .slider-container {
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .slider-navigation {
                        transition: opacity 0.3s ease;
                    }
                    
                    .slider-container:hover .slider-navigation {
                        opacity: 1;
                    }
                    
                    .pagination-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        transition: all 0.3s ease;
                    }
                    
                    .pagination-dot.active {
                        width: 20px;
                        border-radius: 4px;
                    }
                `}</style>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full mb-3 border border-indigo-100 shadow-sm">Testimonials</span>

                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
                        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Users Say</span>
                    </h2>

                    <p className="text-lg text-gray-500">
                        Don't just take our word for it — hear from developers and businesses who have transformed their work with EEP.
                    </p>
                </div>

                {/* Slider container */}
                <div className="slider-container max-w-6xl mx-auto mb-10"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>

                    {/* Navigation buttons */}
                    <button
                        onClick={goToPrevious}
                        className="slider-navigation absolute z-20 left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-indigo-600 hover:text-indigo-800 focus:outline-none opacity-70 md:opacity-50"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={goToNext}
                        className="slider-navigation absolute z-20 right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-indigo-600 hover:text-indigo-800 focus:outline-none opacity-70 md:opacity-50"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Testimonials */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {displayedTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={`testimonial-slide-${currentIndex}-${index}`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className={`testimonial-card rounded-xl border ${testimonial.border} overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white`}
                            >
                                <div className={`p-1 bg-gradient-to-r ${testimonial.gradient}`}>
                                    <div className="flex justify-between items-center px-4 py-2 bg-white">
                                        <div className="flex items-center">
                                            <div className="relative mr-3">
                                                <img
                                                    src={testimonial.avatar}
                                                    alt={testimonial.author}
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                                />
                                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                                    <div className={`quote-icon rounded-full p-1 ${testimonial.iconColor}`}>
                                                        <Quote size={10} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 text-sm">{testimonial.author}</h4>
                                                <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="text-gray-600 text-sm leading-relaxed">"{testimonial.content}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center items-center space-x-2 mb-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`pagination-dot ${index === currentIndex ? 'bg-indigo-600 active' : 'bg-indigo-200'}`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};