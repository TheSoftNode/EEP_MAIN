"use client"

import React from 'react';
import Link from 'next/link';
import {
    Clock,
    Calendar,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    CheckCircle,
    XCircle,
    ArrowUpRight,
    FileText,
    Bookmark,
    BookMarked,
    BarChart3,
    Brain,
    Users,
    ArrowRight,
    Terminal,
    Code,
    MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function DashboardOverview() {
    // Current progress data
    const overallProgress = 45; // 45% complete
    const currentWeek = 6; // Week 6 of 12
    const completedTasks = 18; // 18 out of 36 total tasks
    const nextDeadline = "2025-03-25T23:59:59"; // March 25, 2025

    // Calculate time remaining until next deadline
    const deadlineDate = new Date(nextDeadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    // Upcoming sessions
    const upcomingSessions = [
        {
            id: 1,
            title: "One-on-One Mentoring",
            date: "Mar 20, 2025",
            time: "2:00 PM - 3:00 PM",
            mentor: "Alex Johnson",
            mentorAvatar: "/avatars/mentor-1.jpg",
            mentorInitials: "AJ"
        },
        {
            id: 2,
            title: "Group Code Review",
            date: "Mar 22, 2025",
            time: "10:00 AM - 11:30 AM",
            mentor: "Sarah Wilson",
            mentorAvatar: "/avatars/mentor-2.jpg",
            mentorInitials: "SW"
        }
    ];

    // Recent tasks
    const recentTasks = [
        {
            id: 1,
            title: "Week 6: Build a REST API",
            status: "in-progress",
            dueDate: "Mar 25, 2025",
            description: "Create a RESTful API using Node.js and Express with MongoDB integration"
        },
        {
            id: 2,
            title: "Week 5: Frontend Implementation",
            status: "completed",
            dueDate: "Mar 18, 2025",
            description: "Implement the user interface using React with responsive design"
        },
        {
            id: 3,
            title: "Week 4: Database Design",
            status: "completed",
            dueDate: "Mar 11, 2025",
            description: "Design and implement the database schema using MongoDB"
        }
    ];

    // Learning resources
    const learningResources = [
        {
            id: 1,
            title: "Advanced Node.js Patterns",
            type: "Article",
            duration: "10 min read",
            isSaved: true
        },
        {
            id: 2,
            title: "React Performance Optimization",
            type: "Video",
            duration: "25 mins",
            isSaved: false
        },
        {
            id: 3,
            title: "MongoDB Schema Design Best Practices",
            type: "Tutorial",
            duration: "15 min read",
            isSaved: true
        }
    ];

    // Recent feedback
    const recentFeedback = [
        {
            id: 1,
            week: "Week 5",
            task: "Frontend Implementation",
            mentor: "Sarah Wilson",
            mentorAvatar: "/avatars/mentor-2.jpg",
            mentorInitials: "SW",
            date: "Mar 19, 2025",
            rating: 4, // Out of 5
            comment: "Great work on the UI implementation! The responsive design works well across different devices. Consider adding more accessibility features in future iterations."
        }
    ];

    // Mock data for skills progress
    const skillsProgress = [
        { name: "JavaScript", progress: 75 },
        { name: "React", progress: 65 },
        { name: "Node.js", progress: 60 },
        { name: "MongoDB", progress: 50 },
        { name: "AWS", progress: 35 }
    ];

    // Available mentors
    const availableMentors = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "Senior Software Engineer",
            avatar: "/avatars/mentor-1.jpg",
            initials: "AJ",
            availability: "Available today"
        },
        {
            id: 2,
            name: "Sarah Wilson",
            role: "Frontend Specialist",
            avatar: "/avatars/mentor-2.jpg",
            initials: "SW",
            availability: "Available tomorrow"
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="bg-gradient-to-br from-indigo-600 to-violet-600 border-0">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-white text-xl">Welcome back, John!</CardTitle>
                        <CardDescription className="text-indigo-100">Your AI development journey is 45% complete</CardDescription>
                    </CardHeader>
                    <CardContent className="text-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <div className="flex items-center">
                                <div className="bg-white/20 p-2 rounded-lg mr-3">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-indigo-100">Current Week</p>
                                    <p className="font-medium">Week {currentWeek} of 12</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-white/20 p-2 rounded-lg mr-3">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-indigo-100">Completed Tasks</p>
                                    <p className="font-medium">{completedTasks} of 36</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-white/20 p-2 rounded-lg mr-3">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-indigo-100">Next Deadline</p>
                                    <p className="font-medium">{diffDays}d {diffHours}h remaining</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                        <Button asChild className="bg-white/20 hover:bg-white/30 text-white w-full md:w-auto">
                            <Link href="/dashboard/learning-path">
                                View Learning Path
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Progress Overview Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Overall Progress</CardTitle>
                            <CardDescription>Track your journey through all modules</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium">Course Completion</span>
                                        <span className="text-sm font-medium">{overallProgress}%</span>
                                    </div>
                                    <Progress value={overallProgress} className="h-2" />
                                </div>

                                <div className="mt-6 space-y-4">
                                    <h4 className="text-sm font-semibold mb-3">Top Skills Progress</h4>
                                    {skillsProgress.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm">{skill.name}</span>
                                                <span className="text-sm text-gray-500">{skill.progress}%</span>
                                            </div>
                                            <Progress value={skill.progress} className="h-1" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="ghost" className="w-full">
                                <Link href="/dashboard/progress">
                                    View Detailed Progress
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* Current Task Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between">
                                <div>
                                    <CardTitle className="text-lg">Current Task</CardTitle>
                                    <CardDescription>Week 6 assignment</CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                    In Progress
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-medium text-base">Build a REST API</h3>
                            <p className="text-sm text-gray-500 mt-1 mb-4">
                                Create a RESTful API using Node.js and Express with MongoDB integration
                            </p>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center">
                                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                        Due Date
                                    </span>
                                    <span className="font-medium">Mar 25, 2025</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center">
                                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                        Time Remaining
                                    </span>
                                    <span className="font-medium">{diffDays}d {diffHours}h</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <h4 className="text-sm font-medium mb-2">Key Requirements</h4>
                                <ul className="text-sm space-y-2">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <span>Create RESTful endpoints for CRUD operations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <span>Implement JWT authentication</span>
                                    </li>
                                    <li className="flex items-start">
                                        <XCircle className="h-4 w-4 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                                        <span>Connect MongoDB and implement data models</span>
                                    </li>
                                    <li className="flex items-start">
                                        <XCircle className="h-4 w-4 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                                        <span>Add input validation and error handling</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-2">
                            <Button>Continue Working</Button>
                            <Button asChild variant="outline">
                                <Link href="/dashboard/tasks/6">View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* Next Sessions Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="lg:col-span-1"
                >
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                            <CardDescription>Your scheduled mentoring and review sessions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingSessions.map((session) => (
                                    <div key={session.id} className="flex p-3 bg-gray-50 rounded-lg">
                                        <div className="mr-4 mt-1">
                                            <div className="relative h-10 w-10">
                                                <Avatar>
                                                    <AvatarImage src={session.mentorAvatar} />
                                                    <AvatarFallback className="bg-indigo-100 text-indigo-700">{session.mentorInitials}</AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-base">{session.title}</h4>
                                            <p className="text-sm text-gray-500 mb-1">with {session.mentor}</p>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                <span>{session.date}</span>
                                                <span className="mx-1">•</span>
                                                <Clock className="h-3 w-3 mr-1" />
                                                <span>{session.time}</span>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="h-4 w-4"
                                                    >
                                                        <circle cx="12" cy="12" r="1" />
                                                        <circle cx="12" cy="5" r="1" />
                                                        <circle cx="12" cy="19" r="1" />
                                                    </svg>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="ghost" className="w-full">
                                <Link href="/dashboard/schedule">
                                    View All Sessions
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Tasks */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="text-lg">Recent Tasks</CardTitle>
                                <CardDescription>Your recent assignments and submissions</CardDescription>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/dashboard/tasks">View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentTasks.map((task) => (
                                    <div key={task.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="mr-4 flex-shrink-0">
                                            <div className={cn(
                                                "h-10 w-10 rounded-full flex items-center justify-center",
                                                task.status === 'completed' ? "bg-green-100" : "bg-amber-100"
                                            )}>
                                                <FileText className={cn(
                                                    "h-5 w-5",
                                                    task.status === 'completed' ? "text-green-600" : "text-amber-600"
                                                )} />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium truncate">{task.title}</h4>
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        task.status === 'completed'
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                                    )}
                                                >
                                                    {task.status === 'completed' ? 'Completed' : 'In Progress'}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">{task.description}</p>
                                            <div className="flex items-center mt-1 text-xs text-gray-500">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                <span>Due: {task.dueDate}</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" asChild className="ml-2">
                                            <Link href={`/dashboard/tasks/${task.id}`}>
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Resources & Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-2">
                                <Button asChild className="h-auto py-4 justify-start" variant="outline">
                                    <Link href="/dashboard/terminal" className="flex flex-col items-center text-center">
                                        <Terminal className="h-5 w-5 mb-1" />
                                        <span className="text-sm">Open Terminal</span>
                                    </Link>
                                </Button>
                                <Button asChild className="h-auto py-4 justify-start" variant="outline">
                                    <Link href="/dashboard/code" className="flex flex-col items-center text-center">
                                        <Code className="h-5 w-5 mb-1" />
                                        <span className="text-sm">Code Editor</span>
                                    </Link>
                                </Button>
                                <Button asChild className="h-auto py-4 justify-start" variant="outline">
                                    <Link href="/dashboard/messages" className="flex flex-col items-center text-center">
                                        <Users className="h-5 w-5 mb-1" />
                                        <span className="text-sm">Ask Mentor</span>
                                    </Link>
                                </Button>
                                <Button asChild className="h-auto py-4 justify-start" variant="outline">
                                    <Link href="/dashboard/ai-assistant" className="flex flex-col items-center text-center">
                                        <Brain className="h-5 w-5 mb-1" />
                                        <span className="text-sm">AI Assistant</span>
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Learning Resources */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Learning Resources</CardTitle>
                                <CardDescription>Recommended materials for this week</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {learningResources.map((resource) => (
                                        <div key={resource.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                                            <div className="mr-3">
                                                {resource.isSaved ? (
                                                    <BookMarked className="h-5 w-5 text-indigo-600" />
                                                ) : (
                                                    <Bookmark className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm truncate">{resource.title}</h4>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <span>{resource.type}</span>
                                                    <span className="mx-1">•</span>
                                                    <span>{resource.duration}</span>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="ghost" className="w-full">
                                    <Link href="/dashboard/resources">
                                        Browse All Resources
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </motion.div>
            </div>

            {/* Recent Feedback */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Recent Feedback</CardTitle>
                            <CardDescription>Your latest mentor evaluations and comments</CardDescription>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/dashboard/feedback">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {recentFeedback.length > 0 ? (
                            <div className="space-y-4">
                                {recentFeedback.map((feedback) => (
                                    <div key={feedback.id} className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center">
                                                <Avatar className="h-10 w-10 mr-3">
                                                    <AvatarImage src={feedback.mentorAvatar} />
                                                    <AvatarFallback className="bg-indigo-100 text-indigo-700">{feedback.mentorInitials}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className="font-medium">{feedback.mentor}</h4>
                                                    <p className="text-xs text-gray-500">on {feedback.week}: {feedback.task}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill={i < feedback.rating ? "currentColor" : "none"}
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className={i < feedback.rating ? "text-amber-500" : "text-gray-300"}
                                                    >
                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-700">{feedback.comment}</p>
                                        <p className="text-xs text-gray-500 mt-2">{feedback.date}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-6">
                                <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-3 mb-4">
                                    <MessageSquare className="h-6 w-6 text-gray-600" />
                                </div>
                                <h3 className="font-medium">No feedback yet</h3>
                                <p className="text-sm text-gray-500 mt-1">Your feedback will appear here after task submissions</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Available Mentors */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Available Mentors</CardTitle>
                            <CardDescription>Connect with mentors for guidance and support</CardDescription>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/dashboard/mentors">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {availableMentors.map((mentor) => (
                                <div key={mentor.id} className="p-4 border border-gray-100 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="relative mr-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={mentor.avatar} />
                                                <AvatarFallback className="bg-indigo-100 text-indigo-700">{mentor.initials}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{mentor.name}</h4>
                                            <p className="text-xs text-gray-500">{mentor.role}</p>
                                            <p className="text-xs text-green-600 mt-1">{mentor.availability}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/dashboard/mentors/${mentor.id}`}>View Profile</Link>
                                        </Button>
                                        <Button size="sm" asChild>
                                            <Link href={`/dashboard/messages?mentor=${mentor.id}`}>Message</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}