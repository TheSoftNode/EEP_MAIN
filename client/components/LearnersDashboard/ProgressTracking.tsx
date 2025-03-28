"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    BarChart,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    Star,
    TrendingUp,
    Award,
    BookOpen,
    Code,
    Database,
    Terminal,
    Brain,
    LineChart,
    BarChart2,
    PieChart,
    GitBranch,
    CheckCheck,
    Filter,
    Share2,
    ChevronRight,
    Plus
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
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { cn } from '@/lib/utils';

// Types
interface SkillData {
    name: string;
    category: string;
    level: number;
    maxLevel: number;
    lastImproved: string;
}

interface TaskProgress {
    id: number;
    week: number;
    title: string;
    completedAt: string;
    score: number;
    timeSpent: number; // in hours
    skillsImproved: string[];
}

interface Milestone {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    completedAt?: string;
    icon: React.ReactNode;
}

interface CertificateProgress {
    id: number;
    name: string;
    description: string;
    progress: number;
    requirements: {
        title: string;
        completed: boolean;
    }[];
    estimatedCompletion: string;
    icon: React.ReactNode;
}

export default function ProgressTracking() {
    // State
    const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
    const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');

    // Mock skill data
    const skills: SkillData[] = [
        { name: "JavaScript", category: "Programming", level: 4, maxLevel: 5, lastImproved: "2025-03-15" },
        { name: "TypeScript", category: "Programming", level: 3, maxLevel: 5, lastImproved: "2025-03-10" },
        { name: "React", category: "Frontend", level: 4, maxLevel: 5, lastImproved: "2025-03-15" },
        { name: "Next.js", category: "Frontend", level: 3, maxLevel: 5, lastImproved: "2025-03-15" },
        { name: "Node.js", category: "Backend", level: 3, maxLevel: 5, lastImproved: "2025-03-01" },
        { name: "Express", category: "Backend", level: 3, maxLevel: 5, lastImproved: "2025-03-01" },
        { name: "MongoDB", category: "Database", level: 3, maxLevel: 5, lastImproved: "2025-02-15" },
        { name: "Database Design", category: "Database", level: 2, maxLevel: 5, lastImproved: "2025-02-15" },
        { name: "REST API", category: "Backend", level: 3, maxLevel: 5, lastImproved: "2025-03-01" },
        { name: "Authentication", category: "Security", level: 2, maxLevel: 5, lastImproved: "2025-03-01" },
        { name: "JWT", category: "Security", level: 2, maxLevel: 5, lastImproved: "2025-03-01" },
        { name: "AI Integration", category: "AI", level: 1, maxLevel: 5, lastImproved: "2025-03-19" },
        { name: "UI/UX", category: "Design", level: 2, maxLevel: 5, lastImproved: "2025-02-20" },
        { name: "CSS/Tailwind", category: "Frontend", level: 3, maxLevel: 5, lastImproved: "2025-02-20" },
        { name: "Git", category: "DevOps", level: 3, maxLevel: 5, lastImproved: "2025-01-15" },
    ];

    // Task progress data
    const taskProgress: TaskProgress[] = [
        {
            id: 1,
            week: 1,
            title: "Development Environment Setup",
            completedAt: "2025-01-15",
            score: 95,
            timeSpent: 8,
            skillsImproved: ["Development Tools", "Command Line", "Git", "Environment Setup"]
        },
        {
            id: 2,
            week: 2,
            title: "JavaScript & TypeScript Fundamentals",
            completedAt: "2025-01-22",
            score: 88,
            timeSpent: 12,
            skillsImproved: ["JavaScript", "TypeScript", "Algorithms", "Data Structures"]
        },
        {
            id: 3,
            week: 3,
            title: "React & Next.js Foundations",
            completedAt: "2025-01-29",
            score: 92,
            timeSpent: 15,
            skillsImproved: ["React", "Next.js", "Responsive Design", "Frontend Development"]
        },
        {
            id: 4,
            week: 4,
            title: "Database Design & Implementation",
            completedAt: "2025-02-05",
            score: 85,
            timeSpent: 10,
            skillsImproved: ["MongoDB", "Database Design", "Schema Modeling", "Indexing"]
        },
        {
            id: 5,
            week: 5,
            title: "Frontend Implementation",
            completedAt: "2025-02-12",
            score: 90,
            timeSpent: 14,
            skillsImproved: ["UI/UX", "Component Design", "CSS/Tailwind", "State Management"]
        }
    ];

    // Milestone data
    const milestones: Milestone[] = [
        {
            id: 1,
            title: "Development Environment Setup",
            description: "Set up your local development environment and version control workflow.",
            isCompleted: true,
            completedAt: "2025-01-15",
            icon: <Terminal className="h-5 w-5" />
        },
        {
            id: 2,
            title: "Frontend Development",
            description: "Build a responsive frontend application with React and Next.js.",
            isCompleted: true,
            completedAt: "2025-02-12",
            icon: <Code className="h-5 w-5" />
        },
        {
            id: 3,
            title: "Backend API Development",
            description: "Create a RESTful API with Node.js and Express.",
            isCompleted: false,
            icon: <Database className="h-5 w-5" />
        },
        {
            id: 4,
            title: "Authentication & Security",
            description: "Implement JWT authentication and authorization for your app.",
            isCompleted: false,
            icon: <GitBranch className="h-5 w-5" />
        },
        {
            id: 5,
            title: "AI Integration",
            description: "Integrate AI capabilities into your application.",
            isCompleted: false,
            icon: <Brain className="h-5 w-5" />
        },
        {
            id: 6,
            title: "Final Project Completion",
            description: "Complete your final project combining all skills learned.",
            isCompleted: false,
            icon: <Award className="h-5 w-5" />
        }
    ];

    // Certificate progress data
    const certificateProgress: CertificateProgress[] = [
        {
            id: 1,
            name: "AI Development Certification",
            description: "Complete the 12-week AI development program with all required tasks.",
            progress: 42,
            requirements: [
                { title: "Complete all 12 weekly tasks", completed: false },
                { title: "Score at least 80% on all assessments", completed: true },
                { title: "Submit final project", completed: false },
                { title: "Present final project", completed: false }
            ],
            estimatedCompletion: "April 2025",
            icon: <Award className="h-6 w-6" />
        },
        {
            id: 2,
            name: "Frontend Development Badge",
            description: "Demonstrate proficiency in frontend development skills.",
            progress: 80,
            requirements: [
                { title: "Complete frontend tasks (Weeks 3 & 5)", completed: true },
                { title: "Score at least 85% on frontend assessment", completed: true },
                { title: "Create at least 5 reusable components", completed: true },
                { title: "Implement responsive design", completed: false }
            ],
            estimatedCompletion: "March 2025",
            icon: <Code className="h-6 w-6" />
        },
        {
            id: 3,
            name: "Database Design Badge",
            description: "Demonstrate proficiency in database design and implementation.",
            progress: 75,
            requirements: [
                { title: "Complete database task (Week 4)", completed: true },
                { title: "Design normalized database schema", completed: true },
                { title: "Implement proper indexing", completed: true },
                { title: "Optimize query performance", completed: false }
            ],
            estimatedCompletion: "March 2025",
            icon: <Database className="h-6 w-6" />
        }
    ];

    // Skill categories for filtering
    const skillCategories = ["all", ...Array.from(new Set(skills.map(skill => skill.category)))];

    // Filter skills based on selected category
    const filteredSkills = selectedSkillCategory === 'all'
        ? skills
        : skills.filter(skill => skill.category === selectedSkillCategory);

    // Calculate total progress
    const currentWeek = 6; // Week 6 of 12
    const overallProgress = Math.round((currentWeek - 1) / 12 * 100);

    // Calculate average score
    const averageScore = taskProgress.reduce((acc, task) => acc + task.score, 0) / taskProgress.length;

    // Calculate total study time
    const totalStudyTime = taskProgress.reduce((acc, task) => acc + task.timeSpent, 0);

    // Calculate skill levels by category
    const skillLevelsByCategory = Object.fromEntries(
        skillCategories
            .filter(cat => cat !== 'all')
            .map(category => {
                const categorySkills = skills.filter(skill => skill.category === category);
                const totalLevel = categorySkills.reduce((acc, skill) => acc + skill.level, 0);
                const maxPossible = categorySkills.reduce((acc, skill) => acc + skill.maxLevel, 0);
                return [category, (totalLevel / maxPossible) * 100];
            })
    );

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Get timeline width based on progress
    const getTimelineWidth = (id: number) => {
        const milestoneCount = milestones.length;
        const completedCount = milestones.filter(m => m.isCompleted).length;

        // Current milestone (first incomplete one)
        const currentMilestoneIndex = milestones.findIndex(m => !m.isCompleted);

        if (id === milestones[currentMilestoneIndex]?.id) {
            // Calculate partial progress for current milestone
            return `${(completedCount / milestoneCount) * 100}%`;
        } else if (milestones.find(m => m.id === id)?.isCompleted) {
            return '100%';
        } else {
            return '0%';
        }
    };

    // Get color class based on score
    const getScoreColorClass = (score: number) => {
        if (score >= 90) return "text-green-600";
        if (score >= 80) return "text-blue-600";
        if (score >= 70) return "text-amber-600";
        return "text-red-600";
    };

    return (
        <div className="space-y-6">
            {/* Header and Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Progress Tracking</h1>
                        <p className="text-gray-500">Monitor your development journey and skill improvements</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Select
                            value={selectedPeriod}
                            onValueChange={setSelectedPeriod}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="month">This Month</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                            </SelectContent>
                        </Select>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <LineChart className="h-4 w-4 mr-2" />
                                    Export Progress Report
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <BarChart className="h-4 w-4 mr-2" />
                                    Export Skill Analysis
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share with Mentor
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {/* Continuation of the ProgressTracking component after the header section */}

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Overall Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline justify-between">
                                <div className="text-3xl font-bold">{overallProgress}%</div>
                                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                    Week {currentWeek} of 12
                                </Badge>
                            </div>
                            <Progress value={overallProgress} className="h-2 mt-3 bg-indigo-600" />
                            <p className="text-xs text-gray-500 mt-2">
                                Currently in week {currentWeek} of the 12-week program
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Average Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline justify-between">
                                <div className={`text-3xl font-bold ${getScoreColorClass(averageScore)}`}>
                                    {averageScore.toFixed(1)}
                                </div>
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                                    <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                                    <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                                    <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                                    <Star className="h-4 w-4 text-gray-300" />
                                </div>
                            </div>
                            <Progress
                                value={averageScore}
                                className={cn(
                                    "h-2 mt-3",
                                    averageScore >= 90 ? "bg-green-600" :
                                        averageScore >= 80 ? "bg-indigo-600" :
                                            averageScore >= 70 ? "bg-violet-600" : "bg-red-500"
                                )}
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Based on {taskProgress.length} completed tasks
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Total Study Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline justify-between">
                                <div className="text-3xl font-bold">{totalStudyTime} hrs</div>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <Clock className="h-3 w-3 mr-1" />
                                    On Track
                                </Badge>
                            </div>
                            <Progress value={75} className="h-2 mt-3" />
                            <p className="text-xs text-gray-500 mt-2">
                                Approx. {Math.round(totalStudyTime / currentWeek)} hours/week
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="skills" className="w-full">
                    <TabsList className="mb-4 bg-indigo-50">
                        <TabsTrigger value="skills" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Skills
                        </TabsTrigger>
                        <TabsTrigger value="tasks" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                            <CheckCheck className="h-4 w-4 mr-2" />
                            Tasks
                        </TabsTrigger>
                        <TabsTrigger value="milestones" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Milestones
                        </TabsTrigger>
                        <TabsTrigger value="certificates" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                            <Award className="h-4 w-4 mr-2" />
                            Certificates
                        </TabsTrigger>
                    </TabsList>

                    {/* Skills Tab */}
                    <TabsContent value="skills" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Skill Development</h2>
                            <div className="flex gap-2">
                                <Select
                                    value={selectedSkillCategory}
                                    onValueChange={setSelectedSkillCategory}
                                >
                                    <SelectTrigger className="w-[160px]">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Filter by category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {skillCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <PieChart className="h-4 w-4 mr-2" />
                                            Skill Breakdown
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                            <DialogTitle>Skill Category Analysis</DialogTitle>
                                            <DialogDescription>
                                                Overview of your skills by category and proficiency level
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            {Object.entries(skillLevelsByCategory).map(([category, level]) => (
                                                <div key={category} className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">{category}</span>
                                                        <span className="text-sm text-gray-500">{Math.round(level)}% proficiency</span>
                                                    </div>
                                                    <Progress value={level} className="h-2" />
                                                </div>
                                            ))}
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Close</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredSkills.map((skill) => (
                                <Card key={skill.name} className="overflow-hidden">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-base">{skill.name}</CardTitle>
                                                <CardDescription>{skill.category}</CardDescription>
                                            </div>
                                            <Badge variant="outline" className="bg-gray-50">
                                                Level {skill.level}/{skill.maxLevel}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <Progress
                                            value={(skill.level / skill.maxLevel) * 100}
                                            className="h-2"
                                        />
                                    </CardContent>
                                    <CardFooter className="text-xs text-gray-500 pt-0">
                                        Last improved: {formatDate(skill.lastImproved)}
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Tasks Tab */}
                    <TabsContent value="tasks" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Weekly Tasks</h2>
                            <div className="flex gap-2">
                                <Select defaultValue="completed">
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Tasks</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {taskProgress.map((task) => (
                                <Card key={task.id} className="overflow-hidden">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                        Week {task.week}
                                                    </Badge>
                                                    <CardTitle className="text-base">{task.title}</CardTitle>
                                                </div>
                                                <CardDescription>Completed on {formatDate(task.completedAt)}</CardDescription>
                                            </div>
                                            <div className="text-xl font-bold">
                                                <span className={getScoreColorClass(task.score)}>{task.score}</span>
                                                <span className="text-sm text-gray-400">/100</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {task.skillsImproved.map((skill) => (
                                                <Badge key={skill} variant="secondary" className="bg-gray-100">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            Time spent: {task.timeSpent} hours
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Milestones Tab */}
                    <TabsContent value="milestones" className="space-y-4">
                        <h2 className="text-xl font-semibold">Program Milestones</h2>

                        <div className="relative mt-8">
                            {/* Timeline connector */}
                            <div className="absolute left-9 top-0 h-full w-0.5 bg-gray-200"></div>

                            <div className="space-y-8">
                                {milestones.map((milestone) => (
                                    <div key={milestone.id} className="relative flex gap-6">
                                        {/* Progress indicator */}
                                        <div
                                            className="absolute left-9 top-5 h-full w-0.5 bg-blue-500 z-10"
                                            style={{ height: getTimelineWidth(milestone.id) }}
                                        ></div>

                                        {/* Milestone icon */}
                                        <div className={cn(
                                            "relative z-20 flex h-9 w-9 items-center justify-center rounded-full",
                                            milestone.isCompleted
                                                ? "bg-blue-500 text-white"
                                                : "bg-white border-2 border-gray-200 text-gray-400"
                                        )}>
                                            {milestone.icon}
                                        </div>

                                        {/* Milestone content */}
                                        <Card className="flex-1">
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-base flex items-center">
                                                            {milestone.title}
                                                            {milestone.isCompleted && (
                                                                <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                                                            )}
                                                        </CardTitle>
                                                        <CardDescription>{milestone.description}</CardDescription>
                                                    </div>
                                                    {milestone.isCompleted ? (
                                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                            Completed
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                                            In Progress
                                                        </Badge>
                                                    )}
                                                </div>
                                            </CardHeader>
                                            {milestone.completedAt && (
                                                <CardFooter className="text-xs text-gray-500 pt-0">
                                                    Completed on: {formatDate(milestone.completedAt)}
                                                </CardFooter>
                                            )}
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Certificates Tab */}
                    <TabsContent value="certificates" className="space-y-4">
                        <h2 className="text-xl font-semibold">Certificates & Badges</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {certificateProgress.map((certificate) => (
                                <Card key={certificate.id} className="overflow-hidden">
                                    <CardHeader>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                {certificate.icon}
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg">{certificate.name}</CardTitle>
                                                <CardDescription>{certificate.description}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-sm text-gray-500">Progress</span>
                                            <span className="text-sm font-medium">{certificate.progress}%</span>
                                        </div>
                                        <Progress value={certificate.progress} className="h-2 mb-4" />

                                        <div className="space-y-2">
                                            {certificate.requirements.map((req, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className={cn(
                                                        "h-4 w-4 rounded-full mr-2 flex items-center justify-center",
                                                        req.completed ? "bg-green-500" : "bg-gray-200"
                                                    )}>
                                                        {req.completed && <CheckCircle className="h-3 w-3 text-white" />}
                                                    </div>
                                                    <span className={cn(
                                                        "text-sm",
                                                        req.completed ? "text-gray-700" : "text-gray-500"
                                                    )}>
                                                        {req.title}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <div className="text-xs text-gray-500">
                                            Est. completion: {certificate.estimatedCompletion}
                                        </div>
                                        <Link href="#" className="text-xs text-blue-600 flex items-center">
                                            View details
                                            <ChevronRight className="h-3 w-3 ml-1" />
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}

                            {/* Add New Certificate/Badge Card */}
                            <Card className="border-dashed border-2 flex items-center justify-center p-6">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                                <Plus className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <span>Add New Badge/Certificate</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add New Certificate or Badge</DialogTitle>
                                            <DialogDescription>
                                                Track a new certification or badge you want to pursue.
                                            </DialogDescription>
                                        </DialogHeader>
                                        {/* Form content would go here */}
                                        <DialogFooter className="mt-4">
                                            <Button variant="outline" className="mr-2">Cancel</Button>
                                            <Button>Add Certificate</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
}