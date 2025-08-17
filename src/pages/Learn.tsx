import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Star, 
  Trophy, 
  Play, 
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Calculator,
  Atom,
  Globe,
  Brain,
  Palette,
  Code,
  Heart,
  Zap,
  Target,
  Lightbulb,
  Users,
  Award,
  TrendingUp,
  Book,
  Video,
  FileText,
  Image,
  Link as LinkIcon,
  Maximize
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Student, Quiz as QuizType, Question } from '@/types';

const Learn = () => {
  const [searchParams] = useSearchParams();
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [subject, setSubject] = useState('mathematics');
  const [grade, setGrade] = useState(6);
  const [subjectProgress, setSubjectProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('quiz');

  useEffect(() => {
    const savedStudent = localStorage.getItem('ceyquest-student');
    if (savedStudent) {
      const studentData = JSON.parse(savedStudent);
      setCurrentStudent(studentData);
      const studentGrade = parseInt(String(studentData.grade)) || 6;
      setGrade(studentGrade);
    }
  }, []);

  useEffect(() => {
    if (currentStudent) {
      const urlSubject = searchParams.get('subject') || 'mathematics';
      setSubject(urlSubject);
    }
  }, [searchParams, currentStudent]);

  const getSubjectContent = (subjectName: string) => {
    const displayNames: { [key: string]: string } = {
      'mathematics': 'Mathematics',
      'science': 'Science',
      'english': 'English',
      'history': 'History',
      'geography': 'Geography',
      'religion': 'Religion',
      'art': 'Art',
      'ict': 'ICT',
      'commerce': 'Commerce',
      'health': 'Health & Physical Education',
      'arabic': 'Arabic',
      'arabic-literature': 'Arabic Literature',
      'sinhala': 'Sinhala',
      'tamil': 'Tamil',
      'sinhala-literature': 'Sinhala Literature',
      'tamil-literature': 'Tamil Literature',
      'agricultural-science': 'Agricultural Science'
    };

    const subjectImages: { [key: string]: string } = {
      'mathematics': '/imags/maths.svg',
      'science': '/imags/science.svg',
      'english': '/imags/english.svg',
      'history': '/imags/history.svg',
      'geography': '/imags/history.svg', // Using history image as fallback
      'religion': '/imags/reliegion.svg',
      'art': '/imags/art.svg',
      'ict': '/imags/ICT.svg',
      'commerce': '/imags/commerce.svg',
      'health': '/imags/health&phy.edy.svg',
      'arabic': '/imags/Arabic.svg',
      'arabic-literature': '/imags/arabic_lit.svg',
      'sinhala': '/imags/Language.svg',
      'tamil': '/imags/Language.svg',
      'sinhala-literature': '/imags/Language.svg',
      'tamil-literature': '/imags/Language.svg',
      'agricultural-science': '/imags/science.svg' // Using science image as fallback
    };

    const subjectDisplayName = displayNames[subjectName] || subjectName.charAt(0).toUpperCase() + subjectName.slice(1);

    return {
      title: subjectDisplayName,
      icon: Calculator,
      color: 'from-blue-500 to-purple-600',
      description: `Learn ${subjectDisplayName} fundamentals for Grade ${grade}`,
      image: subjectImages[subjectName] || '/imags/maths.svg' // Default to maths if not found
    };
  };

  if (!currentStudent) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  const subjectContent = getSubjectContent(subject);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#1a0f2e] to-[#2d1a4a] text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{subjectContent.title} Learning Path</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">{Math.floor(subjectProgress / 5)}/20</span>
            <div className="w-32 h-2 bg-white/10 rounded-full">
              <div className="h-2 bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${subjectProgress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Left Section - Course Navigation */}
          <div className="w-1/3 p-6 border-r border-white/10">
            <div className="space-y-6">
              {/* Course Header */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={subjectContent.image} 
                      alt={subjectContent.title}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const nextElement = target.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <Calculator className="w-8 h-8 text-white/70" style={{ display: 'none' }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{subjectContent.title} Fundamentals</h2>
                    <p className="text-white/70 text-sm">Grade {grade} • Section 1</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Course Progress</span>
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{subjectProgress}%</span>
                  </div>
                </div>
              </div>

              {/* Course Navigation */}
              <div className="space-y-2">
                {/* Current Section - Active */}
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-white font-medium text-sm">1.1 {subjectContent.title} Basics</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-blue-400" />
                  </div>
                </div>

                {/* Lecture Video Section */}
                <div className={`rounded-lg p-3 border transition-all duration-200 ${activeSection === 'video' ? 'bg-blue-600/20 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all duration-200"
                    onClick={() => setActiveSection('video')}
                  >
                    <div className="flex items-center gap-3">
                      <Video className={`h-4 w-4 ${activeSection === 'video' ? 'text-blue-400' : 'text-white/70'}`} />
                      <span className={`font-medium text-sm ${activeSection === 'video' ? 'text-blue-400' : 'text-white'}`}>Lecture Video</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 ${activeSection === 'video' ? 'text-blue-400' : 'text-white/50'}`} />
                  </div>
                </div>

                {/* Lecture Notes Section */}
                <div className={`rounded-lg p-3 border transition-all duration-200 ${activeSection === 'notes' ? 'bg-blue-600/20 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all duration-200"
                    onClick={() => setActiveSection('notes')}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className={`h-4 w-4 ${activeSection === 'notes' ? 'text-blue-400' : 'text-white/70'}`} />
                      <span className={`font-medium text-sm ${activeSection === 'notes' ? 'text-blue-400' : 'text-white'}`}>Lecture Notes</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 ${activeSection === 'notes' ? 'text-blue-400' : 'text-white/50'}`} />
                  </div>
                </div>

                {/* Quiz Section */}
                <div className={`rounded-lg p-3 border transition-all duration-200 ${activeSection === 'quiz' ? 'bg-blue-600/20 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all duration-200"
                    onClick={() => setActiveSection('quiz')}
                  >
                    <div className="flex items-center gap-3">
                      <Award className={`h-4 w-4 ${activeSection === 'quiz' ? 'text-blue-400' : 'text-white/70'}`} />
                      <span className={`font-medium text-sm ${activeSection === 'quiz' ? 'text-blue-400' : 'text-white'}`}>Quiz</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 ${activeSection === 'quiz' ? 'text-blue-400' : 'text-white/50'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="w-2/3 p-6">
            <div className="space-y-6">
              {/* Content Header */}
              <div className={`rounded-lg p-4 mb-6 ${
                activeSection === 'video' ? 'bg-blue-600/20 border border-blue-500/30' :
                activeSection === 'notes' ? 'bg-green-600/20 border border-green-500/30' :
                activeSection === 'quiz' ? 'bg-purple-600/20 border border-purple-500/30' :
                'bg-white/5 border border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {activeSection === 'video' && <Video className="h-6 w-6 text-blue-400" />}
                    {activeSection === 'notes' && <FileText className="h-6 w-6 text-green-400" />}
                    {activeSection === 'quiz' && <Award className="h-6 w-6 text-purple-400" />}
                    <h3 className="text-lg font-semibold text-white">
                      {activeSection === 'video' ? 'Lecture Video' :
                       activeSection === 'notes' ? 'Lecture Notes' :
                       activeSection === 'quiz' ? 'Interactive Quiz' : 'Content'}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                {activeSection === 'video' && (
                  <div className="text-center py-12">
                    <Video className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Video Content</h3>
                    <p className="text-white/70">Interactive video content will be displayed here.</p>
                  </div>
                )}

                {activeSection === 'notes' && (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Lecture Notes</h3>
                    <p className="text-white/70">Comprehensive notes and study materials will be displayed here.</p>
                  </div>
                )}

                {activeSection === 'quiz' && (
                  <div className="text-center py-12">
                    <Award className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Interactive Quiz</h3>
                    <p className="text-white/70">Test your knowledge with interactive quizzes.</p>
                    <Button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white">
                      Start Quiz
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Learn;