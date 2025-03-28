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
    Code,
    Briefcase,
    ArrowUpRight,
    Bell,
    ChevronDown,
    BookOpen
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Types
interface Contact {
    id: number;
    name: string;
    role: string;
    avatar?: string;
    initials: string;
    online: boolean;
    lastActive?: string;
    unreadCount?: number;
    tags?: string[];
    type: 'mentor' | 'peer' | 'group' | 'system';
}

interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: string;
    read: boolean;
    type?: 'text' | 'file' | 'image' | 'code' | 'assignment';
    attachments?: {
        id: number;
        name: string;
        type: string;
        url: string;
        size: string;
    }[];
}

interface Assignment {
    id: number;
    title: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'reviewed';
    description: string;
}

export default function LearnerMessages() {
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');
    const [currentContactId, setCurrentContactId] = useState<number | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('all');
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    // Refs
    const messageEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const initialLoadRef = useRef(false);

    // Mock data for contacts
    const contacts: Contact[] = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "Senior Developer",
            avatar: "/avatars/mentor-1.jpg",
            initials: "AJ",
            online: true,
            type: 'mentor',
            tags: ['JavaScript', 'React']
        },
        {
            id: 2,
            name: "Sarah Wilson",
            role: "Frontend Specialist",
            avatar: "/avatars/mentor-2.jpg",
            initials: "SW",
            online: false,
            lastActive: "2 hours ago",
            unreadCount: 2,
            type: 'mentor',
            tags: ['CSS', 'UI/UX']
        },
        {
            id: 3,
            name: "Web Dev Group",
            role: "Study Group",
            initials: "WD",
            online: true,
            type: 'group',
            tags: ['Web Development']
        },
        {
            id: 4,
            name: "Michael Chen",
            role: "Database Expert",
            avatar: "/avatars/mentor-3.jpg",
            initials: "MC",
            online: true,
            type: 'mentor',
            tags: ['MongoDB', 'SQL']
        },
        {
            id: 5,
            name: "Emily Davis",
            role: "AI Specialist",
            avatar: "/avatars/mentor-4.jpg",
            initials: "ED",
            online: false,
            lastActive: "1 day ago",
            type: 'mentor',
            tags: ['AI', 'Python']
        },
        {
            id: 6,
            name: "Brian Taylor",
            role: "Fellow Student",
            avatar: "/avatars/peer-1.jpg",
            initials: "BT",
            online: true,
            type: 'peer',
            tags: ['JavaScript', 'React']
        },
        {
            id: 7,
            name: "EEP Notifications",
            role: "System",
            initials: "EEP",
            online: true,
            unreadCount: 3,
            type: 'system',
            tags: ['Assignments', 'Updates']
        }
    ];

    // Mock data for messages
    const allMessages: Message[] = [
        {
            id: 1,
            senderId: 2,
            receiverId: 0, // 0 is the current user
            content: "Hi there! I reviewed your frontend implementation and had some feedback on the component architecture.",
            timestamp: "2025-03-17T09:00:00",
            read: false
        },
        {
            id: 2,
            senderId: 2,
            receiverId: 0,
            content: "Take a look at the attached document for my detailed comments. Overall great work, but there are a few improvements we can make for better maintainability.",
            timestamp: "2025-03-17T09:15:00",
            read: false,
            attachments: [
                {
                    id: 1,
                    name: "component-review.pdf",
                    type: "application/pdf",
                    url: "/uploads/component-review.pdf",
                    size: "1.8 MB"
                }
            ]
        },
        {
            id: 3,
            senderId: 1,
            receiverId: 0,
            content: "Hi there! How are you progressing with this week's tasks?",
            timestamp: "2025-03-18T10:30:00",
            read: true
        },
        {
            id: 4,
            senderId: 0,
            receiverId: 1,
            content: "I'm doing well, thanks! I've completed the first part of the API implementation but I'm having some issues with authentication.",
            timestamp: "2025-03-18T10:35:00",
            read: true
        },
        {
            id: 5,
            senderId: 1,
            receiverId: 0,
            content: "Authentication can be tricky. What specific issue are you facing?",
            timestamp: "2025-03-18T10:40:00",
            read: true
        },
        {
            id: 6,
            senderId: 0,
            receiverId: 1,
            content: "I'm trying to implement JWT authentication but getting an error with token verification. Here's the code snippet:",
            timestamp: "2025-03-18T10:45:00",
            read: true,
            type: 'code',
            attachments: [
                {
                    id: 2,
                    name: "auth-code.js",
                    type: "text/javascript",
                    url: "/uploads/auth-code.js",
                    size: "2.4 KB"
                }
            ]
        },
        {
            id: 7,
            senderId: 1,
            receiverId: 0,
            content: "I see the issue. You need to ensure the secret key is consistent between token creation and verification. Also, check the token expiration settings. I've made some comments in your code.",
            timestamp: "2025-03-18T11:00:00",
            read: true,
            type: 'code',
            attachments: [
                {
                    id: 3,
                    name: "auth-code-reviewed.js",
                    type: "text/javascript",
                    url: "/uploads/auth-code-reviewed.js",
                    size: "2.6 KB"
                }
            ]
        },
        {
            id: 8,
            senderId: 0,
            receiverId: 1,
            content: "Thank you so much! That fixed the issue. I appreciate your help.",
            timestamp: "2025-03-18T14:30:00",
            read: true
        },
        {
            id: 9,
            senderId: 6,
            receiverId: 0,
            content: "Hey, are you joining the study group tonight? We're going through the authentication module together.",
            timestamp: "2025-03-19T15:20:00",
            read: true
        },
        {
            id: 10,
            senderId: 0,
            receiverId: 6,
            content: "Yes, definitely! I just had some issues with JWT that Alex helped me solve. Would be great to discuss with everyone.",
            timestamp: "2025-03-19T15:30:00",
            read: true
        },
        {
            id: 11,
            senderId: 7,
            receiverId: 0,
            content: "📌 Assignment reminder: 'Week 6: Build a REST API' is due in 3 days.",
            timestamp: "2025-03-22T09:00:00",
            read: false,
            type: 'assignment'
        },
        {
            id: 12,
            senderId: 7,
            receiverId: 0,
            content: "🎉 Congratulations! You've completed 45% of your AI Development program!",
            timestamp: "2025-03-22T09:01:00",
            read: false
        },
        {
            id: 13,
            senderId: 7,
            receiverId: 0,
            content: "📚 New learning materials are available for Week 6. Check your dashboard for updated resources.",
            timestamp: "2025-03-22T09:02:00",
            read: false
        }
    ];

    // Pending assignments
    const assignments: Assignment[] = [
        {
            id: 1,
            title: "Week 6: Build a REST API",
            dueDate: "2025-03-25",
            status: 'pending',
            description: "Create a RESTful API using Node.js and Express with MongoDB integration."
        },
        {
            id: 2,
            title: "Week 5: Frontend Implementation",
            dueDate: "2025-03-18",
            status: 'submitted',
            description: "Implement the user interface using React with responsive design."
        },
        {
            id: 3,
            title: "Week 4: Database Design",
            dueDate: "2025-03-11",
            status: 'reviewed',
            description: "Design and implement the database schema using MongoDB."
        }
    ];

    // Initialize to first contact if none selected
    useEffect(() => {
        if (!currentContactId && contacts.length > 0) {
            setCurrentContactId(contacts[0].id);
        }
    }, [contacts, currentContactId]);

    // Filter contacts based on search and active tab
    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (contact.tags && contact.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

        if (activeTab === 'all') {
            return matchesSearch;
        } else if (activeTab === 'mentors') {
            return matchesSearch && contact.type === 'mentor';
        } else if (activeTab === 'peers') {
            return matchesSearch && contact.type === 'peer';
        } else if (activeTab === 'groups') {
            return matchesSearch && contact.type === 'group';
        }

        return matchesSearch;
    });

    // Get current contact
    const currentContact = contacts.find(contact => contact.id === currentContactId);

    // Get messages for current conversation
    const currentMessages = allMessages.filter(
        msg => (msg.senderId === currentContactId && msg.receiverId === 0) ||
            (msg.senderId === 0 && msg.receiverId === currentContactId)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // Get unread notifications count
    const unreadNotificationsCount = contacts.find(c => c.id === 7)?.unreadCount || 0;

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

    // Handle file button click
    const handleFileButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Remove a file from upload list
    const handleRemoveFile = (index: number) => {
        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    };

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!message.trim() && uploadedFiles.length === 0) return;
        if (!currentContactId) return;

        setIsSubmitting(true);

        // In a real app, this would be an API call
        // For now, simulate sending a message
        await new Promise(resolve => setTimeout(resolve, 500));

        // Clear the input and files
        setMessage('');
        setUploadedFiles([]);
        setIsSubmitting(false);
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

    // Format due date for assignments
    const formatDueDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Due today';
        } else if (diffDays === 1) {
            return 'Due tomorrow';
        } else if (diffDays > 0) {
            return `Due in ${diffDays} days`;
        } else {
            return 'Past due';
        }
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
                        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
                        <p className="text-gray-500">Communicate with mentors, peers, and study groups</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="relative">
                                    <Bell className="h-4 w-4 mr-2" />
                                    Notifications
                                    {unreadNotificationsCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                            {unreadNotificationsCount}
                                        </span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[350px]" align="end">
                                <div className="flex items-center justify-between p-2 border-b">
                                    <h3 className="font-medium">Notifications</h3>
                                    <Button variant="ghost" size="sm">
                                        Mark all as read
                                    </Button>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto">
                                    {allMessages
                                        .filter(msg => msg.senderId === 7)
                                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                                        .map(notification => (
                                            <DropdownMenuItem key={notification.id} className="p-3 focus:bg-gray-100">
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-indigo-100 rounded-full p-2 text-indigo-600">
                                                        {notification.type === 'assignment' ? (
                                                            <BookOpen className="h-4 w-4" />
                                                        ) : (
                                                            <Bell className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className={cn(
                                                            "text-sm",
                                                            !notification.read && "font-medium"
                                                        )}>
                                                            {notification.content}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {formatTime(notification.timestamp)} · {formatDate(notification.timestamp)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="p-2 focus:bg-gray-100">
                                    <Link href="/dashboard/notifications" className="w-full flex items-center justify-center">
                                        View all notifications
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Users className="h-4 w-4 mr-2" />
                                    New Message
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>New Message</DialogTitle>
                                    <DialogDescription>
                                        Start a conversation with mentors, peers, or create a group
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Recipient</label>
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                            <Input
                                                type="search"
                                                placeholder="Search by name or role..."
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Message</label>
                                        <Textarea
                                            placeholder="Type your message here..."
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button>Send Message</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Conversations & Assignments Tabs */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-1"
                >
                    <Card className="h-[calc(80vh-2rem)]">
                        <Tabs defaultValue="conversations" className="h-full flex flex-col">
                            <div className="px-4 pt-4 border-b pb-2">
                                <TabsList className="w-full grid grid-cols-2">
                                    <TabsTrigger value="conversations" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Conversations
                                    </TabsTrigger>
                                    <TabsTrigger value="assignments" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                                        <Briefcase className="h-4 w-4 mr-2" />
                                        Assignments
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="conversations" className="flex-1 flex flex-col">
                                <CardHeader className="pb-0 pt-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex">
                                            <Button
                                                variant={activeTab === 'all' ? 'secondary' : 'ghost'}
                                                size="sm"
                                                className="h-7 px-2 text-xs"
                                                onClick={() => setActiveTab('all')}
                                            >
                                                All
                                            </Button>
                                            <Button
                                                variant={activeTab === 'mentors' ? 'secondary' : 'ghost'}
                                                size="sm"
                                                className="h-7 px-2 text-xs"
                                                onClick={() => setActiveTab('mentors')}
                                            >
                                                Mentors
                                            </Button>
                                            <Button
                                                variant={activeTab === 'peers' ? 'secondary' : 'ghost'}
                                                size="sm"
                                                className="h-7 px-2 text-xs"
                                                onClick={() => setActiveTab('peers')}
                                            >
                                                Peers
                                            </Button>
                                            <Button
                                                variant={activeTab === 'groups' ? 'secondary' : 'ghost'}
                                                size="sm"
                                                className="h-7 px-2 text-xs"
                                                onClick={() => setActiveTab('groups')}
                                            >
                                                Groups
                                            </Button>
                                        </div>
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
                                                <DropdownMenuItem>By name</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="relative mb-2">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                        <Input
                                            type="search"
                                            placeholder="Search messages..."
                                            className="pl-9"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 flex-1 overflow-hidden">
                                    <ScrollArea className="h-full">
                                        <div className="divide-y">
                                            {filteredContacts.map((contact) => (
                                                <div
                                                    key={contact.id}
                                                    className={cn(
                                                        "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors",
                                                        currentContactId === contact.id && "bg-indigo-50"
                                                    )}
                                                    onClick={() => setCurrentContactId(contact.id)}
                                                >
                                                    <div className="relative">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={contact.avatar} />
                                                            <AvatarFallback className={cn(
                                                                "text-white",
                                                                contact.type === 'mentor' && "bg-indigo-600",
                                                                contact.type === 'peer' && "bg-green-600",
                                                                contact.type === 'group' && "bg-purple-600",
                                                                contact.type === 'system' && "bg-blue-600"
                                                            )}>{contact.initials}</AvatarFallback>
                                                        </Avatar>
                                                        {contact.type !== 'system' && (
                                                            <div
                                                                className={cn(
                                                                    "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                                                                    contact.online ? "bg-green-500" : "bg-gray-300"
                                                                )}
                                                            ></div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between">
                                                            <h4 className="font-medium truncate">{contact.name}</h4>
                                                            {contact.unreadCount ? (
                                                                <Badge className="bg-indigo-600 hover:bg-indigo-700">
                                                                    {contact.unreadCount}
                                                                </Badge>
                                                            ) : (
                                                                <span className="text-xs text-gray-500">
                                                                    {formatTime(getCurrentMessageTime(contact.id))}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {contact.type === 'mentor' && 'Mentor'}{contact.type === 'peer' && 'Peer'}{contact.type === 'group' && 'Group'}{contact.type === 'system' && 'System'} · {contact.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </TabsContent>

                            <TabsContent value="assignments" className="flex-1 flex flex-col">
                                <CardHeader className="pb-0 pt-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <CardTitle>Current Assignments</CardTitle>
                                        <Button variant="outline" size="sm">
                                            <Plus className="h-4 w-4 mr-1" />
                                            New
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 flex-1 overflow-hidden">
                                    <ScrollArea className="h-full">
                                        <div className="p-4 space-y-4">
                                            {assignments.map((assignment) => (
                                                <Card key={assignment.id} className="overflow-hidden">
                                                    <CardHeader className="p-4 pb-2">
                                                        <div className="flex justify-between">
                                                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                                                            <Badge
                                                                variant="outline"
                                                                className={cn(
                                                                    assignment.status === 'pending'
                                                                        ? "bg-amber-50 text-amber-700 border-amber-200"
                                                                        : assignment.status === 'submitted'
                                                                            ? "bg-blue-50 text-blue-700 border-blue-200"
                                                                            : "bg-green-50 text-green-700 border-green-200"
                                                                )}
                                                            >
                                                                {assignment.status === 'pending' && 'Pending'}
                                                                {assignment.status === 'submitted' && 'Submitted'}
                                                                {assignment.status === 'reviewed' && 'Reviewed'}
                                                            </Badge>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-2">
                                                        <p className="text-sm text-gray-500 mb-4">
                                                            {assignment.description}
                                                        </p>
                                                        <div className="text-sm text-amber-600 font-medium">
                                                            {formatDueDate(assignment.dueDate)}
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="p-3 bg-gray-50 flex justify-end">
                                                        <Button
                                                            variant={assignment.status === 'pending' ? 'default' : 'outline'}
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={`/dashboard/assignments/${assignment.id}`}>
                                                                {assignment.status === 'pending' ? 'Start Working' : 'View Details'}
                                                            </Link>
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </TabsContent>
                        </Tabs>
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
                        {currentContact ? (
                            <>
                                {/* Chat Header */}
                                <CardHeader className="border-b py-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Avatar className={cn(
                                                "h-10 w-10 mr-3",
                                                currentContact.type === 'group' && "bg-purple-600"
                                            )}>
                                                <AvatarImage src={currentContact.avatar} />
                                                <AvatarFallback className={cn(
                                                    "text-white",
                                                    currentContact.type === 'mentor' && "bg-indigo-600",
                                                    currentContact.type === 'peer' && "bg-green-600",
                                                    currentContact.type === 'group' && "bg-purple-600",
                                                    currentContact.type === 'system' && "bg-blue-600"
                                                )}>{currentContact.initials}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">{currentContact.name}</h3>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    {currentContact.type !== 'system' && (
                                                        <span className={cn(
                                                            "h-2 w-2 rounded-full mr-2",
                                                            currentContact.online ? "bg-green-500" : "bg-gray-300"
                                                        )}></span>
                                                    )}
                                                    <span>
                                                        {currentContact.online
                                                            ? "Online"
                                                            : currentContact.lastActive && `Last active ${currentContact.lastActive}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {currentContact.type !== 'system' && (
                                            <div className="flex items-center">
                                                {currentContact.type === 'mentor' && (
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/dashboard/schedule?mentor=${currentContact.id}`}>
                                                            <Calendar className="h-5 w-5 text-gray-500" />
                                                        </Link>
                                                    </Button>
                                                )}
                                                {(currentContact.type === 'mentor' || currentContact.type === 'peer') && (
                                                    <>
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link href={`/dashboard/call?contact=${currentContact.id}`}>
                                                                <Phone className="h-5 w-5 text-gray-500" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link href={`/dashboard/video?contact=${currentContact.id}`}>
                                                                <Video className="h-5 w-5 text-gray-500" />
                                                            </Link>
                                                        </Button>
                                                    </>
                                                )}
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={currentContact.type === 'mentor'
                                                        ? `/dashboard/mentors/${currentContact.id}`
                                                        : currentContact.type === 'peer'
                                                            ? `/dashboard/peers/${currentContact.id}`
                                                            : `/dashboard/groups/${currentContact.id}`
                                                    }>
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
                                                        {currentContact.type === 'mentor' && (
                                                            <DropdownMenuItem>Schedule a session</DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                                                        <DropdownMenuItem>Mute conversation</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        )}
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
                                                                        <AvatarImage src={currentContact.avatar} />
                                                                        <AvatarFallback className={cn(
                                                                            "text-white",
                                                                            currentContact.type === 'mentor' && "bg-indigo-600",
                                                                            currentContact.type === 'peer' && "bg-green-600",
                                                                            currentContact.type === 'group' && "bg-purple-600",
                                                                            currentContact.type === 'system' && "bg-blue-600"
                                                                        )}>{currentContact.initials}</AvatarFallback>
                                                                    </Avatar>
                                                                )}
                                                                <div className={cn(
                                                                    "p-3 rounded-lg",
                                                                    msg.senderId === 0
                                                                        ? "bg-indigo-600 text-white rounded-br-none"
                                                                        : msg.type === 'assignment'
                                                                            ? "bg-amber-100 text-amber-800 rounded-bl-none"
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
                                        Select a conversation from the list or start a new one to connect with mentors and peers.
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>
        </div>
    );

    // Helper function to get the timestamp of the last message in a conversation
    function getCurrentMessageTime(contactId: number): string {
        const messages = allMessages.filter(
            msg => (msg.senderId === contactId && msg.receiverId === 0) ||
                (msg.senderId === 0 && msg.receiverId === contactId)
        ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return messages.length > 0 ? messages[0].timestamp : new Date().toISOString();
    }
}