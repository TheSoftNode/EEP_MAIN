"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Partner
{
    image: string;
    name: string;
}

export const PartnersSection: React.FC = () =>
{
    // Partners data based on your actual files
    const partners: Partner[] = [
        { image: "/partners/google.jpeg", name: "Google" },
        { image: "/partners/intercom.jpeg", name: "Intercom" },
        { image: "/partners/microsoft.png", name: "Microsoft" },
        { image: "/partners/mongo.jpeg", name: "MongoDB" },
        { image: "/partners/aws.jpg", name: "AWS" },
        { image: "/partners/biasadra.jpg", name: "Biasadra" },
        { image: "/partners/github.jpeg", name: "GitHub" },
    ];

    const [duplicatedPartners, setDuplicatedPartners] = useState<Partner[]>([]);

    useEffect(() =>
    {
        // Duplicate the partners array to create a seamless loop
        setDuplicatedPartners([...partners, ...partners, ...partners]);
    }, []);

    // Animation variants for the heading
    const headingVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative py-16 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>

            {/* Subtle background details */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.8) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                    }}
                ></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-b from-indigo-500/10 to-purple-600/0 blur-3xl"></div>
            </div>

            {/* Content Container */}
            <div className="container relative z-10 mx-auto px-4 max-w-6xl">
                {/* Section Heading */}
                <motion.div
                    className="text-center mb-12"
                    variants={headingVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <h2 className="text-3xl font-bold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Trusted by Industry Leaders
                        </span>
                    </h2>
                    <div className="mt-2 w-16 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded"></div>
                </motion.div>

                {/* Enhanced Carousel with Larger Images */}
                <div className="w-full overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <motion.div
                            className="flex items-center"
                            animate={{
                                x: [0, -120 * partners.length],
                            }}
                            transition={{
                                x: {
                                    duration: 35,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            }}
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <motion.div
                                    key={`carousel-${index}`}
                                    className="flex-shrink-0 mx-6"
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {/* Card with minimal padding to maximize image size */}
                                    <div className="bg-slate-800/80 backdrop-blur-md border border-indigo-500/30 p-2 rounded-xl shadow-xl w-[180px] h-[100px] flex items-center justify-center group">
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            {/* Top light reflection */}
                                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 via-indigo-600/0 to-purple-600/0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                                            {/* Image fills almost the entire card */}
                                            <img
                                                src={partner.image}
                                                alt={partner.name}
                                                className="max-w-[90%] max-h-[85%] w-auto h-auto object-contain transition-all duration-300 filter brightness-110 group-hover:brightness-125"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;