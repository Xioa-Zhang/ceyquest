import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Zap, BookOpen, Users, TrendingUp } from 'lucide-react';
import { Student } from '@/types';

interface LeaderboardUnlockProps {
  currentStudent: Student | null;
  onStartLesson: () => void;
}

const LeaderboardUnlock = ({ currentStudent, onStartLesson }: LeaderboardUnlockProps) => {
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [lessonsRequired, setLessonsRequired] = useState(7);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate getting lessons completed from student data
    if (currentStudent) {
      const completed = Math.min(currentStudent.completedQuizzes || 0, lessonsRequired);
      setLessonsCompleted(completed);
      setProgress((completed / lessonsRequired) * 100);
    }
  }, [currentStudent, lessonsRequired]);

  const remainingLessons = Math.max(0, lessonsRequired - lessonsCompleted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
                 {/* Header */}
                  <div className="text-center mb-8 relative">
            <h1 className="text-4xl font-bold text-white mb-2">CeyQuest Leaderboards</h1>
                        <p className="text-purple-300 text-lg">Compete with students across Sri Lanka</p>
                        
                        {/* CeyQuest Mascot - Top Right */}
                        <div className="absolute top-0 right-0">
                          <img 
                            src="/logo.png" 
                            alt="CeyQuest Logo" 
                            className="w-16 h-16 rounded-full shadow-lg"
                          />
                        </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left/Center Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badges Section */}
            <div className="text-center">
              <div className="flex justify-center items-center space-x-4 mb-6">
                {/* Bronze Badge */}
                <div className="relative">
                  <div className="w-20 h-24 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-full flex items-center justify-center shadow-lg">
                    <Trophy className="w-8 h-8 text-amber-200" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </div>
                </div>

                {/* Gold Badge */}
                <div className="relative">
                  <div className="w-24 h-28 bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-t-full flex items-center justify-center shadow-lg transform scale-110">
                    <Trophy className="w-10 h-10 text-yellow-200" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -left-1">
                    <Star className="w-3 h-3 text-yellow-300 animate-pulse" />
                  </div>
                </div>

                {/* Silver Badge */}
                <div className="relative">
                  <div className="w-20 h-24 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-full flex items-center justify-center shadow-lg">
                    <Trophy className="w-8 h-8 text-gray-200" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </div>
                </div>
              </div>

                             {/* Progress Section */}
               <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-800/50">
                <h2 className="text-3xl font-bold text-white mb-4">Unlock Leaderboards!</h2>
                
                                 <div className="mb-6">
                   <div className="flex justify-between items-center mb-2">
                                           <span className="text-purple-300 text-sm font-medium">
                        {lessonsCompleted} of {lessonsRequired} lessons completed
                      </span>
                     <span className="text-white text-sm font-medium">
                       {Math.round(progress)}%
                     </span>
                   </div>
                                        <Progress value={progress} className="h-3 bg-slate-800">
                       <div 
                         className="h-full bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-500 rounded-full"
                         style={{ width: `${progress}%` }}
                       />
                     </Progress>
                 </div>

                <p className="text-slate-300 text-lg mb-6">
                  Complete {remainingLessons} more lesson{remainingLessons !== 1 ? 's' : ''} to start competing
                </p>

                                 <Button
                   onClick={onStartLesson}
                   className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                 >
                  <BookOpen className="w-5 h-5 mr-2" />
                  START A LESSON
                </Button>
              </div>
            </div>

                         {/* Placeholder Leaderboard Rows */}
             <div className="space-y-4">
               {[...Array(6)].map((_, index) => (
                 <div key={index} className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800/30 opacity-40">
                   <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                   <div className="flex-1">
                     <div className="h-4 bg-slate-700 rounded w-32 mb-2"></div>
                     <div className="h-3 bg-slate-700 rounded w-24"></div>
                   </div>
                   <div className="h-4 bg-slate-700 rounded w-16"></div>
                 </div>
               ))}
             </div>
          </div>

          {/* Information Box - Right Section */}
          <div className="lg:col-span-1">
                         <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-800/50 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                  What Are Leaderboards?
                </h3>
                
                                 <div className="space-y-4 mb-6">
                   <div className="flex items-center space-x-3">
                     <BookOpen className="w-5 h-5 text-purple-500" />
                     <span className="font-semibold">Do lessons. Earn XP.</span>
                   </div>
                   
                   <div className="flex items-center space-x-3">
                     <Zap className="w-5 h-5 text-yellow-400" />
                     <span className="font-semibold">Compete.</span>
                   </div>
                 </div>

                                 <p className="text-slate-300 text-sm leading-relaxed">
                   Earn XP through lessons, then compete with students in a weekly leaderboard. 
                   Climb the ranks and earn badges as you master your subjects!
                 </p>
              </CardContent>
            </Card>

                         {/* Quick Stats */}
             <div className="mt-6 space-y-4">
               <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800/30">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                     <Users className="w-5 h-5 text-purple-500" />
                     <span className="text-slate-300 text-sm">Active Students</span>
                   </div>
                   <span className="text-white font-bold">2,847</span>
                 </div>
               </div>

               <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800/30">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                     <TrendingUp className="w-5 h-5 text-yellow-400" />
                     <span className="text-slate-300 text-sm">Weekly Reset</span>
                   </div>
                   <span className="text-white font-bold">Sunday</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardUnlock;
