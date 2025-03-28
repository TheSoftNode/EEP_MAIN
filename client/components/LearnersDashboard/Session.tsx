"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Video,
    Mic,
    MicOff,
    VideoOff,
    Users,
    MessageSquare,
    Settings,
    Share2,
    MoreHorizontal,
    PenTool,
    FileText,
    Monitor,
    Download,
    Clipboard,
    Copy,
    CheckCheck,
    UserPlus,
    ChevronRight,
    ChevronDown,
    X,
    Play,
    Pause,
    User,
    MapPin,
    ExternalLink,
    Send,
    Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

// Types
interface Session {
    id: string;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    type: 'one-on-one' | 'group' | 'workshop';
    location: 'online' | 'in-person';
    meetingLink?: string;
    address?: string;
    joinCode?: string;
    materialLinks: {
        title: string;
        url: string;
        type: 'document' | 'video' | 'code' | 'presentation';
    }[];
    mentor: {
        id: number;
        name: string;
        role: string;
        avatar?: string;
        initials: string;
        bio: string;
    };
    participants: {
        id: number;
        name: string;
        role: string;
        avatar?: string;
        initials: string;
        status: 'joined' | 'not-joined' | 'left';
    }[];
    agenda: {
        title: string;
        duration: string;
        completed: boolean;
    }[];
    notes: string;
    recording?: {
        url: string;
        duration: string;
        status: 'processing' | 'ready';
    };
}

interface Message {
    id: number;
    senderId: number;
    senderName: string;
    senderAvatar?: string;
    senderInitials: string;
    content: string;
    timestamp: string;
}

