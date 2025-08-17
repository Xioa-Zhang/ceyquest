import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import studentCharacter from '@/assets/student-character.png';
import heroBg from '@/assets/hero_bg.png';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists in localStorage (from onboarding)
    const savedStudent = localStorage.getItem('ceyquest-student');
    
    if (savedStudent) {
      const studentData = JSON.parse(savedStudent);
      
      // Simple validation - in a real app, you'd validate against a backend
      if (studentData.email === formData.email && studentData.password === formData.password) {
        // Store login state
        localStorage.setItem('ceyquest-logged-in', 'true');
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in to CeyQuest.",
        });

        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Account not found",
        description: "No account found with this email. Please sign up first.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create a demo user if none exists
    const demoUser = {
      fullName: 'Demo Student',
      preferredName: 'Demo',
      email: 'demo@ceyquest.com',
      password: 'demo123',
      grade: '8',
      schoolName: 'Demo School',
      subjects: ['Mathematics', 'Science', 'English'],
      primaryLanguage: 'english',
      religion: 'other',
      citizenship: 'sri-lankan',
      country: 'sri-lanka',
      xpPoints: 1250,
      rank: 5,
      completedQuizzes: 12,
      totalQuizzes: 50,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('ceyquest-student', JSON.stringify(demoUser));
    localStorage.setItem('ceyquest-logged-in', 'true');

    toast({
      title: "Demo login successful!",
      description: "Welcome to CeyQuest demo mode.",
    });

    navigate('/dashboard');
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Single unified region containing both image and form */}
        <div className="bg-gradient-to-br from-[#2d1a4a]/80 to-[#4b2067]/80 rounded-3xl shadow-2xl px-8 py-4 relative backdrop-blur-sm">
          
          {/* Content container with image and form side by side */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full">
            {/* Image Section - Left side */}
            <div className="flex flex-col items-center flex-1">
              <img src={studentCharacter} alt="Student Character" className="w-80 h-80 object-contain mb-4" />
              <div className="text-center text-white font-bold text-2xl">
                Welcome Back!
              </div>
              <div className="text-center text-white text-lg font-mono mt-2">
                Continue Your Learning Journey
              </div>
              <div className="text-center text-white/70 text-sm mt-1">
                Sign in to access your personalized learning experience
              </div>
            </div>

            {/* Form Section - Right side */}
            <div className="flex-1 w-full max-w-md">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl text-center text-white">
                  Sign In to CeyQuest
                </CardTitle>
                <div className="text-center text-white/70 text-sm mt-2">
                  Enter your credentials to access your account
                </div>
              </CardHeader>
              
              <CardContent className="px-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email address"
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                        className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                      />
                      <Label htmlFor="rememberMe" className="text-white text-sm">Remember me</Label>
                    </div>
                    <Link 
                      to="/forgot-password" 
                      className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !formData.email || !formData.password}
                    className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-elevated transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-white/50">Or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Loading...
                      </div>
                    ) : (
                      "Try Demo Mode"
                    )}
                  </Button>

                  <div className="text-center text-white/70 text-sm mt-6">
                    Don't have an account?{' '}
                    <Link 
                      to="/onboarding" 
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      Sign up here
                    </Link>
                  </div>
                </form>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
