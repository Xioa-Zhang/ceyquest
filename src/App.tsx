import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import CeynovX from "./pages/CeynovX";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import TextbookManager from "./pages/TextbookManager";

// HTML Page Components
const HomePage = () => {
  window.location.href = '/index.html';
  return null;
};

const About = () => {
  window.location.href = '/pages/about.html';
  return null;
};

const Contact = () => {
  window.location.href = '/pages/contact.html';
  return null;
};

const Faq = () => {
  window.location.href = '/pages/faq.html';
  return null;
};

const PrivacyPolicy = () => {
  window.location.href = '/pages/privacy-policy.html';
  return null;
};

const TermsConditions = () => {
  window.location.href = '/pages/terms-conditions.html';
  return null;
};

const Team = () => {
  window.location.href = '/pages/team.html';
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SidebarProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/ceynovx" element={<CeynovX />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/subjects" element={<Learn />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/textbooks" element={<TextbookManager />} />
            
            {/* HTML Page Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/team" element={<Team />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SidebarProvider>
  </QueryClientProvider>
);

export default App;
