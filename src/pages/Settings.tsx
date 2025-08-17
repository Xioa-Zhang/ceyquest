import { useEffect, useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Palette, 
  Shield, 
  HelpCircle,
  LogOut,
  Edit,
  Save
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Student } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Profile
    fullName: '',
    preferredName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    profilePicture: '',
    
    // Academic Details
    grade: '',
    schoolName: '',
    subjects: [] as string[],
    
    // Language & Cultural Info
    primaryLanguage: '',
    otherLanguages: [] as string[],
    religion: '',
    citizenship: '',
    country: '',
    
    // Learning Preferences
    preferredStudyTime: '',
    studyGoal: '',
    reminders: true,
    gamification: true,
    
    // Account Setup
    email: '',
    phone: '',
    password: '',
    parentConsent: false,
    termsAgreement: false
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    darkMode: true,
    studyReminders: true,
    emailUpdates: false,
    gamification: true
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const savedStudent = localStorage.getItem('ceyquest-student');
    if (savedStudent) {
      const studentData = JSON.parse(savedStudent);
      setCurrentStudent(studentData);
      setFormData({
        // Basic Profile
        fullName: studentData.fullName || studentData.name || '',
        preferredName: studentData.preferredName || '',
        dateOfBirth: studentData.dateOfBirth ? new Date(studentData.dateOfBirth).toISOString().split('T')[0] : '',
        age: studentData.age || '',
        gender: studentData.gender || '',
        profilePicture: studentData.profilePicture || studentData.photo || '',
        
        // Academic Details
        grade: studentData.grade || '',
        schoolName: studentData.schoolName || studentData.school || '',
        subjects: studentData.subjects || [],
        
        // Language & Cultural Info
        primaryLanguage: studentData.primaryLanguage || '',
        otherLanguages: studentData.otherLanguages || [],
        religion: studentData.religion || '',
        citizenship: studentData.citizenship || '',
        country: studentData.country || '',
        
        // Learning Preferences
        preferredStudyTime: studentData.preferredStudyTime || '',
        studyGoal: studentData.studyGoal || '',
        reminders: studentData.reminders !== undefined ? studentData.reminders : true,
        gamification: studentData.gamification !== undefined ? studentData.gamification : true,
        
        // Account Setup
        email: studentData.email || '',
        phone: studentData.phone || '',
        password: studentData.password || '',
        parentConsent: studentData.parentConsent || false,
        termsAgreement: studentData.termsAgreement || false
      });
      setPhotoPreview(studentData.profilePicture || studentData.photo || null);
    }

    // Load settings from localStorage and student data
    const savedSettings = localStorage.getItem('ceyquest-settings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings({
        ...parsedSettings,
        gamification: studentData.gamification !== undefined ? studentData.gamification : parsedSettings.gamification || true
      });
    }
  }, []);

  // Upgrade dark mode: toggle on <html>, persist in localStorage, apply on load
  useEffect(() => {
    const html = document.documentElement;
    if (settings.darkMode) {
      html.classList.add('dark');
      localStorage.setItem('ceyquest-theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('ceyquest-theme', 'light');
    }
  }, [settings.darkMode]);

  // On mount, apply theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem('ceyquest-theme');
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData((prev) => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!formData.fullName || !formData.grade) {
      toast({
        title: "Error",
        description: "Full Name and Grade are required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedStudent = {
      ...currentStudent,
      ...formData,
      grade: parseInt(formData.grade),
      // Ensure backward compatibility
      name: formData.fullName,
      photo: formData.profilePicture,
      school: formData.schoolName
    };

    localStorage.setItem('ceyquest-student', JSON.stringify(updatedStudent));
    setCurrentStudent(updatedStudent);
    setIsEditing(false);

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleSettingChange = (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('ceyquest-settings', JSON.stringify(newSettings));

    toast({
      title: "Settings Updated",
      description: `${key} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('ceyquest-student');
    localStorage.removeItem('ceyquest-settings');
    window.location.href = '/onboarding';
  };

  if (!currentStudent) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile and app preferences
          </p>
        </div>

        {/* Profile Section */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 rounded-full bg-muted overflow-hidden flex items-center justify-center border-2 border-primary">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground">No Image</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={!isEditing}>
                  Upload Profile Image
                </Button>
              </div>
              <div className="flex-1 space-y-6">
                {/* Basic Profile Section */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Basic Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredName">Preferred Name</Label>
                      <Input
                        id="preferredName"
                        value={formData.preferredName}
                        onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={formData.gender} 
                        onValueChange={(value) => setFormData({ ...formData, gender: value })}
                        disabled={!isEditing}
                      >
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
                  </div>
                </div>

                {/* Academic Details Section */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Academic Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="grade">Grade *</Label>
                      <Select 
                        value={formData.grade} 
                        onValueChange={(value) => setFormData({ ...formData, grade: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 8 }, (_, i) => i + 6).map((grade) => (
                            <SelectItem key={grade} value={grade.toString()}>
                              Grade {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input
                        id="schoolName"
                        value={formData.schoolName}
                        onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Selected Subjects</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {subject}
                          </Badge>
                        ))}
                        {formData.subjects.length === 0 && (
                          <span className="text-muted-foreground text-sm">No subjects selected</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Language & Cultural Info Section */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Language & Cultural Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryLanguage">Primary Language</Label>
                      <Select 
                        value={formData.primaryLanguage} 
                        onValueChange={(value) => setFormData({ ...formData, primaryLanguage: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select primary language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="sinhala">Sinhala</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                          <SelectItem value="arabic">Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="religion">Religion</Label>
                      <Select 
                        value={formData.religion} 
                        onValueChange={(value) => setFormData({ ...formData, religion: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select religion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buddhism">Buddhism</SelectItem>
                          <SelectItem value="islam">Islam</SelectItem>
                          <SelectItem value="christianity">Christianity</SelectItem>
                          <SelectItem value="hinduism">Hinduism</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="citizenship">Citizenship</Label>
                      <Input
                        id="citizenship"
                        value={formData.citizenship}
                        onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Other Languages</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.otherLanguages.map((language, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {language}
                          </Badge>
                        ))}
                        {formData.otherLanguages.length === 0 && (
                          <span className="text-muted-foreground text-sm">No additional languages</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Preferences Section */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Learning Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredStudyTime">Preferred Study Time</Label>
                      <Select 
                        value={formData.preferredStudyTime} 
                        onValueChange={(value) => setFormData({ ...formData, preferredStudyTime: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select preferred study time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                          <SelectItem value="evening">Evening (6 PM - 12 AM)</SelectItem>
                          <SelectItem value="night">Night (12 AM - 6 AM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="studyGoal">Study Goal</Label>
                      <Select 
                        value={formData.studyGoal} 
                        onValueChange={(value) => setFormData({ ...formData, studyGoal: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select study goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="improve-grades">Improve Grades</SelectItem>
                          <SelectItem value="prepare-exams">Prepare for Exams</SelectItem>
                          <SelectItem value="learn-new-skills">Learn New Skills</SelectItem>
                          <SelectItem value="maintain-performance">Maintain Performance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Account Setup Section */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={!isEditing}
                        placeholder="••••••••"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {!isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Badge variant="secondary">Grade {currentStudent.grade}</Badge>
                    <Badge variant="outline">{currentStudent.xpPoints} XP</Badge>
                    <Badge variant="outline">Rank #{currentStudent.rank}</Badge>
                    <Badge variant="outline">{formData.subjects.length} Subjects</Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notifications */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about quizzes and achievements</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="study-reminders">Study Reminders</Label>
                    <p className="text-sm text-muted-foreground">Daily reminders to keep your learning streak</p>
                  </div>
                  <Switch
                    id="study-reminders"
                    checked={settings.studyReminders}
                    onCheckedChange={(checked) => handleSettingChange('studyReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-updates">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly progress reports via email</p>
                  </div>
                  <Switch
                    id="email-updates"
                    checked={settings.emailUpdates}
                    onCheckedChange={(checked) => handleSettingChange('emailUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="gamification">Gamification Features</Label>
                    <p className="text-sm text-muted-foreground">Enable points, badges, and leaderboards</p>
                  </div>
                  <Switch
                    id="gamification"
                    checked={settings.gamification}
                    onCheckedChange={(checked) => handleSettingChange('gamification', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark theme for better night studying</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support & Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help Center
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Terms of Service
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>App Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p><strong>Version:</strong> 1.0.0</p>
                <p><strong>Build:</strong> 2025.07.23</p>
                <p><strong>Platform:</strong> Web</p>
              </div>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;