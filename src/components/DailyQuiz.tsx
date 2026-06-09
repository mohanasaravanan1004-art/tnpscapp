/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Quiz, PracticeQuestion, StudentScoreHistory, UserProfile } from "../types";
import { generateQuiz } from "../data/mockQuizzes";
import { 
  Trophy, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  CheckCircle,
  TrendingUp,
  Award
} from "lucide-react";

interface DailyQuizProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onSaveScore: (scoreItem: StudentScoreHistory) => void;
  onNavigate: (tab: string) => void;
}

export default function DailyQuiz({ 
  profile, 
  setProfile, 
  onSaveScore,
  onNavigate
}: DailyQuizProps) {
  const [selectedSize, setSelectedSize] = useState<10 | 20 | 50>(10);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  
  // Game state variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeLimit = useRef(0);

  // Setup Quiz runner
  const startQuiz = () => {
    const q = generateQuiz(selectedSize, selectedCategory);
    setActiveQuiz(q);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    
    const minutesLimit = q.durationMinutes;
    initialTimeLimit.current = minutesLimit * 60;
    setTimeLeft(minutesLimit * 60);
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (activeQuiz && !isSubmitted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleSubmitQuiz(true); // force auto submit
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeQuiz, isSubmitted, timeLeft]);

  const selectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optIdx }));
  };

  const handleNext = () => {
    if (!activeQuiz) return;
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = (isTimeOut: boolean = false) => {
    if (!activeQuiz || isSubmitted) return;
    setIsSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate score
    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentAccuracy = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const xpBonus = correctCount * 10 + (percentAccuracy === 100 ? 50 : 0);
    const timeSpentSecs = initialTimeLimit.current - timeLeft;
    const timeSpentMins = Number((timeSpentSecs / 60).toFixed(1));

    // Update Profile points and completed items
    setProfile(p => ({
      ...p,
      totalScore: p.totalScore + xpBonus,
      totalQuizzesTaken: p.totalQuizzesTaken + 1,
      accuracyRate: Math.round(((p.accuracyRate * p.totalQuizzesTaken) + percentAccuracy) / (p.totalQuizzesTaken + 1)) || percentAccuracy,
      streakCount: p.streakCount + 1, // update streak upon completing a full practice quiz
      completedTopicsCount: p.completedTopicsCount + Math.floor(correctCount / 4)
    }));

    // Record Score in local histories
    const newRecord: StudentScoreHistory = {
      id: `score_${Date.now()}`,
      testName: activeQuiz.title,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      score: correctCount,
      totalQuestions: activeQuiz.questions.length,
      timeTakenMinutes: timeSpentMins,
      accuracy: percentAccuracy,
      type: "quiz"
    };
    onSaveScore(newRecord);

    if (isTimeOut) {
      alert("⚠️ Time has run out! Your quiz has been auto-submitted.");
    }
  };

  // Human friendly countdown formation
  const formatTime = (secs: number) => {
    const mm = Math.floor(secs / 60);
    const ss = secs % 60;
    return `${mm < 10 ? "0" : ""}${mm}:${ss < 10 ? "0" : ""}${ss}`;
  };

  // Render variables
  const currentQuestion: PracticeQuestion | undefined = activeQuiz?.questions[currentQuestionIndex];
  const totalQuestions = activeQuiz?.questions.length || 0;
  const attemptedCount = Object.keys(selectedAnswers).length;

  return (
    <div className="space-y-6" id="daily_revision_quiz_system">
      
      {/* Quiz setup panel */}
      {!activeQuiz && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-emerald-850 to-emerald-950 p-6 sm:p-8 rounded-2xl text-white shadow-sm bg-indigo-900 border border-indigo-950">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3 fill-amber-350" /> Vetri Daily Assessment System
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3">Self Assessment Booster</h2>
              <p className="text-zinc-200 text-sm mt-1.5 leading-relaxed">
                Take scheduled practice questions to lock target formulas, review Tamil language terms, and polish mental ability concepts. Quizzes have strict timers mimicking real TNPSC workloads.
              </p>
            </div>

            {/* Quiz selections */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm space-y-6">
              
              {/* Question Count Selection */}
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-900 dark:text-white block">1. Select Quiz size (வினாக்களின் எண்ணிக்கை)</label>
                <div className="grid grid-cols-3 gap-3">
                  {[10, 20, 50].map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size as any)}
                      className={`py-4 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedSize === size
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-extrabold shadow-sm"
                        : "border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-600 dark:text-zinc-400 font-bold text-sm hover:bg-slate-50"
                      }`}
                    >
                      <p className="text-lg font-black">{size}</p>
                      <p className="text-[10px] uppercase font-bold tracking-wider mt-0.5 opacity-80">Questions</p>
                      <p className="text-[9px] mt-0.5 opacity-60">Timer: {size === 10 ? "10" : size === 20 ? "20" : "45"}m</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject categories selection */}
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-900 dark:text-white block">2. Select Subject Category (பாடப்பிரிவு)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { key: "All", text: "Global Syllabus (அனைத்தும்)", icon: "🎯" },
                    { key: "Tamil", text: "General Tamil (தமிழ்)", icon: "📚" },
                    { key: "Polity", text: "Indian Polity (ஆட்சியியல்)", icon: "🏛️" },
                    { key: "History", text: "History & INM (வரலாறு)", icon: "⏳" },
                    { key: "Geography", text: "Geography (புவியியல்)", icon: "🗺️" },
                    { key: "Science", text: "General Science (அறிவியல்)", icon: "🔬" },
                    { key: "Aptitude", text: "Aptitude (கணிதம்)", icon: "🧮" }
                  ].map(cat => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        selectedCategory === cat.key
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-bold"
                        : "border-gray-250 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-650 dark:text-zinc-450 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <div>
                        <p className="font-bold leading-tight">{cat.key}</p>
                        <p className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">{cat.text}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={startQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-600/10 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Initialize Dynamic Practice Paper</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Guidelines on correct testing */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm">
              <h3 className="font-black text-sm text-gray-900 dark:text-white mb-3 uppercase tracking-wide flex items-center gap-1.5 border-b border-gray-100 pb-2">
                <Clock className="h-4 w-4 text-indigo-500" /> Exam Room Protocols
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-gray-600 dark:text-zinc-400 font-medium">
                <li className="flex gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">✔</span>
                  <span>Once initialized, you cannot pause the countdown. Closing the browser triggers automatic test submission.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">✔</span>
                  <span><strong>Evaluation scores:</strong> Each correct option earns +10 XP. Finishing with a 100% record awards a luxury +50 XP bonus!</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">✔</span>
                  <span>Explanations are displayed instantly after completion. Check your weakest areas in the dashboard.</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 p-6 rounded-2xl shadow-2xs">
              <h4 className="font-black text-sm text-amber-850 dark:text-amber-400 flex items-center gap-1 pb-1">
                🏆 Accuracy Index
              </h4>
              <p className="text-xs text-amber-900/80 dark:text-amber-400/80 leading-relaxed font-serif">
                Your current average platform score is <strong className="text-indigo-650 text-indigo-600 dark:text-indigo-405">{profile.accuracyRate}%</strong>. Completing larger 50-question sets updates your rating significantly!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Active Quiz Runner Panel */}
      {activeQuiz && currentQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Question Sheet */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm">
              
              {/* Card Header progress indicator */}
              <div className="flex items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4 mb-4 text-xs font-bold text-gray-400">
                <span>QUESTION {currentQuestionIndex + 1} OF {totalQuestions}</span>
                <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full uppercase">
                  {selectedCategory} QUIZ INDEX
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-snug">
                {currentQuestion.question}
              </h3>

              {/* Options selectors */}
              <div className="space-y-3 mt-6">
                {currentQuestion.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                  const isCorrect = currentQuestion.correctIndex === oIdx;
                  
                  let optStyle = "border-gray-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300";
                  
                  if (isSelected) {
                    optStyle = "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-extrabold ring-1 ring-indigo-600";
                  }

                  if (isSubmitted) {
                    if (isCorrect) {
                      optStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black";
                    } else if (isSelected) {
                      optStyle = "border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400 font-black";
                    } else {
                      optStyle = "border-gray-100 dark:border-zinc-805 opacity-50 text-gray-400";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => selectOption(oIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-6 w-6 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 flex items-center justify-center font-bold text-xs">
                          {["A", "B", "C", "D"][oIdx]}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSubmitted && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-505 text-emerald-500 flex-shrink-0" />}
                      {isSubmitted && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-505 text-rose-500 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation section if submitted */}
              {isSubmitted && (
                <div className="mt-6 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/15 border border-indigo-100/40 dark:border-indigo-900/40 text-xs">
                  <p className="font-extrabold text-indigo-900 dark:text-indigo-400 flex items-center gap-1 mb-1">
                    <HelpCircle className="h-4.5 w-4.5" /> Explanation & Context (விளக்கம்):
                  </p>
                  <p className="text-gray-700 dark:text-zinc-300 leading-relaxed font-serif">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Prev / Next controls footer */}
              <div className="flex items-center justify-between gap-4 border-t border-gray-100 dark:border-zinc-800 mt-8 pt-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-gray-250 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-slate-50 disabled:opacity-40"
                >
                  Previous Item
                </button>

                <div className="flex items-center gap-2">
                  {!isSubmitted ? (
                    <button
                      type="button"
                      onClick={() => handleSubmitQuiz(false)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm"
                    >
                      Submit Exam Sheet
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveQuiz(null)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-1"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Finish & Exit
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-gray-250 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-slate-50 disabled:opacity-40"
                >
                  Next Item
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Timer, Info Metrics & Question bubble navigation map */}
          <div className="space-y-6">
            
            {/* Timer card */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm text-center">
              <h4 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider">CHALLENGE COUNTDOWN</h4>
              <div className={`text-3xl font-black font-mono mt-1 ${timeLeft < 60 ? "text-rose-600 animate-pulse" : "text-gray-900 dark:text-white"}`}>
                {formatTime(timeLeft)}
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Quiz ends automatically upon timer expiration.</p>

              {/* Progress summary stats */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 text-center">
                <div className="bg-slate-50 dark:bg-zinc-950 p-2 rounded-lg">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Answered</p>
                  <p className="text-base font-black text-gray-800 dark:text-white">{attemptedCount} / {totalQuestions}</p>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-950 p-2 rounded-lg">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Unattempted</p>
                  <p className="text-base font-black text-gray-800 dark:text-white">{totalQuestions - attemptedCount}</p>
                </div>
              </div>
            </div>

            {/* Questions map bubble grid */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm">
              <h4 className="text-xs font-extrabold uppercase text-gray-900 dark:text-white mb-3">QUESTION TRACKER MAP</h4>
              <div className="grid grid-cols-5 gap-2">
                {activeQuiz.questions.map((_, idx) => {
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isActive = currentQuestionIndex === idx;
                  
                  let btnColor = "bg-gray-50 text-gray-400 dark:bg-zinc-900 dark:text-zinc-650";
                  
                  if (isActive) {
                    btnColor = "bg-indigo-600 text-white ring-2 ring-indigo-200 dark:ring-indigo-900";
                  } else if (isAnswered) {
                    btnColor = "bg-indigo-50 text-indigo-600 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400";
                  }

                  if (isSubmitted) {
                    const isRight = selectedAnswers[idx] === activeQuiz.questions[idx].correctIndex;
                    if (isRight) {
                      btnColor = "bg-emerald-500 text-white";
                    } else {
                      btnColor = "bg-rose-500 text-white";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 w-full rounded-lg text-xs font-extrabold flex items-center justify-center transition-all cursor-pointer ${btnColor}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend explanations */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 text-[10px] text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded bg-indigo-500"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded bg-gray-250"></div>
                  <span>Unanswered</span>
                </div>
                {isSubmitted && (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-2.5 rounded bg-emerald-505 bg-emerald-500"></div>
                      <span>Correct</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-2.5 rounded bg-rose-505 bg-rose-500"></div>
                      <span>Incorrect</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick action exit */}
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to abandon the current test? No progress coins will be saved.")) {
                  setActiveQuiz(null);
                }
              }}
              className="w-full text-xs text-rose-500 font-bold border border-rose-200/50 hover:bg-rose-50 dark:hover:bg-rose-955/20 py-2.5 rounded-lg h-9 flex items-center justify-center"
            >
              Quit Current Assessment
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
