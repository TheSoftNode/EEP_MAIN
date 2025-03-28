"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    CheckCircle,
    ChevronRight,
    Lock,
    FileText,
    BookOpen,
    Code,
    Brain,
    Cpu,
    Terminal,
    Database,
    Shield,
    Eye,
    TestTube,
    Presentation,
    Download,
    ExternalLink,
    Search,
    ArrowRight,
    Sparkles,
    Clock,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface Module {
    id: number;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'locked';
    progress: number;
    icon: React.ReactNode;
    duration: string;
    tasks: {
        id: number;
        title: string;
        description: string;
        status: 'completed' | 'in-progress' | 'locked';
        duration: string;
        type: 'lesson' | 'exercise' | 'quiz' | 'project';
        resources?: {
            id: number;
            title: string;
            type: string;
            url: string;
        }[];
    }[];
    mentor: {
        id: number;
        name: string;
        avatar?: string;
        initials: string;
        role: string;
    };
    skills: {
        name: string;
        level: number;
    }[];
}

export default function LearningPath() {
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedView, setSelectedView] = useState('modules');

    // Current progress data
    const currentWeek = 6; // Week 6 of 12
    const overallProgress = 45; // 45% complete

    // Mock data for learning modules
    const modules: Module[] = [
        {
            id: 1,
            title: "Development Environment Setup",
            description: "Set up your development environment with the necessary tools and configurations for the AI track.",
            status: 'completed',
            progress: 100,
            icon: <Terminal className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 1,
                    title: "Introduction to Development Tools",
                    description: "Overview of the development tools you'll be using throughout the program.",
                    status: 'completed',
                    duration: "1 hour",
                    type: 'lesson'
                },
                {
                    id: 2,
                    title: "Setting up Node.js and npm",
                    description: "Install and configure Node.js and npm for JavaScript development.",
                    status: 'completed',
                    duration: "2 hours",
                    type: 'exercise',
                    resources: [
                        {
                            id: 1,
                            title: "Node.js Installation Guide",
                            type: "pdf",
                            url: "/resources/node-installation.pdf"
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Git and Version Control",
                    description: "Learn Git basics and set up your GitHub repository.",
                    status: 'completed',
                    duration: "3 hours",
                    type: 'exercise'
                },
                {
                    id: 4,
                    title: "IDE Configuration",
                    description: "Set up and customize VS Code for optimal development.",
                    status: 'completed',
                    duration: "2 hours",
                    type: 'exercise'
                },
                {
                    id: 5,
                    title: "Environment Setup Quiz",
                    description: "Test your knowledge of development environment setup.",
                    status: 'completed',
                    duration: "30 minutes",
                    type: 'quiz'
                }
            ],
            mentor: {
                id: 1,
                name: "Alex Johnson",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ",
                role: "Senior Developer"
            },
            skills: [
                {
                    name: "Development Tools",
                    level: 2
                },
                {
                    name: "Command Line",
                    level: 2
                },
                {
                    name: "Git",
                    level: 2
                },
                {
                    name: "Environment Setup",
                    level: 2
                }
            ]
        },
        {
            id: 2,
            title: "JavaScript & TypeScript Fundamentals",
            description: "Review modern JavaScript and TypeScript concepts essential for AI development.",
            status: 'completed',
            progress: 100,
            icon: <Code className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 6,
                    title: "Modern JavaScript Overview",
                    description: "Overview of ES6+ features and modern JavaScript practices.",
                    status: 'completed',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 7,
                    title: "TypeScript Introduction",
                    description: "Introduction to TypeScript and static typing.",
                    status: 'completed',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 8,
                    title: "Algorithms in JavaScript",
                    description: "Implement common algorithms using JavaScript.",
                    status: 'completed',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 9,
                    title: "TypeScript Type System",
                    description: "Deep dive into TypeScript's type system and advanced features.",
                    status: 'completed',
                    duration: "3 hours",
                    type: 'exercise'
                },
                {
                    id: 10,
                    title: "JavaScript & TypeScript Assessment",
                    description: "Comprehensive assessment of JavaScript and TypeScript skills.",
                    status: 'completed',
                    duration: "1 hour",
                    type: 'quiz'
                }
            ],
            mentor: {
                id: 1,
                name: "Alex Johnson",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ",
                role: "Senior Developer"
            },
            skills: [
                {
                    name: "JavaScript",
                    level: 3
                },
                {
                    name: "TypeScript",
                    level: 3
                },
                {
                    name: "Algorithms",
                    level: 2
                },
                {
                    name: "Data Structures",
                    level: 2
                }
            ]
        },
        {
            id: 3,
            title: "React & Next.js Foundations",
            description: "Build a responsive front-end application using React and Next.js.",
            status: 'completed',
            progress: 100,
            icon: <Code className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 11,
                    title: "React Fundamentals",
                    description: "Introduction to React, components, props, and state.",
                    status: 'completed',
                    duration: "3 hours",
                    type: 'lesson'
                },
                {
                    id: 12,
                    title: "Next.js Introduction",
                    description: "Overview of Next.js and its features for React applications.",
                    status: 'completed',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 13,
                    title: "Building React Components",
                    description: "Create reusable React components with proper architecture.",
                    status: 'completed',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 14,
                    title: "Next.js Routing and Pages",
                    description: "Implement routing and page structure in a Next.js application.",
                    status: 'completed',
                    duration: "3 hours",
                    type: 'exercise'
                },
                {
                    id: 15,
                    title: "Frontend Project",
                    description: "Build a complete responsive dashboard application.",
                    status: 'completed',
                    duration: "8 hours",
                    type: 'project'
                }
            ],
            mentor: {
                id: 2,
                name: "Sarah Wilson",
                avatar: "/avatars/mentor-2.jpg",
                initials: "SW",
                role: "Frontend Specialist"
            },
            skills: [
                {
                    name: "React",
                    level: 3
                },
                {
                    name: "Next.js",
                    level: 3
                },
                {
                    name: "Responsive Design",
                    level: 2
                },
                {
                    name: "Frontend Development",
                    level: 3
                }
            ]
        },
        {
            id: 4,
            title: "Database Design & Implementation",
            description: "Design and implement a database schema for your application using MongoDB.",
            status: 'completed',
            progress: 100,
            icon: <Database className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 16,
                    title: "Database Concepts Overview",
                    description: "Review of database concepts and NoSQL databases.",
                    status: 'completed',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 17,
                    title: "MongoDB Basics",
                    description: "Introduction to MongoDB and document databases.",
                    status: 'completed',
                    duration: "3 hours",
                    type: 'lesson'
                },
                {
                    id: 18,
                    title: "Schema Design Patterns",
                    description: "Learn effective schema design patterns for MongoDB.",
                    status: 'completed',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 19,
                    title: "Data Modeling and Validation",
                    description: "Implement data models with validation using Mongoose.",
                    status: 'completed',
                    duration: "3 hours",
                    type: 'exercise'
                },
                {
                    id: 20,
                    title: "Database Integration Project",
                    description: "Implement a complete database solution for your application.",
                    status: 'completed',
                    duration: "8 hours",
                    type: 'project'
                }
            ],
            mentor: {
                id: 3,
                name: "Michael Chen",
                avatar: "/avatars/mentor-3.jpg",
                initials: "MC",
                role: "Database Expert"
            },
            skills: [
                {
                    name: "MongoDB",
                    level: 3
                },
                {
                    name: "Database Design",
                    level: 3
                },
                {
                    name: "Schema Modeling",
                    level: 2
                },
                {
                    name: "Indexing",
                    level: 2
                }
            ]
        },
        {
            id: 5,
            title: "Frontend Implementation",
            description: "Develop the user interface components for your application with responsive design.",
            status: 'completed',
            progress: 100,
            icon: <Eye className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 21,
                    title: "UI/UX Design Principles",
                    description: "Introduction to UI/UX design principles for AI applications.",
                    status: 'completed',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 22,
                    title: "Component Design Systems",
                    description: "Learn to build and use component design systems.",
                    status: 'completed',
                    duration: "3 hours",
                    type: 'lesson'
                },
                {
                    id: 23,
                    title: "Responsive Layouts",
                    description: "Implement responsive layouts using CSS Grid and Flexbox.",
                    status: 'completed',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 24,
                    title: "State Management Patterns",
                    description: "Implement effective state management in React applications.",
                    status: 'completed',
                    duration: "3 hours",
                    type: 'exercise'
                },
                {
                    id: 25,
                    title: "Frontend Implementation Project",
                    description: "Build a complete frontend for your application.",
                    status: 'completed',
                    duration: "8 hours",
                    type: 'project'
                }
            ],
            mentor: {
                id: 2,
                name: "Sarah Wilson",
                avatar: "/avatars/mentor-2.jpg",
                initials: "SW",
                role: "Frontend Specialist"
            },
            skills: [
                {
                    name: "UI/UX",
                    level: 3
                },
                {
                    name: "Component Design",
                    level: 3
                },
                {
                    name: "CSS/Tailwind",
                    level: 3
                },
                {
                    name: "State Management",
                    level: 3
                }
            ]
        },
        {
            id: 6,
            title: "Building a REST API",
            description: "Create a RESTful API using Node.js and Express with MongoDB integration.",
            status: 'in-progress',
            progress: 40,
            icon: <Code className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 26,
                    title: "REST API Concepts",
                    description: "Introduction to RESTful API design principles.",
                    status: 'completed',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 27,
                    title: "Express.js Fundamentals",
                    description: "Setting up and configuring Express.js for API development.",
                    status: 'completed',
                    duration: "3 hours",
                    type: 'lesson'
                },
                {
                    id: 28,
                    title: "Implementing CRUD Operations",
                    description: "Implement CRUD operations for your API resources.",
                    status: 'in-progress',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 29,
                    title: "Authentication & Authorization",
                    description: "Implement JWT authentication and role-based access control.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 30,
                    title: "API Development Project",
                    description: "Build a complete REST API for your application.",
                    status: 'locked',
                    duration: "8 hours",
                    type: 'project'
                }
            ],
            mentor: {
                id: 1,
                name: "Alex Johnson",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ",
                role: "Senior Developer"
            },
            skills: [
                {
                    name: "Node.js",
                    level: 2
                },
                {
                    name: "Express",
                    level: 2
                },
                {
                    name: "REST API",
                    level: 2
                },
                {
                    name: "Authentication",
                    level: 1
                },
                {
                    name: "MongoDB",
                    level: 2
                }
            ]
        },
        {
            id: 7,
            title: "Authentication & Authorization",
            description: "Implement a comprehensive authentication and authorization system for your application.",
            status: 'locked',
            progress: 0,
            icon: <Shield className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 31,
                    title: "Auth Concepts",
                    description: "Overview of authentication and authorization concepts.",
                    status: 'locked',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 32,
                    title: "JWT Implementation",
                    description: "Implement JWT-based authentication.",
                    status: 'locked',
                    duration: "3 hours",
                    type: 'lesson'
                },
                {
                    id: 33,
                    title: "Role-Based Access Control",
                    description: "Implement role-based access control (RBAC).",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 34,
                    title: "OAuth Integration",
                    description: "Integrate OAuth providers for social login.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 35,
                    title: "Security Project",
                    description: "Implement a complete auth system for your application.",
                    status: 'locked',
                    duration: "8 hours",
                    type: 'project'
                }
            ],
            mentor: {
                id: 3,
                name: "Michael Chen",
                avatar: "/avatars/mentor-3.jpg",
                initials: "MC",
                role: "Database Expert"
            },
            skills: [
                {
                    name: "Authentication",
                    level: 0
                },
                {
                    name: "JWT",
                    level: 0
                },
                {
                    name: "Security",
                    level: 0
                },
                {
                    name: "OAuth",
                    level: 0
                },
                {
                    name: "RBAC",
                    level: 0
                }
            ]
        },
        {
            id: 8,
            title: "AI Integration Basics",
            description: "Learn how to integrate basic AI capabilities into your application.",
            status: 'locked',
            progress: 0,
            icon: <Brain className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 36,
                    title: "AI Integration Overview",
                    description: "Introduction to AI integration approaches.",
                    status: 'locked',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 37,
                    title: "Working with Pre-trained Models",
                    description: "Learn to use pre-trained AI models in your application.",
                    status: 'locked',
                    duration: "3 hours",
                    type: 'lesson'
                },
                {
                    id: 38,
                    title: "API-based AI Services",
                    description: "Integrate third-party AI services via APIs.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 39,
                    title: "Model Deployment Basics",
                    description: "Learn the basics of deploying ML models.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 40,
                    title: "AI Integration Project",
                    description: "Add AI capabilities to your application.",
                    status: 'locked',
                    duration: "8 hours",
                    type: 'project'
                }
            ],
            mentor: {
                id: 4,
                name: "Emily Davis",
                avatar: "/avatars/mentor-4.jpg",
                initials: "ED",
                role: "AI Specialist"
            },
            skills: [
                {
                    name: "AI Integration",
                    level: 0
                },
                {
                    name: "API Usage",
                    level: 0
                },
                {
                    name: "Pre-trained Models",
                    level: 0
                },
                {
                    name: "Cloud AI Services",
                    level: 0
                }
            ]
        },
        {
            id: 9,
            title: "Natural Language Processing",
            description: "Implement natural language processing features in your application.",
            status: 'locked',
            progress: 0,
            icon: <BookOpen className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 41,
                    title: "NLP Fundamentals",
                    description: "Introduction to natural language processing concepts.",
                    status: 'locked',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 42,
                    title: "Text Analysis Techniques",
                    description: "Learn techniques for analyzing and processing text data.",
                    status: 'locked',
                    duration: "3 hours",
                    type: 'lesson'
                },
                {
                    id: 43,
                    title: "Sentiment Analysis",
                    description: "Implement sentiment analysis in your application.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 44,
                    title: "Language Generation",
                    description: "Implement text generation features using language models.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 45,
                    title: "NLP Project",
                    description: "Build an NLP-powered feature for your application.",
                    status: 'locked',
                    duration: "8 hours",
                    type: 'project'
                }
            ],
            mentor: {
                id: 4,
                name: "Emily Davis",
                avatar: "/avatars/mentor-4.jpg",
                initials: "ED",
                role: "AI Specialist"
            },
            skills: [
                {
                    name: "NLP",
                    level: 0
                },
                {
                    name: "Text Analysis",
                    level: 0
                },
                {
                    name: "Language Models",
                    level: 0
                },
                {
                    name: "Sentiment Analysis",
                    level: 0
                }
            ]
        },
        {
            id: 10,
            title: "Computer Vision Integration",
            description: "Add computer vision capabilities to your application.",
            status: 'locked',
            progress: 0,
            icon: <Eye className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 46,
                    title: "Computer Vision Basics",
                    description: "Introduction to computer vision concepts and techniques.",
                    status: 'locked',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 47,
                    title: "Image Processing Fundamentals",
                    description: "Learn fundamental image processing techniques.",
                    status: 'locked',
                    duration: "3 hours",
                    type: 'lesson'
                },
                {
                    id: 48,
                    title: "Object Detection",
                    description: "Implement object detection in your application.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 49,
                    title: "Image Classification",
                    description: "Implement image classification features.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 50,
                    title: "Computer Vision Project",
                    description: "Build a computer vision feature for your application.",
                    status: 'locked',
                    duration: "8 hours",
                    type: 'project'
                }
            ],
            mentor: {
                id: 5,
                name: "David Kim",
                avatar: "/avatars/mentor-5.jpg",
                initials: "DK",
                role: "CV Specialist"
            },
            skills: [
                {
                    name: "Computer Vision",
                    level: 0
                },
                {
                    name: "Image Processing",
                    level: 0
                },
                {
                    name: "Object Detection",
                    level: 0
                },
                {
                    name: "TensorFlow",
                    level: 0
                }
            ]
        },
        {
            id: 11,
            title: "Testing & Deployment",
            description: "Write comprehensive tests for your application and set up a deployment pipeline.",
            status: 'locked',
            progress: 0,
            icon: <TestTube className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 51,
                    title: "Testing Strategies",
                    description: "Overview of testing strategies for full-stack applications.",
                    status: 'locked',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 52,
                    title: "Unit Testing",
                    description: "Write unit tests for your application components.",
                    status: 'locked',
                    duration: "3 hours",
                    type: 'lesson'
                },
                {
                    id: 53,
                    title: "Integration Testing",
                    description: "Implement integration tests for your application.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 54,
                    title: "CI/CD Pipeline Setup",
                    description: "Set up a continuous integration and deployment pipeline.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 55,
                    title: "Deployment Project",
                    description: "Deploy your application to a production environment.",
                    status: 'locked',
                    duration: "8 hours",
                    type: 'project'
                }
            ],
            mentor: {
                id: 3,
                name: "Michael Chen",
                avatar: "/avatars/mentor-3.jpg",
                initials: "MC",
                role: "Database Expert"
            },
            skills: [
                {
                    name: "Testing",
                    level: 0
                },
                {
                    name: "CI/CD",
                    level: 0
                },
                {
                    name: "Deployment",
                    level: 0
                },
                {
                    name: "DevOps",
                    level: 0
                },
                {
                    name: "AWS",
                    level: 0
                }
            ]
        },
        {
            id: 12,
            title: "Final Project & Presentation",
            description: "Complete your final project and prepare a presentation showcasing your work.",
            status: 'locked',
            progress: 0,
            icon: <Presentation className="h-5 w-5" />,
            duration: "1 week",
            tasks: [
                {
                    id: 56,
                    title: "Project Planning",
                    description: "Plan your final project and define its scope.",
                    status: 'locked',
                    duration: "2 hours",
                    type: 'lesson'
                },
                {
                    id: 57,
                    title: "Implementation",
                    description: "Implement your final project according to the plan.",
                    status: 'locked',
                    duration: "16 hours",
                    type: 'project'
                },
                {
                    id: 58,
                    title: "Documentation",
                    description: "Document your project and its features.",
                    status: 'locked',
                    duration: "4 hours",
                    type: 'exercise'
                },
                {
                    id: 59,
                    title: "Presentation Preparation",
                    description: "Prepare a presentation of your project.",
                    status: 'locked',
                    duration: "3 hours",
                    type: 'exercise'
                },
                {
                    id: 60,
                    title: "Final Presentation",
                    description: "Present your project to mentors and peers.",
                    status: 'locked',
                    duration: "1 hour",
                    type: 'project'
                }
            ],
            mentor: {
                id: 1,
                name: "Alex Johnson",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ",
                role: "Senior Developer"
            },
            skills: [
                {
                    name: "Project Management",
                    level: 0
                },
                {
                    name: "Documentation",
                    level: 0
                },
                {
                    name: "Presentation Skills",
                    level: 0
                }
            ]
        }
    ];

    // Filter modules based on search
    const filteredModules = modules.filter(module =>
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.tasks.some(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Calculate current active module
    const activeModule = modules.find(module => module.status === 'in-progress');

    // Get completed modules count
    const completedModules = modules.filter(module => module.status === 'completed');

    // Calculate total learning hours
    const totalHours = modules.reduce((acc, module) => {
        return acc + module.tasks.reduce((taskAcc, task) => {
            const hours = parseFloat(task.duration.split(' ')[0]);
            return taskAcc + hours;
        }, 0);
    }, 0);

    // Group tasks by type for the skills view
    const tasksByType = {
        lessons: modules.flatMap(module => module.tasks.filter(task => task.type === 'lesson')),
        exercises: modules.flatMap(module => module.tasks.filter(task => task.type === 'exercise')),
        projects: modules.flatMap(module => module.tasks.filter(task => task.type === 'project')),
        quizzes: modules.flatMap(module => module.tasks.filter(task => task.type === 'quiz'))
    };

    // Extract all skills from modules
    const allSkills = Array.from(
        new Set(
            modules.flatMap(module =>
                module.skills.map(skill => skill.name)
            )
        )
    );

    // Calculate skill levels
    const skillLevels = allSkills.map(skillName => {
        const relevantSkills = modules.flatMap(module =>
            module.skills.filter(skill => skill.name === skillName)
        );

        const maxLevel = Math.max(...relevantSkills.map(skill => skill.level));
        const progress = (maxLevel / 5) * 100; // Assuming max level is 5

        return {
            name: skillName,
            level: maxLevel,
            progress
        };
    }).sort((a, b) => b.level - a.level);

    return (
        <div className="space-y-6">
            {/* Header and Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Learning Path</h1>
                        <p className="text-gray-500">Your journey through the 12-week AI development program</p>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search modules and lessons..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between mb-2">
                                <span className="text-2xl font-bold">{overallProgress}%</span>
                                <span className="text-sm text-gray-500">Week {currentWeek} of 12</span>
                            </div>
                            <Progress value={overallProgress} className="h-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Completed Modules</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold">{completedModules.length}</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    {((completedModules.length / modules.length) * 100).toFixed(0)}%
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500">Out of {modules.length} total modules</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Current Module</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {activeModule ? (
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Week {currentWeek}</span>
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                            In Progress
                                        </Badge>
                                    </div>
                                    <h3 className="font-semibold truncate">{activeModule.title}</h3>
                                </div>
                            ) : (
                                <div className="text-center py-2">
                                    <p className="text-gray-500">No active module</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Learning Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold">{totalHours.toFixed(0)}</span>
                                <Clock className="h-5 w-5 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-500">
                                Total hours of learning content
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* View Options */}
            <Tabs defaultValue="modules" className="space-y-6" onValueChange={setSelectedView}>
                <TabsList>
                    <TabsTrigger value="modules">Module View</TabsTrigger>
                    <TabsTrigger value="skills">Skills View</TabsTrigger>
                    <TabsTrigger value="roadmap">Roadmap View</TabsTrigger>
                </TabsList>

                {/* Module View */}
                <TabsContent value="modules" className="space-y-6">
                    {/* Current Module */}
                    {activeModule && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                                                Current Module - Week {currentWeek}
                                            </Badge>
                                            <CardTitle className="text-2xl">{activeModule.title}</CardTitle>
                                            <CardDescription className="mt-1">{activeModule.description}</CardDescription>
                                        </div>
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                            {activeModule.progress}% Complete
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                                <Clock className="h-4 w-4 mr-1" />
                                                <span>Duration</span>
                                            </div>
                                            <p className="font-medium">{activeModule.duration}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {activeModule.tasks.reduce((acc, task) => {
                                                    const hours = parseFloat(task.duration.split(' ')[0]);
                                                    return acc + hours;
                                                }, 0).toFixed(1)} total hours
                                            </p>
                                        </div>

                                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                                <BookOpen className="h-4 w-4 mr-1" />
                                                <span>Learning Activities</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">{activeModule.tasks.length} Tasks</p>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                                    <span>{activeModule.tasks.filter(t => t.type === 'lesson').length} Lessons</span>
                                                    <span>•</span>
                                                    <span>{activeModule.tasks.filter(t => t.type === 'exercise').length} Exercises</span>
                                                    <span>•</span>
                                                    <span>{activeModule.tasks.filter(t => t.type === 'project').length} Projects</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                                <User className="h-4 w-4 mr-1" />
                                                <span>Mentor</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Avatar className="h-6 w-6 mr-2">
                                                    <AvatarImage src={activeModule.mentor.avatar} />
                                                    <AvatarFallback className="bg-indigo-100 text-indigo-700">{activeModule.mentor.initials}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{activeModule.mentor.name}</p>
                                                    <p className="text-sm text-gray-500">{activeModule.mentor.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Task List */}
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Module Tasks</h3>
                                        <div className="space-y-3">
                                            {activeModule.tasks.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className={cn(
                                                        "p-3 rounded-lg border",
                                                        task.status === 'completed' && "border-green-200 bg-green-50/50",
                                                        task.status === 'in-progress' && "border-blue-200 bg-blue-50/50",
                                                        task.status === 'locked' && "border-gray-200 bg-gray-50"
                                                    )}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex items-start">
                                                            <div className={cn(
                                                                "w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5",
                                                                task.status === 'completed' && "bg-green-100 text-green-600",
                                                                task.status === 'in-progress' && "bg-blue-100 text-blue-600",
                                                                task.status === 'locked' && "bg-gray-100 text-gray-400"
                                                            )}>
                                                                {task.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                                                                {task.status === 'in-progress' && <Clock className="h-4 w-4" />}
                                                                {task.status === 'locked' && <Lock className="h-4 w-4" />}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium">{task.title}</h4>
                                                                <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Badge
                                                                className={cn(
                                                                    "mr-2",
                                                                    task.type === 'lesson' && "bg-purple-100 text-purple-800 border-purple-200",
                                                                    task.type === 'exercise' && "bg-blue-100 text-blue-800 border-blue-200",
                                                                    task.type === 'quiz' && "bg-amber-100 text-amber-800 border-amber-200",
                                                                    task.type === 'project' && "bg-green-100 text-green-800 border-green-200"
                                                                )}
                                                            >
                                                                {task.type === 'lesson' && "Lesson"}
                                                                {task.type === 'exercise' && "Exercise"}
                                                                {task.type === 'quiz' && "Quiz"}
                                                                {task.type === 'project' && "Project"}
                                                            </Badge>
                                                            <div className="text-sm text-gray-500">
                                                                {task.duration}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {task.status !== 'locked' && (
                                                        <div className="mt-2 flex justify-end">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className={cn(
                                                                    task.status === 'completed' && "text-green-600 border-green-200 hover:bg-green-50",
                                                                    task.status === 'in-progress' && "text-blue-600 border-blue-200 hover:bg-blue-50"
                                                                )}
                                                                asChild
                                                            >
                                                                <Link href={`/dashboard/learning/${activeModule.id}/tasks/${task.id}`}>
                                                                    {task.status === 'completed' ? "Review" : "Continue"}
                                                                    <ChevronRight className="h-4 w-4 ml-1" />
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Skills in this module */}
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Skills You'll Learn</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {activeModule.skills.map((skill) => (
                                                <div key={skill.name} className="p-3 rounded-lg border border-gray-200">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <h4 className="font-medium">{skill.name}</h4>
                                                        <span className="text-xs text-gray-500">Level {skill.level}/5</span>
                                                    </div>
                                                    <Progress value={(skill.level / 5) * 100} className="h-1.5" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end border-t pt-4">
                                    <Button asChild>
                                        <Link href={`/dashboard/learning/${activeModule.id}`}>
                                            Continue Learning
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    )}

                    {/* All Modules */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">All Modules</h2>

                            {searchQuery && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSearchQuery('')}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Clear Search
                                </Button>
                            )}
                        </div>

                        {filteredModules.length === 0 ? (
                            <Card className="py-8 text-center">
                                <CardContent>
                                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                        <Search className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">No Modules Found</h3>
                                    <p className="text-gray-500">
                                        No modules match your search query "{searchQuery}"
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredModules.map((module, index) => (
                                    <motion.div
                                        key={module.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Card
                                            className={cn(
                                                module.status === 'completed' && "border-green-200",
                                                module.status === 'in-progress' && "border-blue-200",
                                                module.status === 'locked' && "border-gray-200 bg-gray-50/50"
                                            )}
                                        >
                                            <CardContent className="p-0">
                                                <div className="flex flex-col md:flex-row">
                                                    {/* Module Status Indicator */}
                                                    <div
                                                        className={cn(
                                                            "w-full md:w-1 flex-shrink-0",
                                                            module.status === 'completed' && "bg-green-500",
                                                            module.status === 'in-progress' && "bg-blue-500",
                                                            module.status === 'locked' && "bg-gray-300"
                                                        )}
                                                    >
                                                    </div>

                                                    <div className="p-4 md:p-6 flex-1">
                                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                            <div>
                                                                <Badge
                                                                    className={cn(
                                                                        "mb-2",
                                                                        module.status === 'completed' && "bg-green-100 text-green-800 border-green-200",
                                                                        module.status === 'in-progress' && "bg-blue-100 text-blue-800 border-blue-200",
                                                                        module.status === 'locked' && "bg-gray-100 text-gray-800 border-gray-200"
                                                                    )}
                                                                >
                                                                    Week {modules.indexOf(module) + 1}
                                                                </Badge>
                                                                <h3 className="text-lg font-semibold flex items-center">
                                                                    <span className="mr-2">{module.title}</span>
                                                                    {module.status === 'locked' && <Lock className="h-4 w-4 text-gray-400" />}
                                                                </h3>
                                                                <p className="text-gray-500 mt-1 line-clamp-2">{module.description}</p>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-sm text-gray-500">Progress</span>
                                                                    <span className="text-sm font-medium">{module.progress}%</span>
                                                                </div>
                                                                <Progress value={module.progress} className="h-1.5 w-32" />
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-1 mt-3">
                                                            {module.skills.slice(0, 3).map((skill) => (
                                                                <Badge
                                                                    key={skill.name}
                                                                    variant="secondary"
                                                                    className={cn(
                                                                        "bg-gray-100 text-gray-700 hover:bg-gray-200 border-none text-xs",
                                                                        module.status === 'locked' && "opacity-60"
                                                                    )}
                                                                >
                                                                    {skill.name}
                                                                </Badge>
                                                            ))}
                                                            {module.skills.length > 3 && (
                                                                <Badge
                                                                    variant="secondary"
                                                                    className={cn(
                                                                        "bg-gray-100 text-gray-700 hover:bg-gray-200 border-none text-xs",
                                                                        module.status === 'locked' && "opacity-60"
                                                                    )}
                                                                >
                                                                    +{module.skills.length - 3} more
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="mt-4 flex items-center justify-between">
                                                            <div className="flex items-center text-sm text-gray-500">
                                                                <div className="flex items-center mr-4">
                                                                    <Clock className="h-4 w-4 mr-1" />
                                                                    <span>{module.duration}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <BookOpen className="h-4 w-4 mr-1" />
                                                                    <span>{module.tasks.length} Tasks</span>
                                                                </div>
                                                            </div>

                                                            <Button
                                                                variant={module.status === 'locked' ? "outline" : "default"}
                                                                size="sm"
                                                                disabled={module.status === 'locked'}
                                                                asChild
                                                            >
                                                                <Link href={`/dashboard/learning/${module.id}`}>
                                                                    {module.status === 'completed' ? "Review" :
                                                                        module.status === 'in-progress' ? "Continue" :
                                                                            "Locked"}
                                                                    {module.status !== 'locked' && <ChevronRight className="h-4 w-4 ml-1" />}
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* Skills View */}
                <TabsContent value="skills">
                    <div className="space-y-6">
                        {/* Top Skills */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Skills Progress</CardTitle>
                                <CardDescription>
                                    Track your development across various technical skills
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {skillLevels.map((skill) => (
                                        <div key={skill.name} className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-medium">{skill.name}</h3>
                                                <Badge
                                                    className={cn(
                                                        skill.level === 0 && "bg-gray-100 text-gray-700",
                                                        skill.level === 1 && "bg-blue-100 text-blue-700",
                                                        skill.level === 2 && "bg-indigo-100 text-indigo-700",
                                                        skill.level === 3 && "bg-violet-100 text-violet-700",
                                                        skill.level >= 4 && "bg-purple-100 text-purple-700"
                                                    )}
                                                >
                                                    Level {skill.level}
                                                </Badge>
                                            </div>
                                            <Progress value={skill.progress} className="h-2 mb-3" />

                                            <div className="flex -mx-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={cn(
                                                            "h-1 flex-1 mx-1 rounded-full",
                                                            i < skill.level ? "bg-indigo-500" : "bg-gray-200"
                                                        )}
                                                    ></div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                <span>Beginner</span>
                                                <span>Intermediate</span>
                                                <span>Advanced</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Learning Content by Type */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Learning Content</CardTitle>
                                <CardDescription>
                                    Browse content by type across all modules
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="lessons">
                                    <TabsList className="w-full">
                                        <TabsTrigger value="lessons" className="flex-1">Lessons ({tasksByType.lessons.length})</TabsTrigger>
                                        <TabsTrigger value="exercises" className="flex-1">Exercises ({tasksByType.exercises.length})</TabsTrigger>
                                        <TabsTrigger value="projects" className="flex-1">Projects ({tasksByType.projects.length})</TabsTrigger>
                                        <TabsTrigger value="quizzes" className="flex-1">Quizzes ({tasksByType.quizzes.length})</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="lessons" className="mt-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {tasksByType.lessons.slice(0, 6).map((task) => (
                                                <div
                                                    key={task.id}
                                                    className={cn(
                                                        "flex p-3 rounded-lg border",
                                                        task.status === 'completed' && "border-green-200 bg-green-50/50",
                                                        task.status === 'in-progress' && "border-blue-200 bg-blue-50/50",
                                                        task.status === 'locked' && "border-gray-200 bg-gray-50/50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                                                        task.status === 'completed' && "bg-green-100 text-green-600",
                                                        task.status === 'in-progress' && "bg-blue-100 text-blue-600",
                                                        task.status === 'locked' && "bg-gray-100 text-gray-400"
                                                    )}>
                                                        <BookOpen className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">{task.title}</h4>
                                                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{task.description}</p>
                                                        <div className="flex items-center mt-1 text-xs text-gray-500">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            <span>{task.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="text-center">
                                            <Button variant="outline" size="sm">
                                                View All Lessons
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="exercises" className="mt-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {tasksByType.exercises.slice(0, 6).map((task) => (
                                                <div
                                                    key={task.id}
                                                    className={cn(
                                                        "flex p-3 rounded-lg border",
                                                        task.status === 'completed' && "border-green-200 bg-green-50/50",
                                                        task.status === 'in-progress' && "border-blue-200 bg-blue-50/50",
                                                        task.status === 'locked' && "border-gray-200 bg-gray-50/50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                                                        task.status === 'completed' && "bg-green-100 text-green-600",
                                                        task.status === 'in-progress' && "bg-blue-100 text-blue-600",
                                                        task.status === 'locked' && "bg-gray-100 text-gray-400"
                                                    )}>
                                                        <Code className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">{task.title}</h4>
                                                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{task.description}</p>
                                                        <div className="flex items-center mt-1 text-xs text-gray-500">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            <span>{task.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="text-center">
                                            <Button variant="outline" size="sm">
                                                View All Exercises
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="projects" className="mt-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {tasksByType.projects.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className={cn(
                                                        "flex p-3 rounded-lg border",
                                                        task.status === 'completed' && "border-green-200bg-green-50/50",
                                                        task.status === 'in-progress' && "border-blue-200 bg-blue-50/50",
                                                        task.status === 'locked' && "border-gray-200 bg-gray-50/50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                                                        task.status === 'completed' && "bg-green-100 text-green-600",
                                                        task.status === 'in-progress' && "bg-blue-100 text-blue-600",
                                                        task.status === 'locked' && "bg-gray-100 text-gray-400"
                                                    )}>
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">{task.title}</h4>
                                                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{task.description}</p>
                                                        <div className="flex items-center mt-1 text-xs text-gray-500">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            <span>{task.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="quizzes" className="mt-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {tasksByType.quizzes.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className={cn(
                                                        "flex p-3 rounded-lg border",
                                                        task.status === 'completed' && "border-green-200 bg-green-50/50",
                                                        task.status === 'in-progress' && "border-blue-200 bg-blue-50/50",
                                                        task.status === 'locked' && "border-gray-200 bg-gray-50/50"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                                                        task.status === 'completed' && "bg-green-100 text-green-600",
                                                        task.status === 'in-progress' && "bg-blue-100 text-blue-600",
                                                        task.status === 'locked' && "bg-gray-100 text-gray-400"
                                                    )}>
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">{task.title}</h4>
                                                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{task.description}</p>
                                                        <div className="flex items-center mt-1 text-xs text-gray-500">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            <span>{task.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Roadmap View */}
                <TabsContent value="roadmap">
                    <Card>
                        <CardHeader>
                            <CardTitle>Program Roadmap</CardTitle>
                            <CardDescription>
                                Visual representation of your 12-week learning journey
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {modules.map((module, index) => (
                                    <div key={module.id} className="relative">
                                        {/* Connecting line */}
                                        {index < modules.length - 1 && (
                                            <div className="absolute top-14 left-6 bottom-0 w-0.5 bg-gray-200"></div>
                                        )}

                                        <div className="flex">
                                            <div className="relative z-10">
                                                <div
                                                    className={cn(
                                                        "w-12 h-12 rounded-full flex items-center justify-center",
                                                        module.status === 'completed' && "bg-green-100 text-green-600 border-4 border-green-200",
                                                        module.status === 'in-progress' && "bg-blue-100 text-blue-600 border-4 border-blue-200",
                                                        module.status === 'locked' && "bg-gray-100 text-gray-400 border-4 border-gray-200"
                                                    )}
                                                >
                                                    {module.status === 'completed' && <CheckCircle className="h-6 w-6" />}
                                                    {module.status === 'in-progress' && module.icon}
                                                    {module.status === 'locked' && <Lock className="h-5 w-5" />}
                                                </div>
                                            </div>

                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center">
                                                    <Badge
                                                        className={cn(
                                                            "mr-2",
                                                            module.status === 'completed' && "bg-green-100 text-green-800 border-green-200",
                                                            module.status === 'in-progress' && "bg-blue-100 text-blue-800 border-blue-200",
                                                            module.status === 'locked' && "bg-gray-100 text-gray-800 border-gray-200"
                                                        )}
                                                    >
                                                        Week {index + 1}
                                                    </Badge>
                                                    <h3 className={cn(
                                                        "font-semibold",
                                                        module.status === 'locked' && "text-gray-500"
                                                    )}>
                                                        {module.title}
                                                    </h3>
                                                </div>

                                                <p className={cn(
                                                    "text-sm mt-1",
                                                    module.status === 'locked' ? "text-gray-400" : "text-gray-600"
                                                )}>
                                                    {module.description}
                                                </p>

                                                <div className="mt-2 flex items-center">
                                                    <div className="text-xs text-gray-500 flex items-center mr-4">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        <span>{module.duration}</span>
                                                    </div>
                                                    {module.status !== 'locked' && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className={cn(
                                                                module.status === 'completed' && "text-green-600 hover:text-green-700 hover:bg-green-50",
                                                                module.status === 'in-progress' && "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                            )}
                                                            asChild
                                                        >
                                                            <Link href={`/dashboard/learning/${module.id}`}>
                                                                {module.status === 'completed' ? 'Review' : 'Continue'}
                                                                <ChevronRight className="h-4 w-4 ml-1" />
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="ml-4 self-center min-w-[80px] text-right">
                                                {module.status !== 'locked' && (
                                                    <div>
                                                        <span className={cn(
                                                            "font-medium",
                                                            module.status === 'completed' ? "text-green-600" : "text-blue-600"
                                                        )}>
                                                            {module.progress}%
                                                        </span>
                                                        <Progress
                                                            value={module.progress}
                                                            className={cn(
                                                                "h-1.5 mt-1",
                                                                module.status === 'completed' && "bg-green-100",
                                                                module.status === 'in-progress' && "bg-blue-100"
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Certificate Goal */}
                            <div className="mt-8 p-4 border border-dashed border-indigo-300 rounded-lg bg-indigo-50">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <Sparkles className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-semibold text-indigo-900">Program Completion Goal</h3>
                                        <p className="text-sm text-indigo-700">
                                            Complete all modules to earn your AI Development Certification
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}