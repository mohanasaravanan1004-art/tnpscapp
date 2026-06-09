/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { UserProfile, StudentScoreHistory, NotificationItem, Achievement } from "./types";
import { 
  auth, 
  loginWithGoogle, 
  logoutUser, 
  fetchOrCreateUserProfile, 
  updateUserProfile, 
  fetchUserScoreHistory, 
  saveScoreRecord 
} from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Import all sub-modules
import Dashboard from "./components/Dashboard";
import SubjectStudy from "./components/SubjectStudy";
import DailyQuiz from "./components/DailyQuiz";
import MockTest from "./components/MockTest";
import PastPapers from "./components/PastPapers";
import CurrentAffairs from "./components/CurrentAffairs";
import AIStudyPlanner from "./components/AIStudyPlanner";
import AdminPanel from "./components/AdminPanel";

// Lucide icons
import { 
  Trophy, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  MapPin, 
  Award, 
  Menu, 
  X, 
  Bell, 
  Settings, 
  BookMarked, 
  FileText, 
  Sparkles, 
  ShieldAlert, 
  Calendar,
  Flame,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  LayoutDashboard
} from "lucide-react";

// Standard base achievement templates
const BASE_ACHIEVEMENTS: Achievement[] = [
  { id: "ach_1", title: "Syllabus Explorer", description: "Read your first curriculum notes chapter.", icon: "BookOpen", progressMax: 1, progressCurrent: 0 },
  { id: "ach_2", title: "Tamil Scholar Elite", description: "Attain a perfect 100% accuracy paper in Tamil.", icon: "Award", progressMax: 1, progressCurrent: 0 },
  { id: "ach_3", title: "Daily Grindmaster", description: "Hold an active study streak for 5 continuous days.", icon: "Flame", progressMax: 5, progressCurrent: 1 }
];

// Fallback Default User profile
const DEFAULT_PROFILE: UserProfile = {
  id: "user_tnpsc_guest",
  name: "Mohana Lakshmi",
  email: "mohanasaravanan1004@gmail.com",
  role: "student",
  streakCount: 4,
  lastActive: new Date().toISOString(),
  completedTopicsCount: 8,
  bookmarkedChapterKeys: ["gt_1", "hist_3"],
  totalScore: 480, // initial XP
  totalQuizzesTaken: 6,
  accuracyRate: 82, // overall percentage
  weeklyActivity: [2.5, 4.0, 1.5, 3.2, 5.0, 0, 0], // hours spent
  achievements: BASE_ACHIEVEMENTS,
  bookmarkedCurrentAffairs: ["ca_1", "ca_3"]
};

