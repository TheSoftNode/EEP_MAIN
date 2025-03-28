"use client"

import React, { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Book,
    Code,
    Users,
    MessageSquare,
    Calendar,
    Clock,
    Award,
    Settings,
    HelpCircle,
    Bell,
    Search,
    LogOut,
    Terminal,
    User,
    FileText,
    BarChart
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notifications, setNotifications] = useState<{
        id: number;
        title: string;
        description: string;
        time: string;
        read: boolean;
    }[]>([
        {
            id: 1,
            title: "Weekly Task Due Soon",
            description: "Your Week 3 task submission is due in 24 hours",
            time: "1h ago",
            read: false
        },
        {
            id: 2,
            title: "Mentor Feedback",
            description: "John Smith has provided feedback on your Week 2 submission",
            time: "3h ago",
            read: false
        },
        {
            id: 3,
            title: "New Learning Resource",
            description: "A new tutorial about AWS Lambda has been added",
            time: "1d ago",
            read: true
        }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const navItems = [
        {
            name: "Dashboard",
            href: "/learners-dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />
        },
        {
            name: "Learning Path",
            href: "/learners-dashboard/learning-path",
            icon: <Book className="h-5 w-5" />
        },
        {
            name: "Weekly Tasks",
            href: "/learners-dashboard/tasks",
            icon: <FileText className="h-5 w-5" />
        },
        {
            name: "Terminal",
            href: "/learners-dashboard/terminal",
            icon: <Terminal className="h-5 w-5" />
        },
        {
            name: "Code Editor",
            href: "/learners-dashboard/code",
            icon: <Code className="h-5 w-5" />
        },
        {
            name: "Progress",
            href: "/learners-dashboard/progress",
            icon: <BarChart className="h-5 w-5" />
        },
        {
            name: "Mentors",
            href: "/learners-dashboard/mentors",
            icon: <Users className="h-5 w-5" />
        },
        {
            name: "Messages",
            href: "/learners-dashboard/messages",
            icon: <MessageSquare className="h-5 w-5" />
        },
        {
            name: "Schedule",
            href: "/learners-dashboard/schedule",
            icon: <Calendar className="h-5 w-5" />
        },
        {
            name: "Sessions",
            href: `/learners-dashboard/sessions/1`,
            icon: <Clock className="h-5 w-5" />
        },
        {
            name: "Certificates",
            href: "/learners-dashboard/certificates",
            icon: <Award className="h-5 w-5" />
        }
    ];

    // Utilities section
    const utilityItems = [
        {
            name: "Settings",
            href: "/dashboard/settings",
            icon: <Settings className="h-5 w-5" />
        },
        {
            name: "Help & Support",
            href: "/dashboard/support",
            icon: <HelpCircle className="h-5 w-5" />
        }
    ];

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    // Responsive sidebar handling
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCollapsed(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="h-screen w-full bg-gray-50 flex overflow-hidden">
            {/* Desktop Sidebar */}
            <div
                className={cn(
                    "hidden md:flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-300",
                    collapsed ? "w-[70px]" : "w-[260px]"
                )}
            >
                {/* Sidebar Header */}
                <div className="h-16 border-b border-gray-100 flex items-center justify-between px-4">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">E</span>
                            </div>
                            <span className="font-semibold text-gray-800">EEP Platform</span>
                        </div>
                    )}
                    {collapsed && (
                        <div className="mx-auto h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">E</span>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                    >
                        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>
                </div>

                {/* User Profile */}
                <div className={cn(
                    "flex items-center border-b border-gray-100 py-4",
                    collapsed ? "px-2 flex-col" : "px-4"
                )}>
                    <Avatar className={cn("h-10 w-10", collapsed && "mb-2")}>
                        <AvatarImage src="/avatars/user-1.jpg" alt="User" />
                        <AvatarFallback className="bg-indigo-100 text-indigo-700">JD</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">AI Track Learner</p>
                        </div>
                    )}
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-2">
                    <div className="px-3 pb-2">
                        {!collapsed && <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Navigation</h3>}
                        <div className="mt-2 space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                                            isActive
                                                ? "bg-indigo-50 text-indigo-700"
                                                : "text-gray-700 hover:bg-gray-50"
                                        )}
                                    >
                                        <TooltipProvider>
                                            <Tooltip delayDuration={collapsed ? 100 : 1000}>
                                                <TooltipTrigger asChild>
                                                    <div className={cn(
                                                        "mr-3 flex-shrink-0",
                                                        isActive ? "text-indigo-700" : "text-gray-500 group-hover:text-gray-600"
                                                    )}>
                                                        {item.icon}
                                                    </div>
                                                </TooltipTrigger>
                                                {collapsed && (
                                                    <TooltipContent side="right" align="center" alignOffset={-5}>
                                                        {item.name}
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TooltipProvider>
                                        {!collapsed && <span>{item.name}</span>}
                                        {item.name === "Messages" && !collapsed && (
                                            <Badge className="ml-auto bg-indigo-100 text-indigo-800 hover:bg-indigo-200">3</Badge>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="px-3 pt-4">
                        {!collapsed && <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Utilities</h3>}
                        <div className="mt-2 space-y-1">
                            {utilityItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                                            isActive
                                                ? "bg-indigo-50 text-indigo-700"
                                                : "text-gray-700 hover:bg-gray-50"
                                        )}
                                    >
                                        <TooltipProvider>
                                            <Tooltip delayDuration={collapsed ? 100 : 1000}>
                                                <TooltipTrigger asChild>
                                                    <div className={cn(
                                                        "mr-3 flex-shrink-0",
                                                        isActive ? "text-indigo-700" : "text-gray-500 group-hover:text-gray-600"
                                                    )}>
                                                        {item.icon}
                                                    </div>
                                                </TooltipTrigger>
                                                {collapsed && (
                                                    <TooltipContent side="right" align="center" alignOffset={-5}>
                                                        {item.name}
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TooltipProvider>
                                        {!collapsed && <span>{item.name}</span>}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-100">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                            collapsed && "justify-center px-2"
                        )}
                    >
                        <LogOut className="h-5 w-5 mr-2" />
                        {!collapsed && <span>Logout</span>}
                    </Button>
                </div>
            </div>

            {/* Mobile Sidebar Trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden absolute top-3 left-3 z-50">
                        <ChevronRight />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px]">
                    <div className="h-full flex flex-col bg-white">
                        {/* Mobile Sidebar Header */}
                        <div className="h-16 border-b border-gray-100 flex items-center px-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">E</span>
                                </div>
                                <span className="font-semibold text-gray-800">EEP Platform</span>
                            </div>
                        </div>

                        {/* Mobile User Profile */}
                        <div className="flex items-center border-b border-gray-100 py-4 px-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/avatars/user-1.jpg" alt="User" />
                                <AvatarFallback className="bg-indigo-100 text-indigo-700">JD</AvatarFallback>
                            </Avatar>
                            <div className="ml-3 flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                                <p className="text-xs text-gray-500 truncate">AI Track Learner</p>
                            </div>
                        </div>

                        {/* Mobile Navigation Items */}
                        <div className="flex-1 overflow-y-auto py-2">
                            <div className="px-3 pb-2">
                                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Navigation</h3>
                                <div className="mt-2 space-y-1">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                                                    isActive
                                                        ? "bg-indigo-50 text-indigo-700"
                                                        : "text-gray-700 hover:bg-gray-50"
                                                )}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <div className={cn(
                                                    "mr-3 flex-shrink-0",
                                                    isActive ? "text-indigo-700" : "text-gray-500"
                                                )}>
                                                    {item.icon}
                                                </div>
                                                <span>{item.name}</span>
                                                {item.name === "Messages" && (
                                                    <Badge className="ml-auto bg-indigo-100 text-indigo-800 hover:bg-indigo-200">3</Badge>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="px-3 pt-4">
                                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Utilities</h3>
                                <div className="mt-2 space-y-1">
                                    {utilityItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                                                    isActive
                                                        ? "bg-indigo-50 text-indigo-700"
                                                        : "text-gray-700 hover:bg-gray-50"
                                                )}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <div className={cn(
                                                    "mr-3 flex-shrink-0",
                                                    isActive ? "text-indigo-700" : "text-gray-500"
                                                )}>
                                                    {item.icon}
                                                </div>
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Logout Button */}
                        <div className="p-4 border-t border-gray-100">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Nav Bar */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
                    <div className="flex items-center md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
                            <ChevronRight />
                        </Button>
                    </div>

                    <div className="flex-1 flex items-center justify-between">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-800 md:block hidden">Learning Workspace</h1>
                            <p className="text-sm text-gray-500 ml-4 hidden md:block">{currentDate}</p>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="relative hidden md:block w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full bg-gray-50 border-gray-200 pl-9"
                                />
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative"
                                    >
                                        <Bell className="h-5 w-5 text-gray-700" />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80">
                                    <div className="flex items-center justify-between p-2 border-b">
                                        <h3 className="font-medium">Notifications</h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={markAllAsRead}
                                            className="text-xs text-indigo-600 hover:text-indigo-800"
                                        >
                                            Mark all as read
                                        </Button>
                                    </div>
                                    <div className="max-h-72 overflow-y-auto py-1">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={cn(
                                                    "p-3 hover:bg-gray-50 cursor-pointer",
                                                    !notification.read && "bg-blue-50"
                                                )}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <p className="font-medium text-sm">{notification.title}</p>
                                                    <span className="text-xs text-gray-500">{notification.time}</span>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                                            </div>
                                        ))}
                                        {notifications.length === 0 && (
                                            <div className="p-4 text-center text-gray-500 text-sm">
                                                No notifications
                                            </div>
                                        )}
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/notifications" className="cursor-pointer text-center text-indigo-600 hover:text-indigo-800">
                                            View all notifications
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/avatars/user-1.jpg" alt="User" />
                                            <AvatarFallback className="bg-indigo-100 text-indigo-700">JD</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <div className="flex items-center justify-start p-2 border-b">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src="/avatars/user-1.jpg" alt="User" />
                                            <AvatarFallback className="bg-indigo-100 text-indigo-700">JD</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">John Doe</p>
                                            <p className="text-xs text-gray-500">john.doe@example.com</p>
                                        </div>
                                    </div>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>My Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/settings" className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}