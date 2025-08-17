import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  Users, 
  BarChart3,
  Play,
  Settings,
  RefreshCw
} from 'lucide-react';
import Layout from '@/components/layout/Layout';


import { Textbook, Chapter, Question } from '@/types/textbook';

interface SubjectData {
  analyzed: boolean;
  chapters: Chapter[];
}

const TextbookManager = () => {
  const [grades] = useState([6, 7, 8, 9]);
  const [selectedGrade, setSelectedGrade] = useState(6);
  const [subjects, setSubjects] = useState<string[]>(['Mathematics', 'Science', 'English', 'History']);
  const [analysisProgress, setAnalysisProgress] = useState<{[key: string]: number}>({});
  const [textbookData, setTextbookData] = useState<{[key: string]: SubjectData}>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadGradeData(selectedGrade);
  }, [selectedGrade]);

  const loadGradeData = (grade: number) => {
    const gradeSubjects = ['Mathematics', 'Science', 'English', 'History'];
    setSubjects(gradeSubjects);
    
    // Load existing data
    const data: {[key: string]: SubjectData} = {};
    gradeSubjects.forEach(subject => {
      data[subject] = { analyzed: false, chapters: [] };
    });
    setTextbookData(data);
  };

  const analyzeTextbooks = async () => {
    setIsAnalyzing(true);
    const progress: {[key: string]: number} = {};
    
    for (const subject of subjects) {
      progress[subject] = 0;
      setAnalysisProgress({...progress});
      
      // Simulate analysis
      for (let i = 0; i < 5; i++) {
        progress[subject] += 20;
        setAnalysisProgress({...progress});
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Mark as analyzed
      setTextbookData(prev => ({
        ...prev,
        [subject]: {
          ...prev[subject],
          analyzed: true,
          chapters: [
            { id: 1, title: 'Chapter 1', questions: 10, resources: 5 },
            { id: 2, title: 'Chapter 2', questions: 8, resources: 3 },
            { id: 3, title: 'Chapter 3', questions: 12, resources: 7 }
          ]
        }
      }));
    }
    
    setIsAnalyzing(false);
  };

  const getGradeSummary = (grade: number) => {
    return {
      totalSubjects: 4,
      totalTextbooks: 12,
      totalChapters: 48,
      totalQuestions: 240
    };
  };

  const getSubjectStats = (subject: string) => {
    const data = textbookData[subject];
    if (!data) return null;
    
    const totalChapters = data.chapters?.length || 0;
    const totalQuestions = data.chapters?.reduce((sum: number, ch: Chapter) => 
      sum + (ch.questions?.length || 0), 0) || 0;
    const totalResources = data.chapters?.reduce((sum: number, ch: Chapter) => 
      sum + (ch.resources?.length || 0), 0) || 0;
    
    return { totalChapters, totalQuestions, totalResources };
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Textbook Manager</h1>
            <p className="text-white/70">Manage and analyze government textbooks for Grades 6-9</p>
          </div>

          {/* Grade Selection */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              {grades.map(grade => (
                <Button
                  key={grade}
                  variant={selectedGrade === grade ? "default" : "outline"}
                  onClick={() => setSelectedGrade(grade)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Grade {grade}
                </Button>
              ))}
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Grade {selectedGrade} Summary</h3>
                <Button
                  onClick={analyzeTextbooks}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analyze Textbooks
                    </>
                  )}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{subjects.length}</div>
                  <div className="text-white/70 text-sm">Subjects</div>
                </div>
                                 <div className="text-center">
                   <div className="text-2xl font-bold text-white">12</div>
                   <div className="text-white/70 text-sm">Textbooks</div>
                 </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {subjects.reduce((sum, subject) => {
                      const stats = getSubjectStats(subject);
                      return sum + (stats?.totalChapters || 0);
                    }, 0)}
                  </div>
                  <div className="text-white/70 text-sm">Chapters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {subjects.reduce((sum, subject) => {
                      const stats = getSubjectStats(subject);
                      return sum + (stats?.totalQuestions || 0);
                    }, 0)}
                  </div>
                  <div className="text-white/70 text-sm">Questions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {subjects.map(subject => {
               const displayName = subject;
               const files = [
                 { type: 'Textbook', fileName: `${subject}_Textbook.pdf` },
                 { type: 'Workbook', fileName: `${subject}_Workbook.pdf` }
               ];
               const stats = getSubjectStats(subject);
               const progress = analysisProgress[subject] || 0;
               const isAnalyzed = textbookData[subject]?.analyzed;
              
              return (
                <Card key={subject} className="bg-white/5 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{displayName}</CardTitle>
                      <Badge variant={isAnalyzed ? "default" : "secondary"}>
                        {isAnalyzed ? "Analyzed" : "Pending"}
                      </Badge>
                    </div>
                    <CardDescription className="text-white/70">
                      {files.length} textbook{files.length !== 1 ? 's' : ''} available
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {isAnalyzing && progress < 100 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Analyzing...</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                    
                    {stats && (
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-purple-400">{stats.totalChapters}</div>
                          <div className="text-xs text-white/70">Chapters</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-400">{stats.totalQuestions}</div>
                          <div className="text-xs text-white/70">Questions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-400">{stats.totalResources}</div>
                          <div className="text-xs text-white/70">Resources</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-white/70" />
                            <span className="text-sm text-white/90">{file.type}</span>
                          </div>
                          <Button size="sm" variant="ghost" className="text-white/70 hover:text-white">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={!isAnalyzed}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        View Content
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Analysis Status */}
          {isAnalyzing && (
            <div className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 animate-spin" />
                <div>
                  <div className="font-semibold">Analyzing Textbooks</div>
                  <div className="text-sm opacity-90">
                    {Object.values(analysisProgress).filter(p => p < 100).length} subjects remaining
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TextbookManager; 