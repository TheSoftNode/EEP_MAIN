"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Play,
    Save,
    FileCode,
    Folder,
    ChevronRight,
    Settings,
    Share2,
    FolderOpen,
    PanelLeftClose,
    PanelLeftOpen,
    RefreshCcw,
    Terminal,
    Sparkles,
    SplitSquareVertical,
    Maximize2,
    Trash2,
    Copy,
    Plus,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

// Type definitions
interface FileItem {
    id: string;
    name: string;
    type: 'file' | 'folder';
    language?: string;
    content?: string;
    children?: FileItem[];
    parentId?: string | null;
    path: string;
    isOpen?: boolean;
}

interface ConsoleOutput {
    id: string;
    type: 'log' | 'error' | 'warning' | 'result';
    content: string;
    timestamp: Date;
}

export default function CodeEditor() {
    // State
    const [files, setFiles] = useState<FileItem[]>([
        {
            id: '1',
            name: 'project',
            type: 'folder',
            isOpen: true,
            path: 'project',
            children: [
                {
                    id: '2',
                    name: 'src',
                    type: 'folder',
                    path: 'project/src',
                    isOpen: true,
                    children: [
                        {
                            id: '3',
                            name: 'index.js',
                            type: 'file',
                            language: 'javascript',
                            path: 'project/src/index.js',
                            content: `// Main entry point
import { createApp } from './app';

const app = createApp();
app.start();
console.log('Application started');`
                        },
                        {
                            id: '4',
                            name: 'app.js',
                            type: 'file',
                            language: 'javascript',
                            path: 'project/src/app.js',
                            content: `// App definition
export function createApp() {
  return {
    start: () => {
      // Initialize app
      console.log('Initializing application');
    },
    stop: () => {
      // Clean up
      console.log('Stopping application');
    }
  };
}`
                        }
                    ]
                },
                {
                    id: '5',
                    name: 'package.json',
                    type: 'file',
                    language: 'json',
                    path: 'project/package.json',
                    content: `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}`
                },
                {
                    id: '6',
                    name: 'README.md',
                    type: 'file',
                    language: 'markdown',
                    path: 'project/README.md',
                    content: `# My Project

This is a sample project for the EEP coding environment.

## Getting Started

1. Run \`npm install\`
2. Run \`npm start\`
`
                }
            ]
        }
    ]);

    const [activeFileId, setActiveFileId] = useState<string>('3');
    const [code, setCode] = useState<string>('');
    const [consoleOutput, setConsoleOutput] = useState<ConsoleOutput[]>([]);
    const [showExplorer, setShowExplorer] = useState<boolean>(true);
    const [showConsole, setShowConsole] = useState<boolean>(false);
    const [aiEnabled, setAiEnabled] = useState<boolean>(true);
    const [darkTheme, setDarkTheme] = useState<boolean>(true);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
    const [fullscreen, setFullscreen] = useState<boolean>(false);

    // Refs
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const consoleRef = useRef<HTMLDivElement>(null);

    // Get active file
    const getActiveFile = (): FileItem | undefined => {
        const findFile = (items: FileItem[]): FileItem | undefined => {
            for (const item of items) {
                if (item.id === activeFileId) return item;
                if (item.children) {
                    const found = findFile(item.children);
                    if (found) return found;
                }
            }
            return undefined;
        };

        return findFile(files);
    };

    // Load active file content
    useEffect(() => {
        const file = getActiveFile();
        if (file && file.content) {
            setCode(file.content);
            setSelectedLanguage(file.language || 'javascript');
        }
    }, [activeFileId]);

    // Execute code
    const executeCode = () => {
        // Save current code to file
        saveFile();

        // Simulate code execution
        setConsoleOutput(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                type: 'log',
                content: '> Executing code...',
                timestamp: new Date()
            }
        ]);

        // Simulate delay
        setTimeout(() => {
            try {
                // In a real app, this would be executed in a secure sandbox
                // Here we're just simulating some console outputs
                setConsoleOutput(prev => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        type: 'log',
                        content: 'Initializing application',
                        timestamp: new Date()
                    },
                    {
                        id: (Date.now() + 2).toString(),
                        type: 'log',
                        content: 'Application started',
                        timestamp: new Date()
                    },
                    {
                        id: (Date.now() + 3).toString(),
                        type: 'result',
                        content: '> Execution completed successfully',
                        timestamp: new Date()
                    }
                ]);

                // Show console if hidden
                if (!showConsole) {
                    setShowConsole(true);
                }

                // Scroll console to bottom
                if (consoleRef.current) {
                    consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
                }
            } catch (error) {
                setConsoleOutput(prev => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        type: 'error',
                        content: `Error: ${error instanceof Error ? error.message : String(error)}`,
                        timestamp: new Date()
                    }
                ]);
            }
        }, 1000);
    };

    // Clear console
    const clearConsole = () => {
        setConsoleOutput([]);
    };

    // Save file
    const saveFile = () => {
        // Update file content
        const updatedFiles = [...files];

        const updateFile = (items: FileItem[]): boolean => {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === activeFileId) {
                    items[i].content = code;
                    return true;
                }
                if (items[i].children) {
                    if (updateFile(items[i].children!)) {
                        return true;
                    }
                }
            }
            return false;
        };

        updateFile(updatedFiles);
        setFiles(updatedFiles);

        // Add console message
        setConsoleOutput(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                type: 'log',
                content: `> File saved: ${getActiveFile()?.name}`,
                timestamp: new Date()
            }
        ]);
    };

    // Toggle folder
    const toggleFolder = (id: string) => {
        const updatedFiles = [...files];

        const toggle = (items: FileItem[]): boolean => {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === id) {
                    items[i].isOpen = !items[i].isOpen;
                    return true;
                }
                if (items[i].children) {
                    if (toggle(items[i].children!)) {
                        return true;
                    }
                }
            }
            return false;
        };

        toggle(updatedFiles);
        setFiles(updatedFiles);
    };

    // Render file tree
    const renderFileTree = (items: FileItem[], level = 0) => {
        return items.map(item => (
            <div key={item.id}>
                <div
                    className={cn(
                        "flex items-center py-1 px-2 hover:bg-gray-800 rounded cursor-pointer",
                        activeFileId === item.id && "bg-gray-800"
                    )}
                    style={{ paddingLeft: `${level * 12 + 8}px` }}
                    onClick={() => {
                        if (item.type === 'folder') {
                            toggleFolder(item.id);
                        } else {
                            setActiveFileId(item.id);
                        }
                    }}
                >
                    {item.type === 'folder' ? (
                        <>
                            <ChevronRight
                                className={cn(
                                    "h-4 w-4 mr-1 transition-transform",
                                    item.isOpen && "rotate-90"
                                )}
                            />
                            {item.isOpen ? (
                                <FolderOpen className="h-4 w-4 mr-1 text-yellow-400" />
                            ) : (
                                <Folder className="h-4 w-4 mr-1 text-yellow-400" />
                            )}
                        </>
                    ) : (
                        <FileCode className="h-4 w-4 mr-1 text-blue-400" />
                    )}
                    <span className="text-sm truncate">{item.name}</span>
                </div>
                {item.type === 'folder' && item.isOpen && item.children && (
                    <div>{renderFileTree(item.children, level + 1)}</div>
                )}
            </div>
        ));
    };

    return (
        <div className={cn(
            "h-screen bg-gray-900 text-gray-200 flex flex-col",
            fullscreen ? "fixed inset-0 z-50" : ""
        )}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-800 bg-gray-900 p-2 flex items-center justify-between"
            >
                <div className="flex items-center">
                    <FileCode className="h-5 w-5 text-indigo-400 mr-2" />
                    <h1 className="text-lg font-semibold">EEP Code Editor</h1>
                    <Badge variant="outline" className="ml-2 bg-indigo-900/50 text-indigo-300 border-indigo-700">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Enhanced
                    </Badge>
                </div>

                <div className="flex items-center space-x-2">
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-[150px] h-8 text-sm bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" onClick={saveFile} className="bg-gray-800 border-gray-700">
                        <Save className="h-4 w-4 mr-1" />
                        Save
                    </Button>

                    <Button variant="outline" size="sm" onClick={executeCode} className="bg-indigo-700 hover:bg-indigo-600 border-indigo-600 text-white">
                        <Play className="h-4 w-4 mr-1" />
                        Run
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                            <DropdownMenuItem className="text-gray-200 focus:bg-gray-700">
                                <div className="flex items-center justify-between w-full">
                                    <span>AI Assistance</span>
                                    <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} className="ml-2 data-[state=checked]:bg-indigo-600" />
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-200 focus:bg-gray-700">
                                <div className="flex items-center justify-between w-full">
                                    <span>Dark Theme</span>
                                    <Switch checked={darkTheme} onCheckedChange={setDarkTheme} className="ml-2 data-[state=checked]:bg-indigo-600" />
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="text-gray-200 focus:bg-gray-700" onClick={() => setFullscreen(!fullscreen)}>
                                <Maximize2 className="h-4 w-4 mr-2" />
                                {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex">
                {/* File Explorer */}
                {showExplorer && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-64 border-r border-gray-800 bg-gray-900 flex flex-col"
                    >
                        <div className="p-2 border-b border-gray-800 flex items-center justify-between">
                            <h2 className="text-sm font-medium">EXPLORER</h2>
                            <div className="flex">
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <RefreshCcw className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Plus className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="p-2">
                                {renderFileTree(files)}
                            </div>
                        </ScrollArea>
                    </motion.div>
                )}

                {/* Editor and Console */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col"
                >
                    {/* Editor Controls */}
                    <div className="p-2 border-b border-gray-800 flex items-center justify-between bg-gray-900">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => setShowExplorer(!showExplorer)}
                            >
                                {showExplorer ? (
                                    <PanelLeftClose className="h-4 w-4" />
                                ) : (
                                    <PanelLeftOpen className="h-4 w-4" />
                                )}
                            </Button>
                            <span className="ml-2 text-sm text-gray-400">
                                {getActiveFile()?.path || 'No file selected'}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowConsole(!showConsole)}>
                                <Terminal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Editor and Console Split */}
                    <div className="flex-1 flex flex-col relative">
                        {/* Code Editor */}
                        <div className={cn(
                            "flex-1 overflow-auto",
                            showConsole ? "h-1/2" : "h-full"
                        )}>
                            <Textarea
                                ref={editorRef}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-full bg-gray-900 text-gray-200 font-mono text-sm p-4 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                spellCheck="false"
                                placeholder="Write your code here..."
                            />
                        </div>

                        {/* Console */}
                        {showConsole && (
                            <div className="border-t border-gray-800 h-1/2">
                                <div className="bg-gray-900 p-2 border-b border-gray-800 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Terminal className="h-4 w-4 mr-2 text-gray-400" />
                                        <span className="text-sm font-medium">CONSOLE</span>
                                    </div>
                                    <div className="flex">
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={clearConsole}>
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowConsole(false)}>
                                            <X className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                                <div
                                    ref={consoleRef}
                                    className="h-full bg-gray-950 text-gray-300 font-mono text-sm p-2 overflow-auto"
                                >
                                    {consoleOutput.map((output) => (
                                        <div key={output.id} className="mb-1">
                                            <span className={cn(
                                                output.type === 'error' && "text-red-400",
                                                output.type === 'warning' && "text-yellow-400",
                                                output.type === 'result' && "text-green-400"
                                            )}>
                                                {output.content}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Draggable Splitter (in a production app) */}
                        {showConsole && (
                            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-800 cursor-row-resize flex items-center justify-center">
                                <div className="h-4 w-8 bg-gray-700 rounded-sm flex items-center justify-center">
                                    <SplitSquareVertical className="h-3 w-3 text-gray-400" />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-800 bg-gray-900 px-2 py-1 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center">
                    <span className="mr-4">{selectedLanguage}</span>
                    <span>Ln 1, Col 1</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-4">Syntax: OK</span>
                    <span>UTF-8</span>
                </div>
            </div>
        </div>
    );
}