import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Star, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Award,
  Flame,
  Heart,
  Coins,
  Zap,
  Shield,
  User,
  Plus,
  Edit,
  Search,
  ArrowRight,
  Infinity,
  Brain,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Student } from '@/types';
import { cn } from '@/lib/utils';

const Profile = () => {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const savedStudent = localStorage.getItem('ceyquest-student');
    if (savedStudent) {
      const studentData = JSON.parse(savedStudent);
      setStudent({
        ...studentData,
        id: '1',
        xpPoints: studentData.xpPoints || 1250,
        rank: studentData.rank || 15,
        completedQuizzes: studentData.completedQuizzes || 12,
        totalQuizzes: studentData.totalQuizzes || 50,
        photo: studentData.profilePicture || studentData.photo || '',
        grade: studentData.grade || 7,
        name: studentData.name || 'Anoof MA',
        username: studentData.username || 'AnoofMA',
      });
    }
  }, []);

  if (!student) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </Layout>
    );
  }

  // Mock data for gamification features
  const userStats = {
    nationality: '🇱🇰',
    streak: 7,
    hearts: 5,
    coins: 1250,
    maxHearts: 5,
    totalXP: 1250,
    currentLeague: 'Bronze',
    top3Finishes: 2
  };

  return (
    <Layout>
      <div className="flex gap-6 p-6">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Profile Header */}
          <div className="bg-[#18141f]/80 rounded-2xl p-6">
            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {student.photo ? (
                    <img src={student.photo} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-gray-500" />
                  )}
                </div>

              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-1">{student.name}</h1>
                <p className="text-gray-400 text-sm mb-2">@{student.username}</p>
                <p className="text-gray-400 text-sm mb-4">Joined July 2025</p>
                
                {/* Follow Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">0</span>
                    <span className="text-gray-400 text-sm">Following</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">0</span>
                    <span className="text-gray-400 text-sm">Followers</span>
                  </div>
                  <span className="text-lg">{userStats.nationality}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-[#18141f]/80 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-[#232136] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Flame className="h-6 w-6 text-orange-400" />
                    <div>
                      <p className="text-white font-medium">{userStats.streak} Day streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#232136] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">{userStats.totalXP} Total XP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#232136] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">{userStats.currentLeague} Current league</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#232136] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-6 w-6 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">{userStats.top3Finishes} Top 3 finishes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-[#18141f]/80 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Achievements</h2>
              <button className="text-[#a259ff] text-sm font-medium">VIEW ALL</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Wildfire Achievement */}
              <Card className="bg-[#232136] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center">
                      <Flame className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Wildfire</p>
                      <p className="text-gray-400 text-xs">LEVEL 1</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">Reach a 3 day streak</p>
                  <div className="space-y-1">
                    <Progress value={33} className="h-2" />
                    <p className="text-gray-400 text-xs">1/3</p>
                  </div>
                </CardContent>
              </Card>

              {/* Sage Achievement */}
              <Card className="bg-[#232136] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Sage</p>
                      <p className="text-gray-400 text-xs">LEVEL 1</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">Earn 100 XP</p>
                  <div className="space-y-1">
                    <Progress value={20} className="h-2" />
                    <p className="text-gray-400 text-xs">20/100</p>
                  </div>
                </CardContent>
              </Card>

              {/* Scholar Achievement */}
              <Card className="bg-[#232136] border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Scholar</p>
                      <p className="text-gray-400 text-xs">LEVEL 1</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">Learn 50 new words in a single course</p>
                  <div className="space-y-1">
                    <Progress value={0} className="h-2" />
                    <p className="text-gray-400 text-xs">0/50</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          {/* Hearts Section */}
          <div className="bg-[#18141f]/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Hearts</h3>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: userStats.maxHearts }, (_, i) => (
                <Heart 
                  key={i} 
                  className={cn(
                    "h-8 w-8",
                    i < userStats.hearts ? "text-red-400 fill-red-400" : "text-gray-400"
                  )} 
                />
              ))}
            </div>
            <p className="text-gray-300 text-sm mb-4">You have full hearts</p>
            <p className="text-gray-300 text-sm mb-4">Keep on learning</p>
            
            <div className="space-y-3">
              <Button className="w-full bg-[#a259ff] hover:bg-[#8a4fff] text-white">
                <Infinity className="h-4 w-4 mr-2" />
                UNLIMITED HEARTS
              </Button>
              <div className="flex items-center justify-between">
                <span className="text-[#a259ff] text-sm font-medium">FREE TRIAL</span>
              </div>
              
              <Button variant="outline" className="w-full">
                REFILL HEARTS
              </Button>
              <Button variant="outline" className="w-full">
                PRACTICE TO EARN HEARTS
              </Button>
            </div>
          </div>

          {/* Add Friends Section */}
          <div className="bg-[#18141f]/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Add friends</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-[#232136] hover:bg-[#2d1a4a] transition-colors">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-gray-400" />
                  <span className="text-white">Find friends</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-[#232136] hover:bg-[#2d1a4a] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <span className="text-white">Invite friends</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* CeyQuest Pages Footer */}
          <div className="bg-[#18141f]/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">CeyQuest Pages</h3>
            <div className="space-y-2">
              <Link to="/learn" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#232136] transition-colors">
                <BookOpen className="h-4 w-4 text-[#a259ff]" />
                <span className="text-white text-sm">Learn</span>
              </Link>
              <Link to="/ceynovx" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#232136] transition-colors">
                <Brain className="h-4 w-4 text-purple-400" />
                <span className="text-white text-sm">CeynovX</span>
              </Link>
              <Link to="/leaderboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#232136] transition-colors">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-white text-sm">Leaderboard</span>
              </Link>
              <Link to="/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#232136] transition-colors">
                <Settings className="h-4 w-4 text-gray-400" />
                <span className="text-white text-sm">Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;