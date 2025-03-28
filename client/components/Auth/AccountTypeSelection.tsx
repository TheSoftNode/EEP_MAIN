"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight, GraduationCap, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface AccountTypeSelectionProps {
    onSelectAccountType: (type: string) => void;
}

export const AccountTypeSelection: React.FC<AccountTypeSelectionProps> = ({ onSelectAccountType }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
        >
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
                Choose your account type
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Learner account option */}
                <div
                    onClick={() => onSelectAccountType('learner')}
                    className="cursor-pointer relative overflow-hidden group"
                >
                    <Card className="h-full border-2 border-indigo-100 group-hover:border-indigo-300 group-hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-bl-full z-0"></div>

                        <CardHeader className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                                <GraduationCap className="h-7 w-7 text-indigo-600" />
                            </div>
                            <CardTitle className="text-xl">Learner</CardTitle>
                            <CardDescription>
                                For individuals looking to develop AI skills and find opportunities
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="relative z-10">
                            <ul className="space-y-2">
                                <li className="flex items-start text-sm text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                                    <span>Access to AI development workspaces</span>
                                </li>
                                <li className="flex items-start text-sm text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                                    <span>Connect with businesses seeking AI talent</span>
                                </li>
                                <li className="flex items-start text-sm text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                                    <span>Learning resources and skill development</span>
                                </li>
                            </ul>
                        </CardContent>

                        <CardFooter className="pt-0 pb-6">
                            <Button className="w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <span>Join as Learner</span>
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Business account option */}
                <div
                    onClick={() => onSelectAccountType('business')}
                    className="cursor-pointer relative overflow-hidden group"
                >
                    <Card className="h-full border-2 border-indigo-100 group-hover:border-indigo-300 group-hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-bl-full z-0"></div>

                        <CardHeader className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                                <Building className="h-7 w-7 text-indigo-600" />
                            </div>
                            <CardTitle className="text-xl">Business</CardTitle>
                            <CardDescription>
                                For companies looking to hire AI talent and build solutions
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="relative z-10">
                            <ul className="space-y-2">
                                <li className="flex items-start text-sm text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                                    <span>Connect with skilled AI developers</span>
                                </li>
                                <li className="flex items-start text-sm text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                                    <span>Post requirements and find perfect matches</span>
                                </li>
                                <li className="flex items-start text-sm text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                                    <span>Management tools for AI collaboration</span>
                                </li>
                            </ul>
                        </CardContent>

                        <CardFooter className="pt-0 pb-6">
                            <Button className="w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <span>Join as Business</span>
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};
