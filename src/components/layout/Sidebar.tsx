import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Brain, 
  BookOpen,
  Settings,
  User,
  Bell,
  Flame,
  Heart,
  Coins,
  RefreshCw,
  X,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import ceyquestLogo from '@/assets/ceyquest-logo.png';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('mathematics');
  const [grade, setGrade] = useState(6);

  const navItems = [
    { href: '/learn', label: 'Learn', icon: BookOpen },
    { href: '/ceynovx', label: 'CeynovX', icon: Brain },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/textbooks', label: 'Textbooks', icon: FileText },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  // Get available subjects from student's onboarding data, fallback to default subjects if not available
  const availableSubjects = student?.subjects?.length > 0 
    ? student.subjects 
    : ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Civic Education'];
  
  console.log('Grade:', grade);
  console.log('Available subjects:', availableSubjects);

  // Mock data for gamification features
  const userStats = {
    nationality: '🇱🇰',
    streak: 7,
    hearts: 5,
    coins: 1250,
    maxHearts: 5
  };

  useEffect(() => {
    const savedStudent = localStorage.getItem('ceyquest-student');
    if (savedStudent) {
      const studentData = JSON.parse(savedStudent);
      setStudent(studentData);
      setGrade(parseInt(studentData.grade) || 6);
    }
  }, []);

  const handleSubjectChange = (subject: string) => {
    console.log('Subject selected:', subject);
    console.log('Available subjects:', availableSubjects);
    console.log('Current subject:', currentSubject);
    
    // Convert onboarding subject name to textbook subject code
    const subjectCode = convertOnboardingSubjectToCode(subject);
    
    console.log('Subject code found:', subjectCode);
    console.log('Navigating to:', `/learn?subject=${encodeURIComponent(subjectCode)}`);
    
    setCurrentSubject(subjectCode);
    setShowSubjectModal(false);
    navigate(`/learn?subject=${encodeURIComponent(subjectCode)}`);
  };

  // Convert onboarding subject names to textbook subject codes
  const convertOnboardingSubjectToCode = (onboardingSubject: string): string => {
    const subjectMapping: { [key: string]: string } = {
      'English': 'english',
      'Mathematics': 'mathematics',
      'Science': 'science',
      'History': 'history',
      'Geography': 'geography',
      'Civic Education': 'civic-education',
      'Health and Physical Education': 'health-physical-education',
      'Information and Communication Technology (ICT)': 'ict',
      'Religion': 'religion',
      'Mother Tongue': 'mother-tongue',
      'Second Language': 'second-language',
      'Practical and Technology': 'practical-technology',
      'Art': 'art',
      'Arabic': 'arabic',
      'Arabic Literature': 'arabic-literature',
      'Sinhala': 'sinhala',
      'Tamil Literature': 'tamil-literature',
      'Sinhala Literature': 'sinhala-literature',
      'Commerce': 'commerce',
      'Agricultural Science': 'agricultural-science'
    };
    
    return subjectMapping[onboardingSubject] || 'mathematics';
  };

  // Convert textbook subject code back to onboarding subject name
  const convertCodeToOnboardingSubject = (subjectCode: string): string => {
    const reverseMapping: { [key: string]: string } = {
      'english': 'English',
      'mathematics': 'Mathematics',
      'science': 'Science',
      'history': 'History',
      'geography': 'Geography',
      'civic-education': 'Civic Education',
      'health-physical-education': 'Health and Physical Education',
      'ict': 'Information and Communication Technology (ICT)',
      'religion': 'Religion',
      'mother-tongue': 'Mother Tongue',
      'second-language': 'Second Language',
      'practical-technology': 'Practical and Technology',
      'art': 'Art',
      'arabic': 'Arabic',
      'arabic-literature': 'Arabic Literature',
      'sinhala': 'Sinhala',
      'tamil-literature': 'Tamil Literature',
      'sinhala-literature': 'Sinhala Literature',
      'commerce': 'Commerce',
      'agricultural-science': 'Agricultural Science'
    };
    
    return reverseMapping[subjectCode] || 'Mathematics';
  };

  return (
    <>
      {/* Subject Selection Modal - Outside sidebar container */}
      {showSubjectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="bg-[#2d1a4a] rounded-lg p-6 w-96 max-w-[90vw] border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Select Subject</h3>
              <button 
                onClick={() => setShowSubjectModal(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => handleSubjectChange(subject)}
                                     className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                     subject === convertCodeToOnboardingSubject(currentSubject)
                       ? 'bg-purple-600/20 border border-purple-500/50 text-white'
                       : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                   }`}
                 >
                   <div className="flex items-center justify-between">
                     <span className="font-medium">{subject}</span>
                     {subject === convertCodeToOnboardingSubject(currentSubject) && (
                       <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                     )}
                   </div>
                </button>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setShowSubjectModal(false)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#2d1a4a]/95 to-[#18141f]/95 backdrop-blur-md shadow-2xl z-50">
        {/* Header */}
        <div className="flex items-center justify-start p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={ceyquestLogo} alt="CeyQuest Logo" className="h-8 w-auto" />
          </div>
        </div>

        {/* Certificate Progress Card */}
        <div className="p-4 border-b border-white/10">
          {/* Header with title and refresh icon - Outside the box as buttons */}
          <div className="flex items-center justify-between mb-3">
                             <Link to={`/learn?subject=${encodeURIComponent(currentSubject)}`}>
               <button className="text-white font-medium text-sm hover:text-purple-300 transition-colors duration-200">
                 {convertCodeToOnboardingSubject(currentSubject)}
               </button>
             </Link>
            <button 
              className="h-4 w-4 text-white/70 hover:text-purple-300 transition-colors duration-200"
              onClick={() => {
                console.log('Opening subject modal');
                setShowSubjectModal(true);
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-[#2d1a4a]/50 rounded-lg p-4 border border-white/10">
            {/* Certificate Badge and Details */}
            <div className="flex items-start gap-3 mb-3">
              {/* Gold Badge */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center border-2 border-purple-500 shadow-lg">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
                {/* Three stars at bottom */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Certificate Details */}
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Current Progress</p>
                
                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="w-full bg-[#1a0f2e] rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-white/70 text-xs">0% Complete</span>
                    <span className="text-white/70 text-xs">0/20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section - Clickable Dashboard Link */}
        <Link to="/profile" className="block">
          <div className="p-4 border-b border-white/10 hover:bg-white/5 transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
               {student && (student.profilePicture || student.photo) ? (
                 <img src={student.profilePicture || student.photo} alt="Profile" className="w-full h-full rounded-full object-cover" />
               ) : (
                 <User className="h-5 w-5 text-gray-500" />
               )}
             </div>
            <div className="flex-1">
                                 <p className="text-white font-medium text-sm">{student?.fullName || student?.name || 'Student'}</p>
              <p className="text-white/60 text-xs">Grade {student?.grade || '7'}</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-gradient-to-r from-[#a259ff] to-[#6a1b9a] text-white shadow-lg" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-all duration-200",
                    isActive ? "text-white" : "text-white/70 group-hover:text-white"
                  )} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
            <Bell className="h-4 w-4 text-black" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Notifications</p>
            <p className="text-white/60 text-xs">3 new</p>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default Sidebar; 