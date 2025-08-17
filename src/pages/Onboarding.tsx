import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import studentCharacter from '@/assets/student-character.png';
import heroBg from '@/assets/hero_bg.png';

interface FormData {
  // Step 1: Basic Profile
  fullName: string;
  preferredName: string;
  dateOfBirth: Date | null;
  age: number | null;
  gender: string;
  profilePicture: string | null;
  
  // Step 2: Academic Details
  grade: string;
  schoolName: string;
  subjects: string[];
  
  // Step 3: Language & Cultural Info
  primaryLanguage: string;
  otherLanguages: string[];
  religion: string;
  citizenship: string;
  country: string;
  
  // Step 4: Learning Preferences
  preferredStudyTime: string;
  studyGoal: string;
  reminders: boolean;
  gamification: boolean;
  
  // Step 5: Account Setup
  email: string;
  phone: string;
  password: string;
  parentConsent: boolean;
  termsAgreement: boolean;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date(2010, 0));
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    preferredName: '',
    dateOfBirth: null,
    age: null,
    gender: '',
    profilePicture: null,
    grade: '',
    schoolName: '',
    subjects: [],
    primaryLanguage: '',
    otherLanguages: [],
    religion: '',
    citizenship: '',
    country: '',
    preferredStudyTime: '',
    studyGoal: '',
    reminders: true,
    gamification: true,
    email: '',
    phone: '',
    password: '',
    parentConsent: false,
    termsAgreement: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { title: 'Basic Profile', description: 'Tell us about yourself' },
    { title: 'Academic Details', description: 'Your learning journey' },
    { title: 'Language & Culture', description: 'Personalize your experience' },
    { title: 'Learning Preferences', description: 'How you like to learn' },
    { title: 'Account Setup', description: 'Secure your account' },
  ];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getSubjectsByGrade = (grade: number) => {
    if (grade >= 6 && grade <= 9) {
      return [
        'English',
        'Religion',
        'Mother Tongue',
        'Second Language',
        'Science',
        'Mathematics',
        'History',
        'Geography',
        'Civic Education',
        'Health and Physical Education',
        'Practical and Technology',
        'Art',
        'Information and Communication Technology (ICT)'
      ];
    } else if (grade >= 10 && grade <= 11) {
      return [
        'English',
        'Religion',
        'Mother Tongue',
        'Science',
        'Mathematics',
        'History',
        'Arabic',
        'Arabic Literature',
        'Sinhala',
        'Tamil Literature',
        'Sinhala Literature',
        'Geography',
        'Commerce',
        'Art',
        'Information and Communication Technology (ICT)',
        'Health & Physical Education',
        'Agricultural Science'
      ];
    }
    return [];
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        dateOfBirth: date,
        age: calculateAge(date)
      }));
    }
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      otherLanguages: prev.otherLanguages.includes(language)
        ? prev.otherLanguages.filter(l => l !== language)
        : [...prev.otherLanguages, language]
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.grade || !formData.email || !formData.password) {
      toast({
        title: "Please fill in required fields",
        description: "Name, Grade, Email, and Password are required to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.termsAgreement) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }

    // Store user data in localStorage
    localStorage.setItem('ceyquest-student', JSON.stringify({
      ...formData,
      xpPoints: 0,
      rank: 0,
      completedQuizzes: 0,
      totalQuizzes: 50,
      createdAt: new Date().toISOString()
    }));

    toast({
      title: "Welcome to CeyQuest!",
      description: "Your profile has been created successfully.",
    });

    navigate('/dashboard');
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Enter your full name"
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="preferredName">Preferred Name / Nickname</Label>
        <Input
          id="preferredName"
          type="text"
          value={formData.preferredName}
          onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
          placeholder="What should we call you?"
          className="mt-1"
        />
      </div>

      <div>
        <Label>Date of Birth *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl border-2 border-transparent bg-black/95 backdrop-blur-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" side="bottom" align="center" sideOffset={20} avoidCollisions={true} collisionPadding={20}>
            <div className="p-3 max-h-[80vh]">
              {/* Year Selector */}
              <div className="mb-3">
                <Label className="text-sm font-medium mb-2 block text-white">Select Year</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentYear = currentMonth.getFullYear();
                      const newYear = Math.max(2009, currentYear - 1);
                      const newMonth = new Date(newYear, currentMonth.getMonth());
                      setCurrentMonth(newMonth);
                      if (formData.dateOfBirth) {
                        const newDate = new Date(newYear, formData.dateOfBirth.getMonth(), formData.dateOfBirth.getDate());
                        setFormData(prev => ({ ...prev, dateOfBirth: newDate, age: calculateAge(newDate) }));
                      }
                    }}
                    disabled={currentMonth.getFullYear() === 2009}
                  >
                    ←
                  </Button>
                  <div className="flex-1 text-center font-medium text-white">
                    {currentMonth.getFullYear()}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentYear = currentMonth.getFullYear();
                      const newYear = Math.min(2015, currentYear + 1);
                      const newMonth = new Date(newYear, currentMonth.getMonth());
                      setCurrentMonth(newMonth);
                      if (formData.dateOfBirth) {
                        const newDate = new Date(newYear, formData.dateOfBirth.getMonth(), formData.dateOfBirth.getDate());
                        setFormData(prev => ({ ...prev, dateOfBirth: newDate, age: calculateAge(newDate) }));
                      }
                    }}
                    disabled={currentMonth.getFullYear() === 2015}
                  >
                    →
                  </Button>
                </div>
                <div className="text-xs text-white/70 mt-1 text-center">
                  Available years: 2009-2015 (Grades 6-11)
                </div>
              </div>
              
              <Calendar
                mode="single"
                selected={formData.dateOfBirth || undefined}
                onSelect={handleDateSelect}
                initialFocus
                className="rounded-md border"
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-3",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium text-white",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-white/70 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-1",
                  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md text-white",
                  day_range_end: "day-range-end",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside: "day-outside text-white/50 aria-selected:bg-accent/50 aria-selected:text-white/70 aria-selected:opacity-30",
                  day_disabled: "text-white/30",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                  vhidden: "hidden",
                }}
                components={{
                  CaptionLabel: ({ displayMonth }) => (
                    <span className="text-white">{displayMonth.toLocaleDateString('en-US', { month: 'long' })}</span>
                  ),
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label>Age</Label>
        <Input
          value={formData.age || ''}
          disabled
          className="mt-1"
          placeholder="Will be calculated from date of birth"
        />
      </div>

      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Profile Picture</Label>
        <div className="mt-1 flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Photo
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          {formData.profilePicture && (
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="grade">Current Grade *</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, grade: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your grade" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 6 }, (_, i) => i + 6).map((grade) => (
              <SelectItem key={grade} value={grade.toString()}>
                Grade {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="schoolName">School Name *</Label>
        <Input
          id="schoolName"
          type="text"
          value={formData.schoolName}
          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
          placeholder="Enter your school name"
          className="mt-1"
          required
        />
      </div>

      <div>
        <Label>Subjects I Choose</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {getSubjectsByGrade(parseInt(formData.grade)).map((subject) => (
            <Badge
              key={subject}
              variant={formData.subjects.includes(subject) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleSubjectToggle(subject)}
            >
              {subject}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="primaryLanguage">Primary Language *</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, primaryLanguage: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select primary language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tamil">Tamil</SelectItem>
            <SelectItem value="sinhala">Sinhala</SelectItem>
            <SelectItem value="english">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Other Languages</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Tamil', 'Sinhala', 'English', 'Arabic', 'French', 'German'].map((language) => (
            <Badge
              key={language}
              variant={formData.otherLanguages.includes(language) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleLanguageToggle(language)}
            >
              {language}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="religion">Religion *</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, religion: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select religion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="islam">Islam</SelectItem>
            <SelectItem value="buddhism">Buddhism</SelectItem>
            <SelectItem value="hinduism">Hinduism</SelectItem>
            <SelectItem value="christianity">Christianity</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="citizenship">Citizenship *</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, citizenship: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select citizenship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sri-lankan">Sri Lankan</SelectItem>
            <SelectItem value="dual">Dual</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="country">Country/Region *</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, country: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your country/region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sri-lanka">🇱🇰 Sri Lanka</SelectItem>
            <SelectItem value="india">🇮🇳 India</SelectItem>
            <SelectItem value="pakistan">🇵🇰 Pakistan</SelectItem>
            <SelectItem value="bangladesh">🇧🇩 Bangladesh</SelectItem>
            <SelectItem value="malaysia">🇲🇾 Malaysia</SelectItem>
            <SelectItem value="singapore">🇸🇬 Singapore</SelectItem>
            <SelectItem value="australia">🇦🇺 Australia</SelectItem>
            <SelectItem value="united-kingdom">🇬🇧 United Kingdom</SelectItem>
            <SelectItem value="united-states">🇺🇸 United States</SelectItem>
            <SelectItem value="canada">🇨🇦 Canada</SelectItem>
            <SelectItem value="germany">🇩🇪 Germany</SelectItem>
            <SelectItem value="france">🇫🇷 France</SelectItem>
            <SelectItem value="other">🌍 Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="preferredStudyTime">Preferred Study Time</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, preferredStudyTime: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="When do you prefer to study?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="afternoon">Afternoon</SelectItem>
            <SelectItem value="night">Night</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="studyGoal">Study Goal</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, studyGoal: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="What's your main goal?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exam-prep">Exam Prep</SelectItem>
            <SelectItem value="improve-grades">Improve Grades</SelectItem>
            <SelectItem value="learn-fast">Learn Fast</SelectItem>
            <SelectItem value="compete">Compete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="reminders"
          checked={formData.reminders}
          onCheckedChange={(checked) => setFormData({ ...formData, reminders: checked as boolean })}
        />
        <Label htmlFor="reminders">Do you want reminders?</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="gamification"
          checked={formData.gamification}
          onCheckedChange={(checked) => setFormData({ ...formData, gamification: checked as boolean })}
        />
        <Label htmlFor="gamification">Enable Gamification (XP, streaks, leaderboard)</Label>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email address"
          className="mt-1"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
          className="mt-1"
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Create Password *</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Create a strong password"
          className="mt-1"
          required
        />
      </div>

      {formData.age && formData.age < 13 && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="parentConsent"
            checked={formData.parentConsent}
            onCheckedChange={(checked) => setFormData({ ...formData, parentConsent: checked as boolean })}
          />
          <Label htmlFor="parentConsent">Parent/Guardian Consent (Required for users under 13)</Label>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="termsAgreement"
          checked={formData.termsAgreement}
          onCheckedChange={(checked) => setFormData({ ...formData, termsAgreement: checked as boolean })}
          required
        />
        <Label htmlFor="termsAgreement">I agree to the Terms & Conditions *</Label>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.fullName && formData.dateOfBirth;
      case 2: return formData.grade && formData.schoolName;
      case 3: return formData.primaryLanguage && formData.religion && formData.citizenship && formData.country;
      case 4: return true; // All fields are optional
      case 5: return formData.email && formData.password && formData.phone && formData.termsAgreement;
      default: return false;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Single unified region containing both image and form */}
        <div className={`bg-gradient-to-br from-[#2d1a4a]/80 to-[#4b2067]/80 rounded-3xl shadow-2xl px-8 relative backdrop-blur-sm ${
          currentStep === 1 ? 'py-0' : 'py-4'
        }`}>
          
          {/* Content container with image and form side by side */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full">
            {/* Image Section - Left side */}
            <div className="flex flex-col items-center flex-1">
              <img src={studentCharacter} alt="Student Character" className="w-80 h-80 object-contain mb-4" />
              <div className="text-center text-white font-bold text-2xl">
                Step {currentStep} of 5
              </div>
              <div className="text-center text-white text-lg font-mono mt-2">
                {steps[currentStep - 1].title}
              </div>
              <div className="text-center text-white/70 text-sm mt-1">
                {steps[currentStep - 1].description}
              </div>
            </div>

            {/* Form Section - Right side */}
            <div className="flex-1 w-full max-w-md">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl text-center text-white">
                  {steps[currentStep - 1].title}
                </CardTitle>
                <div className="flex justify-center space-x-2 mt-4">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
                        index + 1 === currentStep 
                          ? 'w-12 bg-white shadow-lg shadow-white/50 scale-110' 
                          : 'w-6 bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {renderCurrentStep()}
                  
                  <div className="flex justify-between pt-4">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                    )}
                    
                    {currentStep < 5 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        className="flex items-center gap-2 ml-auto"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <Button
                          type="submit"
                          disabled={!isStepValid()}
                          className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-elevated transition-all"
                        >
                          Complete Registration
                        </Button>
                        <div className="text-center text-white/70 text-sm">
                          Already have an account?{' '}
                          <Link 
                            to="/login" 
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                          >
                            Sign in here
                          </Link>
                        </div>
                      </div>
                    )}
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

export default Onboarding;