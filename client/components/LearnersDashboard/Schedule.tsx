"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Calendar as CalendarIcon,
    Clock,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Video,
    Users,
    User,
    X,
    Plus,
    CheckCircle,
    ArrowRight,
    MapPin,
    Pencil,
    Trash2,
    SearchIcon,
    Filter,
    Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';
import { format, startOfWeek, endOfWeek, addDays, isToday, isSameDay, addWeeks, subWeeks, parseISO } from 'date-fns';

// Types
interface Session {
    id: number;
    title: string;
    description?: string;
    date: string;
    startTime: string;
    endTime: string;
    mentor: {
        id: number;
        name: string;
        avatar?: string;
        initials: string;
        role: string;
    };
    type: 'one-on-one' | 'group' | 'workshop';
    status: 'scheduled' | 'completed' | 'cancelled';
    location: 'online' | 'in-person';
    meetingLink?: string;
    address?: string;
    attendees?: number;
}

interface Mentor {
    id: number;
    name: string;
    role: string;
    avatar?: string;
    initials: string;
    specializations: string[];
    availability: {
        day: string;
        slots: string[];
    }[];
}

export default function Schedule() {
    // State
    const [date, setDate] = useState<Date>(new Date());
    const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
    const [activeTab, setActiveTab] = useState<string>('upcoming');
    const [meetingType, setMeetingType] = useState<string>('one-on-one');
    const [selectedMentor, setSelectedMentor] = useState<string>('');
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);

    // Mock data for sessions
    const sessions: Session[] = [
        {
            id: 1,
            title: "One-on-One Mentoring",
            description: "Weekly progress review and discussion of authentication implementation",
            date: "2025-03-20",
            startTime: "14:00",
            endTime: "15:00",
            mentor: {
                id: 1,
                name: "Alex Johnson",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ",
                role: "Senior Developer"
            },
            type: 'one-on-one',
            status: 'scheduled',
            location: 'online',
            meetingLink: "https://meet.eep.ai/alex-johnson/123456"
        },
        {
            id: 2,
            title: "Group Code Review",
            description: "Weekly code review session for the frontend team",
            date: "2025-03-22",
            startTime: "10:00",
            endTime: "11:30",
            mentor: {
                id: 2,
                name: "Sarah Wilson",
                avatar: "/avatars/mentor-2.jpg",
                initials: "SW",
                role: "Frontend Specialist"
            },
            type: 'group',
            status: 'scheduled',
            location: 'online',
            meetingLink: "https://meet.eep.ai/sarah-wilson/789012",
            attendees: 8
        },
        {
            id: 3,
            title: "Database Design Workshop",
            description: "Hands-on workshop on MongoDB schema design patterns",
            date: "2025-03-18",
            startTime: "13:00",
            endTime: "15:00",
            mentor: {
                id: 3,
                name: "Michael Chen",
                avatar: "/avatars/mentor-3.jpg",
                initials: "MC",
                role: "Database Expert"
            },
            type: 'workshop',
            status: 'completed',
            location: 'online',
            meetingLink: "https://meet.eep.ai/michael-chen/345678",
            attendees: 15
        },
        {
            id: 4,
            title: "AI Integration Discussion",
            description: "One-on-one session to discuss AI integration for your final project",
            date: "2025-03-25",
            startTime: "11:00",
            endTime: "12:00",
            mentor: {
                id: 4,
                name: "Emily Davis",
                avatar: "/avatars/mentor-4.jpg",
                initials: "ED",
                role: "AI Specialist"
            },
            type: 'one-on-one',
            status: 'scheduled',
            location: 'online',
            meetingLink: "https://meet.eep.ai/emily-davis/901234"
        },
        {
            id: 5,
            title: "CV Lab Session",
            description: "Computer Vision lab session with practical exercises",
            date: "2025-03-27",
            startTime: "15:00",
            endTime: "17:00",
            mentor: {
                id: 5,
                name: "David Kim",
                avatar: "/avatars/mentor-5.jpg",
                initials: "DK",
                role: "CV Specialist"
            },
            type: 'workshop',
            status: 'scheduled',
            location: 'in-person',
            address: "Tech Campus, Building 3, Room 401"
        }
    ];

    // Mock data for mentors
    const mentors: Mentor[] = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "Senior Developer",
            avatar: "/avatars/mentor-1.jpg",
            initials: "AJ",
            specializations: ["JavaScript", "TypeScript", "React", "Node.js"],
            availability: [
                { day: "Monday", slots: ["10:00-12:00", "14:00-16:00"] },
                { day: "Wednesday", slots: ["09:00-11:00", "15:00-17:00"] },
                { day: "Friday", slots: ["11:00-13:00", "14:00-16:00"] }
            ]
        },
        {
            id: 2,
            name: "Sarah Wilson",
            role: "Frontend Specialist",
            avatar: "/avatars/mentor-2.jpg",
            initials: "SW",
            specializations: ["React", "UI/UX", "CSS", "Design Systems"],
            availability: [
                { day: "Tuesday", slots: ["09:00-11:00", "13:00-15:00"] },
                { day: "Thursday", slots: ["10:00-12:00", "16:00-18:00"] }
            ]
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Database Expert",
            avatar: "/avatars/mentor-3.jpg",
            initials: "MC",
            specializations: ["MongoDB", "SQL", "Database Design", "API Development"],
            availability: [
                { day: "Monday", slots: ["13:00-15:00"] },
                { day: "Wednesday", slots: ["10:00-12:00", "14:00-16:00"] },
                { day: "Friday", slots: ["09:00-11:00"] }
            ]
        },
        {
            id: 4,
            name: "Emily Davis",
            role: "AI Specialist",
            avatar: "/avatars/mentor-4.jpg",
            initials: "ED",
            specializations: ["Machine Learning", "NLP", "Python", "TensorFlow"],
            availability: [
                { day: "Tuesday", slots: ["10:00-12:00", "15:00-17:00"] },
                { day: "Thursday", slots: ["11:00-13:00", "14:00-16:00"] }
            ]
        },
        {
            id: 5,
            name: "David Kim",
            role: "CV Specialist",
            avatar: "/avatars/mentor-5.jpg",
            initials: "DK",
            specializations: ["Computer Vision", "Image Processing", "PyTorch", "OpenCV"],
            availability: [
                { day: "Monday", slots: ["14:00-16:00"] },
                { day: "Wednesday", slots: ["11:00-13:00"] },
                { day: "Friday", slots: ["13:00-15:00", "16:00-18:00"] }
            ]
        }
    ];

    // Filter sessions based on active tab
    const filteredSessions = sessions.filter(session => {
        const sessionDate = parseISO(session.date);
        if (activeTab === 'upcoming') {
            return session.status === 'scheduled' && sessionDate >= new Date();
        } else if (activeTab === 'past') {
            return session.status === 'completed' || sessionDate < new Date();
        } else if (activeTab === 'one-on-one') {
            return session.type === 'one-on-one';
        } else if (activeTab === 'group') {
            return session.type === 'group' || session.type === 'workshop';
        }
        return true;
    }).sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateA.getTime() - dateB.getTime();
    });

    // Generate week days
    const weekDays = Array.from({ length: 7 }).map((_, i) => {
        const day = addDays(startOfWeek(currentWeek, { weekStartsOn: 0 }), i);
        return day;
    });

    // Check if a session is on a specific day
    const getSessionsForDay = (day: Date) => {
        return sessions.filter(session => {
            const sessionDate = parseISO(session.date);
            return isSameDay(sessionDate, day);
        });
    };

    // Format time
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    // Format date
    const formatSessionDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'EEEE, MMMM d, yyyy');
    };

    // Next/Previous week
    const goToNextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    };

    const goToPreviousWeek = () => {
        setCurrentWeek(subWeeks(currentWeek, 1));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
                        <p className="text-gray-500">Manage your mentoring sessions and workshops</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Session
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Schedule a New Session</DialogTitle>
                                    <DialogDescription>
                                        Book a session with a mentor, join a workshop, or schedule a group review
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Session Type</label>
                                        <Select value={meetingType} onValueChange={setMeetingType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select session type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="one-on-one">One-on-One Mentoring</SelectItem>
                                                <SelectItem value="group">Group Session</SelectItem>
                                                <SelectItem value="workshop">Workshop</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Mentor</label>
                                        <Select value={selectedMentor} onValueChange={setSelectedMentor}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a mentor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mentors.map(mentor => (
                                                    <SelectItem key={mentor.id} value={mentor.id.toString()}>
                                                        {mentor.name} - {mentor.role}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Date</label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-start text-left font-normal"
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={(date) => date && setDate(date)}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Time Slot</label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a time" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="09:00-10:00">9:00 AM - 10:00 AM</SelectItem>
                                                    <SelectItem value="10:00-11:00">10:00 AM - 11:00 AM</SelectItem>
                                                    <SelectItem value="11:00-12:00">11:00 AM - 12:00 PM</SelectItem>
                                                    <SelectItem value="13:00-14:00">1:00 PM - 2:00 PM</SelectItem>
                                                    <SelectItem value="14:00-15:00">2:00 PM - 3:00 PM</SelectItem>
                                                    <SelectItem value="15:00-16:00">3:00 PM - 4:00 PM</SelectItem>
                                                    <SelectItem value="16:00-17:00">4:00 PM - 5:00 PM</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Session Title</label>
                                        <Input placeholder="Enter a title for your session" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Description</label>
                                        <Textarea
                                            placeholder="Describe what you'd like to discuss or work on during this session"
                                            className="min-h-[100px]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Session Format</label>
                                        <Select defaultValue="online">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="online">Online</SelectItem>
                                                <SelectItem value="in-person">In Person</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button>Schedule Session</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Calendar & Sessions List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-3"
                >
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>My Schedule</CardTitle>
                                    <CardDescription>
                                        {format(startOfWeek(currentWeek, { weekStartsOn: 0 }), 'MMMM d')} - {format(endOfWeek(currentWeek, { weekStartsOn: 0 }), 'MMMM d, yyyy')}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={goToPreviousWeek}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentWeek(new Date())}
                                    >
                                        Today
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={goToNextWeek}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            {/* Week View */}
                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {weekDays.map((day, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-xs text-gray-500 mb-1">{format(day, 'E')}</div>
                                        <div
                                            className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center mx-auto text-sm",
                                                isToday(day)
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-gray-700"
                                            )}
                                        >
                                            {format(day, 'd')}
                                        </div>
                                        <div className="mt-1">
                                            {getSessionsForDay(day).length > 0 && (
                                                <div className="flex justify-center gap-0.5">
                                                    {getSessionsForDay(day).slice(0, 3).map((session, j) => (
                                                        <div
                                                            key={j}
                                                            className={cn(
                                                                "h-1.5 w-1.5 rounded-full",
                                                                session.type === 'one-on-one' && "bg-indigo-600",
                                                                session.type === 'group' && "bg-green-600",
                                                                session.type === 'workshop' && "bg-amber-500"
                                                            )}
                                                        ></div>
                                                    ))}
                                                    {getSessionsForDay(day).length > 3 && (
                                                        <div className="text-xs text-gray-500 ml-1">+{getSessionsForDay(day).length - 3}</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Filters & Tabs */}
                            <div className="flex justify-between items-center mb-4">
                                <Tabs
                                    defaultValue="upcoming"
                                    value={activeTab}
                                    onValueChange={setActiveTab}
                                    className="w-full"
                                >
                                    <TabsList className="grid grid-cols-4 w-full max-w-md">
                                        <TabsTrigger value="upcoming" className="text-xs">Upcoming</TabsTrigger>
                                        <TabsTrigger value="past" className="text-xs">Past</TabsTrigger>
                                        <TabsTrigger value="one-on-one" className="text-xs">One-on-One</TabsTrigger>
                                        <TabsTrigger value="group" className="text-xs">Groups & Workshops</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                <div className="flex items-center">
                                    <Button variant="ghost" size="sm">
                                        <Filter className="h-4 w-4 mr-1" />
                                        Filter
                                    </Button>
                                </div>
                            </div>

                            {/* Sessions List */}
                            <div className="space-y-4">
                                {filteredSessions.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                            <CalendarIcon className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <h3 className="font-medium text-lg mb-1">No Sessions Found</h3>
                                        <p className="text-gray-500 max-w-sm mx-auto">
                                            {activeTab === 'upcoming'
                                                ? "You don't have any upcoming sessions scheduled."
                                                : activeTab === 'past'
                                                    ? "You don't have any past sessions."
                                                    : "No sessions match your current filters."}
                                        </p>
                                    </div>
                                ) : (
                                    filteredSessions.map((session) => (
                                        <Card key={session.id} className="overflow-hidden">
                                            <div className="p-4 flex flex-col sm:flex-row gap-4">
                                                {/* Time Column */}
                                                <div className="sm:w-1/6 flex flex-row sm:flex-col justify-between sm:justify-start sm:items-center">
                                                    <div className="text-center">
                                                        <div className="text-sm font-medium">{format(parseISO(session.date), 'E')}</div>
                                                        <div className="text-2xl font-bold">{format(parseISO(session.date), 'd')}</div>
                                                        <div className="text-sm text-gray-500">{format(parseISO(session.date), 'MMM')}</div>
                                                    </div>
                                                    <div className="text-right sm:text-center sm:mt-2">
                                                        <div className="text-sm font-medium">{formatTime(session.startTime)}</div>
                                                        <div className="text-sm text-gray-500">to {formatTime(session.endTime)}</div>
                                                    </div>
                                                </div>

                                                {/* Session Details */}
                                                <div className="sm:w-5/6 flex flex-col sm:flex-row gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-start">
                                                            <div className="flex-1">
                                                                <div className="flex items-center">
                                                                    <h3 className="font-medium">{session.title}</h3>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={cn(
                                                                            "ml-2",
                                                                            session.type === 'one-on-one'
                                                                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                                                                : session.type === 'group'
                                                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                                                    : "bg-amber-50 text-amber-700 border-amber-200"
                                                                        )}
                                                                    >
                                                                        {session.type === 'one-on-one' && "One-on-One"}
                                                                        {session.type === 'group' && "Group"}
                                                                        {session.type === 'workshop' && "Workshop"}
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={cn(
                                                                            "ml-2",
                                                                            session.status === 'scheduled'
                                                                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                                                                : session.status === 'completed'
                                                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                                                    : "bg-red-50 text-red-700 border-red-200"
                                                                        )}
                                                                    >
                                                                        {session.status === 'scheduled' && "Scheduled"}
                                                                        {session.status === 'completed' && "Completed"}
                                                                        {session.status === 'cancelled' && "Cancelled"}
                                                                    </Badge>
                                                                </div>

                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    {session.description || `${session.type === 'one-on-one' ? 'One-on-one' : session.type === 'group' ? 'Group' : 'Workshop'} session with ${session.mentor.name}`}
                                                                </p>

                                                                <div className="flex items-center text-sm text-gray-500 mt-2">
                                                                    <div className="flex items-center mr-4">
                                                                        <User className="h-4 w-4 mr-1" />
                                                                        <span>
                                                                            With {session.mentor.name}
                                                                        </span>
                                                                    </div>

                                                                    {session.type !== 'one-on-one' && (
                                                                        <div className="flex items-center mr-4">
                                                                            <Users className="h-4 w-4 mr-1" />
                                                                            <span>
                                                                                {session.attendees || '?'} Attendees
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    <div className="flex items-center">
                                                                        <MapPin className="h-4 w-4 mr-1" />
                                                                        <span>
                                                                            {session.location === 'online' ? 'Online' : 'In Person'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center ml-2">
                                                                <Avatar className="h-10 w-10">
                                                                    <AvatarImage src={session.mentor.avatar} />
                                                                    <AvatarFallback className="bg-indigo-100 text-indigo-700">{session.mentor.initials}</AvatarFallback>
                                                                </Avatar>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-2 self-end sm:self-center">
                                                        {session.status === 'scheduled' && (
                                                            <>
                                                                {session.location === 'online' && (
                                                                    <Button size="sm" asChild>
                                                                        <Link href={session.meetingLink || '#'}>
                                                                            <Video className="h-4 w-4 mr-1" />
                                                                            Join
                                                                        </Link>
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => setSelectedSession(session)}
                                                                >
                                                                    Details
                                                                </Button>
                                                            </>
                                                        )}
                                                        {session.status === 'completed' && (
                                                            <Button size="sm" variant="outline">
                                                                View Summary
                                                            </Button>
                                                        )}
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                {session.status === 'scheduled' && (
                                                                    <>
                                                                        <DropdownMenuItem>
                                                                            <Pencil className="h-4 w-4 mr-2" />
                                                                            Reschedule
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem className="text-red-600">
                                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                                            Cancel Session
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
                                                                {session.status === 'completed' && (
                                                                    <>
                                                                        <DropdownMenuItem>
                                                                            <CalendarIcon className="h-4 w-4 mr-2" />
                                                                            Schedule Follow-up
                                                                        </DropdownMenuItem>
                                                                    </>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Side Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-1"
                >
                    <div className="space-y-6">
                        {/* Next Session */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Next Session</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {filteredSessions.filter(s => s.status === 'scheduled').length > 0 ? (
                                    <div>
                                        <div className="flex items-center space-x-3 mb-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={filteredSessions[0].mentor.avatar} />
                                                <AvatarFallback className="bg-indigo-100 text-indigo-700">{filteredSessions[0].mentor.initials}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">{filteredSessions[0].mentor.name}</h3>
                                                <p className="text-sm text-gray-500">{filteredSessions[0].mentor.role}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="font-medium">{filteredSessions[0].title}</h4>
                                            <div className="flex items-center text-sm">
                                                <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                                <span>{formatSessionDate(filteredSessions[0].date)}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                                <span>{formatTime(filteredSessions[0].startTime)} - {formatTime(filteredSessions[0].endTime)}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                                <span>{filteredSessions[0].location === 'online' ? 'Online Meeting' : filteredSessions[0].address}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                            <CalendarIcon className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <h3 className="font-medium mb-1">No Upcoming Sessions</h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            You don't have any sessions scheduled yet.
                                        </p>
                                        <Button asChild className="w-full">
                                            <DialogTrigger>Schedule Now</DialogTrigger>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                            {filteredSessions.filter(s => s.status === 'scheduled').length > 0 && (
                                <CardFooter className="border-t pt-3 gap-2">
                                    {filteredSessions[0].location === 'online' && (
                                        <Button className="flex-1" asChild>
                                            <Link href={filteredSessions[0].meetingLink || '#'}>
                                                <Video className="h-4 w-4 mr-1" />
                                                Join Meeting
                                            </Link>
                                        </Button>
                                    )}
                                    <Button variant="outline" className="flex-1">
                                        View Details
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>

                        {/* Available Mentors */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Available Mentors</CardTitle>
                            </CardHeader>
                            <CardContent className="px-0">
                                <ScrollArea className="h-[300px]">
                                    <div className="space-y-1 px-4">
                                        {mentors.map((mentor) => (
                                            <div key={mentor.id} className="py-2 border-b border-gray-100 last:border-0">
                                                <div className="flex items-start gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={mentor.avatar} />
                                                        <AvatarFallback className="bg-indigo-100 text-indigo-700">{mentor.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium">{mentor.name}</h4>
                                                        <p className="text-sm text-gray-500">{mentor.role}</p>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {mentor.specializations.slice(0, 2).map((spec, idx) => (
                                                                <Badge key={idx} variant="outline" className="text-xs bg-gray-50 font-normal">
                                                                    {spec}
                                                                </Badge>
                                                            ))}
                                                            {mentor.specializations.length > 2 && (
                                                                <Badge variant="outline" className="text-xs bg-gray-50 font-normal">
                                                                    +{mentor.specializations.length - 2}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/dashboard/schedule/new?mentor=${mentor.id}`}>
                                                            Book
                                                        </Link>
                                                    </Button>
                                                </div>
                                                <div className="mt-2 pl-12">
                                                    <div className="text-xs text-gray-500">Available on:</div>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {mentor.availability.map((avail, idx) => (
                                                            <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 font-normal">
                                                                {avail.day.slice(0, 3)}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="border-t pt-3">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/dashboard/mentors">
                                        View All Mentors
                                        <ArrowRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </motion.div>
            </div>

            {/* Session Details Dialog */}
            {selectedSession && (
                <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>{selectedSession.title}</DialogTitle>
                            <DialogDescription>
                                {selectedSession.type === 'one-on-one' ? 'One-on-one' : selectedSession.type === 'group' ? 'Group' : 'Workshop'} session with {selectedSession.mentor.name}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={selectedSession.mentor.avatar} />
                                    <AvatarFallback className="bg-indigo-100 text-indigo-700">{selectedSession.mentor.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-medium text-lg">{selectedSession.mentor.name}</h3>
                                    <p className="text-gray-500">{selectedSession.mentor.role}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Date</h4>
                                    <p>{formatSessionDate(selectedSession.date)}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Time</h4>
                                    <p>{formatTime(selectedSession.startTime)} - {formatTime(selectedSession.endTime)}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Session Type</h4>
                                    <p>{selectedSession.type === 'one-on-one' ? 'One-on-One Mentoring' : selectedSession.type === 'group' ? 'Group Session' : 'Workshop'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                                    <p>{selectedSession.location === 'online' ? 'Online Meeting' : 'In Person'}</p>
                                </div>
                            </div>

                            {selectedSession.description && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                                    <p className="text-gray-700">{selectedSession.description}</p>
                                </div>
                            )}

                            {selectedSession.location === 'online' && selectedSession.meetingLink && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Meeting Link</h4>
                                    <div className="flex items-center">
                                        <code className="bg-gray-50 px-2 py-1 rounded flex-1 overflow-hidden text-ellipsis">
                                            {selectedSession.meetingLink}
                                        </code>
                                        <Button variant="ghost" size="sm" className="ml-2">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {selectedSession.location === 'in-person' && selectedSession.address && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                                    <p className="text-gray-700">{selectedSession.address}</p>
                                </div>
                            )}
                        </div>
                        <DialogFooter className="gap-2">
                            <Button variant="outline" onClick={() => setSelectedSession(null)}>Close</Button>
                            {selectedSession.status === 'scheduled' && (
                                <>
                                    <Button variant="outline" className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100">
                                        <X className="h-4 w-4 mr-1" />
                                        Cancel Session
                                    </Button>
                                    {selectedSession.location === 'online' && (
                                        <Button asChild>
                                            <Link href={selectedSession.meetingLink || '#'}>
                                                <Video className="h-4 w-4 mr-1" />
                                                Join Meeting
                                            </Link>
                                        </Button>
                                    )}
                                </>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}