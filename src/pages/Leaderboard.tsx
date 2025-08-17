import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, Star, TrendingUp, Bookmark, Users, Clock, ChevronDown, BookOpen } from 'lucide-react';
import logo from '@/assets/logo_svg.svg';
import Layout from '@/components/layout/Layout';
import { LeaderboardEntry, Student } from '@/types';
import LeaderboardUnlock from '@/components/LeaderboardUnlock';

const Leaderboard = () => {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [sortBy, setSortBy] = useState<'rank' | 'winrate' | 'score'>('rank');
  const [timeFilter, setTimeFilter] = useState<'24h' | '7D' | '30D' | 'seasonal'>('24h');
  const [showMyPlace, setShowMyPlace] = useState(false);
  const [lessonsRequired, setLessonsRequired] = useState(7);

  useEffect(() => {
    document.title = 'Leaderboard - CeyQuest';
  }, []);

  useEffect(() => {
    const savedStudent = localStorage.getItem('ceyquest-student');
    let leaderboardData: LeaderboardEntry[] = [];
    let grade = 6;
    
    if (savedStudent) {
      const studentData = JSON.parse(savedStudent);
      grade = parseInt(studentData.grade) || 6;
      setCurrentStudent({
        ...studentData,
        id: 'current-user',
        xpPoints: 6500, // Higher XP to be 1st place
        rank: 1,
        name: studentData.name || studentData.fullName || 'Anoof MA',
        dayStreak: 25,
        grade: grade,
        photo: studentData.photo || studentData.profilePicture || null,
      });
      setSelectedGrade(grade);
    }

    // Mock data with gaming-style stats
      leaderboardData = [
        {
        position: 2,
          xpPoints: 5777,
                  student: {
          id: '1',
          name: 'Sahan Perera',
          grade: 6,
          xpPoints: 5777,
          rank: 2,
          subjects: [],
          completedQuizzes: 42,
          totalQuizzes: 50,
          dayStreak: 20,
          photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face',
          schoolName: 'Royal College Colombo',
        },
          recentActivity: 'Completed Quiz: Science',
        winrate: 64,
        lokalStats: { wins: 42, losses: 21 }
        },
        {
                  student: {
          id: '2',
          name: 'Kavitha Fernando',
          grade,
          xpPoints: 5200,
          rank: 3,
          subjects: [],
          completedQuizzes: 38,
          totalQuizzes: 50,
          photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          schoolName: 'Ananda College',
        },
        position: 3,
        xpPoints: 5200,
        recentActivity: 'Mastered Science - Atoms & Molecules',
        winrate: 58,
        lokalStats: { wins: 38, losses: 25 }
        },
        {
                  student: {
          id: '3',
          name: 'Ravindu Silva',
          grade,
          xpPoints: 4850,
          rank: 4,
          subjects: [],
          completedQuizzes: 35,
          totalQuizzes: 50,
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          schoolName: 'St. Thomas\' College',
        },
        position: 4,
        xpPoints: 4850,
        recentActivity: 'Perfect score in English Literature',
        winrate: 52,
        lokalStats: { wins: 35, losses: 28 }
      },
      {
        student: {
          id: '4',
          name: 'Nethmi Jayasuriya',
          grade,
          xpPoints: 4600,
          rank: 5,
          subjects: [],
          completedQuizzes: 32,
          totalQuizzes: 50,
          photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          schoolName: 'Visakha Vidyalaya',
        },
        position: 4,
        xpPoints: 4600,
        recentActivity: 'Completed Mathematics Quiz',
        winrate: 49,
        lokalStats: { wins: 32, losses: 30 }
      },
      {
                  student: {
          id: '5',
          name: 'Dilshan Mendis',
          grade,
          xpPoints: 4350,
          rank: 6,
          subjects: [],
          completedQuizzes: 30,
          totalQuizzes: 50,
          photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face',
          schoolName: 'D.S. Senanayake College',
        },
        position: 5,
        xpPoints: 4350,
        recentActivity: 'Mastered History Chapter 3',
        winrate: 45,
        lokalStats: { wins: 30, losses: 32 }
      },
      {
        student: {
          id: '6',
          name: 'Tharushi Bandara',
          grade,
          xpPoints: 4100,
          rank: 7,
          subjects: [],
          completedQuizzes: 28,
          totalQuizzes: 50,
          photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          schoolName: 'Musaeus College',
        },
        position: 6,
        xpPoints: 4100,
        recentActivity: 'Completed ICT Quiz',
        winrate: 42,
        lokalStats: { wins: 28, losses: 35 }
      },
      {
        student: {
          id: '7',
          name: 'Amaara Wijesekara',
          grade,
          xpPoints: 3850,
          rank: 8,
          subjects: [],
          completedQuizzes: 26,
          totalQuizzes: 50,
          photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          schoolName: 'Bishop\'s College',
        },
        position: 7,
        xpPoints: 3850,
        recentActivity: 'Perfect score in Geography',
        winrate: 39,
        lokalStats: { wins: 26, losses: 38 }
      },
      {
        student: {
          id: '8',
          name: 'Yasiru Rathnayake',
          grade,
          xpPoints: 3600,
          rank: 9,
          subjects: [],
          completedQuizzes: 24,
          totalQuizzes: 50,
          photo: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face',
          schoolName: 'Nalanda College',
        },
        position: 8,
        xpPoints: 3600,
        recentActivity: 'Completed Art Quiz',
        winrate: 36,
        lokalStats: { wins: 24, losses: 40 }
      },
      {
        student: {
          id: '9',
          name: 'Dilini Gunasekara',
          grade,
          xpPoints: 3350,
          rank: 10,
          subjects: [],
          completedQuizzes: 22,
          totalQuizzes: 50,
          photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          schoolName: 'Ladies\' College',
        },
        position: 9,
        xpPoints: 3350,
        recentActivity: 'Mastered Commerce',
        winrate: 34,
        lokalStats: { wins: 22, losses: 42 }
      },
      {
        student: {
          id: '10',
          name: 'Sachini Perera',
          grade,
          xpPoints: 3100,
          rank: 11,
          subjects: [],
          completedQuizzes: 20,
          totalQuizzes: 50,
          photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          schoolName: 'Holy Family Convent',
        },
        position: 10,
        xpPoints: 3100,
        recentActivity: 'Completed Religion Quiz',
        winrate: 32,
        lokalStats: { wins: 20, losses: 44 }
      }
    ];

    // Add current user as 1st place
    if (currentStudent) {
      leaderboardData.unshift({
        student: currentStudent,
        position: 1,
        xpPoints: currentStudent.xpPoints,
        recentActivity: 'Your recent activity',
        winrate: 85, // High winrate for current user
        lokalStats: { wins: Math.floor(currentStudent.xpPoints / 100), losses: Math.floor(currentStudent.xpPoints / 200) }
      });
    }

    setLeaderboard(leaderboardData);
  }, [selectedGrade]);

  // Sort leaderboard based on selected criteria
  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    switch (sortBy) {
      case 'rank':
        return a.position - b.position;
      case 'winrate':
        return (b.winrate || 0) - (a.winrate || 0);
      case 'score':
        return b.xpPoints - a.xpPoints;
      default:
        return a.position - b.position;
    }
  });

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const handleStartLesson = () => {
    // Navigate to the Learn page or start a lesson
    window.location.href = '/learn';
  };

  // Check if student can access leaderboard
  const canAccessLeaderboard = currentStudent && (currentStudent.completedQuizzes || 0) >= lessonsRequired;

  const getRankBadge = (rank: number) => {
    if (rank <= 3) return { name: 'Challenger', color: 'text-yellow-500', bgColor: 'bg-yellow-500/20' };
    if (rank <= 10) return { name: 'Grandmaster', color: 'text-purple-500', bgColor: 'bg-purple-500/20' };
    if (rank <= 20) return { name: 'Master', color: 'text-red-500', bgColor: 'bg-red-500/20' };
    return { name: 'Gold', color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' };
  };

  const getTrophyIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-12 w-12 text-yellow-500" fill="#facc15" />;
      case 2:
        return <Trophy className="h-12 w-12 text-gray-400" fill="#d1d5db" />;
      case 3:
        return <Trophy className="h-12 w-12 text-orange-500" fill="#fb923c" />;
      default:
        return null;
    }
  };

  // Show unlock screen if student hasn't completed enough lessons
  if (!canAccessLeaderboard) {
    return (
      <Layout>
        <LeaderboardUnlock 
          currentStudent={currentStudent} 
          onStartLesson={handleStartLesson} 
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <img src={logo} alt="CeyQuest Logo" className="w-16 h-16" />
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">CeyQuest Leaderboard</h1>
                    <p className="text-gray-300">The ultimate learning platform for Sri Lankan students. Track your progress and compete with peers.</p>
                    
                    {/* Progress Indicator */}
                    {currentStudent && (
                      <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-teal-200 text-sm font-medium">
                            Leaderboard Access Progress
                          </span>
                          <span className="text-white text-sm font-medium">
                            {Math.min(currentStudent.completedQuizzes || 0, lessonsRequired)}/{lessonsRequired} lessons
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-teal-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${Math.min(((currentStudent.completedQuizzes || 0) / lessonsRequired) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {currentStudent && (currentStudent.completedQuizzes || 0) < lessonsRequired && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white"
                    onClick={handleStartLesson}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Complete {lessonsRequired - (currentStudent.completedQuizzes || 0)} more lessons
                  </Button>
                )}
                <Button size="sm" className="bg-ceyquest-purple hover:bg-ceyquest-purple-dark text-white">
                  Invite Friends
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                                <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
                  {(['rank', 'winrate', 'score'] as const).map((sort) => (
                    <Button
                      key={sort}
                      variant={sortBy === sort ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSortBy(sort)}
                      className={sortBy === sort ? 'bg-ceyquest-purple hover:bg-ceyquest-purple-dark' : 'text-gray-300 hover:text-white'}
                    >
                      {sort.charAt(0).toUpperCase() + sort.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-1">
                  {(['24h', '7D', '30D', 'seasonal'] as const).map((time) => (
                    <Button
                      key={time}
                      variant={timeFilter === time ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setTimeFilter(time)}
                      className={timeFilter === time ? 'bg-ceyquest-purple hover:bg-ceyquest-purple-dark' : 'text-gray-300 hover:text-white'}
                    >
                      {time}
                    </Button>
                  ))}
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    Queue <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                          </div>
                        </div>
              <Button 
                variant={showMyPlace ? "default" : "outline"}
                size="sm" 
                className={showMyPlace ? "bg-ceyquest-purple hover:bg-ceyquest-purple-dark text-white" : "border-gray-600 text-white hover:bg-gray-700"}
                onClick={() => {
                  setShowMyPlace(!showMyPlace);
                  // Scroll to current user's position in the table
                  const currentUserRow = document.getElementById('current-user-row');
                  if (currentUserRow) {
                    currentUserRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
              >
                {showMyPlace ? 'Hide my place' : 'Show my place'}
              </Button>
            </div>
                        </div>
                      </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Current User Position */}
          {currentStudent && (
            <div className="mb-8">
              <Card className="bg-ceyquest-purple/10 border-ceyquest-purple/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20 border-2 border-ceyquest-purple">
                        {currentStudent.photo ? (
                          <AvatarImage src={currentStudent.photo} alt={currentStudent.name} />
                        ) : (
                          <AvatarFallback className="bg-ceyquest-purple text-white text-2xl font-bold">
                            {currentStudent.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Your Position</h3>
                        <p className="text-gray-300 mb-1">Grade {currentStudent.grade} • {currentStudent.name}</p>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-ceyquest-purple text-white border-0">
                            #{currentStudent.rank}
                          </Badge>
                          <span className="text-ceyquest-purple font-bold">{currentStudent.xpPoints} XP</span>
                          <span className="text-gray-400">Day Streak: {currentStudent.dayStreak || 0}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-ceyquest-purple mb-2">#{currentStudent.rank}</div>
                      <p className="text-gray-400">Your Rank</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Top 3 Players */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sortedLeaderboard.slice(0, 3).map((entry, index) => (
              <Card key={entry.student.id} className="bg-gray-800 border-gray-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16 border-2 border-gray-600">
                      {entry.student.photo ? (
                        <AvatarImage src={entry.student.photo} alt={entry.student.name} />
                      ) : (
                        <AvatarFallback className="bg-gray-700 text-white text-xl font-bold">
                          {entry.student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                        <h3 className="text-xl font-bold">{entry.student.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getRankBadge(entry.position).bgColor} ${getRankBadge(entry.position).color} border-0`}>
                            {getRankBadge(entry.position).name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {getTrophyIcon(entry.position)}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-sm">Lokal stats {entry.lokalStats?.wins || 0} - {entry.lokalStats?.losses || 0}</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-400">Winrate</span>
                        <span className="text-sm font-bold">{entry.winrate || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${entry.winrate || 0}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>
              ))}
          </div>

          {/* Leaderboard Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Global Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Place</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Player name</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">School</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Score</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Winrate</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLeaderboard.map((entry) => (
                      <tr 
                        key={entry.student.id} 
                        id={currentStudent && entry.student.id === currentStudent.id ? 'current-user-row' : undefined}
                        className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                          currentStudent && entry.student.id === currentStudent.id 
                            ? 'bg-ceyquest-purple/10 border-ceyquest-purple/30' 
                            : ''
                        }`}
                      >
                        <td className="py-4 px-4">
                          <span className="text-white font-bold">#{entry.position}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              {entry.student.photo ? (
                                <AvatarImage src={entry.student.photo} alt={entry.student.name} />
                              ) : (
                                <AvatarFallback className="bg-gray-700 text-white">
                                  {entry.student.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <span className="text-white font-medium">{entry.student.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-white">
                            {entry.student.schoolName || entry.student.school || 'CeyQuest Academy'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-ceyquest-purple font-bold">
                            {entry.xpPoints.toLocaleString()} XP
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{entry.winrate || 0}%</span>
                            <div className="w-16 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${entry.winrate || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`${getRankBadge(entry.position).bgColor} ${getRankBadge(entry.position).color} border-0`}>
                            {getRankBadge(entry.position).name}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;