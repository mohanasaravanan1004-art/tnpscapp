/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserProfile, StudentScoreHistory } from "../types";
import { 
  Trophy, 
  Calendar, 
  BookCheck, 
  Percent, 
  Clock, 
  Flame, 
  TrendingUp, 
  ArrowRight, 
  Award,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Compass
} from "lucide-react";

interface DashboardProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  scoreHistory: StudentScoreHistory[];
  onNavigate: (tab: string) => void;
  onClaimStreakReward: () => void;
}

export default function Dashboard({ 
  profile, 
  setProfile, 
  scoreHistory, 
  onNavigate,
  onClaimStreakReward
}: DashboardProps) {
  const [newGoal, setNewGoal] = useState("");
  const [goals, setGoals] = useState([
    { id: "g1", text: "Complete Tamil Grammar (இலக்கணம்) Class 6th notes", done: true },
    { id: "g2", text: "Solve 10 Aptitude Percentage questions", done: false },
    { id: "g3", text: "Read Keeladi Excavations Current Affairs", done: false },
    { id: "g4", text: "Revise Indus Valley Civilization key sheet", done: true }
  ]);

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
    // Reward points for ticking off goals
    const targetGoal = goals.find(g => g.id === id);
    if (targetGoal && !targetGoal.done) {
      setProfile(p => ({
        ...p,
        totalScore: p.totalScore + 10,
        completedTopicsCount: p.completedTopicsCount + 1
      }));
    }
  };

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setGoals(prev => [...prev, { id: `g_${Date.now()}`, text: newGoal, done: false }]);
    setNewGoal("");
  };

  // Percentage completion of daily goals
  const goalsCompletedCount = goals.filter(g => g.done).length;
  const goalsProgressPercent = goals.length > 0 ? Math.round((goalsCompletedCount / goals.length) * 100) : 0;

  // Thirukkural of the day
  const dailyKural = {
    number: 391,
    kural: "கற்க கசடறக் கற்பவை கற்றபின்\nநிற்க அதற்குத் தக.",
    transliteration: "Karka Kasadara Karpavai Katrapin\nNirka Adharkuth Thaga.",
    meaning: "Learn flawlessly what is to be learned, and having learned, let your conduct be worthy of your learning."
  };

  return (
    <div className="space-y-6" id="student_dashboard_view">
      {/* Welcome Hero Panel */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 h-48 w-48 bg-amber-400 opacity-10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
        <div className="absolute -bottom-10 left-10 h-32 w-32 bg-indigo-500 opacity-20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="h-3.5 w-3.5" /> TNPSC Group 4 Prep Goal State
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              வணக்கம், {profile.name}!
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base max-w-xl">
              Double your preparation efforts. Complete your daily targets and claim coins to climb the Vetri District-Wide Leaderboard!
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 self-start md:self-center">
            <div className="h-12 w-12 rounded-full bg-amber-400 text-indigo-950 flex items-center justify-center font-extrabold text-xl shadow-lg shadow-amber-400/20">
              🪙
            </div>
            <div>
              <p className="text-xs text-indigo-200 font-medium">Vetri Score Coins</p>
              <p className="text-2xl font-bold text-amber-300">{profile.totalScore} XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="stats_overview_grid">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <BookCheck className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium truncate">Completed Topics</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1">{profile.completedTopicsCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
            <Percent className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium truncate">Avg. Score Accuracy</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1">{profile.accuracyRate}%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400">
            <Flame className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium truncate">Study Streak</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1">{profile.streakCount} Days</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
            <Trophy className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium truncate">Practice Quizzes</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1">{scoreHistory.length}</p>
          </div>
        </div>
      </div>

      {/* Main Section Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Goals, Streaks, Kural */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Daily Study Goals and Progress Panel */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daily Learning Agenda</h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400">Achieve daily goals to receive accuracy points</p>
              </div>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full">
                {goalsProgressPercent}% Finished
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2.5 mb-6 overflow-hidden">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${goalsProgressPercent}%` }}
              ></div>
            </div>

            {/* Goals List */}
            <div className="space-y-3">
              {goals.map((g) => (
                <div 
                  key={g.id} 
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    g.done 
                    ? "bg-slate-50/50 dark:bg-zinc-800/40 border-slate-100 dark:border-zinc-800 line-through text-gray-400 dark:text-zinc-500" 
                    : "bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-850 hover:bg-slate-50 dark:hover:bg-zinc-850/30 text-gray-700 dark:text-zinc-300"
                  }`}
                  onClick={() => toggleGoal(g.id)}
                >
                  <button 
                    type="button" 
                    className={`h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                      g.done 
                      ? "bg-indigo-600 border-indigo-600 text-white" 
                      : "border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950"
                    }`}
                  >
                    {g.done && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                  <span className="text-sm font-medium leading-tight">{g.text}</span>
                </div>
              ))}
            </div>

            {/* Add Target Form */}
            <form onSubmit={addGoal} className="mt-4 flex gap-2">
              <input 
                type="text" 
                placeholder="New custom target (e.g. read Indian Polity fundamental duties)..." 
                value={newGoal}
                onChange={e => setNewGoal(e.target.value)}
                className="flex-1 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/20 text-gray-800 dark:text-white"
              />
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-colors"
              >
                Add Path
              </button>
            </form>
          </div>

          {/* Performance Analytics Vector Graphic Chart */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revision & Accuracy Chart</h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400">Activity index across last weeks mock exams</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2.5 py-1 rounded font-bold">
                <TrendingUp className="h-4 w-4" /> Improving (+4%)
              </span>
            </div>

            {/* Custom SVG Line and Bar Chart representation */}
            <div className="relative h-60 w-full mt-4 flex flex-col justify-end">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-gray-100 dark:border-zinc-800 flex justify-between text-[10px] text-gray-400 pb-1"><span>Target: 100%</span></div>
                <div className="border-b border-gray-100 dark:border-zinc-800 flex justify-between text-[10px] text-gray-400 pb-1"><span>Target: 75%</span></div>
                <div className="border-b border-gray-100 dark:border-zinc-800 flex justify-between text-[10px] text-gray-400 pb-1"><span>Target: 50%</span></div>
                <div className="border-b border-gray-100 dark:border-zinc-800 flex justify-between text-[10px] text-gray-400 pb-1"><span>Target: 25%</span></div>
                <div className="flex justify-between text-[10px] text-gray-400"><span>0%</span></div>
              </div>

              {/* Graphic container */}
              <svg className="w-full h-44 z-10" viewBox="0 0 400 120" preserveAspectRatio="none">
                {/* Background Gradient for line */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Area under curve */}
                <path 
                  d="M 10,95 Q 60,65 110,80 T 210,40 T 310,50 T 390,20 L 390,120 L 10,120 Z" 
                  fill="url(#chartGrad)" 
                />

                {/* Accuracy Curve line */}
                <path 
                  d="M 10,95 Q 60,65 110,80 T 210,40 T 310,50 T 390,20" 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />

                {/* Data point indicators */}
                <circle cx="10" cy="95" r="4" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />
                <circle cx="110" cy="80" r="4" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />
                <circle cx="210" cy="40" r="4" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />
                <circle cx="310" cy="50" r="4" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />
                <circle cx="390" cy="20" r="4" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Chart labels bottom */}
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 px-1">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
                <span>Week 5 (Current)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
                <span className="text-gray-600 dark:text-zinc-400 font-medium">Daily practice accuracy (Moving Avg)</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-gray-450 text-indigo-600 dark:text-indigo-400 font-bold">Target: 300 XP/Week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Daily Streak rewards, Achievements & Thirukkural */}
        <div className="space-y-6">
          
          {/* Daily Streak Streak Board with Reward Button */}
          <div className="bg-amber-50/50 dark:bg-amber-950/10 p-6 rounded-2xl border border-amber-200/55 dark:border-amber-900/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-amber-400/10 rounded-full blur-xl"></div>
            <h4 className="font-bold text-amber-800 dark:text-amber-400 text-sm tracking-wide uppercase flex items-center gap-1.5 mb-2">
              <Flame className="h-4.5 w-4.5 text-amber-500 fill-amber-500 animate-pulse" /> Continuous Study Streak
            </h4>
            <p className="text-2xl font-black text-amber-900 dark:text-amber-100">{profile.streakCount} Days Active!</p>
            <p className="text-xs text-amber-800/80 dark:text-amber-400/80 mt-1">Study consecutive days to unlock multipliers and climb leaderboard ranks.</p>

            {/* Day grid visualizer */}
            <div className="flex justify-between gap-1.5 mt-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const isClaimed = i < profile.streakCount % 7 || (profile.streakCount > 0 && i < 5); // Simulated active weekdays
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-amber-900/60 dark:text-amber-450 font-bold uppercase">{day}</span>
                    <div className={`h-8 w-full rounded-lg flex items-center justify-center text-xs font-extrabold ${
                      isClaimed 
                      ? "bg-amber-500 text-white shadow-sm" 
                      : "bg-amber-200/40 dark:bg-zinc-800/50 text-amber-800/40 dark:text-zinc-600"
                    }`}>
                      {isClaimed ? "🔥" : "💤"}
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={onClaimStreakReward}
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-4 w-4" /> Claim Daily Attendance (+20 XP)
            </button>
          </div>

          {/* Thirukkural Daily Cards */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400">
              <Compass className="h-5 w-5" />
              <h4 className="text-sm font-bold uppercase tracking-wider">வள்ளுவர் வாய்மொழி (Kural {dailyKural.number})</h4>
            </div>
            
            <figure className="space-y-2 border-l-2 border-indigo-600 dark:border-indigo-400 pl-4 py-1">
              <blockquote className="text-sm font-extrabold text-gray-900 dark:text-white whitespace-pre-line leading-relaxed italic font-serif">
                "{dailyKural.kural}"
              </blockquote>
              <figcaption className="text-[11px] text-gray-400 font-mono">
                {dailyKural.transliteration}
              </figcaption>
            </figure>

            <div className="mt-3 text-xs text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-950 p-3 rounded-xl leading-relaxed">
              <span className="font-bold text-gray-800 dark:text-zinc-200">Meaning:</span> {dailyKural.meaning}
            </div>
          </div>

          {/* Unlockable Badges Grid */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
              <Award className="h-5 w-5 text-amber-500" /> Syllabus Achievements
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {profile.achievements.map((ach) => (
                <div 
                  key={ach.id} 
                  className={`p-3 rounded-xl border text-center relative ${
                    ach.unlockedAt 
                    ? "bg-indigo-50/20 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/40" 
                    : "bg-gray-50/50 dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 opacity-70"
                  }`}
                >
                  <div className="text-2xl mb-1.5">{ach.icon}</div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200 truncate">{ach.title}</h4>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">{ach.description}</p>
                  
                  <div className="w-full bg-gray-205 bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div 
                      className={`h-full ${ach.unlockedAt ? 'bg-indigo-600' : 'bg-amber-500'}`}
                      style={{ width: `${(ach.progressCurrent / ach.progressMax) * 100}%` }}
                    ></div>
                  </div>
                  <span className="absolute top-1.5 right-1.5 text-[8px] font-bold text-indigo-600 dark:text-indigo-400">
                    {ach.progressCurrent}/{ach.progressMax}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