// Default Notifications
const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: "not_1", title: "📅 Mock Exam Alert", message: "TNPSC Group 4 State-mock schedule starts tomorrow.", timestamp: "2 hours ago", unread: true },
  { id: "not_2", title: "✨ Syllabus Node Added", message: "Section VII: 'General Tamil' has been enriched with 2024 terms.", timestamp: "1 day ago", unread: false }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // App states
  const [profile, rawSetProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [scoreHistory, setScoreHistory] = useState<StudentScoreHistory[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Intercept state updates to sync with Firebase automatically
  const setProfile = async (newProfileOrFunction: React.SetStateAction<UserProfile>) => {
    rawSetProfile(prev => {
      let updated: UserProfile;
      if (typeof newProfileOrFunction === "function") {
        updated = (newProfileOrFunction as (prev: UserProfile) => UserProfile)(prev);
      } else {
        updated = newProfileOrFunction;
      }

      // Save locally for persistence fallback
      localStorage.setItem("vetri_user_profile", JSON.stringify(updated));

      // Sync with Firestore
      if (currentUser) {
        updateUserProfile(currentUser.uid, updated).catch(err => {
          console.error("Failed to sync profile update to Firestore:", err);
        });
      }
      return updated;
    });
  };

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthLoading(true);
      if (user) {
        setCurrentUser(user);
        try {
          // Retrieve or initialize Firestore profile
          const fbProfile = await fetchOrCreateUserProfile(user, DEFAULT_PROFILE);
          rawSetProfile(fbProfile);
          localStorage.setItem("vetri_user_profile", JSON.stringify(fbProfile));

          // Retrieve score histories
          const history = await fetchUserScoreHistory(user.uid);
          setScoreHistory(history);
          localStorage.setItem("vetri_score_history", JSON.stringify(history));
        } catch (error) {
          console.error("Failed to load user data from Firebase:", error);
        }
      } else {
        setCurrentUser(null);
        // Fallback to localStorage
        const savedProf = localStorage.getItem("vetri_user_profile");
        if (savedProf) {
          try {
            rawSetProfile(JSON.parse(savedProf));
          } catch {
            rawSetProfile(DEFAULT_PROFILE);
          }
        } else {
          rawSetProfile(DEFAULT_PROFILE);
        }

        const savedScores = localStorage.getItem("vetri_score_history");
        if (savedScores) {
          try {
            setScoreHistory(JSON.parse(savedScores));
          } catch {
            setScoreHistory([]);
          }
        } else {
          setScoreHistory([]);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveScore = async (newScore: StudentScoreHistory) => {
    setScoreHistory(prev => {
      const updated = [newScore, ...prev];
      localStorage.setItem("vetri_score_history", JSON.stringify(updated));
      return updated;
    });

    if (currentUser) {
      try {
        await saveScoreRecord(currentUser.uid, newScore);
      } catch (err) {
        console.error("Failed to save score register to Firestore:", err);
      }
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      alert("Sign-In failed via Popup. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("You have successfully signed out.");
    } catch (err) {
      alert("Sign out failed. Please try again.");
    }
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map(part => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "ST";
  };

  // Level Progression formulation
  // Level upgrades every 500 XP
  const calcLevelAndProgress = (score: number) => {
    const xpPerLevel = 500;
    const currentLevel = Math.max(1, Math.floor(score / xpPerLevel) + 1);
    const xpEarnedInLevel = score % xpPerLevel;
    const progressPercent = Math.min(100, Math.round((xpEarnedInLevel / xpPerLevel) * 100));
    
    let levelTitle = "Syllabus Novice (ஆரம்பநிலை)";
    if (currentLevel >= 8) levelTitle = "Bureaucracy Captain (துணை ஆட்சியர்)";
    else if (currentLevel >= 5) levelTitle = "Commanding V.A.O (அதிகாரி)";
    else if (currentLevel >= 3) levelTitle = "Civil Aspirant (முயற்சியாளர்)";

    return { currentLevel, xpEarnedInLevel, xpNeeded: xpPerLevel, progressPercent, levelTitle };
  };

  const levelInfo = calcLevelAndProgress(profile.totalScore);

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Nav items dictionary
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", badge: "நிலை " + levelInfo.currentLevel, icon: LayoutDashboard },
    { id: "subject", label: "Syllabus Nodes", badge: "7 Subjects", icon: BookOpen },
    { id: "quiz", label: "Self Assessment", badge: "Timer", icon: HelpCircle },
    { id: "mock_test", label: "State Mock Test", badge: "200 Qs", icon: Trophy },
    { id: "pyq", label: "Past Year Papers", badge: "Solved", icon: FileText },
    { id: "current_affairs", label: "Current Affairs", badge: "Welfare", icon: Layers },
    { id: "ai_planner", label: "AI Planner & Tutor", badge: "Gemini", icon: Sparkles },
    { id: "admin", label: "Backoffice Controls", badge: "Admin", icon: Settings }
  ];

  return (
    <div className={`min-h-screen font-sans antialiased text-gray-900 bg-slate-50 flex ${isDarkMode ? "dark bg-zinc-950 text-zinc-100" : ""}`} id="vetri_full_application">

      {/* 1. Large Screen Sidebar */}
      <aside className="hidden lg:flex flex-col w-68 bg-white dark:bg-zinc-900 border-r border-gray-150 dark:border-zinc-850 h-screen sticky top-0 flex-shrink-0">
        
        {/* Brand Header Section */}
        <div className="p-6 border-b border-gray-150 dark:border-zinc-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-600/10">
              V
            </span>
            <div>
              <h1 className="font-black text-base tracking-tight text-indigo-700 dark:text-white leading-none">Vetri TNPSC</h1>
              <p className="text-[10px] text-gray-400 font-bold tracking-wider mt-1 uppercase">Group IV Portal</p>
            </div>
          </div>
        </div>

        {/* Level and active candidate progress indicators */}
        <div className="p-4 mx-4 my-4 bg-slate-50 dark:bg-zinc-950/40 rounded-xl border border-gray-200/50 dark:border-zinc-805 space-y-2 text-xs">
          <div className="flex justify-between font-black">
            <span className="text-gray-400 uppercase text-[9px] tracking-wider">Rank Level {levelInfo.currentLevel}</span>
            <span className="text-indigo-600 dark:text-indigo-400">{profile.totalScore} XP</span>
          </div>
          <div className="w-full bg-gray-150 h-1.5 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${levelInfo.progressPercent}%` }}></div>
          </div>
          <p className="text-[10px] text-gray-500 font-bold leading-tight">{levelInfo.levelTitle}</p>
        </div>

        {/* Sidebar Nav anchors */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/10"
                  : "text-gray-650 hover:bg-slate-50/70 dark:text-zinc-400 dark:hover:bg-zinc-855/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    isActive 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-100 text-gray-400 dark:bg-zinc-800"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Candidate Label & Google Auth */}
        <div className="p-4 border-t border-gray-150 dark:border-zinc-850 space-y-2.5">
          {currentUser ? (
            <div className="space-y-2">
              <div className="text-xs">
                <p className="font-extrabold text-gray-900 dark:text-white leading-tight">{profile.name}</p>
                <p className="text-gray-400 text-[10px] truncate">{profile.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-rose-200/40 dark:border-rose-900/40"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out (வெளியேறு)
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.01-1.19-.64-1.19-2.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Sync with Google
            </button>
          )}
        </div>
      </aside>

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full">
        
        {/* Top Header Panel */}
        <header className="sticky top-0 z-10 bg-white dark:bg-zinc-900 border-b border-gray-155 dark:border-zinc-850 h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400"
              title="Open Navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="hidden lg:inline bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 font-extrabold text-[10px] uppercase tracking-wider py-1 px-3 rounded-md">
              முயற்சி திருவினையாக்கும் (Continual Effort Yields Success)
            </span>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="p-2 rounded-xl text-gray-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Toggle Contrast"
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-slate-700" />}
            </button>

            {/* Notifications Drawer Anchor */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(prev => !prev);
                  if (unreadNotificationsCount > 0) markNotificationsRead();
                }}
                className="p-2 rounded-xl text-gray-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors relative cursor-pointer"
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full animate-bounce"></span>
                )}
              </button>

              {/* Notification Overlay Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-850 rounded-2xl shadow-xl z-20 overflow-hidden text-xs">
                  <div className="p-4 border-b border-gray-150 dark:border-zinc-850 bg-slate-50 dark:bg-zinc-950 font-bold text-gray-800 dark:text-white flex items-center justify-between">
                    <span>Active Notifications</span>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      Close
                    </button>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-4 space-y-1 hover:bg-slate-50">
                        <p className="font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                          {n.title} {n.unread && <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full inline-block"></span>}
                        </p>
                        <p className="text-gray-600 dark:text-zinc-450 leading-relaxed text-[11px] font-sans">{n.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{n.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-gray-200 dark:bg-zinc-805"></div>

            {/* Profile badge */}
            <div className="flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-black text-sm uppercase">
                {getInitials(profile.name)}
              </span>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-black leading-none text-gray-900 dark:text-white">{profile.name}</p>
                <p className="text-[9px] text-emerald-500 font-bold leading-none mt-1">
                  {currentUser ? "● Synchronized" : "● Offline Local"}
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* Viewport content sheets */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-y-auto">
          
          {/* Real-time Authentication Sync Indicator */}
          {!currentUser && !authLoading && (
            <div className="mb-6 p-4 bg-amber-50/70 dark:bg-amber-955/10 border border-amber-200/50 dark:border-amber-900/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 text-left">
                <span className="h-8 w-8 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black text-sm shrink-0">
                  ⚠️
                </span>
                <div>
                  <h4 className="font-extrabold text-amber-850 dark:text-amber-300 leading-none">Guest Mode (விருந்தினர் பயன்முறை)</h4>
                  <p className="text-gray-500 dark:text-zinc-400 mt-1 leading-normal">
                    Sign in with Google to enable automatic real-time persistent synchronization of your study level, scores, and custom current affairs bookmarks.
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-indigo-950 font-black tracking-wider uppercase rounded-xl transition-all shadow-sm shrink-0 cursor-pointer text-[10px]"
              >
                Sync with Google
              </button>
            </div>
          )}

          {currentUser && !authLoading && (
            <div className="mb-6 p-3 bg-emerald-55/40 dark:bg-emerald-955/5 border border-emerald-250/20 dark:border-emerald-900/20 rounded-2xl flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-gray-500 dark:text-zinc-400 leading-none">
                  Cloud synchronized as <strong className="text-gray-800 dark:text-white">{profile.email}</strong>
                </span>
              </div>
              <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Cloud Active</span>
            </div>
          )}

          {authLoading && (
            <div className="mb-6 p-4 bg-slate-50 dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-2xl flex items-center gap-3 text-xs">
              <div className="h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-500 dark:text-zinc-400">Checking cloud synchronicity status...</span>
            </div>
          )}
          {activeTab === "dashboard" && (
            <Dashboard 
              profile={profile} 
              setProfile={setProfile} 
              scoreHistory={scoreHistory}
              onNavigate={setActiveTab}
              onClaimStreakReward={() => {
                setProfile(p => ({
                  ...p,
                  totalScore: p.totalScore + 20,
                  streakCount: p.streakCount + 1
                }));
                alert("Attendance saved! +20 XP awarded.");
              }}
            />
          )}

          {activeTab === "subject" && (
            <SubjectStudy 
              profile={profile} 
              setProfile={setProfile} 
              onNavigateHome={() => setActiveTab("dashboard")}
            />
          )}

          {activeTab === "quiz" && (
            <DailyQuiz 
              profile={profile} 
              setProfile={setProfile} 
              onSaveScore={handleSaveScore}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === "mock_test" && (
            <MockTest 
              profile={profile} 
              setProfile={setProfile} 
              onSaveScore={handleSaveScore}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === "pyq" && (
            <PastPapers />
          )}

          {activeTab === "current_affairs" && (
            <CurrentAffairs 
              profile={profile} 
              setProfile={setProfile} 
            />
          )}

          {activeTab === "ai_planner" && (
            <AIStudyPlanner 
              profile={profile} 
              setProfile={setProfile} 
            />
          )}

          {activeTab === "admin" && (
            <AdminPanel 
              profile={profile} 
              setProfile={setProfile} 
            />
          )}
        </main>
      </div>

      {/* 3. Mobile Navigation sliding drawer dialog modal */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900/60 z-35 flex justify-start backdrop-blur-2xs z-30" id="mobile_navbar_overlay">
          <div className="w-68 bg-white dark:bg-zinc-900 h-full p-6 flex flex-col justify-between shadow-2xl relative animate-drawer-slide-in">
            
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg border border-gray-200 text-gray-400"
              title="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-md">V</span>
                <div>
                  <h2 className="font-extrabold text-sm tracking-tight text-gray-900 dark:text-white leading-none">Vetri TNPSC</h2>
                  <p className="text-[9px] text-gray-405 font-bold uppercase mt-1 leading-none">Civil Portal</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-[10px] text-gray-400 uppercase">Rank Level {levelInfo.currentLevel}</span>
                  <span className="text-indigo-600 font-extrabold">{profile.totalScore} XP</span>
                </div>
                <div className="w-full bg-gray-150 h-1 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-1" style={{ width: `${levelInfo.progressPercent}%` }}></div>
                </div>
              </div>

              {/* Mobile tabs */}
              <nav className="space-y-1">
                {navigationItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-between cursor-pointer ${
                        isActive
                        ? "bg-indigo-600 text-white"
                        : "text-gray-650 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4.5 w-4.5" />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-gray-150 text-xs space-y-2">
              {currentUser ? (
                <div className="space-y-2">
                  <div>
                    <p className="font-black text-gray-900 dark:text-white leading-none mb-1">{profile.name}</p>
                    <p className="text-gray-400 font-bold text-[10px] truncate">{profile.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-rose-200"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Sign Out (வெளியேறு)
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-indigo-600/10"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.01-1.19-.64-1.19-2.63z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Sync with Google
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