export default function SessionPage({ params }: { params: { id: string } }) {
    // Mock session data (in a real app, you would fetch this based on the ID)
    const sessionData: Session = {
        id: params.id || "123",
        title: "One-on-One Mentoring Session: Authentication Implementation",
        description: "Weekly progress review and discussion focused on JWT authentication implementation challenges and best practices.",
        date: "2025-03-20",
        startTime: "14:00",
        endTime: "15:00",
        status: 'in-progress',
        type: 'one-on-one',
        location: 'online',
        meetingLink: "https://meet.eep.ai/alex-johnson/123456",
        joinCode: "EEP-123-456",
        materialLinks: [
            {
                title: "JWT Authentication Best Practices",
                url: "https://eep.ai/resources/jwt-auth-practices.pdf",
                type: 'document'
            },
            {
                title: "Authentication Code Repository",
                url: "https://github.com/eep/auth-examples",
                type: 'code'
            },
            {
                title: "Authentication Flow Diagram",
                url: "https://eep.ai/resources/auth-flow.pdf",
                type: 'document'
            }
        ],
        mentor: {
            id: 1,
            name: "Alex Johnson",
            role: "Senior Developer",
            avatar: "/avatars/mentor-1.jpg",
            initials: "AJ",
            bio: "Experienced full-stack developer with 10+ years in web development. Specializes in secure authentication systems and API development with Node.js and Express."
        },
        participants: [
            {
                id: 0, // Current user
                name: "You (John Smith)",
                role: "Student",
                avatar: "/avatars/user.jpg",
                initials: "JS",
                status: 'joined'
            },
            {
                id: 1,
                name: "Alex Johnson",
                role: "Senior Developer",
                avatar: "/avatars/mentor-1.jpg",
                initials: "AJ",
                status: 'joined'
            }
        ],
        agenda: [
            {
                title: "Review last week's progress",
                duration: "10 min",
                completed: true
            },
            {
                title: "Discuss authentication implementation challenges",
                duration: "20 min",
                completed: true
            },
            {
                title: "Review code and provide feedback",
                duration: "15 min",
                completed: false
            },
            {
                title: "Set goals for next week",
                duration: "10 min",
                completed: false
            },
            {
                title: "Q&A and additional resources",
                duration: "5 min",
                completed: false
            }
        ],
        notes: "- Discussed JWT token expiration and refresh strategies\n- Reviewed secure storage options for tokens\n- Identified issue with token verification in the middleware\n- Next steps: Implement token refresh logic and improve error handling"
    };

    // State
    const [activeTab, setActiveTab] = useState<string>('info');
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            senderId: 1,
            senderName: "Alex Johnson",
            senderAvatar: "/avatars/mentor-1.jpg",
            senderInitials: "AJ",
            content: "Hi John! Welcome to our session. How's your progress with the authentication implementation?",
            timestamp: "2025-03-20T14:02:00"
        },
        {
            id: 2,
            senderId: 0,
            senderName: "You (John Smith)",
            senderAvatar: "/avatars/user.jpg",
            senderInitials: "JS",
            content: "Hi Alex! I've implemented most of the JWT authentication, but I'm having issues with token verification in the middleware.",
            timestamp: "2025-03-20T14:03:30"
        },
        {
            id: 3,
            senderId: 1,
            senderName: "Alex Johnson",
            senderAvatar: "/avatars/mentor-1.jpg",
            senderInitials: "AJ",
            content: "Let's take a look at that. Can you share the specific error you're seeing?",
            timestamp: "2025-03-20T14:04:15"
        }
    ]);
    const [sessionNotes, setSessionNotes] = useState<string>(sessionData.notes);
    const [elapsedTime, setElapsedTime] = useState<number>(35); // Minutes elapsed (for a 60 min session)

    // Format date and time
    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'EEEE, MMMM d, yyyy');
    };

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    // Format message time
    const formatMessageTime = (timestamp: string) => {
        const date = parseISO(timestamp);
        return format(date, 'h:mm a');
    };

    // Handle send message
    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            senderId: 0, // Current user
            senderName: "You (John Smith)",
            senderAvatar: "/avatars/user.jpg",
            senderInitials: "JS",
            content: message,
            timestamp: new Date().toISOString()
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    // Calculate session progress
    const calculateSessionProgress = () => {
        const sessionDuration = 60; // 60 minutes
        return Math.min(Math.round((elapsedTime / sessionDuration) * 100), 100);
    };

    return (
        <div className="space-y-4">
            {/* Back Button and Session Status */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center"
            >
                <Link href="/dashboard/schedule" className="flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span>Back to Schedule</span>
                </Link>

                <div className="flex items-center">
                    <Badge
                        className={cn(
                            sessionData.status === 'scheduled' && "bg-blue-100 text-blue-800 border-blue-200",
                            sessionData.status === 'in-progress' && "bg-green-100 text-green-800 border-green-200",
                            sessionData.status === 'completed' && "bg-gray-100 text-gray-800 border-gray-200",
                            sessionData.status === 'cancelled' && "bg-red-100 text-red-800 border-red-200"
                        )}
                    >
                        {sessionData.status === 'scheduled' && "Scheduled"}
                        {sessionData.status === 'in-progress' && "In Progress"}
                        {sessionData.status === 'completed' && "Completed"}
                        {sessionData.status === 'cancelled' && "Cancelled"}
                    </Badge>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Session Video/Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-2"
                >
                    <Card className="overflow-hidden h-full flex flex-col">
                        <CardHeader className="px-4 py-3 border-b">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-lg">{sessionData.title}</CardTitle>
                                    <CardDescription className="flex items-center">
                                        <Calendar className="h-3.5 w-3.5 mr-1" />
                                        {formatDate(sessionData.date)} · {formatTime(sessionData.startTime)} - {formatTime(sessionData.endTime)}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <Share2 className="h-4 w-4 mr-1" />
                                                Share
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Clipboard className="h-4 w-4 mr-2" />
                                                Copy Meeting Link
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <UserPlus className="h-4 w-4 mr-2" />
                                                Invite Participant
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Download className="h-4 w-4 mr-2" />
                                                Download Materials
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <FileText className="h-4 w-4 mr-2" />
                                                Export Notes
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                <X className="h-4 w-4 mr-2" />
                                                Leave Session
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>

                        {/* Video Area */}
                        <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                            {sessionData.status === 'in-progress' ? (
                                <>
                                    {/* Main video feed - in a real app, this would be a video component */}
                                    <div className="w-full h-full p-6 flex items-center justify-center">
                                        <img
                                            src="/avatars/mentor-1.jpg"
                                            alt="Alex Johnson"
                                            className="h-40 w-40 rounded-full object-cover border-4 border-indigo-600"
                                        />
                                    </div>

                                    {/* Self video */}
                                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                                        {isVideoOff ? (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                                <User className="h-10 w-10 text-gray-400" />
                                            </div>
                                        ) : (
                                            <img
                                                src="/avatars/user.jpg"
                                                alt="You"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Controls */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-gray-800/80 rounded-full p-1.5">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant={isMuted ? "destructive" : "secondary"}
                                                        size="icon"
                                                        className="rounded-full"
                                                        onClick={() => setIsMuted(!isMuted)}
                                                    >
                                                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{isMuted ? "Unmute" : "Mute"}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant={isVideoOff ? "destructive" : "secondary"}
                                                        size="icon"
                                                        className="rounded-full mx-2"
                                                        onClick={() => setIsVideoOff(!isVideoOff)}
                                                    >
                                                        {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{isVideoOff ? "Turn Video On" : "Turn Video Off"}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="secondary"
                                                        size="icon"
                                                        className="rounded-full"
                                                    >
                                                        <Monitor className="h-5 w-5" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Share Screen</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="rounded-full ml-2 px-4"
                                                    >
                                                        Leave
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Leave Session</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </>
                            ) : sessionData.status === 'completed' && sessionData.recording ? (
                                <div className="w-full h-full p-4 flex flex-col items-center justify-center">
                                    <div className="bg-gray-800 rounded-lg p-6 text-center">
                                        <h3 className="text-white font-semibold text-lg mb-2">Session Recording Available</h3>
                                        <p className="text-gray-300 mb-4">Duration: {sessionData.recording.duration}</p>
                                        <Button>
                                            <Play className="h-4 w-4 mr-2" />
                                            Play Recording
                                        </Button>
                                    </div>
                                </div>
                            ) : sessionData.status === 'scheduled' ? (
                                <div className="w-full h-full p-6 flex flex-col items-center justify-center">
                                    <div className="bg-gray-800 rounded-lg p-6 text-center max-w-md">
                                        <h3 className="text-white font-semibold text-lg mb-2">Session Starts Soon</h3>
                                        <p className="text-gray-300 mb-6">
                                            {formatDate(sessionData.date)} at {formatTime(sessionData.startTime)}
                                        </p>
                                        <Button size="lg">
                                            <Video className="h-4 w-4 mr-2" />
                                            Join Session
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full p-6 flex items-center justify-center">
                                    <div className="bg-gray-800 rounded-lg p-6 text-center">
                                        <h3 className="text-white font-semibold text-lg mb-2">
                                            {sessionData.status === 'cancelled' ? "Session Cancelled" : "Session Unavailable"}
                                        </h3>
                                        <p className="text-gray-300 mb-4">
                                            {sessionData.status === 'cancelled'
                                                ? "This session has been cancelled."
                                                : "This session is no longer available."}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Session Progress */}
                        {sessionData.status === 'in-progress' && (
                            <div className="px-4 py-2 border-t border-b">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="text-sm">Session Progress</div>
                                    <div className="text-sm">{elapsedTime} min / 60 min</div>
                                </div>
                                <Progress value={calculateSessionProgress()} className="h-1.5" />
                            </div>
                        )}

                        {/* Tabs Content */}
                        <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                            <TabsList className="justify-start px-4 pt-3 pb-0 border-b-0">
                                <TabsTrigger value="info" className="text-sm">
                                    Info
                                </TabsTrigger>
                                <TabsTrigger value="chat" className="text-sm">
                                    Chat
                                </TabsTrigger>
                                <TabsTrigger value="materials" className="text-sm">
                                    Materials
                                </TabsTrigger>
                                <TabsTrigger value="notes" className="text-sm">
                                    Notes
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="info" className="flex-1 p-4 overflow-auto">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium mb-2">Session Details</h3>
                                        <p className="text-gray-600 mb-4">{sessionData.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <div className="text-sm text-gray-500">Date & Time</div>
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                    {formatDate(sessionData.date)}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                    {formatTime(sessionData.startTime)} - {formatTime(sessionData.endTime)}
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="text-sm text-gray-500">Location</div>
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                                                    {sessionData.location === 'online' ? 'Online Meeting' : sessionData.address}
                                                </div>
                                                {sessionData.location === 'online' && sessionData.meetingLink && (
                                                    <div className="flex items-center">
                                                        <ExternalLink className="h-4 w-4 text-gray-400 mr-2" />
                                                        <a href={sessionData.meetingLink} className="text-indigo-600 hover:underline truncate">
                                                            {sessionData.meetingLink}
                                                        </a>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={() => navigator.clipboard.writeText(sessionData.meetingLink || '')}>
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                )}
                                                {sessionData.joinCode && (
                                                    <div className="flex items-center">
                                                        <div className="text-sm text-gray-500 mr-2">Join Code:</div>
                                                        <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">{sessionData.joinCode}</code>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={() => navigator.clipboard.writeText(sessionData.joinCode || '')}>
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="font-medium mb-3">Session Agenda</h3>
                                        <div className="space-y-2">
                                            {sessionData.agenda.map((item, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div className={cn(
                                                        "h-5 w-5 rounded-full flex items-center justify-center mr-2 mt-0.5",
                                                        item.completed ? "bg-green-100" : "bg-gray-100"
                                                    )}>
                                                        {item.completed ? (
                                                            <CheckCheck className="h-3 w-3 text-green-600" />
                                                        ) : (
                                                            <span className="text-xs text-gray-600 font-medium">{index + 1}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between">
                                                            <span className={cn(
                                                                "font-medium",
                                                                item.completed && "text-gray-500 line-through"
                                                            )}>
                                                                {item.title}
                                                            </span>
                                                            <span className="text-xs text-gray-500">{item.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="font-medium mb-3">Participants</h3>
                                        <div className="space-y-3">
                                            {sessionData.participants.map((participant) => (
                                                <div key={participant.id} className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <Avatar className="h-8 w-8 mr-2">
                                                            <AvatarImage src={participant.avatar} />
                                                            <AvatarFallback className="bg-indigo-100 text-indigo-700">{participant.initials}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{participant.name}</div>
                                                            <div className="text-xs text-gray-500">{participant.role}</div>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className={cn(
                                                        participant.status === 'joined' && "bg-green-50 text-green-700 border-green-200",
                                                        participant.status === 'not-joined' && "bg-gray-50 text-gray-700 border-gray-200",
                                                        participant.status === 'left' && "bg-red-50 text-red-700 border-red-200"
                                                    )}>
                                                        {participant.status === 'joined' && "Joined"}
                                                        {participant.status === 'not-joined' && "Not Joined"}
                                                        {participant.status === 'left' && "Left"}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="chat" className="flex-1 flex flex-col">
                                <ScrollArea className="flex-1 p-4">
                                    <div className="space-y-4">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={cn(
                                                "flex",
                                                msg.senderId === 0 ? "justify-end" : "justify-start"
                                            )}>
                                                <div className={cn(
                                                    "flex max-w-[75%]",
                                                    msg.senderId === 0 ? "flex-row-reverse" : "flex-row"
                                                )}>
                                                    <div className="flex flex-col">
                                                        <div className={cn(
                                                            "relative rounded-lg p-3",
                                                            msg.senderId === 0
                                                                ? "bg-indigo-600 text-white rounded-br-none"
                                                                : "bg-gray-100 text-gray-800 rounded-bl-none"
                                                        )}>
                                                            <p>{msg.content}</p>
                                                        </div>
                                                        <div className={cn(
                                                            "text-xs mt-1",
                                                            msg.senderId === 0 ? "text-right" : "text-left"
                                                        )}>
                                                            {formatMessageTime(msg.timestamp)}
                                                        </div>
                                                    </div>
                                                    <Avatar className={cn(
                                                        "h-8 w-8 flex-shrink-0",
                                                        msg.senderId === 0 ? "ml-2" : "mr-2"
                                                    )}>
                                                        <AvatarImage src={msg.senderAvatar} />
                                                        <AvatarFallback className="bg-indigo-100 text-indigo-700">{msg.senderInitials}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>

                                <div className="p-3 border-t">
                                    <div className="flex gap-2">
                                        <Textarea
                                            placeholder="Type your message..."
                                            className="min-h-0 h-10 py-2 resize-none"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }
                                            }}
                                        />
                                        <Button
                                            size="icon"
                                            className="rounded-full"
                                            onClick={handleSendMessage}
                                            disabled={!message.trim()}
                                        >
                                            <Send className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="materials" className="flex-1 p-4 overflow-auto">
                                <div className="space-y-4">
                                    <h3 className="font-medium">Session Materials</h3>
                                    <p className="text-gray-600 mb-4">
                                        Access resources shared for this session
                                    </p>

                                    <div className="space-y-3">
                                        {sessionData.materialLinks.map((material, index) => (
                                            <Card key={index}>
                                                <div className="p-3 flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className={cn(
                                                            "h-10 w-10 rounded-lg flex items-center justify-center mr-3",
                                                            material.type === 'document' && "bg-red-100 text-red-600",
                                                            material.type === 'video' && "bg-blue-100 text-blue-600",
                                                            material.type === 'code' && "bg-green-100 text-green-600",
                                                            material.type === 'presentation' && "bg-amber-100 text-amber-600"
                                                        )}>
                                                            {material.type === 'document' && <FileText className="h-5 w-5" />}
                                                            {material.type === 'video' && <Video className="h-5 w-5" />}
                                                            {material.type === 'code' && <Code className="h-5 w-5" />}
                                                            {material.type === 'presentation' && <Monitor className="h-5 w-5" />}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{material.title}</div>
                                                            <div className="text-xs text-gray-500 truncate max-w-xs">
                                                                {material.url}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <a href={material.url} target="_blank" rel="noopener noreferrer">
                                                                Open
                                                            </a>
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="font-medium mb-2">Additional Resources</h3>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="recommended-reading">
                                                <AccordionTrigger>Recommended Reading</AccordionTrigger>
                                                <AccordionContent>
                                                    <ul className="space-y-2 list-disc pl-4">
                                                        <li><a href="#" className="text-indigo-600 hover:underline">Understanding JWT Tokens in Depth</a></li>
                                                        <li><a href="#" className="text-indigo-600 hover:underline">Token-based Authentication Best Practices</a></li>
                                                        <li><a href="#" className="text-indigo-600 hover:underline">Securing RESTful APIs with JWT</a></li>
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="code-examples">
                                                <AccordionTrigger>Code Examples</AccordionTrigger>
                                                <AccordionContent>
                                                    <ul className="space-y-2 list-disc pl-4">
                                                        <li><a href="#" className="text-indigo-600 hover:underline">JWT Authentication Middleware Example</a></li>
                                                        <li><a href="#" className="text-indigo-600 hover:underline">Token Refresh Implementation</a></li>
                                                        <li><a href="#" className="text-indigo-600 hover:underline">Secure Storage Strategies</a></li>
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="notes" className="flex-1 p-4 overflow-auto">
                                <div className="space-y-4">
                                    <h3 className="font-medium">Session Notes</h3>
                                    <p className="text-gray-600 mb-4">
                                        Take notes during your session to reference later
                                    </p>

                                    <Textarea
                                        placeholder="Type your notes here..."
                                        className="min-h-[200px]"
                                        value={sessionNotes}
                                        onChange={(e) => setSessionNotes(e.target.value)}
                                    />

                                    <div className="flex justify-end">
                                        <Button variant="outline" size="sm" className="mr-2">
                                            <Download className="h-4 w-4 mr-1" />
                                            Export
                                        </Button>
                                        <Button size="sm">
                                            Save Notes
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </motion.div>

                {/* Mentor Information */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-1"
                >
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Mentor</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="h-24 w-24 mb-4">
                                        <AvatarImage src={sessionData.mentor.avatar} />
                                        <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-700">{sessionData.mentor.initials}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-semibold text-lg">{sessionData.mentor.name}</h3>
                                    <p className="text-gray-500 mb-4">{sessionData.mentor.role}</p>

                                    <p className="text-sm text-gray-600 mb-6">
                                        {sessionData.mentor.bio}
                                    </p>

                                    <div className="w-full">
                                        <Tabs defaultValue="contact">
                                            <TabsList className="grid grid-cols-2 w-full">
                                                <TabsTrigger value="contact" className="text-xs">Contact</TabsTrigger>
                                                <TabsTrigger value="schedule" className="text-xs">Schedule</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="contact" className="pt-4">
                                                <div className="space-y-2">
                                                    <Button variant="outline" className="w-full justify-start" asChild>
                                                        <Link href={`/dashboard/messages?mentor=${sessionData.mentor.id}`}>
                                                            <MessageSquare className="h-4 w-4 mr-2" />
                                                            Send Message
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" className="w-full justify-start" asChild>
                                                        <Link href={`/dashboard/mentors/${sessionData.mentor.id}`}>
                                                            <User className="h-4 w-4 mr-2" />
                                                            View Profile
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="schedule" className="pt-4">
                                                <div className="space-y-2">
                                                    <Button variant="outline" className="w-full justify-start" asChild>
                                                        <Link href={`/dashboard/schedule/new?mentor=${sessionData.mentor.id}`}>
                                                            <Calendar className="h-4 w-4 mr-2" />
                                                            Book Session
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" className="w-full justify-start" asChild>
                                                        <Link href={`/dashboard/schedule?mentor=${sessionData.mentor.id}`}>
                                                            <Clock className="h-4 w-4 mr-2" />
                                                            View Availability
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" className="h-auto py-3 justify-start flex-col items-center text-center">
                                        <PenTool className="h-5 w-5 mb-1" />
                                        <span className="text-xs">Whiteboard</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto py-3 justify-start flex-col items-center text-center">
                                        <Monitor className="h-5 w-5 mb-1" />
                                        <span className="text-xs">Share Screen</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto py-3 justify-start flex-col items-center text-center">
                                        <FileText className="h-5 w-5 mb-1" />
                                        <span className="text-xs">Add Material</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto py-3 justify-start flex-col items-center text-center">
                                        <UserPlus className="h-5 w-5 mb-1" />
                                        <span className="text-xs">Invite</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-gray-100 rounded-lg p-2 text-center mr-3 w-12">
                                            <div className="text-xs text-gray-500">Mar</div>
                                            <div className="text-xl font-bold">27</div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">CV Lab Session</h4>
                                            <p className="text-xs text-gray-500">3:00 PM - 5:00 PM</p>
                                            <div className="flex items-center mt-1">
                                                <Avatar className="h-4 w-4 mr-1">
                                                    <AvatarImage src="/avatars/mentor-5.jpg" />
                                                    <AvatarFallback className="text-[8px] bg-indigo-100 text-indigo-700">DK</AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs text-gray-500">David Kim</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-gray-100 rounded-lg p-2 text-center mr-3 w-12">
                                            <div className="text-xs text-gray-500">Apr</div>
                                            <div className="text-xl font-bold">02</div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Weekly Progress Review</h4>
                                            <p className="text-xs text-gray-500">2:00 PM - 3:00 PM</p>
                                            <div className="flex items-center mt-1">
                                                <Avatar className="h-4 w-4 mr-1">
                                                    <AvatarImage src="/avatars/mentor-1.jpg" />
                                                    <AvatarFallback className="text-[8px] bg-indigo-100 text-indigo-700">AJ</AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs text-gray-500">Alex Johnson</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                                    <Link href="/dashboard/schedule">
                                        View All Sessions
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}