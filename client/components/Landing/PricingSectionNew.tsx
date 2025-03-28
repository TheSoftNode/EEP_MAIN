import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles, Shield, Clock, Users, Zap, Award, Mail, Building, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PricingSectionNew: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    // Animation effect for pricing cards
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

    //     const cardElements = document.querySelectorAll('.pricing-card');
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

        const cardElements = document.querySelectorAll('.pricing-card');
        cardElements.forEach(el => observer.observe(el));

        // Use disconnect() instead for safer cleanup
        return () => {
            observer.disconnect();
        };
    }, []);

    const plans = [
        {
            name: "Developer Program",
            price: "€700",
            period: "for 3 months",
            description: "For developers looking to accelerate their skills with AI-assisted guidance",
            features: [
                { text: "Complete application review within 2 weeks", icon: <Clock className="h-4 w-4" /> },
                { text: "AI-powered workspace & project guidance", icon: <Sparkles className="h-4 w-4" /> },
                { text: "Interactive milestone tracking", icon: <CheckCircle className="h-4 w-4" /> },
                { text: "Real-time mentor interaction", icon: <Users className="h-4 w-4" /> },
                { text: "Step-by-step development assistance", icon: <Zap className="h-4 w-4" /> },
                { text: "EEP assistant bot for code acceleration", icon: <Shield className="h-4 w-4" /> }
            ],
            cta: "Apply Now",
            icon: <GraduationCap className="h-6 w-6" />,
            highlighted: true,
            gradientFrom: "from-indigo-600",
            gradientTo: "to-violet-600",
            iconGradient: "from-indigo-200 to-violet-200"
        },
        {
            name: "Enterprise Solutions",
            price: "Custom",
            period: "pricing",
            description: "For businesses seeking tailored AI development partnerships",
            features: [
                { text: "Custom AI solution development", icon: <Sparkles className="h-4 w-4" /> },
                { text: "Dedicated account manager", icon: <Users className="h-4 w-4" /> },
                { text: "Priority support channels", icon: <Zap className="h-4 w-4" /> },
                { text: "Enterprise-grade security", icon: <Shield className="h-4 w-4" /> },
                { text: "Customized implementation", icon: <CheckCircle className="h-4 w-4" /> },
                { text: "Ongoing maintenance & support", icon: <Award className="h-4 w-4" /> }
            ],
            cta: "Contact Sales",
            icon: <Building className="h-6 w-6" />,
            highlighted: false,
            gradientFrom: "from-purple-600",
            gradientTo: "to-pink-600",
            iconGradient: "from-purple-200 to-pink-200"
        }
    ];

    return (
        <section id="pricing" ref={sectionRef} className="py-10 relative overflow-hidden bg-slate-100/80">
            {/* Advanced sophisticated background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Subtle light gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/20 via-slate-200/30 to-slate-100/20"></div>

                {/* Glass morphism effect */}
                <div className="absolute inset-0 backdrop-blur-[100px]"></div>

                {/* Complex grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                {/* Sophisticated wave patterns */}
                <svg className="absolute w-full" style={{ top: '10%' }} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgba(79, 70, 229, 0.03)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,186.7C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                <svg className="absolute w-full" style={{ bottom: '10%', transform: 'rotate(180deg)' }} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgba(139, 92, 246, 0.03)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,186.7C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                {/* Advanced geometric elements */}
                <div className="absolute inset-0">
                    {/* Triangular prism effect */}
                    <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 transform rotate-45 rounded-lg blur-xl"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 transform -rotate-12 rounded-full blur-xl"></div>

                    {/* Realistic glass spheres */}
                    <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white/20 rounded-full shadow-[inset_10px_-10px_30px_rgba(255,255,255,0.2)] backdrop-blur-sm border border-white/10"></div>
                    <div className="absolute bottom-1/4 right-1/5 w-12 h-12 bg-white/10 rounded-full shadow-[inset_10px_-10px_20px_rgba(255,255,255,0.15)] backdrop-blur-sm border border-white/10"></div>

                    {/* Linear accents */}
                    <div className="absolute top-40 left-1/3 w-64 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent rotate-[30deg]"></div>
                    <div className="absolute bottom-40 right-1/3 w-72 h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent -rotate-[20deg]"></div>
                </div>

                {/* Animation keyframes */}
                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    
                    .pricing-card {
                        opacity: 0;
                        transform: translateY(10px);
                        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
                    }
                    
                    .animate-in {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .hover-lift {
                        transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
                    }
                    
                    .hover-lift:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
                    }
                    
                    .feature-icon {
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .feature-icon::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
                        transform: translateX(-100%);
                    }
                    
                    .pricing-card:hover .feature-icon::before {
                        animation: shimmer 2s infinite;
                    }
                `}</style>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-white rounded-full mb-2 border border-indigo-100 shadow-sm">Join Our Program</span>

                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Development Path</span>
                    </h2>

                    <p className="text-base text-gray-600">
                        Advanced AI-powered tools and mentorship to accelerate your development journey
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-card hover-lift rounded-xl overflow-hidden ${plan.highlighted
                                ? 'relative z-10 ring-2 ring-indigo-600 shadow-lg'
                                : 'border border-gray-200 shadow-sm'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {plan.highlighted && (
                                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-22 h-22 overflow-hidden">
                                    <div className="absolute transform rotate-45 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium py-1 right-[-35px] top-[15px] w-[150px] text-center text-xs shadow-md">
                                        Featured
                                    </div>
                                </div>
                            )}

                            <div className={`p-4 ${plan.highlighted ? 'bg-gradient-to-br from-indigo-50 to-violet-50 border-b border-indigo-100/50' : 'bg-white border-b border-gray-100'}`}>
                                <div className="flex items-center mb-2">
                                    <div className={`flex-shrink-0 p-1.5 rounded-full bg-gradient-to-br ${plan.iconGradient} bg-opacity-50 mr-2`}>
                                        <div className={`flex items-center justify-center h-5 w-5 rounded-full text-white bg-gradient-to-br ${plan.gradientFrom} ${plan.gradientTo}`}>
                                            {plan.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                </div>

                                <div className="mt-2 flex items-baseline">
                                    <span className={`text-2xl font-extrabold ${plan.highlighted ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600' : 'text-gray-900'}`}>
                                        {plan.price}
                                    </span>
                                    <span className="ml-1 text-base font-medium text-gray-500">{plan.period}</span>
                                </div>

                                <p className="mt-2 text-xs sm:text-sm text-gray-500">{plan.description}</p>
                            </div>

                            <div className="px-4 py-4 bg-white">
                                <ul className="space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start group">
                                            <div className={`flex-shrink-0 feature-icon p-0.5 rounded-full bg-gradient-to-br ${plan.iconGradient} bg-opacity-50`}>
                                                <div className={`flex items-center justify-center h-3.5 w-3.5 rounded-full text-white bg-gradient-to-br ${plan.gradientFrom} ${plan.gradientTo}`}>
                                                    {feature.icon}
                                                </div>
                                            </div>
                                            <p className="ml-2 text-xs sm:text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{feature.text}</p>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4">
                                    <Button
                                        onClick={() => router.push("/application")}
                                        className={`w-full shadow-sm text-xs sm:text-sm ${plan.highlighted
                                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-indigo-500/10'
                                            : 'bg-slate-800 hover:bg-slate-900'
                                            }`}
                                        variant="default"
                                    >
                                        {plan.cta}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-10 text-center">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Assessment & Hiring Policy
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4">
                            Upon program completion, participants are evaluated based on assessment scores
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/50">
                                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mb-1">90%+</div>
                                <p className="text-xs text-gray-700">Direct hiring by HitoAI Limited or industry partners</p>
                            </div>

                            <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/50">
                                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mb-1">80-90%</div>
                                <p className="text-xs text-gray-700">Certificate of Achievement and job support through our network</p>
                            </div>

                            <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/50">
                                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mb-1">70-80%</div>
                                <p className="text-xs text-gray-700">Eligible for an internship upon written request</p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Button
                                onClick={() => router.push("/application")}
                                className="whitespace-nowrap text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                                variant="default"
                            >
                                Apply Now
                            </Button>
                            <Button
                                onClick={() => router.push("/contact")}
                                className="whitespace-nowrap text-xs sm:text-sm border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                variant="outline"
                            >
                                <Mail className="h-3 w-3 mr-1" />
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};