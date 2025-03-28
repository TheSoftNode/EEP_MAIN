"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    CalendarCheck,
    Clock,
    ChevronRight,
    Download,
    Upload,
    FileText,
    MessageCircle,
    CheckCircle,
    XCircle,
    AlertCircle,
    Calendar,
    PanelRight,
    Eye,
    Paperclip,
    Send,
    ChevronDown,
    Sparkles,
    BookOpen,
    Code,
    HeartHandshake,
    Brain,
    Users,
    Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

// Type definitions
interface Task {
    id: number;
    week: number;
    title: string;
    description: string;
    status: 'upcoming' | 'in-progress' | 'submitted' | 'completed' | 'overdue';
    dueDate: string;
    submissionDate?: string;
    grade?: number;
    feedback?: string;
    resources: {
        id: number;
        title: string;
        type: string;
        url: string;
    }[];
    submission?: {
        files: {
            id: number;
            name: string;
            size: string;
            type: string;
            url: string;
        }[];
        notes: string;
    };
    mentor: {
        id: number;
        name: string;
        avatar?: string;
        initials: string;
    };
    skills: string[];
}

export default function WeeklyTasks() {
    // State
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [submissionComment, setSubmissionComment] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock data for weekly tasks
    const tasks: Task[] = [
        {
            id: 1,
            week: 1,
            title: "Development Environment Setup",
            description: "Set up your development environment with the necessary tools and configurations for the AI track. This includes installing Node.js, setting up Git, configuring your IDE, and initializing a starter project.",
            status: 'completed',
            dueDate: '2025-01-15',
            submissionDate: '2025-01-14',
            grade: 95,
            feedback: "Excellent work setting up your environment. Your documentation was thorough and all required tools were correctly installed. For future work, consider adding Docker to your environment setup.",
            resources: [
                {
                    id: 1,
                    title: "Development Environment Guide",
                    type: "pdf",
                    url: "/resources/dev-environment-guide.pdf"
                },
                {
                    id: 2,
                    title: "VS Code Setup Tutorial",
                    type: "video",
                    url: "https://example.com/vscode-setup"
                }
            ],
            submission: {
                files: [
                    {
                        id: 1,
                        name: "environment-setup.zip",
                        size: "1.2MB",
                        type: "application/zip",
                        url: "/submissions/week1/environment-setup.zip"
                    },
                    {
                        id: 2,
                        name: "setup-documentation.pdf",
                        size: "420KB",
                        type: "application/pdf",
                        url: "/submissions/week1/setup-documentation.pdf"
                    }
                ],
                notes: "I've completed the environment setup according to the specifications. I've included screenshots of all installed tools and their versions in the documentation PDF."
            },
            mentor: {
                id: 1,
                name: "Alex Johnson",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ"
            },
            skills: ["Development Tools", "Command Line", "Git", "Environment Setup"]
        },
        {
            id: 2,
            week: 2,
            title: "JavaScript & TypeScript Fundamentals",
            description: "Review modern JavaScript and TypeScript concepts essential for AI development. Implement basic algorithms and data structures to demonstrate your understanding of these languages.",
            status: 'completed',
            dueDate: '2025-01-22',
            submissionDate: '2025-01-20',
            grade: 88,
            feedback: "Good work on your JavaScript implementations. Your TypeScript type definitions could use some improvement - particularly with generics and utility types. The algorithm implementations were correct but consider performance optimization.",
            resources: [
                {
                    id: 3,
                    title: "Modern JavaScript Guide",
                    type: "pdf",
                    url: "/resources/modern-js-guide.pdf"
                },
                {
                    id: 4,
                    title: "TypeScript Deep Dive",
                    type: "article",
                    url: "https://example.com/typescript-deep-dive"
                }
            ],
            submission: {
                files: [
                    {
                        id: 3,
                        name: "js-ts-fundamentals.zip",
                        size: "2.1MB",
                        type: "application/zip",
                        url: "/submissions/week2/js-ts-fundamentals.zip"
                    }
                ],
                notes: "Implemented all the required algorithms in both JavaScript and TypeScript. Added type safety to all functions and created reusable utility types."
            },
            mentor: {
                id: 1,
                name: "Alex Johnson",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ"
            },
            skills: ["JavaScript", "TypeScript", "Algorithms", "Data Structures"]
        },
        {
            id: 3,
            week: 3,
            title: "React & Next.js Foundations",
            description: "Build a responsive front-end application using React and Next.js. Implement key features like routing, state management, and API integration.",
            status: 'completed',
            dueDate: '2025-01-29',
            submissionDate: '2025-01-28',
            grade: 92,
            feedback: "Excellent React application with clean component architecture. Your state management approach with hooks was well implemented. The UI is responsive and accessible. Consider adding more comprehensive testing for your components.",
            resources: [
                {
                    id: 5,
                    title: "React Hooks In-Depth",
                    type: "article",
                    url: "https://example.com/react-hooks"
                },
                {
                    id: 6,
                    title: "Next.js Routing Tutorial",
                    type: "video",
                    url: "https://example.com/nextjs-routing"
                }
            ],
            submission: {
                files: [
                    {
                        id: 4,
                        name: "react-nextjs-app.zip",
                        size: "4.5MB",
                        type: "application/zip",
                        url: "/submissions/week3/react-nextjs-app.zip"
                    }
                ],
                notes: "Built a responsive dashboard application with Next.js. Implemented custom hooks for data fetching and state management. Added dark mode support and keyboard navigation for accessibility."
            },
            mentor: {
                id: 2,
                name: "Sarah Wilson",
                avatar: "/avatars/mentor-2.jpg",
                initials: "SW"
            },
            skills: ["React", "Next.js", "Responsive Design", "Frontend Development"]
        },
        {
            id: 4,
            week: 4,
            title: "Database Design & Implementation",
            description: "Design and implement a database schema for your application. Set up MongoDB with proper data models, validation, and query optimization.",
            status: 'completed',
            dueDate: '2025-02-05',
            submissionDate: '2025-02-03',
            grade: 85,
            feedback: "Your database schema is well-structured with appropriate relationships. The MongoDB implementation works correctly, but your indexing strategy could be improved for better query performance. Consider adding more validation rules to your schemas.",
            resources: [
                {
                    id: 7,
                    title: "MongoDB Schema Design Patterns",
                    type: "pdf",
                    url: "/resources/mongodb-schema-design.pdf"
                },
                {
                    id: 8,
                    title: "Database Indexing Strategies",
                    type: "article",
                    url: "https://example.com/db-indexing"
                }
            ],
            submission: {
                files: [
                    {
                        id: 5,
                        name: "database-implementation.zip",
                        size: "1.8MB",
                        type: "application/zip",
                        url: "/submissions/week4/database-implementation.zip"
                    },
                    {
                        id: 6,
                        name: "schema-documentation.pdf",
                        size: "520KB",
                        type: "application/pdf",
                        url: "/submissions/week4/schema-documentation.pdf"
                    }
                ],
                notes: "Implemented MongoDB database with Mongoose. Created schemas with validation and custom methods. Set up indexes for frequently queried fields. Included test data and query examples."
            },
            mentor: {
                id: 3,
                name: "Michael Chen",
                avatar: "/avatars/mentor-3.jpg",
                initials: "MC"
            },
            skills: ["MongoDB", "Database Design", "Schema Modeling", "Indexing"]
        },
        {
            id: 5,
            week: 5,
            title: "Frontend Implementation",
            description: "Develop the user interface components for your application. Implement responsive design, state management, and user interactions.",
            status: 'completed',
            dueDate: '2025-02-12',
            submissionDate: '2025-02-10',
            grade: 90,
            feedback: "Your UI implementation is excellent with clean component architecture and consistent styling. The responsive design works well across different device sizes. Consider implementing more advanced animations and transitions for a more polished user experience.",
            resources: [
                {
                    id: 9,
                    title: "Advanced Component Patterns",
                    type: "article",
                    url: "https://example.com/component-patterns"
                },
                {
                    id: 10,
                    title: "Responsive Design Workshop",
                    type: "video",
                    url: "https://example.com/responsive-design"
                }
            ],
            submission: {
                files: [
                    {
                        id: 7,
                        name: "frontend-implementation.zip",
                        size: "5.2MB",
                        type: "application/zip",
                        url: "/submissions/week5/frontend-implementation.zip"
                    }
                ],
                notes: "Implemented all UI components using a component library. Added responsive design with mobile-first approach. Implemented state management with Context API and custom hooks."
            },
            mentor: {
                id: 2,
                name: "Sarah Wilson",
                avatar: "/avatars/mentor-2.jpg",
                initials: "SW"
            },
            skills: ["UI/UX", "Component Design", "CSS/Tailwind", "State Management"]
        },
        {
            id: 6,
            week: 6,
            title: "Build a REST API",
            description: "Create a RESTful API using Node.js and Express with MongoDB integration. Implement CRUD operations, authentication, and error handling.",
            status: 'in-progress',
            dueDate: '2025-02-19',
            resources: [
                {
                    id: 11,
                    title: "RESTful API Design Principles",
                    type: "pdf",
                    url: "/resources/rest-api-design.pdf"
                },
                {
                    id: 12,
                    title: "Express.js Authentication",
                    type: "article",
                    url: "https://example.com/express-auth"
                }
            ],
            mentor: {
                id: 1,
                name: "Alex Johnson",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ"
            },
            skills: ["Node.js", "Express", "REST API", "Authentication", "MongoDB"]
        },
        {
            id: 7,
            week: 7,
            title: "Authentication & Authorization",
            description: "Implement a comprehensive authentication and authorization system for your application. Set up JWT, role-based access control, and secure password management.",
            status: 'upcoming',
            dueDate: '2025-02-26',
            resources: [
                {
                    id: 13,
                    title: "JWT Authentication Guide",
                    type: "pdf",
                    url: "/resources/jwt-auth-guide.pdf"
                },
                {
                    id: 14,
                    title: "Role-Based Access Control",
                    type: "article",
                    url: "https://example.com/rbac"
                }
            ],
            mentor: {
                id: 3,
                name: "Michael Chen",
                avatar: "/avatars/mentor-3.jpg",
                initials: "MC"
            },
            skills: ["Authentication", "JWT", "Security", "OAuth", "RBAC"]
        },
        {
            id: 8,
            week: 8,
            title: "AI Integration Basics",
            description: "Learn how to integrate basic AI capabilities into your application. Work with pre-trained models and third-party AI services.",
            status: 'upcoming',
            dueDate: '2025-03-05',
            resources: [
                {
                    id: 15,
                    title: "AI Integration Fundamentals",
                    type: "pdf",
                    url: "/resources/ai-integration.pdf"
                },
                {
                    id: 16,
                    title: "Using Pre-trained Models",
                    type: "video",
                    url: "https://example.com/pretrained-models"
                }
            ],
            mentor: {
                id: 4,
                name: "Emily Davis",
                avatar: "/avatars/mentor-4.jpg",
                initials: "ED"
            },
            skills: ["AI Integration", "API Usage", "Pre-trained Models", "Cloud AI Services"]
        },
        {
            id: 9,
            week: 9,
            title: "Natural Language Processing",
            description: "Implement natural language processing features in your application. Work with text analysis, sentiment detection, and language generation.",
            status: 'upcoming',
            dueDate: '2025-03-12',
            resources: [
                {
                    id: 17,
                    title: "NLP Techniques & Applications",
                    type: "pdf",
                    url: "/resources/nlp-techniques.pdf"
                },
                {
                    id: 18,
                    title: "Implementing Language Models",
                    type: "article",
                    url: "https://example.com/language-models"
                }
            ],
            mentor: {
                id: 4,
                name: "Emily Davis",
                avatar: "/avatars/mentor-4.jpg",
                initials: "ED"
            },
            skills: ["NLP", "Text Analysis", "Language Models", "Sentiment Analysis"]
        },
        {
            id: 10,
            week: 10,
            title: "Computer Vision Integration",
            description: "Add computer vision capabilities to your application. Implement image analysis, object detection, and visual recognition features.",
            status: 'upcoming',
            dueDate: '2025-03-19',
            resources: [
                {
                    id: 19,
                    title: "Computer Vision Fundamentals",
                    type: "pdf",
                    url: "/resources/cv-fundamentals.pdf"
                },
                {
                    id: 20,
                    title: "Object Detection Tutorial",
                    type: "video",
                    url: "https://example.com/object-detection"
                }
            ],
            mentor: {
                id: 5,
                name: "David Kim",
                avatar: "/avatars/mentor-5.jpg",
                initials: "DK"
            },
            skills: ["Computer Vision", "Image Processing", "Object Detection", "TensorFlow"]
        },
        {
            id: 11,
            week: 11,
            title: "Testing & Deployment",
            description: "Write comprehensive tests for your application and set up a deployment pipeline. Implement unit, integration, and end-to-end tests.",
            status: 'upcoming',
            dueDate: '2025-03-26',
            resources: [
                {
                    id: 21,
                    title: "Testing React Applications",
                    type: "pdf",
                    url: "/resources/react-testing.pdf"
                },
                {
                    id: 22,
                    title: "CI/CD Pipeline Setup",
                    type: "article",
                    url: "https://example.com/cicd-pipeline"
                }
            ],
            mentor: {
                id: 3,
                name: "Michael Chen",
                avatar: "/avatars/mentor-3.jpg",
                initials: "MC"
            },
            skills: ["Testing", "CI/CD", "Deployment", "DevOps", "AWS"]
        },
        {
            id: 12,
            week: 12,
            title: "Final Project & Presentation",
            description: "Complete your final project and prepare a presentation showcasing your work. Document your development process and demonstrate all implemented features.",
            status: 'upcoming',
            dueDate: '2025-04-02',
            resources: [
                {
                    id: 23,
                    title: "Technical Presentation Guide",
                    type: "pdf",
                    url: "/resources/tech-presentation.pdf"
                },
                {
                    id: 24,
                    title: "Project Documentation Template",
                    type: "document",
                    url: "/resources/project-doc-template.docx"
                }
            ],
            mentor: {
                id: 1,
                name: "Alex Johnson",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ"
            },
            skills: ["Project Management", "Documentation", "Presentation Skills"]
        }
    ];

    // Calculate the current week
    const currentWeek = 6; // For demonstration purposes

    // Prepare task data for different categories
    const completedTasks = tasks.filter(task => task.status === 'completed');
    const activeTask = tasks.find(task => task.status === 'in-progress');
    const upcomingTasks = tasks.filter(task => task.status === 'upcoming');
    const overdueSubmissions = tasks.filter(task => task.status === 'overdue');

    // Calculate overall progress
    const progressPercentage = Math.round((completedTasks.length / tasks.length) * 100);

    // Handle task selection
    const handleTaskSelect = (task: Task) => {
        setSelectedTask(task);
        setSidebarOpen(true);
    };

    // Handle file uploads
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUploadedFiles(Array.from(e.target.files));
        }
    };

    // Handle task submission
    const handleSubmitTask = async () => {
        if (!selectedTask) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Update the task state to submitted
        const updatedTasks = tasks.map(task => {
            if (task.id === selectedTask.id) {
                return {
                    ...task,
                    status: 'submitted' as const,
                    submissionDate: new Date().toISOString().split('T')[0],
                    submission: {
                        files: uploadedFiles.map((file, index) => ({
                            id: Date.now() + index,
                            name: file.name,
                            size: `${(file.size / 1024).toFixed(1)}KB`,
                            type: file.type,
                            url: URL.createObjectURL(file)
                        })),
                        notes: submissionComment
                    }
                };
            }
            return task;
        });

        // Update local state (in a real app, this would be a server call)
        // setTasks(updatedTasks);
        setIsSubmitting(false);
        setSidebarOpen(false);
        setSubmissionComment('');
        setUploadedFiles([]);
    };

    // Remove a file from the upload list
    const handleRemoveFile = (index: number) => {
        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    };

    // Download resource
    const handleDownloadResource = (resource: { title: string, url: string }) => {
        // In a real app, this would trigger a download
        console.log(`Downloading: ${resource.title} from ${resource.url}`);
    };

    // Sort tasks by week number
    const sortedTasks = [...tasks].sort((a, b) => a.week - b.week);

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
                        <h1 className="text-2xl font-bold tracking-tight">Weekly Tasks</h1>
                        <p className="text-gray-500">Track your progress through the 12-week AI development program</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    View Calendar
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Task Calendar</DialogTitle>
                                    <DialogDescription>
                                        View all task deadlines in calendar format
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="h-96 bg-slate-100 rounded-md flex items-center justify-center">
                                    <p className="text-gray-500 text-sm">Calendar view would be displayed here</p>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Export as PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Export as CSV
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Add to Calendar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between mb-2">
                                <span className="text-2xl font-bold">{progressPercentage}%</span>
                                <span className="text-sm text-gray-500">Week {currentWeek} of 12</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold">{completedTasks.length}</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    {((completedTasks.length / tasks.length) * 100).toFixed(0)}%
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500">Out of {tasks.length} total tasks</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Current Task</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {activeTask ? (
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Week {activeTask.week}</span>
                                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                            In Progress
                                        </Badge>
                                    </div>
                                    <h3 className="font-semibold truncate">{activeTask.title}</h3>
                                </div>
                            ) : (
                                <div className="text-center py-2">
                                    <p className="text-gray-500">No active task</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {activeTask ? (
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold">
                                            {new Date(activeTask.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {Math.ceil((new Date(activeTask.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-2">
                                    <p className="text-gray-500">No upcoming deadline</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* Tabs with different task views */}
            <Tabs defaultValue="all-tasks" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
                    <TabsTrigger value="current-task">Current Task</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>

                {/* All Tasks View */}
                <TabsContent value="all-tasks" className="space-y-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>12-Week Program Overview</CardTitle>
                            <CardDescription>
                                Your AI development journey is divided into 12 weekly tasks and assignments
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {sortedTasks.map((task, index) => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <div
                                            className={cn(
                                                "flex border rounded-lg overflow-hidden cursor-pointer hover:border-gray-300 transition-colors",
                                                task.status === 'completed' && "border-green-200 bg-green-50/50",
                                                task.status === 'in-progress' && "border-blue-200 bg-blue-50/50",
                                                task.status === 'submitted' && "border-purple-200 bg-purple-50/50",
                                                task.status === 'overdue' && "border-red-200 bg-red-50/50",
                                                task.status === 'upcoming' && "border-gray-200"
                                            )}
                                            onClick={() => handleTaskSelect(task)}
                                        >
                                            <div
                                                className={cn(
                                                    "w-1.5 flex-shrink-0",
                                                    task.status === 'completed' && "bg-green-500",
                                                    task.status === 'in-progress' && "bg-blue-500",
                                                    task.status === 'submitted' && "bg-purple-500",
                                                    task.status === 'overdue' && "bg-red-500",
                                                    task.status === 'upcoming' && "bg-gray-300"
                                                )}
                                            ></div>
                                            <div className="flex-1 p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center">
                                                            <h3 className="font-semibold text-gray-900">Week {task.week}: {task.title}</h3>
                                                            {task.status === 'completed' && task.grade && (
                                                                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                                                                    {task.grade}%
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            task.status === 'completed' && "bg-green-50 text-green-700 border-green-200",
                                                            task.status === 'in-progress' && "bg-blue-50 text-blue-700 border-blue-200",
                                                            task.status === 'submitted' && "bg-purple-50 text-purple-700 border-purple-200",
                                                            task.status === 'overdue' && "bg-red-50 text-red-700 border-red-200",
                                                            task.status === 'upcoming' && "bg-gray-50 text-gray-700 border-gray-200"
                                                        )}
                                                    >
                                                        {task.status === 'completed' && 'Completed'}
                                                        {task.status === 'in-progress' && 'In Progress'}
                                                        {task.status === 'submitted' && 'Submitted'}
                                                        {task.status === 'overdue' && 'Overdue'}
                                                        {task.status === 'upcoming' && 'Upcoming'}
                                                    </Badge>
                                                </div>

                                                <div className="flex flex-wrap gap-1 mt-3">
                                                    {task.skills.slice(0, 3).map((skill, index) => (
                                                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                    {task.skills.length > 3 && (
                                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none text-xs">
                                                            +{task.skills.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between mt-4 text-sm">
                                                    <div className="flex items-center text-gray-500">
                                                        <CalendarCheck className="h-4 w-4 mr-1" />
                                                        <span>Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}</span>

                                                        {task.submissionDate && (
                                                            <>
                                                                <span className="mx-2">•</span>
                                                                <span>Submitted: {new Date(task.submissionDate).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}</span>
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center">
                                                        <Avatar className="h-6 w-6 mr-1">
                                                            <AvatarImage src={task.mentor.avatar} />
                                                            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">{task.mentor.initials}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-sm text-gray-600">{task.mentor.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Current Task View */}
                <TabsContent value="current-task">
                    {activeTask ? (
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
                                                Week {activeTask.week}
                                            </Badge>
                                            <CardTitle className="text-2xl">{activeTask.title}</CardTitle>
                                            <CardDescription className="mt-1">{activeTask.description}</CardDescription>
                                        </div>
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                            In Progress
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                                <CalendarCheck className="h-4 w-4 mr-1" />
                                                <span>Due Date</span>
                                            </div>
                                            <p className="font-medium">{new Date(activeTask.dueDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {Math.ceil((new Date(activeTask.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                                            </p>
                                        </div>

                                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                                <Users className="h-4 w-4 mr-1" />
                                                <span>Mentor</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Avatar className="h-6 w-6 mr-2">
                                                    <AvatarImage src={activeTask.mentor.avatar} />
                                                    <AvatarFallback className="bg-indigo-100 text-indigo-700">{activeTask.mentor.initials}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{activeTask.mentor.name}</p>
                                                    <p className="text-sm text-gray-500">Available for questions</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                                <BookOpen className="h-4 w-4 mr-1" />
                                                <span>Skills</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {activeTask.skills.map((skill, index) => (
                                                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Task Resources */}
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-3">Learning Resources</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {activeTask.resources.map((resource) => (
                                                <div
                                                    key={resource.id}
                                                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                                                >
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                                        {resource.type === 'pdf' && (
                                                            <FileText className="h-5 w-5 text-indigo-600" />
                                                        )}
                                                        {resource.type === 'video' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polygon points="5 3 19 12 5 21 5 3" />
                                                            </svg>
                                                        )}
                                                        {resource.type === 'article' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium truncate">{resource.title}</h4>
                                                        <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDownloadResource(resource)}>
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Task Actions */}
                                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                                        <Button variant="outline" asChild>
                                            <Link href="/dashboard/mentors">
                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                Ask Mentor
                                            </Link>
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <Link href="/dashboard/terminal">
                                                <Terminal className="h-4 w-4 mr-2" />
                                                Open Terminal
                                            </Link>
                                        </Button>
                                        <Button variant="outline" asChild>
                                            <Link href="/dashboard/code">
                                                <Code className="h-4 w-4 mr-2" />
                                                Code Editor
                                            </Link>
                                        </Button>
                                        <Button onClick={() => handleTaskSelect(activeTask)}>
                                            <Upload className="h-4 w-4 mr-2" />
                                            Submit Task
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <Card className="text-center py-8">
                            <CardContent>
                                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">No Active Task</h3>
                                <p className="text-gray-500 mb-4">You don't have any tasks in progress.</p>
                                <Button asChild>
                                    <Link href={`/dashboard/tasks/${upcomingTasks[0]?.id}`}>
                                        Start Next Task
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Completed Tasks View */}
                <TabsContent value="completed">
                    {completedTasks.length > 0 ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Completed Tasks</CardTitle>
                                <CardDescription>
                                    You've completed {completedTasks.length} out of {tasks.length} tasks
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {completedTasks.map((task, index) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="border border-green-200 bg-green-50/50 rounded-lg overflow-hidden"
                                        >
                                            <div className="p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center">
                                                            <h3 className="font-semibold text-gray-900">Week {task.week}: {task.title}</h3>
                                                            {task.grade && (
                                                                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                                                                    {task.grade}%
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                                        Completed
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 text-sm">
                                                    <div className="flex items-center text-gray-500">
                                                        <CalendarCheck className="h-4 w-4 mr-1" />
                                                        <span>Submitted: {task.submissionDate}</span>
                                                    </div>

                                                    <Button variant="ghost" size="sm" onClick={() => handleTaskSelect(task)}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View Details
                                                    </Button>
                                                </div>

                                                {task.feedback && (
                                                    <div className="mt-3 p-3 bg-white rounded-md border border-green-100">
                                                        <div className="flex items-start">
                                                            <div className="mr-2 mt-0.5">
                                                                <Avatar className="h-6 w-6">
                                                                    <AvatarImage src={task.mentor.avatar} />
                                                                    <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">{task.mentor.initials}</AvatarFallback>
                                                                </Avatar>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-gray-500">Feedback from {task.mentor.name}</p>
                                                                <p className="text-sm mt-1">{task.feedback}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="text-center py-8">
                            <CardContent>
                                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <CheckCircle className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">No Completed Tasks</h3>
                                <p className="text-gray-500">You haven't completed any tasks yet.</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Upcoming Tasks View */}
                <TabsContent value="upcoming">
                    {upcomingTasks.length > 0 ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Tasks</CardTitle>
                                <CardDescription>
                                    You have {upcomingTasks.length} upcoming tasks in your program
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {upcomingTasks.map((task, index) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <Badge className="mb-2 bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">
                                                                Week {task.week}
                                                            </Badge>
                                                            <h3 className="font-semibold text-gray-900">{task.title}</h3>
                                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                                                        </div>
                                                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                                            Upcoming
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4 text-sm">
                                                        <div className="flex items-center text-gray-500">
                                                            <CalendarCheck className="h-4 w-4 mr-1" />
                                                            <span>Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}</span>
                                                        </div>

                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link href={`/dashboard/tasks/${task.id}`}>
                                                                <Eye className="h-4 w-4 mr-1" />
                                                                Preview
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="text-center py-8">
                            <CardContent>
                                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Calendar className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">All Tasks Completed</h3>
                                <p className="text-gray-500">You've completed all tasks in the program.</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>

            {/* Task Detail Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent className="sm:max-w-lg w-full p-0">
                    {selectedTask && (
                        <div className="h-full flex flex-col">
                            <SheetHeader className="px-6 py-4 border-b">
                                <SheetTitle className="text-xl">
                                    Week {selectedTask.week}: {selectedTask.title}
                                </SheetTitle>
                                <SheetDescription>
                                    {selectedTask.status === 'completed'
                                        ? 'View your submission and feedback'
                                        : selectedTask.status === 'submitted'
                                            ? 'Your submission is under review'
                                            : 'Submit your completed task'}
                                </SheetDescription>
                            </SheetHeader>

                            <ScrollArea className="flex-1 p-6">
                                <div className="space-y-6">
                                    {/* Task Status */}
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "text-sm",
                                                selectedTask.status === 'completed' && "bg-green-50 text-green-700 border-green-200",
                                                selectedTask.status === 'in-progress' && "bg-blue-50 text-blue-700 border-blue-200",
                                                selectedTask.status === 'submitted' && "bg-purple-50 text-purple-700 border-purple-200",
                                                selectedTask.status === 'overdue' && "bg-red-50 text-red-700 border-red-200",
                                                selectedTask.status === 'upcoming' && "bg-gray-50 text-gray-700 border-gray-200"
                                            )}
                                        >
                                            {selectedTask.status === 'completed' && <CheckCircle className="h-3.5 w-3.5 mr-1" />}
                                            {selectedTask.status === 'in-progress' && <Clock className="h-3.5 w-3.5 mr-1" />}
                                            {selectedTask.status === 'submitted' && <Upload className="h-3.5 w-3.5 mr-1" />}
                                            {selectedTask.status === 'overdue' && <AlertCircle className="h-3.5 w-3.5 mr-1" />}

                                            {selectedTask.status === 'completed' && 'Completed'}
                                            {selectedTask.status === 'in-progress' && 'In Progress'}
                                            {selectedTask.status === 'submitted' && 'Submitted'}
                                            {selectedTask.status === 'overdue' && 'Overdue'}
                                            {selectedTask.status === 'upcoming' && 'Upcoming'}
                                        </Badge>

                                        <div className="flex items-center text-sm text-gray-500">
                                            <CalendarCheck className="h-4 w-4 mr-1" />
                                            <span>Due: {new Date(selectedTask.dueDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                    </div>

                                    {/* Task Description */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">DESCRIPTION</h3>
                                        <p className="text-gray-900">{selectedTask.description}</p>
                                    </div>

                                    {/* Task Skills */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">SKILLS</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedTask.skills.map((skill, index) => (
                                                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Task Resources */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">RESOURCES</h3>
                                        <div className="space-y-2">
                                            {selectedTask.resources.map((resource) => (
                                                <div
                                                    key={resource.id}
                                                    className="flex items-center p-3 rounded-lg border border-gray-200"
                                                >
                                                    <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                                                        {resource.type === 'pdf' && (
                                                            <FileText className="h-4 w-4 text-indigo-600" />
                                                        )}
                                                        {resource.type === 'video' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polygon points="5 3 19 12 5 21 5 3" />
                                                            </svg>
                                                        )}
                                                        {resource.type === 'article' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium truncate">{resource.title}</h4>
                                                        <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
                                                    </div>
                                                    <Button variant="ghost" size="sm" onClick={() => handleDownloadResource(resource)}>
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Task Submission */}
                                    {(selectedTask.status === 'completed' || selectedTask.status === 'submitted') && selectedTask.submission ? (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-2">YOUR SUBMISSION</h3>
                                            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                                                <div className="mb-3">
                                                    <h4 className="text-sm font-medium mb-2">Submitted Files</h4>
                                                    <div className="space-y-2">
                                                        {selectedTask.submission.files.map((file) => (
                                                            <div key={file.id} className="flex items-center p-2 rounded-md bg-white border border-gray-200">
                                                                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                                                    <FileText className="h-4 w-4 text-blue-600" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h5 className="font-medium text-sm truncate">{file.name}</h5>
                                                                    <p className="text-xs text-gray-500">{file.size}</p>
                                                                </div>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <Download className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {selectedTask.submission.notes && (
                                                    <div>
                                                        <h4 className="text-sm font-medium mb-1">Submission Notes</h4>
                                                        <p className="text-sm text-gray-600">{selectedTask.submission.notes}</p>
                                                    </div>
                                                )}

                                                <div className="text-sm text-gray-500 mt-2">
                                                    Submitted on {selectedTask.submissionDate}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        (selectedTask.status === 'in-progress' || selectedTask.status === 'overdue') && (
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-2">SUBMIT YOUR WORK</h3>
                                                <div className="space-y-4">
                                                    <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center">
                                                        <Input
                                                            type="file"
                                                            className="hidden"
                                                            id="file-upload"
                                                            multiple
                                                            onChange={handleFileUpload}
                                                        />
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="cursor-pointer flex flex-col items-center justify-center"
                                                        >
                                                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                                            <p className="text-sm font-medium">Upload Files</p>
                                                            <p className="text-xs text-gray-500 mt-1">Drag & drop files or click to browse</p>
                                                        </label>
                                                    </div>

                                                    {uploadedFiles.length > 0 && (
                                                        <div className="space-y-2">
                                                            <h4 className="text-sm font-medium">Selected Files</h4>
                                                            {uploadedFiles.map((file, index) => (
                                                                <div key={index} className="flex items-center p-2 rounded-md bg-gray-50 border border-gray-200">
                                                                    <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                                                        <FileText className="h-4 w-4 text-blue-600" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h5 className="font-medium text-sm truncate">{file.name}</h5>
                                                                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 hover:text-red-500"
                                                                        onClick={() => handleRemoveFile(index)}
                                                                    >
                                                                        <XCircle className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div>
                                                        <Label htmlFor="submission-notes" className="text-sm font-medium">
                                                            Submission Notes
                                                        </Label>
                                                        <Textarea
                                                            id="submission-notes"
                                                            className="mt-1 resize-none"
                                                            placeholder="Add any notes about your submission..."
                                                            rows={4}
                                                            value={submissionComment}
                                                            onChange={(e) => setSubmissionComment(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}

                                    {/* Mentor Feedback */}
                                    {selectedTask.status === 'completed' && selectedTask.feedback && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-2">MENTOR FEEDBACK</h3>
                                            <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                                                <div className="flex items-start">
                                                    <Avatar className="h-10 w-10 mr-3">
                                                        <AvatarImage src={selectedTask.mentor.avatar} />
                                                        <AvatarFallback className="bg-indigo-100 text-indigo-700">{selectedTask.mentor.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center">
                                                            <h4 className="font-medium">{selectedTask.mentor.name}</h4>
                                                            {selectedTask.grade && (
                                                                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                                                                    {selectedTask.grade}%
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-600 mt-2">{selectedTask.feedback}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>

                            <div className="p-4 border-t border-gray-200">
                                {selectedTask.status === 'in-progress' || selectedTask.status === 'overdue' ? (
                                    <div className="flex justify-end gap-2">
                                        <SheetClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </SheetClose>
                                        <Button
                                            onClick={handleSubmitTask}
                                            disabled={isSubmitting || uploadedFiles.length === 0}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="h-4 w-4 mr-2" />
                                                    Submit Task
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex justify-between">
                                        {selectedTask.status === 'completed' && (
                                            <Button variant="outline" asChild>
                                                <Link href={`/dashboard/tasks/${selectedTask.id}/reflection`}>
                                                    <BookOpen className="h-4 w-4 mr-2" />
                                                    Add Reflection
                                                </Link>
                                            </Button>
                                        )}
                                        <div className="ml-auto">
                                            <SheetClose asChild>
                                                <Button variant="outline">Close</Button>
                                            </SheetClose>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}