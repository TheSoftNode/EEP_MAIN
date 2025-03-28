"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Send,
    Maximize2,
    Minimize2,
    Copy,
    Download,
    Trash2,
    Terminal as TerminalIcon,
    Lightbulb,
    RotateCcw,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Switch } from "@/components/ui/switch";
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Type definitions for terminal
interface CommandOutput {
    id: string;
    type: 'command' | 'output' | 'error' | 'info' | 'ai-suggestion';
    content: string;
    timestamp: Date;
}

interface HistoryItem {
    command: string;
    timestamp: Date;
}

export default function AITerminal() {
    // Terminal state
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState<CommandOutput[]>([
        {
            id: '1',
            type: 'info',
            content: 'Welcome to the AI-enhanced terminal. Type `help` to see available commands.',
            timestamp: new Date()
        }
    ]);
    const [commandHistory, setCommandHistory] = useState<HistoryItem[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [fullscreen, setFullscreen] = useState(false);
    const [aiEnabled, setAiEnabled] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('terminal');

    // Refs
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const docsRef = useRef<HTMLDivElement>(null);
    const settingsRef = useRef<HTMLDivElement>(null);

    // Reset scroll position when changing tabs
    useEffect(() => {
        if (activeTab === 'docs' && docsRef.current) {
            docsRef.current.scrollTop = 0;
        } else if (activeTab === 'settings' && settingsRef.current) {
            settingsRef.current.scrollTop = 0;
        }
    }, [activeTab]);

    // Common commands for suggestions
    const commonCommands = [
        'npm install',
        'git status',
        'git commit -m "message"',
        'ls -la',
        'cd ..',
        'mkdir new-folder',
        'python -m venv venv',
        'aws configure'
    ];

    // Command execution simulation
    const executeCommand = async (cmd: string) => {
        if (!cmd.trim()) return;

        // Add command to history
        const newCommandOutput: CommandOutput = {
            id: Date.now().toString(),
            type: 'command',
            content: cmd,
            timestamp: new Date()
        };

        setHistory(prev => [...prev, newCommandOutput]);
        setCommandHistory(prev => [...prev, { command: cmd, timestamp: new Date() }]);
        setCommand('');
        setHistoryIndex(-1);
        setIsProcessing(true);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Process command
        let response: CommandOutput;

        if (cmd === 'clear') {
            setHistory([{
                id: Date.now().toString(),
                type: 'info',
                content: 'Terminal cleared.',
                timestamp: new Date()
            }]);
            setIsProcessing(false);
            return;
        } else if (cmd === 'help') {
            response = {
                id: Date.now().toString(),
                type: 'info',
                content: `
Available commands:
- help: Display this help message
- clear: Clear the terminal
- ls: List directory contents
- cd: Change directory
- mkdir: Create a new directory
- touch: Create a new file
- npm: Node package manager
- git: Version control commands
- python: Run Python scripts
- aws: AWS CLI commands

AI Assistant is ${aiEnabled ? 'enabled' : 'disabled'}. ${aiEnabled ? 'It will provide suggestions as you work.' : 'Type "ai on" to enable it.'}
        `,
                timestamp: new Date()
            };
        } else if (cmd === 'ls' || cmd.startsWith('ls ')) {
            response = {
                id: Date.now().toString(),
                type: 'output',
                content: `
app/
node_modules/
public/
.env
.gitignore
next.config.js
package.json
README.md
tsconfig.json
        `,
                timestamp: new Date()
            };
        } else if (cmd === 'ai on') {
            setAiEnabled(true);
            response = {
                id: Date.now().toString(),
                type: 'info',
                content: 'AI assistant enabled. You will now receive suggestions as you work.',
                timestamp: new Date()
            };
        } else if (cmd === 'ai off') {
            setAiEnabled(false);
            response = {
                id: Date.now().toString(),
                type: 'info',
                content: 'AI assistant disabled. Type "ai on" to enable it again.',
                timestamp: new Date()
            };
        } else if (cmd.startsWith('git ')) {
            // Simulate git command outputs
            if (cmd.includes('status')) {
                response = {
                    id: Date.now().toString(),
                    type: 'output',
                    content: `
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   app/page.tsx
        modified:   components/ui/button.tsx

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        app/dashboard/
          `,
                    timestamp: new Date()
                };
            } else if (cmd.includes('commit')) {
                response = {
                    id: Date.now().toString(),
                    type: 'output',
                    content: `
[main 5a7e32d] ${cmd.includes('-m') ? cmd.split('-m')[1].trim().replace(/"/g, '') : 'Commit changes'}
2 files changed, 47 insertions(+), 12 deletions(-)
          `,
                    timestamp: new Date()
                };
            } else {
                response = {
                    id: Date.now().toString(),
                    type: 'output',
                    content: `Executed git command: ${cmd}`,
                    timestamp: new Date()
                };
            }
        } else if (cmd.startsWith('npm ')) {
            // Simulate npm command outputs
            if (cmd.includes('install')) {
                response = {
                    id: Date.now().toString(),
                    type: 'output',
                    content: `
added 234 packages, and audited 235 packages in 3s

47 packages are looking for funding
  run \`npm fund\` for details

found 0 vulnerabilities
          `,
                    timestamp: new Date()
                };
            } else if (cmd.includes('run dev') || cmd.includes('run start')) {
                response = {
                    id: Date.now().toString(),
                    type: 'output',
                    content: `
> eep-platform@0.1.0 dev
> next dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
          `,
                    timestamp: new Date()
                };
            } else {
                response = {
                    id: Date.now().toString(),
                    type: 'output',
                    content: `Executed npm command: ${cmd}`,
                    timestamp: new Date()
                };
            }
        } else {
            response = {
                id: Date.now().toString(),
                type: 'output',
                content: `Executed: ${cmd}`,
                timestamp: new Date()
            };
        }

        setHistory(prev => [...prev, response]);

        // If AI is enabled, provide suggestions based on the command and output
        if (aiEnabled) {
            // Simulate AI thinking
            await new Promise(resolve => setTimeout(resolve, 800));

            let aiSuggestion: CommandOutput | null = null;

            if (cmd === 'git status' && response.content.includes('Changes not staged for commit')) {
                aiSuggestion = {
                    id: Date.now().toString(),
                    type: 'ai-suggestion',
                    content: `
I notice you have unstaged changes. You might want to:

\`\`\`
git add .                    # Stage all changes
git commit -m "Your message" # Commit with a descriptive message
\`\`\`

Or for specific files:

\`\`\`
git add app/page.tsx         # Stage specific file
\`\`\`
          `,
                    timestamp: new Date()
                };
            } else if (cmd.startsWith('npm install') && !cmd.includes('-D') && !cmd.includes('--save-dev')) {
                aiSuggestion = {
                    id: Date.now().toString(),
                    type: 'ai-suggestion',
                    content: `
Tip: For development dependencies, use:

\`\`\`
npm install <package> --save-dev  # or -D for short
\`\`\`

For example:
\`\`\`
npm install typescript @types/react --save-dev
\`\`\`
          `,
                    timestamp: new Date()
                };
            } else if (cmd === 'ls' || cmd.startsWith('ls ')) {
                aiSuggestion = {
                    id: Date.now().toString(),
                    type: 'ai-suggestion',
                    content: `
For more detailed information with permissions and file sizes:

\`\`\`
ls -la
\`\`\`

Or to filter results:

\`\`\`
ls -la | grep ".tsx"  # Show only TypeScript files
\`\`\`
          `,
                    timestamp: new Date()
                };
            }

            if (aiSuggestion) {
                setHistory(prev => [...prev, aiSuggestion!]);
            }
        }

        setIsProcessing(false);

        // Scroll to bottom
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(command);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle command history navigation with up/down arrows
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCommand('');
            }
        } else if (e.key === 'Tab') {
            // Simple tab completion
            e.preventDefault();

            if (command.trim()) {
                const matchingCommands = commonCommands.filter(cmd =>
                    cmd.startsWith(command.trim())
                );

                if (matchingCommands.length === 1) {
                    setCommand(matchingCommands[0]);
                }
            }
        }
    };

    const clearTerminal = () => {
        setHistory([{
            id: Date.now().toString(),
            type: 'info',
            content: 'Terminal cleared.',
            timestamp: new Date()
        }]);
    };

    const copyToClipboard = () => {
        const terminalContent = history
            .map(item => {
                if (item.type === 'command') {
                    return `$ ${item.content}`;
                } else {
                    return item.content;
                }
            })
            .join('\n');

        navigator.clipboard.writeText(terminalContent);
    };

    const downloadTerminalHistory = () => {
        const terminalContent = history
            .map(item => {
                if (item.type === 'command') {
                    return `$ ${item.content}`;
                } else {
                    return item.content;
                }
            })
            .join('\n');

        const blob = new Blob([terminalContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `terminal-history-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Focus input when the terminal is clicked
    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Auto-scroll to bottom when history changes
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    // Suggest commands based on typing
    const getSuggestions = () => {
        if (!command.trim() || !aiEnabled) return [];

        return commonCommands
            .filter(cmd => cmd.includes(command.trim()))
            .slice(0, 3);
    };

    const suggestions = getSuggestions();

    return (
        <div
            className={cn(
                "relative transition-all duration-300 ease-in-out",
                fullscreen ? "fixed inset-0 z-50 bg-gray-900/80 p-4" : ""
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800",
                    fullscreen ? "h-full w-full max-w-6xl" : "h-[600px]"
                )}
            >
                <Tabs defaultValue="terminal" className="h-full flex flex-col" onValueChange={setActiveTab}>
                    {/* Terminal Header */}
                    <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex space-x-2 mr-4">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex items-center">
                                <TerminalIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-200 font-medium text-sm">EEP Terminal</span>
                                {aiEnabled && (
                                    <Badge variant="outline" className="ml-2 bg-indigo-900/50 text-indigo-300 border-indigo-700">
                                        <Sparkles className="h-3 w-3 mr-1" />
                                        AI Enabled
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-1">
                            <TabsList className="bg-gray-700">
                                <TabsTrigger value="terminal" className="text-xs data-[state=active]:bg-gray-800">
                                    Terminal
                                </TabsTrigger>
                                <TabsTrigger value="docs" className="text-xs data-[state=active]:bg-gray-800">
                                    Documentation
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="text-xs data-[state=active]:bg-gray-800">
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex ml-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-300" onClick={clearTerminal}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Clear Terminal</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-300" onClick={copyToClipboard}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Copy Output</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-300" onClick={downloadTerminalHistory}>
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Download History</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-300" onClick={() => setFullscreen(!fullscreen)}>
                                                {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="flex-1 flex flex-col min-h-0"> {/* Added min-h-0 to ensure proper flex behavior */}
                        <TabsContent value="terminal" className="flex-1 flex flex-col h-full">
                            <div
                                ref={terminalRef}
                                className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300 bg-gray-900"
                                onClick={focusInput}
                            >
                                {history.map((item) => (
                                    <div key={item.id} className="mb-2">
                                        {item.type === 'command' && (
                                            <div className="flex">
                                                <span className="text-green-400 mr-2">$</span>
                                                <span>{item.content}</span>
                                            </div>
                                        )}
                                        {item.type === 'output' && (
                                            <div className="pl-4 whitespace-pre-wrap">{item.content}</div>
                                        )}
                                        {item.type === 'error' && (
                                            <div className="pl-4 text-red-400 whitespace-pre-wrap">{item.content}</div>
                                        )}
                                        {item.type === 'info' && (
                                            <div className="pl-4 text-blue-400 whitespace-pre-wrap">{item.content}</div>
                                        )}
                                        {item.type === 'ai-suggestion' && (
                                            <div className="mt-2 mb-2 p-3 bg-indigo-900/30 border-l-2 border-indigo-500 rounded whitespace-pre-wrap">
                                                <div className="flex items-center mb-1">
                                                    <Sparkles className="h-4 w-4 text-indigo-400 mr-2" />
                                                    <span className="text-indigo-300 font-semibold">AI Assistant</span>
                                                </div>
                                                <div className="text-gray-300">{item.content}</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isProcessing && (
                                    <div className="flex items-center text-gray-400">
                                        <div className="animate-spin mr-2">
                                            <RotateCcw className="h-3 w-3" />
                                        </div>
                                        <span>Processing...</span>
                                    </div>
                                )}
                            </div>

                            {/* Command Input */}
                            <div className="p-2 bg-gray-800 relative">
                                <form onSubmit={handleCommandSubmit} className="flex items-center">
                                    <span className="text-green-400 mr-2">$</span>
                                    <Input
                                        ref={inputRef}
                                        type="text"
                                        value={command}
                                        onChange={(e) => setCommand(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent border-none text-gray-200 placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono"
                                        placeholder="Type your command here..."
                                        disabled={isProcessing}
                                        autoComplete="off"
                                        spellCheck="false"
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-gray-400 hover:text-white"
                                        disabled={isProcessing}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>

                                {/* Command suggestions */}
                                {suggestions.length > 0 && (
                                    <div className="absolute bottom-14 left-0 right-0 p-2 bg-gray-800 border-t border-gray-700 rounded-t-md">
                                        <div className="flex items-center text-xs text-gray-400 mb-1">
                                            <Lightbulb className="h-3 w-3 mr-1" />
                                            <span>Suggestions:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestions.map((suggestion, index) => (
                                                <Button
                                                    key={index}
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 text-xs py-0 h-7"
                                                    onClick={() => setCommand(suggestion)}
                                                >
                                                    {suggestion}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="docs" className="flex-1 h-full bg-gray-900 absolute inset-0 top-[41px]">
                            <div
                                ref={docsRef}
                                className="h-full overflow-y-auto p-6"
                            >
                                <div className="max-w-3xl mx-auto text-gray-300">
                                    <h2 className="text-xl font-semibold text-white mb-4">Terminal Documentation</h2>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-white mb-2">Getting Started</h3>
                                        <p className="mb-2">This terminal provides a command-line interface for your development environment with AI-powered assistance.</p>
                                        <p>Type <code className="bg-gray-800 px-1.5 py-0.5 rounded">help</code> to see available commands.</p>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-white mb-2">Common Commands</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <h4 className="font-medium text-indigo-300">help</h4>
                                                <p className="text-sm">Displays the help menu with available commands</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-indigo-300">clear</h4>
                                                <p className="text-sm">Clears the terminal screen</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-indigo-300">ls</h4>
                                                <p className="text-sm">Lists files and directories</p>
                                                <p className="text-xs text-gray-400 mt-1">Example: <code className="bg-gray-800 px-1.5 py-0.5 rounded">ls -la</code></p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-indigo-300">cd</h4>
                                                <p className="text-sm">Changes the current directory</p>
                                                <p className="text-xs text-gray-400 mt-1">Example: <code className="bg-gray-800 px-1.5 py-0.5 rounded">cd project/src</code></p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-indigo-300">mkdir</h4>
                                                <p className="text-sm">Creates a new directory</p>
                                                <p className="text-xs text-gray-400 mt-1">Example: <code className="bg-gray-800 px-1.5 py-0.5 rounded">mkdir new-folder</code></p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-indigo-300">git</h4>
                                                <p className="text-sm">Git version control commands</p>
                                                <p className="text-xs text-gray-400 mt-1">Example: <code className="bg-gray-800 px-1.5 py-0.5 rounded">git status</code></p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-indigo-300">npm</h4>
                                                <p className="text-sm">Node.js package manager commands</p>
                                                <p className="text-xs text-gray-400 mt-1">Example: <code className="bg-gray-800 px-1.5 py-0.5 rounded">npm install react</code></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-white mb-2">AI Assistant</h3>
                                        <p className="mb-2">The terminal includes an AI assistant that provides suggestions based on your commands.</p>
                                        <div className="space-y-3">
                                            <div>
                                                <h4 className="font-medium text-indigo-300">ai on</h4>
                                                <p className="text-sm">Enables the AI assistant</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-indigo-300">ai off</h4>
                                                <p className="text-sm">Disables the AI assistant</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-white mb-2">Keyboard Shortcuts</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center">
                                                <div className="bg-gray-800 px-2 py-0.5 rounded text-xs">↑</div>
                                                <span className="ml-2 text-sm">Previous command</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="bg-gray-800 px-2 py-0.5 rounded text-xs">↓</div>
                                                <span className="ml-2 text-sm">Next command</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="bg-gray-800 px-2 py-0.5 rounded text-xs">Tab</div>
                                                <span className="ml-2 text-sm">Command completion</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="bg-gray-800 px-2 py-0.5 rounded text-xs">Ctrl+C</div>
                                                <span className="ml-2 text-sm">Cancel command</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings" className="flex-1 h-full bg-gray-900 absolute inset-0 top-[41px]">
                            <div
                                ref={settingsRef}
                                className="h-full overflow-y-auto p-6"
                            >
                                <div className="max-w-3xl mx-auto">
                                    <h2 className="text-xl font-semibold text-white mb-4">Terminal Settings</h2>

                                    <div className="space-y-6">
                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-white">AI Assistant</h3>
                                                    <p className="text-sm text-gray-400">Enable AI-powered suggestions as you work</p>
                                                </div>
                                                <Switch
                                                    checked={aiEnabled}
                                                    onCheckedChange={setAiEnabled}
                                                    className="data-[state=checked]:bg-indigo-600"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-white">Command History</h3>
                                                    <p className="text-sm text-gray-400">Save command history between sessions</p>
                                                </div>
                                                <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
                                            </div>
                                        </div>

                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-white">Dark Theme</h3>
                                                    <p className="text-sm text-gray-400">Use dark theme for terminal</p>
                                                </div>
                                                <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
                                            </div>
                                        </div>

                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="font-medium text-white">Font Size</h3>
                                                    <p className="text-sm text-gray-400">Adjust terminal font size</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-gray-300 bg-gray-700 border-gray-600">
                                                        -
                                                    </Button>
                                                    <span className="mx-2 text-white">14px</span>
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-gray-300 bg-gray-700 border-gray-600">
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                                            Apply Changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </motion.div>
        </div>
    )
};