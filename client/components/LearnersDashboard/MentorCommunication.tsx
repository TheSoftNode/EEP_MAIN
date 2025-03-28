"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Send,
    Search,
    XCircle,
    Paperclip,
    Image,
    Calendar,
    Video,
    MoreHorizontal,
    Phone,
    MessageSquare,
    Info,
    Users,
    Filter,
    CheckCircle,
    FileText,
    Download,
    Plus,
    Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
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
import { cn } from '@/lib/utils';

// Types
interface Mentor {
    id: number;
    name: string;
    role: string;
    avatar?: string;
    initials: string;
    online: boolean;
    lastActive?: string;
    skills: string[];
}

interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: string;
    read: boolean;
    attachments?: {
        id: number;
        name: string;
        type: string;
        url: string;
        size: string;
    }[];
}

interface Conversation {
    id: number;
    participants: number[];
    lastMessageTime: string;
    unreadCount: number;
}

export default function MentorCommunication() {
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');
    const [currentMentorId, setCurrentMentorId] = useState<number | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs
    const messageEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const initialLoadRef = useRef(false);

    // Mock data for mentors
    const mentors: Mentor[] = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "Senior Developer",
            avatar: "/avatars/mentor-1.jpg",
            initials: "AJ",
            online: true,
            skills: ["JavaScript", "TypeScript", "React", "Node.js"]
        },
        {
            id: 2,
            name: "Sarah Wilson",
            role: "Frontend Specialist",
            avatar: "/avatars/mentor-2.jpg",
            initials: "SW",
            online: false,
            lastActive: "2 hours ago",
            skills: ["React", "UI/UX", "CSS", "Design Systems"]
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Database Expert",
            avatar: "/avatars/mentor-3.jpg",
            initials: "MC",
            online: true,
            skills: ["MongoDB", "SQL", "Database Design", "API Development"]
        },
        {
            id: 4,
            name: "Emily Davis",
            role: "AI Specialist",
            avatar: "/avatars/mentor-4.jpg",
            initials: "ED",
            online: false,
            lastActive: "1 day ago",
            skills: ["Machine Learning", "NLP", "Python", "TensorFlow"]
        },
        {
            id: 5,
            name: "David Kim",
            role: "CV Specialist",
            avatar: "/avatars/mentor-5.jpg",
            initials: "DK",
            online: false,
            lastActive: "3 hours ago",
            skills: ["Computer Vision", "Image Processing", "PyTorch", "OpenCV"]
        }
    ];

    // Mock data for conversations and messages
    const conversations: Conversation[] = [
        {
            id: 1,
            participants: [1],
            lastMessageTime: "2025-03-18T14:30:00",
            unreadCount: 0
        },
        {
            id: 2,
            participants: [2],
            lastMessageTime: "2025-03-17T09:15:00",
            unreadCount: 2
        },
        {
            id: 3,
            participants: [3],
            lastMessageTime: "2025-03-15T16:45:00",
            unreadCount: 0
        },
        {
            id: 4,
            participants: [4],
            lastMessageTime: "2025-03-10T11:20:00",
            unreadCount: 0
        },
        {
            id: 5,
            participants: [5],
            lastMessageTime: "2025-03-05T13:10:00",
            unreadCount: 0
        }
    ];

    const allMessages: Message[] = [
        {
            id: 1,
            senderId: 1,
            receiverId: 0, // 0 means the current user
            content: "Hi there! How are you progressing with this week's tasks?",
            timestamp: "2025-03-18T10:30:00",
            read: true
        },
        {
            id: 2,
            senderId: 0,
            receiverId: 1,
            content: "I'm doing well, thanks! I've completed the first part of the API implementation but I'm having some issues with authentication.",
            timestamp: "2025-03-18T10:35:00",
            read: true
        },
        {
            id: 3,
            senderId: 1,
            receiverId: 0,
            content: "Authentication can be tricky. What specific issue are you facing?",
            timestamp: "2025-03-18T10:40:00",
            read: true
        },
        {
            id: 4,
            senderId: 0,
            receiverId: 1,
            content: "I'm trying to implement JWT authentication but getting an error with token verification. Here's the code snippet:",
            timestamp: "2025-03-18T10:45:00",
            read: true,
            attachments: [
                {
                    id: 1,
                    name: "auth-code.js",
                    type: "text/javascript",
                    url: "/uploads/auth-code.js",
                    size: "2.4 KB"
                }
            ]
        },
        {
            id: 5,
            senderId: 1,
            receiverId: 0,
            content: "I see the issue. You need to ensure the secret key is consistent between token creation and verification. Also, check the token expiration settings. I've made some comments in your code.",
            timestamp: "2025-03-18T11:00:00",
            read: true,
            attachments: [
                {
                    id: 2,
                    name: "auth-code-reviewed.js",
                    type: "text/javascript",
                    url: "/uploads/auth-code-reviewed.js",
                    size: "2.6 KB"
                }
            ]
        },
        {
            id: 6,
            senderId: 0,
            receiverId: 1,
            content: "Thank you so much! That fixed the issue. I appreciate your help.",
            timestamp: "2025-03-18T14:30:00",
            read: true
        },
        {
            id: 7,
            senderId: 2,
            receiverId: 0,
            content: "Hi there! I reviewed your frontend implementation and had some feedback on the component architecture.",
            timestamp: "2025-03-17T09:00:00",
            read: false
        },
        {
            id: 8,
            senderId: 2,
            receiverId: 0,
            content: "Take a look at the attached document for my detailed comments. Overall great work, but there are a few improvements we can make for better maintainability.",
            timestamp: "2025-03-17T09:15:00",
            read: false,
            attachments: [
                {
                    id: 3,
                    name: "component-review.pdf",
                    type: "application/pdf",
                    url: "/uploads/component-review.pdf",
                    size: "1.8 MB"
                }
            ]
        },
        {
            id: 9,
            senderId: 3,
            receiverId: 0,
            content: "Hello! Just checking in on your database schema implementation. How's it going?",
            timestamp: "2025-03-15T16:30:00",
            read: true
        },
        {
            id: 10,
            senderId: 0,
            receiverId: 3,
            content: "I've completed the schema design and implemented the models. Everything seems to be working well!",
            timestamp: "2025-03-15T16:45:00",
            read: true
        }
    ];

    // Initialize to first mentor if none selected
    useEffect(() => {
        if (!currentMentorId && mentors.length > 0) {
            setCurrentMentorId(mentors[0].id);
        }
    }, [mentors, currentMentorId]);

    // Filter mentors based on search
    const filteredMentors = mentors.filter(mentor =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Get current mentor
    const currentMentor = mentors.find(mentor => mentor.id === currentMentorId);

    // Get messages for current conversation
    const currentMessages = allMessages.filter(
        msg => (msg.senderId === currentMentorId && msg.receiverId === 0) ||
            (msg.senderId === 0 && msg.receiverId === currentMentorId)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // Scroll to bottom of messages
    useEffect(() => {
        // Add a condition to check if this is an update with new messages
        // rather than initial load
        if (messageEndRef.current && currentMessages.length > 0) {
            // Store a flag in ref to know if it's the initial load
            if (!initialLoadRef.current) {
                initialLoadRef.current = true;
            } else {
                messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [currentMessages]);

    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUploadedFiles(Array.from(e.target.files));
        }
    };

    // Handle file click
    const handleFileButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Remove a file from the upload list
    const handleRemoveFile = (index: number) => {
        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    };

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!message.trim() && uploadedFiles.length === 0) return;
        if (!currentMentorId) return;

        setIsSubmitting(true);

        // In a real app, this would be an API call
        // For now, simulate sending a message
        await new Promise(resolve => setTimeout(resolve, 500));

        // Clear the input and files
        setMessage('');
        setUploadedFiles([]);
        setIsSubmitting(false);
    };

    // Get the conversation for a mentor
    const getMentorConversation = (mentorId: number) => {
        return conversations.find(conv => conv.participants.includes(mentorId));
    };

    // Format time
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Format date
    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        }
    };

    // Group messages by date
    const groupedMessages: { [key: string]: Message[] } = {};
    currentMessages.forEach(message => {
        const date = formatDate(message.timestamp);
        if (!groupedMessages[date]) {
            groupedMessages[date] = [];
        }
        groupedMessages[date].push(message);
    });

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
                        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
                        <p className="text-gray-500">Communicate with your mentors</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule Session
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Schedule a Mentoring Session</DialogTitle>
                                    <DialogDescription>
                                        Book a one-on-one session with a mentor
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="h-96 bg-slate-100 rounded-md flex items-center justify-center">
                                    <p className="text-gray-500 text-sm">Scheduling calendar would be displayed here</p>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Users className="h-4 w-4 mr-2" />
                                    New Group
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Create a Group Conversation</DialogTitle>
                                    <DialogDescription>
                                        Select mentors to add to your group
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="h-96 bg-slate-100 rounded-md flex items-center justify-center">
                                    <p className="text-gray-500 text-sm">Group creation interface would be displayed here</p>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button>Create Group</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Conversations List */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-1"
                >
                    <Card className="h-[calc(80vh-2rem)]">
                        <CardHeader className="pb-0">
                            <div className="flex items-center justify-between mb-2">
                                <CardTitle>Conversations</CardTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <Filter className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>All conversations</DropdownMenuItem>
                                        <DropdownMenuItem>Unread</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>By date</DropdownMenuItem>
                                        <DropdownMenuItem>By mentor</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="relative mb-2">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    type="search"
                                    placeholder="Search mentors..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[calc(80vh-8rem)]">
                                <div className="divide-y">
                                    {filteredMentors.map((mentor) => {
                                        const conversation = getMentorConversation(mentor.id);
                                        return (
                                            <div
                                                key={mentor.id}
                                                className={cn(
                                                    "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors",
                                                    currentMentorId === mentor.id && "bg-indigo-50"
                                                )}
                                                onClick={() => setCurrentMentorId(mentor.id)}
                                            >
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={mentor.avatar} />
                                                        <AvatarFallback className="bg-indigo-100 text-indigo-700">{mentor.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className={cn(
                                                            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                                                            mentor.online ? "bg-green-500" : "bg-gray-300"
                                                        )}
                                                    ></div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between">
                                                        <h4 className="font-medium truncate">{mentor.name}</h4>
                                                        {conversation && (
                                                            <span className="text-xs text-gray-500">
                                                                {formatTime(conversation.lastMessageTime)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 truncate">{mentor.role}</p>
                                                </div>
                                                {conversation && conversation.unreadCount > 0 && (
                                                    <Badge className="bg-indigo-600 hover:bg-indigo-700">
                                                        {conversation.unreadCount}
                                                    </Badge>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Chat Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="md:col-span-2 lg:col-span-3"
                >
                    <Card className="h-[calc(80vh-2rem)] flex flex-col">
                        {currentMentor ? (
                            <>
                                {/* Chat Header */}
                                <CardHeader className="border-b py-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Avatar className="h-10 w-10 mr-3">
                                                <AvatarImage src={currentMentor.avatar} />
                                                <AvatarFallback className="bg-indigo-100 text-indigo-700">{currentMentor.initials}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">{currentMentor.name}</h3>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <span className={cn(
                                                        "h-2 w-2 rounded-full mr-2",
                                                        currentMentor.online ? "bg-green-500" : "bg-gray-300"
                                                    )}></span>
                                                    <span>
                                                        {currentMentor.online
                                                            ? "Online"
                                                            : `Last active ${currentMentor.lastActive}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/dashboard/call?mentor=${currentMentor.id}`}>
                                                    <Phone className="h-5 w-5 text-gray-500" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/dashboard/video?mentor=${currentMentor.id}`}>
                                                    <Video className="h-5 w-5 text-gray-500" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/dashboard/mentors/${currentMentor.id}`}>
                                                    <Info className="h-5 w-5 text-gray-500" />
                                                </Link>
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-5 w-5 text-gray-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View profile</DropdownMenuItem>
                                                    <DropdownMenuItem>Schedule a session</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                                                    <DropdownMenuItem>Mute conversation</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </CardHeader>

                                {/* Chat Messages */}
                                <CardContent className="flex-1 overflow-y-auto p-4">
                                    <ScrollArea className="h-full pr-4">
                                        {Object.keys(groupedMessages).map((date) => (
                                            <div key={date} className="mb-6">
                                                <div className="flex items-center justify-center mb-4">
                                                    <div className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                                                        {date}
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    {groupedMessages[date].map((msg) => (
                                                        <div
                                                            key={msg.id}
                                                            className={cn(
                                                                "flex flex-col max-w-[80%]",
                                                                msg.senderId === 0 ? "ml-auto items-end" : "mr-auto items-start"
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "flex items-start gap-3",
                                                                msg.senderId === 0 && "flex-row-reverse"
                                                            )}>
                                                                {msg.senderId !== 0 && (
                                                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                                                        <AvatarImage src={currentMentor.avatar} />
                                                                        <AvatarFallback className="bg-indigo-100 text-indigo-700">{currentMentor.initials}</AvatarFallback>
                                                                    </Avatar>
                                                                )}
                                                                <div className={cn(
                                                                    "p-3 rounded-lg",
                                                                    msg.senderId === 0
                                                                        ? "bg-indigo-600 text-white rounded-br-none"
                                                                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                                                                )}>
                                                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                                                </div>
                                                            </div>

                                                            {/* Attachments */}
                                                            {msg.attachments && msg.attachments.length > 0 && (
                                                                <div className={cn(
                                                                    "mt-2 space-y-2",
                                                                    msg.senderId === 0 ? "text-right" : "text-left"
                                                                )}>
                                                                    {msg.attachments.map((attachment) => (
                                                                        <div
                                                                            key={attachment.id}
                                                                            className={cn(
                                                                                "inline-block p-2 border rounded-lg",
                                                                                msg.senderId === 0
                                                                                    ? "bg-indigo-50 border-indigo-200"
                                                                                    : "bg-gray-50 border-gray-200"
                                                                            )}
                                                                        >
                                                                            <div className="flex items-center gap-2">
                                                                                <div className={cn(
                                                                                    "h-8 w-8 rounded-lg flex items-center justify-center",
                                                                                    msg.senderId === 0
                                                                                        ? "bg-indigo-100 text-indigo-600"
                                                                                        : "bg-gray-100 text-gray-600"
                                                                                )}>
                                                                                    <FileText className="h-4 w-4" />
                                                                                </div>
                                                                                <div className="min-w-0">
                                                                                    <p className="text-sm font-medium truncate">
                                                                                        {attachment.name}
                                                                                    </p>
                                                                                    <p className="text-xs text-gray-500">
                                                                                        {attachment.size}
                                                                                    </p>
                                                                                </div>
                                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                                    <Download className="h-4 w-4" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            <div className={cn(
                                                                "text-xs text-gray-500 mt-1",
                                                                msg.senderId === 0 ? "text-right" : "text-left"
                                                            )}>
                                                                {formatTime(msg.timestamp)}
                                                                {msg.senderId === 0 && (
                                                                    <span className="ml-1">
                                                                        {msg.read ? (
                                                                            <CheckCircle className="h-3 w-3 text-green-500 inline" />
                                                                        ) : (
                                                                            <CheckCircle className="h-3 w-3 text-gray-400 inline" />
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messageEndRef} />
                                    </ScrollArea>
                                </CardContent>

                                {/* Message Input */}
                                <CardFooter className="p-3 border-t">
                                    {uploadedFiles.length > 0 && (
                                        <div className="mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="text-sm text-gray-500 mb-2">Attachments</div>
                                            <div className="flex flex-wrap gap-2">
                                                {uploadedFiles.map((file, index) => (
                                                    <div key={index} className="flex items-center bg-white border border-gray-200 rounded-lg p-2">
                                                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                                        <span className="text-sm truncate max-w-[120px]">{file.name}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-5 w-5 ml-2 text-gray-400 hover:text-red-500"
                                                            onClick={() => handleRemoveFile(index)}
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 w-full">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" className="rounded-full">
                                                    <Plus className="h-4 w-4 text-gray-500" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                <DropdownMenuItem onClick={handleFileButtonClick}>
                                                    <Paperclip className="h-4 w-4 mr-2" />
                                                    Attach File
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Image className="h-4 w-4 mr-2" />
                                                    Attach Image
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Code className="h-4 w-4 mr-2" />
                                                    Code Snippet
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            multiple
                                        />
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
                                            disabled={isSubmitting || (!message.trim() && uploadedFiles.length === 0)}
                                        >
                                            {isSubmitting ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </motion.div>
                                            ) : (
                                                <Send className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </div>
                                </CardFooter>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                        <MessageSquare className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">No Conversation Selected</h3>
                                    <p className="text-gray-500 max-w-md">
                                        Select a mentor from the list to start a conversation or get help with your learning journey.
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}