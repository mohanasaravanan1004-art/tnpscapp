/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  Sparkles, 
  Calendar, 
  BookOpen, 
  ArrowRight, 
  Bot, 
  Clock, 
  AlertCircle, 
  ClipboardList,
  Compass,
  MessageSquare,
  Send,
  Loader2,
  Trash2,
  ThumbsUp
} from "lucide-react";

interface AIStudyPlannerProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

export default function AIStudyPlanner({ profile, setProfile }: AIStudyPlannerProps) {
  const [plannerTab, setPlannerTab] = useState<"planner" | "tutor">("planner");
  
  // 1. Planner Variables
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["General Tamil", "Indian Polity"]);
  const [dailyHours, setDailyHours] = useState<number>(4);
  const [targetWeeks, setTargetWeeks] = useState<number>(8);
  const [weakAreas, setWeakAreas] = useState<string>("");
  const [isCompilingPlan, setIsCompilingPlan] = useState<boolean>(false);
  const [compiledPlan, setCompiledPlan] = useState<string | null>(null);

  // 2. Doubt Tutor Variables
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: "வணக்கம்! I am your Vetri TNPSC Tutor. Ask me any question about the syllabus (e.g. 'Details about Keeladi excavation', 'Explain Article 19', or ask about Thirukkural chapters) and I will provide fact-based guides!" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const toggleSubjectFocus = (sub: string) => {
    setSelectedSubjects(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  // Compile Planner via server POST
  const handleCompilePlan = async () => {
    setIsCompilingPlan(true);
    setCompiledPlan(null);

    try {
      const response = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectFocus: selectedSubjects,
          dailyHours,
          targetWeeks,
          weakAreas
        })
      });

      const data = await response.json();
      if (data.success) {
        setCompiledPlan(data.plan);
        // Increment user score for taking planning actions
        setProfile(p => ({ ...p, totalScore: p.totalScore + 40 }));
      } else {
        throw new Error(data.error || "Failed to generate plan.");
      }
    } catch (err) {
      console.error(err);
      // Hard fallback plan if endpoint has issues or offline
      setCompiledPlan(`### 📚 Vetri Custom Study Plan (Offline Fallback)
Let's study under a structural schedule designed specifically for your TNPSC Group 4 targets.

#### 🎯 Daily Goal: ${dailyHours} Hours for ${targetWeeks} Weeks
- **Target Subjects**: ${selectedSubjects.join(", ") || "General Tamil & Indian Polity"}
- **Refinement Topics**: ${weakAreas || "History dates & Science formulas"}

---

#### 🗓️ Weekly Milestones
* **Weeks 1-2: Tamil Foundation (பொதுத் தமிழ்)**
  - Study Class 6th to 8th Class Tamil textbooks (இலக்கணம் & இலக்கியம்).
  - Devote 2 hours daily to Tamil, 1 hour to General Studies, 1 hour to Aptitude.
  - Practice 50 mock questions each Sunday.

* **Weeks 3-4: Core General Studies (வரலாறு, புவியியல் & ஆட்சியியல்)**
  - Coverage: Indus Valley Civilization, Indian National Movement, and Geography basics.
  - Aptitude: Percentage, LCM & HCF topics. Complete 15 practice questions daily!
  - Daily review of Tamil Tamil scholars (தமிழ் அறிஞர்களும் தமிழ்த் தொண்டும்).

* **Weeks 5-6: Advanced GS & Government Schemes**
  - Indian Polity articles (1-51A), important central and Tamil Nadu welfare schemes.
  - Current affairs from the last 6 months (Vetri CA Center).

* **Weeks 7-8: Full Revision and Mock Tests (முழு மாதிரித் தேர்வுகள்)**
  - Solve at least 3 previous year papers (2024, 2022, 2019).
  - Focus on weaknesses: ${weakAreas || "General Science concepts"}
  - Take our 200 Questions Full Mock Test on the Vetri platform to track your score!

*🔥 Success Quote: "முயற்சி திருவினையாக்கும்" - Continual effort yields grand success.*`);
    } finally {
      setIsCompilingPlan(false);
    }
  };

  // Chat request via server POST
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await response.json();
      if (data.success) {
        setChatMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        throw new Error(data.error || "Failed to process question.");
      }
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { 
        sender: "bot", 
        text: "வணக்கம்! I encountered an outline issue while loading details. Here is a general outline of key dates in the Indian National Movement:\n- **1885**: Founding of Indian National Congress (INC)\n- **1905**: Swadeshi Movement / Bengal Partition\n- **1920**: Non-Cooperation Movement\n- **1930**: Salt Satyagraha\n- **1942**: Quit India Movement" 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="ai_advisor_planner_module">
      
      {/* Tab select bar */}
      <div className="flex p-0.5 bg-gray-150 bg-gray-100 dark:bg-zinc-900 rounded-xl max-w-md">
        <button
          onClick={() => setPlannerTab("planner")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            plannerTab === "planner"
            ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>AI Study Timetable</span>
        </button>
        <button
          onClick={() => setPlannerTab("tutor")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            plannerTab === "tutor"
            ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Bot className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Syllabus Doubt Solver</span>
        </button>
      </div>

      {/* BLOCK A: Study Planner Tab */}
      {plannerTab === "planner" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 p-6 rounded-2xl shadow-sm space-y-5 h-fit">
            <h3 className="font-extrabold text-base text-gray-950 dark:text-white flex items-center gap-1.5 pb-2 border-b border-gray-100">
              <Compass className="h-5 w-5 text-indigo-500" /> Plan Guidelines
            </h3>
            
            {/* Subject Selects */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase">1. Targeted Subjects</label>
              <div className="flex flex-wrap gap-1.5">
                {["General Tamil", "Indian Polity", "History & Culture", "Geography", "Economics", "Aptitude"].map(sub => {
                  const isActive = selectedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      onClick={() => toggleSubjectFocus(sub)}
                      className={`py-1.5 px-2.5 rounded-lg text-[10px] font-black uppercase transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-50 border border-gray-205 border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 text-gray-600"
                      }`}
                    >
                      {sub} {isActive && "✓"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Daily Hours Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase">2. Daily Study limits</span>
                <span className="text-indigo-600 dark:text-indigo-400">{dailyHours} Hours/Day</span>
              </div>
              <input 
                type="range" 
                min={2} 
                max={12} 
                step={1}
                value={dailyHours}
                onChange={e => setDailyHours(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-gray-100 dark:bg-zinc-800 rounded-lg appearance-none"
              />
            </div>

            {/* Weeks Selection */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase">3. Timeline Limit</span>
                <span className="text-indigo-600 dark:text-indigo-400">{targetWeeks} Weeks</span>
              </div>
              <input 
                type="range" 
                min={4} 
                max={24} 
                step={4}
                value={targetWeeks}
                onChange={e => setTargetWeeks(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-gray-100 dark:bg-zinc-800 rounded-lg appearance-none"
              />
            </div>

            {/* Weak Areas Choice */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase">4. Highlight Weak Areas</label>
              <textarea 
                placeholder="E.g. I am weak in Class 10 Tamil grammar, and compound interest formulas..."
                value={weakAreas}
                onChange={e => setWeakAreas(e.target.value)}
                rows={3}
                className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-205 border-gray-200 dark:border-zinc-800 rounded-xl p-3 text-xs outline-none focus:border-indigo-500 font-sans text-gray-800 dark:text-white"
              />
            </div>

            {/* Action button */}
            <button
              onClick={handleCompilePlan}
              disabled={isCompilingPlan}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-xl text-xs active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {isCompilingPlan ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Structuring schedule...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Compile Custom Advisor Plan</span>
                </>
              )}
            </button>
          </div>

          {/* Plan Display Column */}
          <div className="lg:col-span-2">
            {compiledPlan ? (
              <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 p-6 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <h4 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1">
                    <Sparkles className="h-4.5 w-4.5 text-amber-500 fill-amber-500" /> Compiled Advisor Schedule
                  </h4>
                  <button 
                    onClick={() => setCompiledPlan(null)}
                    className="text-[10px] text-gray-400 hover:text-rose-500 font-bold"
                  >
                    Clear timeline
                  </button>
                </div>
                
                <div className="text-xs leading-relaxed text-gray-700 dark:text-zinc-300 font-serif whitespace-pre-line border rounded-xl p-4 bg-slate-50/50 dark:bg-zinc-950 border-gray-100 max-h-160 overflow-y-auto">
                  {compiledPlan}
                </div>
                
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-[10px] text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-xl flex items-center gap-2 font-sans font-semibold">
                  <span className="text-sm">🎓</span> 
                  <span>Custom program formulated successfully. Study target is logged inside your Vetri dashboard status records.</span>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 bg-white dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-slate-50 text-indigo-600 flex items-center justify-center font-bold text-2xl shadow-xs mb-3">
                  📋
                </div>
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Begin study personalization</h4>
                <p className="text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
                  Provide your target weeks, daily hours constraints and focus parameters in the left card, then trigger compile options to generate schedules.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BLOCK B: Doubts Tutor Chat Solver Tab */}
      {plannerTab === "tutor" && (
        <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 rounded-2xl shadow-sm flex flex-col h-[520px]">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-150 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-950/20 rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <span className="h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg font-bold">
                🤖
              </span>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Vetri AI Civil Services Tutor</h4>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">ACTIVE DOUBT SOLVING ROOM</p>
              </div>
            </div>
            <button
              onClick={() => setChatMessages([{ sender: "bot", text: "வணக்கம்! I am your Vetri TNPSC Tutor. Ask me any syllabus questions!" }])}
              className="text-gray-400 hover:text-rose-500 transition-colors"
              title="Clear discussion history"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages viewport */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 font-bold ${
                  msg.sender === "user" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                }`}>
                  {msg.sender === "user" ? "👤" : "📝"}
                </div>
                <div className={`p-3.5 rounded-2xl whitespace-pre-line leading-relaxed ${
                  msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none font-medium"
                  : "bg-slate-100 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-805 text-gray-800 dark:text-zinc-350 rounded-tl-none font-serif"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isChatLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto">
                <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold flex-shrink-0 animate-bounce">
                  📖
                </div>
                <div className="p-3 bg-slate-100 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-805 rounded-2xl rounded-tl-none flex items-center gap-1.5 text-gray-400 text-[10px]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Consulting school syllabus books...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Chat Box footer */}
          <form onSubmit={handleSendChat} className="p-4 border-t border-gray-150 dark:border-zinc-850 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask a syllabus question (e.g. 'Key facts of Mohenjodaro', 'Structure of Lok Sabha')..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              disabled={isChatLoading}
              className="flex-1 bg-gray-50 dark:bg-zinc-950 border border-gray-205 border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/30 text-gray-850 text-xs text-gray-800 dark:text-white"
            />
            <button 
              type="submit"
              disabled={!chatInput.trim() || isChatLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
