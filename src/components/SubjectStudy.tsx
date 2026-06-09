/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SubjectModule, Chapter, UserProfile } from "../types";
import { SUBJECT_LIST } from "../data/learningData";
import { 
  BookOpen, 
  ChevronRight, 
  Bookmark, 
  ArrowLeft, 
  Download, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  ClipboardList,
  Search
} from "lucide-react";

interface SubjectStudyProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onNavigateHome: () => void;
}

export default function SubjectStudy({ 
  profile, 
  setProfile, 
  onNavigateHome 
}: SubjectStudyProps) {
  const [selectedSubject, setSelectedSubject] = useState<SubjectModule | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [activeTab, setActiveTab] = useState<"notes" | "points" | "practice" | "revision">("notes");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Exercise states for practice questions in active chapter
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  // Filter subjects based on query
  const filteredSubjects = SUBJECT_LIST.filter(sub => 
    sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.tamilTitle.includes(searchQuery) ||
    sub.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectSubject = (sub: SubjectModule) => {
    setSelectedSubject(sub);
    setSelectedChapter(null);
    setAnswers({});
    setSubmittedQuestions({});
  };

  const selectChapter = (ch: Chapter) => {
    setSelectedChapter(ch);
    setActiveTab("notes");
    setAnswers({});
    setSubmittedQuestions({});
  };

  const toggleBookmark = (chapterId: string) => {
    const wasBookmarked = profile.bookmarkedChapterKeys.includes(chapterId);
    let updated: string[];
    
    if (wasBookmarked) {
      updated = profile.bookmarkedChapterKeys.filter(id => id !== chapterId);
    } else {
      updated = [...profile.bookmarkedChapterKeys, chapterId];
    }
    
    setProfile(prev => ({
      ...prev,
      bookmarkedChapterKeys: updated,
      // Reward points for bookmarking syllabus topics
      totalScore: prev.totalScore + (wasBookmarked ? -5 : 10)
    }));
  };

  const handleOptionSelect = (qId: string, optIndex: number) => {
    if (submittedQuestions[qId]) return; // locked after clicking
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
    setSubmittedQuestions(prev => ({ ...prev, [qId]: true }));
    
    // Check if correct, increment profile stats
    const questionInChapter = selectedChapter?.practiceQuestions.find(q => q.id === qId);
    if (questionInChapter) {
      const isCorrect = questionInChapter.correctIndex === optIndex;
      setProfile(p => ({
        ...p,
        totalScore: p.totalScore + (isCorrect ? 15 : 2), 
        accuracyRate: Math.round(((p.accuracyRate * p.totalQuizzesTaken) + (isCorrect ? 100 : 0)) / (p.totalQuizzesTaken + 1)) || 100
      }));
    }
  };

  // Convert notes to downloadable format and prompt user
  const handleDownloadNotes = (chapter: Chapter, subject: SubjectModule) => {
    const textContent = `
========================================
Vetri TNPSC Group 4 Study Material
Subject: ${subject.title} (${subject.tamilTitle})
Chapter: ${chapter.title} (${chapter.tamilTitle})
Generated Code Date: 2026-06-09 (UTC)
========================================

--- CORE CHAPTER NOTES (பாடம்) ---
${chapter.notes}

--- GOLDEN POINTS TO REMEMBER (முக்கிய குறிப்புகள்) ---
${chapter.importantPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

--- CHAPTER REVISION SHEET (சுருக்கம்) ---
${chapter.revisionSheet}

========================================
"முயற்சி திருவினையாக்கும்" - Vetri Platform
========================================
`;
    
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = `Vetri_Notes_${chapter.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6" id="subject_syllabus_view">
      
      {/* 1. Subjects Grid Selection View */}
      {!selectedSubject && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-800 to-indigo-950 p-6 md:p-8 rounded-2xl text-white shadow-md">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Syllabus Study Circle</h2>
            <p className="text-sm text-indigo-200 mt-1.5 max-w-xl">
              Browse standard-aligned study programs from Samacheer Kalvi textbooks. Track notes, flag bookmarks, and practice real multiple-choice exercises.
            </p>
            
            {/* Search Input */}
            <div className="mt-5 relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-indigo-400" />
              <input 
                type="text" 
                placeholder="Search subjects or chapters (e.g. Tamil, Polity)..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-indigo-950/40 border border-indigo-400/30 rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder-indigo-300/70 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((sub) => (
              <div 
                key={sub.id}
                onClick={() => selectSubject(sub)}
                className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-400/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold">
                      {sub.id === "general-tamil" ? "📚" : sub.id === "indian-polity" ? "🏛️" : sub.id === "history" ? "⏳" : sub.id === "geography" ? "🗺️" : sub.id === "economics" ? "📈" : sub.id === "general-science" ? "🔬" : "🧮"}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full">
                      {sub.chapters.length} chapters
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {sub.title}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">{sub.tamilTitle}</p>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-2.5 leading-relaxed truncate-2-lines line-clamp-2">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                  <span>Enter Course Modules</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Subject Chapters Split-Screen View */}
      {selectedSubject && !selectedChapter && (
        <div className="space-y-6">
          <button 
            onClick={() => setSelectedSubject(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Subject Circle
          </button>

          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Class Syllabi Room</span>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">{selectedSubject.title}</h2>
                <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">{selectedSubject.tamilTitle}</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-950 p-2.5 rounded-lg max-w-sm">
                Each chapter is built per official state guidelines. Finish practice modules to raise your leaderboard status.
              </div>
            </div>

            <div className="space-y-3">
              {selectedSubject.chapters.map((ch, index) => {
                const isBookmarked = profile.bookmarkedChapterKeys.includes(ch.id);
                return (
                  <div 
                    key={ch.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 hover:border-indigo-100 dark:hover:border-indigo-950/40 transition-all cursor-pointer group"
                    onClick={() => selectChapter(ch)}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-black text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                          {ch.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium truncate mt-0.5">{ch.tamilTitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center" onClick={e => e.stopPropagation()}>
                      <button 
                        onClick={() => toggleBookmark(ch.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          isBookmarked 
                          ? "bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100" 
                          : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-350"
                        }`}
                        title="Bookmark Chapter"
                      >
                        <Bookmark className="h-4 w-4 fill-current" />
                      </button>
                      <button 
                        onClick={() => handleDownloadNotes(ch, selectedSubject)}
                        className="p-2 rounded-lg border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 dark:text-zinc-400 transition-colors flex items-center gap-1.5 text-xs font-bold"
                        title="Download notes file"
                      >
                        <Download className="h-4 w-4" /> <span className="hidden sm:inline">Save Material</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. Detailed Chapter View with Nested Tabs */}
      {selectedSubject && selectedChapter && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button 
              onClick={() => setSelectedChapter(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 self-start"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Chapters List
            </button>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button 
                onClick={() => toggleBookmark(selectedChapter.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  profile.bookmarkedChapterKeys.includes(selectedChapter.id)
                  ? "bg-amber-50 border-amber-200 text-amber-600 fill-amber-500" 
                  : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400"
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" /> 
                {profile.bookmarkedChapterKeys.includes(selectedChapter.id) ? "Flagged" : "Bookmark Syllabus"}
              </button>
              <button 
                onClick={() => handleDownloadNotes(selectedChapter, selectedSubject)}
                className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-950 text-xs font-bold text-gray-600 dark:text-zinc-400 flex items-center gap-1.5 transition-all"
              >
                <Download className="h-3.5 w-3.5" /> Save Offline
              </button>
            </div>
          </div>

          {/* Chapter Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-emerald-950 p-6 rounded-2xl text-white shadow-sm border border-indigo-950">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-md">
                {selectedSubject.title}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-md">
                Samacheer Unit
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black mt-2 leading-snug">{selectedChapter.title}</h3>
            <p className="text-xs text-indigo-300 font-bold mt-0.5 leading-snug">{selectedChapter.tamilTitle}</p>
          </div>

          {/* Core Tab Navigations */}
          <div className="flex border-b border-gray-200 dark:border-zinc-800 overflow-x-auto gap-2">
            {[
              { key: "notes", text: "Lesson Guide", tamil: "பாடம்", icon: BookOpen },
              { key: "points", text: "Important Points", tamil: "முக்கிய குறிப்புகள்", icon: Lightbulb },
              { key: "practice", text: "Practice MCQs", tamil: "பயிற்சி வினாக்கள்", icon: ClipboardList },
              { key: "revision", text: "Revision Sheet", tamil: "சுருக்கம்", icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.key 
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold" 
                    : "border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left">
                    <p className="leading-none">{tab.text}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5 leading-none">{tab.tamil}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Material Content container */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm min-h-64">
            
            {/* Notes Tab */}
            {activeTab === "notes" && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/20 px-3 py-1.5 rounded-lg inline-block">
                  📖 Comprehensive Study Manual
                </h4>
                <div className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line space-y-3 font-serif">
                  {selectedChapter.notes}
                </div>
              </div>
            )}

            {/* Important Points Tab */}
            {activeTab === "points" && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/24 px-3 py-1.5 rounded-lg inline-block">
                  💡 Golden Exam Facts (முக்கிய குறிப்புகள்)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedChapter.importantPoints.map((pt, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl border border-slate-100 dark:border-zinc-800 flex gap-3 shadow-2xs">
                      <div className="h-6 w-6 rounded-full bg-amber-150 text-amber-500 bg-amber-50 dark:bg-amber-950/40 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-xs text-gray-700 dark:text-zinc-305 leading-relaxed text-zinc-300">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Exercises Tab */}
            {activeTab === "practice" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-bold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/10 px-3 py-1.5 rounded-lg inline-block">
                    ✏️ Self Assembly exercises (பயிற்சி வினாக்கள்)
                  </h4>
                  <p className="text-xs font-medium text-gray-400">Answer correctly to unlock accuracy score indices</p>
                </div>
                
                <div className="space-y-6">
                  {selectedChapter.practiceQuestions.map((q, qIdx) => {
                    const selectedOpt = answers[q.id];
                    const isSubmitted = submittedQuestions[q.id];
                    
                    return (
                      <div key={q.id} className="p-5 rounded-xl border border-gray-100 dark:border-zinc-850 bg-slate-50/50 dark:bg-zinc-850/20 shadow-2xs">
                        <h5 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-start gap-2">
                          <span className="text-indigo-600 dark:text-indigo-400 font-black">{qIdx + 1}.</span>
                          <span>{q.question}</span>
                        </h5>

                        {/* Options Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedOpt === optIdx;
                            const isCorrect = q.correctIndex === optIdx;
                            
                            let btnStyle = "border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300";
                            
                            if (isSubmitted) {
                              if (isCorrect) {
                                btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                              } else if (isSelected) {
                                btnStyle = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold";
                              } else {
                                btnStyle = "border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 opacity-60 text-gray-500";
                              }
                            } else if (isSelected) {
                              btnStyle = "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600";
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleOptionSelect(q.id, optIdx)}
                                disabled={isSubmitted}
                                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isSubmitted && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-505 text-emerald-500" />}
                                {isSubmitted && isSelected && !isCorrect && <AlertCircle className="h-4 w-4 text-rose-505 text-rose-500" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Animated Explanation Drawer */}
                        {isSubmitted && (
                          <div className="mt-4 p-4 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/15 border border-indigo-100/30 dark:border-indigo-900/40 text-xs">
                            <p className="font-extrabold text-indigo-900 dark:text-indigo-400 mb-1 flex items-center gap-1.5">
                              <HelpCircle className="h-4 w-4" /> Explanation (விளக்கம்):
                            </p>
                            <p className="text-gray-700 dark:text-zinc-300 leading-relaxed font-serif">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Revision notes Tab */}
            {activeTab === "revision" && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/20 px-3 py-1.5 rounded-lg inline-block">
                  ⚡ Revision Summary (மீள் பார்வைச் சுருக்கம்)
                </h4>
                <div className="bg-slate-50 dark:bg-zinc-950 p-6 rounded-2xl border border-slate-100 dark:border-zinc-850 font-serif leading-relaxed text-sm text-gray-800 dark:text-zinc-300 whitespace-pre-line">
                  {selectedChapter.revisionSheet}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
