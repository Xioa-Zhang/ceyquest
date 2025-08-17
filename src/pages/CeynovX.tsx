import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Brain, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Clock, 
  Plus,
  Search,
  AtSign,
  Grid3X3,
  Star,
  Settings,
  Mic,
  ImageIcon,
  Music,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  PaperclipIcon,
  Zap,
  MessageCircle,
  X,
  MessageSquare
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Sidebar from '@/components/layout/Sidebar';
import { Student } from '@/types';
import { Link } from 'react-router-dom';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  subject?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: Date;
  isActive: boolean;
}

const CeynovX = () => {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedStudent = localStorage.getItem('ceyquest-student');
    if (savedStudent) {
      setCurrentStudent(JSON.parse(savedStudent));
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    // Create new session if none exists
    if (!currentSessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: inputValue.length > 30 ? inputValue.substring(0, 30) + '...' : inputValue,
        messages: [userMessage],
        timestamp: new Date(),
        isActive: true,
      };
      setChatSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
    } else {
      // Add message to existing session
      setChatSessions(prev => prev.map(session => 
        session.id === currentSessionId 
          ? { ...session, messages: [...session.messages, userMessage] }
          : session
      ));
    }

    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue, currentStudent?.grade || 6),
        timestamp: new Date(),
      };

      setChatSessions(prev => prev.map(session => 
        session.id === currentSessionId 
          ? { ...session, messages: [...session.messages, aiResponse] }
          : session
      ));
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string, grade: number): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('math') || lowerQuestion.includes('calculate') || lowerQuestion.includes('equation')) {
      return `Great math question! For Grade ${grade}, let me help you understand this step by step. Mathematics in the Sri Lankan curriculum focuses on building strong foundational concepts. Would you like me to break down a specific problem or concept?`;
    }

    if (lowerQuestion.includes('science') || lowerQuestion.includes('physics') || lowerQuestion.includes('chemistry') || lowerQuestion.includes('biology')) {
      return `Excellent science inquiry! The Grade ${grade} Sri Lankan science curriculum covers fascinating topics. I can help explain concepts with real-world examples from Sri Lanka. What specific area would you like to explore?`;
    }

    if (lowerQuestion.includes('english') || lowerQuestion.includes('essay') || lowerQuestion.includes('grammar')) {
      return `Perfect! English language skills are crucial for your academic success. The Sri Lankan curriculum emphasizes both language proficiency and literature appreciation. I can help with grammar, essay writing, or literature analysis. What would you like to work on?`;
    }

    if (lowerQuestion.includes('sinhala') || lowerQuestion.includes('buddhism') || lowerQuestion.includes('history')) {
      return `Wonderful question about our cultural subjects! These subjects help you understand Sri Lankan heritage and values. I can explain concepts in both Sinhala and English to help you better understand. What specific topic interests you?`;
    }

    return `That's an interesting question! As your AI tutor for Grade ${grade}, I'm here to help you understand any concept from your Sri Lankan curriculum. Could you tell me which subject this relates to? I can provide detailed explanations, examples, and practice questions tailored to your grade level.`;
  };

  const loadChatHistory = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setInputValue('');
    setShowChatHistory(false); // Close history sidebar after selection
  };

  const startNewChat = () => {
    setCurrentSessionId(null);
    setInputValue('');
  };

  // Filter chat sessions based on search query
  const filteredChatSessions = chatSessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group chat sessions by date
  const groupChatSessionsByDate = (sessions: ChatSession[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups = {
      today: [] as ChatSession[],
      yesterday: [] as ChatSession[],
      older: [] as ChatSession[]
    };

    sessions.forEach(session => {
      const sessionDate = new Date(session.timestamp);
      if (sessionDate.toDateString() === today.toDateString()) {
        groups.today.push(session);
      } else if (sessionDate.toDateString() === yesterday.toDateString()) {
        groups.yesterday.push(session);
      } else {
        groups.older.push(session);
      }
    });

    return groups;
  };

  const quickActions = [
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Deep Research",
      description: "Get comprehensive explanations and detailed analysis"
    },
    {
      icon: <ImageIcon className="h-5 w-5" />,
      title: "Create Diagrams",
      description: "Visualize concepts with diagrams and charts"
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Search Knowledge",
      description: "Find specific information from your curriculum"
    },
    {
      icon: <Music className="h-5 w-5" />,
      title: "Audio Learning",
      description: "Listen to explanations and lessons"
    }
  ];

  const featureCards = [
    {
      icon: <div className="flex space-x-1">
        <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
      </div>,
      title: "Fast Start",
      description: "Ask questions, get instant help, and learn efficiently — all in one place.",
      subtitle: "Quick Learning"
    },
    {
      icon: <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <Grid3X3 className="h-3 w-3 text-white" />
      </div>,
      title: "Collaborate with AI",
      description: "Work together with AI to solve problems, understand concepts, and improve your skills.",
      subtitle: "Smart Partnership"
    },
    {
      icon: <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
        31
      </div>,
      title: "Planning",
      description: "Organize your study schedule, track progress, and stay focused on your goals.",
      subtitle: "Study Management"
    }
  ];

  // Get current session messages
  const currentSession = chatSessions.find(session => session.id === currentSessionId);
  const currentMessages = currentSession?.messages || [];

  return (
    <>
      <Sidebar />
      <div className="flex h-screen bg-slate-950 relative overflow-hidden ml-64">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/50 to-slate-950"></div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Top Bar */}
          <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-slate-300">CeynovX v2.6</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Student Profile Card */}
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <div className="w-7 h-7 bg-purple-200 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
                    {currentStudent && (currentStudent.avatar || currentStudent.photo) ? (
                      <img 
                        src={currentStudent.avatar || currentStudent.photo} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    ) : (
                      <User className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm leading-tight">{currentStudent?.name || 'Student Name'}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 text-xs">Grade {currentStudent?.grade || '7'}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 text-xs">Online</span>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/50">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Tabs */}
          {chatSessions.length > 0 && (
            <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
              <div className="flex items-center space-x-1 p-2 overflow-x-auto">
                {chatSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 min-w-0 ${
                      currentSessionId === session.id
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                    onClick={() => setCurrentSessionId(session.id)}
                  >
                    <span className="text-sm truncate">{session.title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-4 h-4 p-0 text-slate-500 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChatSessions(prev => prev.filter(s => s.id !== session.id));
                        if (currentSessionId === session.id) {
                          setCurrentSessionId(chatSessions.length > 1 ? chatSessions[0].id : null);
                        }
                      }}
                    >
                      <span className="text-xs">×</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative">
            {currentMessages.length === 0 ? (
              <>
                {/* Scrollable Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Welcome Section */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                          Hi {currentStudent?.name || 'Student'}, Ready to Learn?
                        </h2>
                        <p className="text-slate-300">
                          Your AI tutor is here to help you excel in your studies
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -top-2 -right-2 bg-slate-800 rounded-lg p-3 shadow-lg border border-slate-700 whitespace-nowrap">
                          <span className="text-xs text-slate-300">Hey there! 👋 Need help?</span>
                        </div>
                      </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {featureCards.map((card, index) => (
                        <Card key={index} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-slate-700">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                {card.icon}
                              </div>
                              <div>
                                <h3 className="font-semibold text-white mb-1">
                                  {card.title}
                                </h3>
                                <p className="text-sm text-slate-300 mb-2">
                                  {card.description}
                                </p>
                                <span className="text-xs text-slate-400 font-medium">
                                  {card.subtitle}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fixed Chat Input at Bottom */}
                <div className="border-t border-slate-800 bg-slate-900/60 backdrop-blur-sm">
                  <div className="max-w-6xl mx-auto p-6">
                    <div className="flex items-center space-x-4">
                      {/* Chat Input with Icon */}
                      <div className="flex-1 relative">
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Hi how may I help you, please enter..."
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="pl-16 pr-6 py-5 bg-slate-800/80 border-slate-700/50 text-white placeholder:text-slate-400 rounded-3xl focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all duration-200 text-base"
                          />
                        </div>
                      </div>
                      
                      {/* Send Button */}
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="px-8 py-5 bg-slate-800/80 text-white hover:bg-slate-700/80 rounded-3xl border border-slate-700/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium min-w-[100px]"
                      >
                        Send
                      </Button>
                      
                      {/* Clear Button */}
                      <Button 
                        onClick={() => setInputValue('')}
                        disabled={!inputValue.trim()}
                        className="px-8 py-5 bg-slate-700/80 text-white hover:bg-slate-600/80 rounded-3xl border border-slate-600/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium min-w-[100px]"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                                 {/* Scrollable Chat Messages */}
                 <div className="flex-1 overflow-y-auto">
                   <div className="max-w-4xl mx-auto pt-6">
                     {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`py-6 ${
                          message.type === 'user' ? 'bg-slate-900/50' : 'bg-slate-950'
                        }`}
                      >
                                                 <div className="max-w-3xl mx-auto px-4">
                           <div className={`flex items-start gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                             <div className="flex-shrink-0">
                               {message.type === 'ai' ? (
                                 <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                                   <img 
                                     src="/src/assets/ceyquest-logo.png" 
                                     alt="CeyQuest AI" 
                                     className="w-full h-full object-cover"
                                     onError={(e) => {
                                       const target = e.currentTarget as HTMLImageElement;
                                       target.style.display = 'none';
                                       const nextElement = target.nextElementSibling as HTMLElement;
                                       if (nextElement) {
                                         nextElement.style.display = 'flex';
                                       }
                                     }}
                                   />
                                   <Bot className="h-4 w-4 text-white" style={{ display: 'none' }} />
                                 </div>
                               ) : (
                                 <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center overflow-hidden">
                                   {currentStudent && (currentStudent.avatar || currentStudent.photo) ? (
                                     <img 
                                       src={currentStudent.avatar || currentStudent.photo} 
                                       alt="User" 
                                       className="w-full h-full object-cover" 
                                     />
                                   ) : (
                                     <User className="h-4 w-4 text-white" />
                                   )}
                                 </div>
                               )}
                             </div>
                             <div className="flex-1 min-w-0">
                               <div className="prose prose-invert max-w-none">
                                 <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                                   {message.content}
                                 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="py-6 bg-slate-950">
                        <div className="max-w-3xl mx-auto px-4">
                          <div className="flex items-start gap-4">
                                                         <div className="flex-shrink-0">
                               <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                                 <img 
                                   src="/src/assets/ceyquest-logo.png" 
                                   alt="CeyQuest AI" 
                                   className="w-full h-full object-cover"
                                   onError={(e) => {
                                     const target = e.currentTarget as HTMLImageElement;
                                     target.style.display = 'none';
                                     const nextElement = target.nextElementSibling as HTMLElement;
                                     if (nextElement) {
                                       nextElement.style.display = 'flex';
                                     }
                                   }}
                                 />
                                 <Bot className="h-4 w-4 text-white" style={{ display: 'none' }} />
                               </div>
                             </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fixed Chat Input at Bottom */}
                <div className="border-t border-slate-800 bg-slate-900/60 backdrop-blur-sm">
                  <div className="max-w-6xl mx-auto p-6">
                    <div className="flex items-center space-x-4">
                      {/* Chat Input with Icon */}
                      <div className="flex-1 relative">
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Hi how may I help you, please enter..."
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="pl-16 pr-6 py-5 bg-slate-800/80 border-slate-700/50 text-white placeholder:text-slate-400 rounded-3xl focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all duration-200 text-base"
                          />
                        </div>
                      </div>
                      
                      {/* Send Button */}
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="px-8 py-5 bg-slate-800/80 text-white hover:bg-slate-700/80 rounded-3xl border border-slate-700/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium min-w-[100px]"
                      >
                        Send
                      </Button>
                      
                      {/* Clear Button */}
                      <Button 
                        onClick={() => setInputValue('')}
                        disabled={!inputValue.trim()}
                        className="px-8 py-5 bg-slate-700/80 text-white hover:bg-slate-600/80 rounded-3xl border border-slate-600/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium min-w-[100px]"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div 
          className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-900/80 backdrop-blur-sm border-l border-slate-800 flex flex-col relative z-10 transition-all duration-300 ease-in-out`}
          style={{ minWidth: sidebarCollapsed ? '64px' : '256px' }}
        >
          {/* Header */}
          <div className={`${sidebarCollapsed ? 'p-4' : 'p-6'} border-b border-slate-800`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSidebarCollapsed(false)}
                >
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <h1 className="text-lg font-bold text-white">CeynovX AI</h1>
                    <p className="text-slate-400 text-sm">AI Tutor</p>
                  </div>
                )}
              </div>
              {!sidebarCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800/50"
                  onClick={() => setSidebarCollapsed(true)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            {/* New Chat Button */}
            <div className={`${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
              <Button 
                className={`${sidebarCollapsed ? 'w-12 h-12 p-0' : 'w-full py-3'} bg-black text-white hover:bg-gray-800 rounded-lg transition-all duration-200`}
                onClick={startNewChat}
              >
                <Plus className="h-4 w-4" />
                {!sidebarCollapsed && <span className="ml-2">New Chat</span>}
              </Button>
            </div>

            {/* Main Navigation */}
            <div className={`${sidebarCollapsed ? 'px-2' : 'px-4'} pb-4`}>
              {!sidebarCollapsed && (
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tools</h3>
              )}
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={`${sidebarCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full justify-start h-10'} text-slate-300 hover:text-white hover:bg-slate-800/50`}
                  onClick={() => setShowSearchModal(true)}
                >
                  <Search className="h-4 w-4" />
                  {!sidebarCollapsed && <span className="ml-3">Search Chats</span>}
                </Button>
                <Button 
                  variant="ghost" 
                  className={`${sidebarCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full justify-start h-10'} text-slate-300 hover:text-white hover:bg-slate-800/50`}
                  onClick={() => setShowChatHistory(true)}
                >
                  <Clock className="h-4 w-4" />
                  {!sidebarCollapsed && <span className="ml-3">Chat History</span>}
                </Button>

              </div>
            </div>

            {/* Study Topics */}
            <div className={`${sidebarCollapsed ? 'px-2' : 'px-4'} pb-4`}>
              {!sidebarCollapsed && (
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Study Topics</h3>
              )}
              <div className="space-y-1">
                <Button variant="ghost" className={`${sidebarCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full justify-start h-10'} text-slate-300 hover:text-white hover:bg-slate-800/50`}>
                  <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
                  {!sidebarCollapsed && <span className="ml-3">Mathematics</span>}
                </Button>
                <Button variant="ghost" className={`${sidebarCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full justify-start h-10'} text-slate-300 hover:text-white hover:bg-slate-800/50`}>
                  <div className="w-4 h-4 bg-teal-500 rounded-sm"></div>
                  {!sidebarCollapsed && <span className="ml-3">Science</span>}
                </Button>
                <Button variant="ghost" className={`${sidebarCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full justify-start h-10'} text-slate-300 hover:text-white hover:bg-slate-800/50`}>
                  <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                  {!sidebarCollapsed && <span className="ml-3">English</span>}
                </Button>
                <Button variant="ghost" className={`${sidebarCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full justify-start h-10'} text-slate-300 hover:text-white hover:bg-slate-800/50`}>
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  {!sidebarCollapsed && <span className="ml-3">History</span>}
                </Button>
                <Button variant="ghost" className={`${sidebarCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full justify-start h-10'} text-slate-300 hover:text-white hover:bg-slate-800/50`}>
                  <Plus className="h-4 w-4" />
                  {!sidebarCollapsed && <span className="ml-3">Add Subject</span>}
                </Button>
              </div>
            </div>

            {/* Settings */}
            <div className={`${sidebarCollapsed ? 'px-2' : 'px-4'} pb-4`}>
              {!sidebarCollapsed && (
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Settings</h3>
              )}
              <div className="space-y-1">
                <Button variant="ghost" className={`${sidebarCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full justify-start h-10'} text-slate-300 hover:text-white hover:bg-slate-800/50`}>
                  <Settings className="h-4 w-4" />
                  {!sidebarCollapsed && <span className="ml-3">Preferences</span>}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Combined User and Credits Card */}
          <div className={`mt-auto ${sidebarCollapsed ? 'p-2' : 'p-4'} border-t border-slate-800`}>
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
              {/* Credits Section */}
              {!sidebarCollapsed && (
                <div className="p-3 border-b border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-xs font-medium">Credits</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-semibold">149</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1 mb-2">
                    <div className="w-3/4 bg-green-400 h-1 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">Invite friends to refill</span>
                    <Button variant="ghost" size="sm" className="h-5 px-2 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                      <Star className="h-3 w-3 mr-1" />
                      Refill
                    </Button>
                  </div>
                </div>
              )}
              
              {/* User Account Section */}
              <div className={`flex items-center ${sidebarCollapsed ? 'justify-center p-2' : 'justify-between p-3'} hover:bg-slate-800/30 transition-all duration-200 cursor-pointer group`}>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
                      {currentStudent && (currentStudent.avatar || currentStudent.photo) ? (
                        <img 
                          src={currentStudent.avatar || currentStudent.photo} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover" 
                        />
                      ) : (
                        <User className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  </div>
                  {!sidebarCollapsed && (
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">{currentStudent?.name || 'Student Name'}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-400">Grade {currentStudent?.grade || '7'}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-xs text-green-400">Online</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat History Overlay Sidebar */}
        {showChatHistory && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowChatHistory(false)}
            ></div>
            
            {/* Chat History Sidebar */}
            <div className="absolute left-64 top-0 h-full w-64 bg-slate-950 border-r border-slate-800 shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-white">Chat History</h1>
                      <p className="text-slate-400 text-sm">Your conversations</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors rounded-lg border border-slate-700"
                    onClick={() => setShowChatHistory(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {/* New Chat Button */}
                <div className="p-4">
                  <Button 
                    className="w-full py-3 bg-black text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                    onClick={() => {
                      startNewChat();
                      setShowChatHistory(false);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="ml-2">New Chat</span>
                  </Button>
                </div>

                {/* Chat History List */}
                <div className="px-4 pb-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recent Chats</h3>
                  <div className="space-y-2">
                    {(() => {
                      const groupedSessions = groupChatSessionsByDate(chatSessions);
                      return (
                        <>
                          {/* Today */}
                          {groupedSessions.today.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-slate-400 mb-2">Today</h4>
                              <div className="space-y-1">
                                {groupedSessions.today.map((session) => (
                                  <Button
                                    key={session.id}
                                    variant="ghost"
                                    className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 p-3 rounded-lg"
                                    onClick={() => loadChatHistory(session.id)}
                                  >
                                    <MessageSquare className="h-4 w-4 mr-3 text-slate-400" />
                                    <span className="truncate text-left">{session.title}</span>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Yesterday */}
                          {groupedSessions.yesterday.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-slate-400 mb-2">Yesterday</h4>
                              <div className="space-y-1">
                                {groupedSessions.yesterday.map((session) => (
                                  <Button
                                    key={session.id}
                                    variant="ghost"
                                    className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 p-3 rounded-lg"
                                    onClick={() => loadChatHistory(session.id)}
                                  >
                                    <MessageSquare className="h-4 w-4 mr-3 text-slate-400" />
                                    <span className="truncate text-left">{session.title}</span>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Older */}
                          {groupedSessions.older.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-slate-400 mb-2">Older</h4>
                              <div className="space-y-1">
                                {groupedSessions.older.map((session) => (
                                  <Button
                                    key={session.id}
                                    variant="ghost"
                                    className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 p-3 rounded-lg"
                                    onClick={() => loadChatHistory(session.id)}
                                  >
                                    <MessageSquare className="h-4 w-4 mr-3 text-slate-400" />
                                    <span className="truncate text-left">{session.title}</span>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* No chats */}
                          {chatSessions.length === 0 && (
                            <div className="text-center py-8">
                              <MessageSquare className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                              <p className="text-slate-400 text-sm">No chats yet</p>
                              <p className="text-slate-500 text-xs">Start a new conversation to see it here</p>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Modal Overlay */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md mx-auto shadow-2xl">
              {/* Header with Search Input */}
              <div className="p-4 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search chats..."
                      className="pl-10 pr-4 py-3 bg-slate-800/80 border-slate-700/50 text-white placeholder:text-slate-400 rounded-lg focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all duration-200"
                      autoFocus
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800/50 ml-2"
                    onClick={() => {
                      setShowSearchModal(false);
                      setSearchQuery('');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="max-h-96 overflow-y-auto">
                {/* New Chat Option */}
                <div className="p-4 border-b border-slate-800">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 p-3 rounded-lg"
                    onClick={() => {
                      startNewChat();
                      setShowSearchModal(false);
                      setSearchQuery('');
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-3 text-slate-400" />
                    New chat
                  </Button>
                </div>

                {/* Chat History */}
                {(() => {
                  const groupedSessions = groupChatSessionsByDate(filteredChatSessions);
                  return (
                    <>
                      {/* Yesterday */}
                      {groupedSessions.yesterday.length > 0 && (
                        <div className="p-4">
                          <h4 className="text-sm font-medium text-slate-400 mb-3">Yesterday</h4>
                          <div className="space-y-2">
                            {groupedSessions.yesterday.map((session) => (
                              <Button
                                key={session.id}
                                variant="ghost"
                                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 p-3 rounded-lg"
                                onClick={() => {
                                  loadChatHistory(session.id);
                                  setShowSearchModal(false);
                                  setSearchQuery('');
                                }}
                              >
                                <MessageSquare className="h-4 w-4 mr-3 text-slate-400" />
                                <span className="truncate">{session.title}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Previous 7 Days */}
                      {groupedSessions.older.length > 0 && (
                        <div className="p-4">
                          <h4 className="text-sm font-medium text-slate-400 mb-3">Previous 7 Days</h4>
                          <div className="space-y-2">
                            {groupedSessions.older.map((session) => (
                              <Button
                                key={session.id}
                                variant="ghost"
                                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 p-3 rounded-lg"
                                onClick={() => {
                                  loadChatHistory(session.id);
                                  setShowSearchModal(false);
                                  setSearchQuery('');
                                }}
                              >
                                <MessageSquare className="h-4 w-4 mr-3 text-slate-400" />
                                <span className="truncate">{session.title}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No results */}
                      {filteredChatSessions.length === 0 && searchQuery && (
                        <div className="p-4 text-center">
                          <p className="text-slate-400 text-sm">No chats found matching "{searchQuery}"</p>
                        </div>
                      )}

                      {/* No chats at all */}
                      {chatSessions.length === 0 && !searchQuery && (
                        <div className="p-4 text-center">
                          <p className="text-slate-400 text-sm">No chats yet. Start a new conversation!</p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CeynovX;
