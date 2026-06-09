/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PREVIOUS_PAPERS_LIST } from "../data/previousPapers";
import { PYQPaper, MockQuestion } from "../types";
import { 
  FileText, 
  ChevronRight, 
  Download, 
  HelpCircle, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function PastPapers() {
  const [selectedPaper, setSelectedPaper] = useState<PYQPaper | null>(null);
  const [paperMode, setPaperMode] = useState<"document" | "practice">("document");
  
  // Interactive practice state
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (submitted[qId]) return;
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
    setSubmitted(prev => ({ ...prev, [qId]: true }));
  };

  const resetPractice = () => {
    setAnswers({});
    setSubmitted({});
  };

  // Simulated download of formal PDF booklet
  const downloadPaperPdf = (p: PYQPaper) => {
    const formattedText = `
========================================================================
TAMIL NADU PUBLIC SERVICE COMMISSION (TNPSC)
COMMISSION EXAM CODE: CSG-4 / TNPSC GROUP 4 PREVIOUS CIVIL SERVICES
========================================================================
EXAM YEAR: ${p.year}
BOOKLET SUBJECT: GENERAL TAMIL + GENERAL STUDIES + APTITUDE
SAMPLE METADATA: ${p.totalQuestions} Questions Total
========================================================================

--- OFFICIAL QUESTIONS REPRODUCED IN VETRI TNPSC ---

${p.questions.map((q, idx) => `
[Q${idx + 1}] Section: ${q.section.toUpperCase()}
Question: ${q.question}
A) ${q.options[0]}
B) ${q.options[1]}
C) ${q.options[2]}
D) ${q.options[3]}
------------------------------------------------------------------------
* OFFICIAL ANSWER KEY INDEX: ${["A", "B", "C", "D"][q.correctIndex]}
* CONCEPT EXPLANATION: ${q.explanation}
`).join("\n")}

========================================================================
Vetri TNPSC – Group 4 Exam Preparation Platform
"முயற்சி திருவினையாக்கும்"
========================================================================
`;
    
    const blob = new Blob([formattedText], { type: "text/plain;charset=utf-8" });
    const ele = document.createElement("a");
    ele.href = URL.createObjectURL(blob);
    ele.download = `TNPSC_Group4_Official_Key_${p.year}.txt`;
    document.body.appendChild(ele);
    ele.click();
    document.body.removeChild(ele);
  };

  return (
    <div className="space-y-6" id="pyq_papers_module">
      
      {/* 1. Landing Catalog View */}
      {!selectedPaper && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-900 to-indigo-950 p-6 md:p-8 rounded-2xl text-white shadow-sm border border-teal-800 bg-indigo-900">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> PYQ Archives
            </span>
            <h2 className="text-2xl md:text-3xl font-black mt-3">Previous Year Question Papers</h2>
            <p className="text-xs sm:text-sm text-zinc-200 mt-1.5 leading-relaxed max-w-xl">
              Analyzing past papers teaches you how topics are framed. Choose a past Group 4 exam year to study actual solved questions or test your own speed under actual historic cutoff boundaries.
            </p>
          </div>

          <div className="space-y-4">
            {PREVIOUS_PAPERS_LIST.map((paper) => (
              <div 
                key={paper.id}
                onClick={() => setSelectedPaper(paper)}
                className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-400/30 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    {paper.year}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-amber-400 transition-all leading-snug">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-450 font-bold mt-0.5">TNPSC Group IV Civil Services Official Key</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-400 font-medium mt-2">
                      <span>Total questions: {paper.totalQuestions}</span>
                      <span>•</span>
                      <span>Tamil section: {paper.tamilQuestionCount} Qs</span>
                      <span>•</span>
                      <span>General Studies: {paper.gsQuestionCount} Qs</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => downloadPaperPdf(paper)}
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:bg-gray-50 flex items-center gap-1.5 text-xs font-bold"
                    title="Download Exam Text Book"
                  >
                    <Download className="h-4 w-4" /> <span className="hidden sm:inline">Download Key</span>
                  </button>
                  <button 
                    onClick={() => setSelectedPaper(paper)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Browse Questions</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Detailed Single Paper view */}
      {selectedPaper && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button 
              onClick={() => {
                setSelectedPaper(null); 
                resetPractice();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex-shrink-0 cursor-pointer self-start"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Year Catalog
            </button>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button 
                onClick={() => downloadPaperPdf(selectedPaper)}
                className="px-3 py-1.5 rounded-xl border border-gray-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-55 dark:hover:bg-zinc-950 text-xs font-bold text-gray-600 dark:text-zinc-400 flex items-center gap-1.5 transition-all"
              >
                <Download className="h-3.5 w-3.5" /> Save Official Paper
              </button>
            </div>
          </div>

          {/* Paper Title card */}
          <div className="bg-gradient-to-r from-indigo-900 to-teal-950 p-6 rounded-2xl text-white shadow-sm bg-indigo-950">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full">
                Solved Booklet
              </span>
              <span className="text-[10px] font-black uppercase bg-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-full">
                {selectedPaper.year} Official Key
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black mt-2 leading-snug">{selectedPaper.title}</h3>
            <p className="text-xs text-indigo-300 mt-1 font-bold">Comprehensive Bilingual Examination paper with concept-wise explanation blocks.</p>
          </div>

          {/* Tab buttons to switch display style */}
          <div className="flex p-1 bg-gray-100 dark:bg-zinc-900 rounded-xl max-w-sm">
            <button
              onClick={() => setPaperMode("document")}
              className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all cursor-pointer ${
                paperMode === "document"
                ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Official PDF View
            </button>
            <button
              onClick={() => {
                setPaperMode("practice");
                resetPractice();
              }}
              className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all cursor-pointer ${
                paperMode === "practice"
                ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Interactive Practice Mode
            </button>
          </div>

          {/* Main Booklet container */}
          {paperMode === "document" ? (
            <div className="bg-amber-50/20 shadow-2xs border border-amber-100/60 p-6 md:p-8 rounded-3xl space-y-8 max-w-4xl mx-auto dark:bg-zinc-900 overflow-hidden font-serif dark:border-zinc-850">
              <div className="text-center font-bold font-mono pb-6 border-b-2 border-dashed border-gray-300 dark:border-zinc-800 text-xs text-gray-500 space-y-1">
                <p className="tracking-widest uppercase font-extrabold text-amber-9000 text-amber-500">TAMIL NADU PUBLIC SERVICE COMMISSION BOOKLET</p>
                <p>DO NOT BREAK SEAL UNTIL ADVISED</p>
                <p className="text-[10px]">Year Code: Group IV / {selectedPaper.year}</p>
                <p className="text-[10px] text-zinc-400">Total time allocated: 3 Hours</p>
              </div>

              <div className="space-y-8 divide-y divide-gray-200 dark:divide-zinc-800 pt-4">
                {selectedPaper.questions.map((q, idx) => (
                  <div key={q.id} className={`${idx > 0 ? "pt-6" : ""} space-y-3`}>
                    <p className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md inline-block">
                      Section: {q.section}
                    </p>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-relaxed">
                      <span className="font-sans mr-1">{idx + 1}.</span> {q.question}
                    </h4>

                    {/* Renders options like an official paper with checkboxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = q.correctIndex === oIdx;
                        return (
                          <div 
                            key={oIdx}
                            className={`flex items-center gap-2 text-xs p-2.5 rounded-lg border ${
                              isCorrect 
                              ? "bg-emerald-500/10 border-emerald-400 text-emerald-700 dark:text-emerald-400 font-extrabold" 
                              : "border-transparent bg-transparent text-gray-650"
                            }`}
                          >
                            <span className="h-5 w-5 rounded-md bg-gray-150 border border-gray-200 dark:bg-zinc-800 dark:border-zinc-700 font-black text-[9px] flex items-center justify-center flex-shrink-0">
                              {["(A)", "(B)", "(C)", "(D)"][oIdx]}
                            </span>
                            <span>{opt}</span>
                            {isCorrect && <span className="text-[9px] uppercase font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded-md leading-none ml-2">Official Answer</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanations index */}
                    <div className="p-4 rounded-xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100/30 text-xs font-sans pl-12 relative overflow-hidden">
                      <span className="absolute left-3 top-3.5 text-lg">💡</span>
                      <p className="font-extrabold text-indigo-955 dark:text-indigo-400">Concept Explanation & Key Formula:</p>
                      <p className="text-gray-650 dark:text-zinc-350 mt-1 font-serif text-[11px] leading-relaxed block">{q.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            
            // Interactive exam practices Mode
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-indigo-50/20 dark:bg-indigo-950/20 border border-indigo-100/30 p-4 rounded-xl text-center text-xs text-gray-500 flex items-center justify-between">
                <span>Attempt the official past questions directly to test accuracy margins.</span>
                <button
                  onClick={resetPractice}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline"
                >
                  Clear Results Sheets
                </button>
              </div>

              <div className="space-y-6">
                {selectedPaper.questions.map((q, idx) => {
                  const selectedOpt = answers[q.id];
                  const isSubmitted = submitted[q.id];
                  
                  return (
                    <div key={q.id} className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 p-5 rounded-2xl shadow-sm">
                      <h4 className="font-black text-sm text-gray-900 dark:text-white flex items-start gap-2 leading-snug">
                        <span className="font-sans text-indigo-605">{idx + 1}.</span>
                        <span>{q.question}</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedOpt === oIdx;
                          const isCorrect = q.correctIndex === oIdx;
                          
                          let btnStyle = "border-gray-250 hover:bg-slate-50 text-gray-700 bg-white dark:bg-zinc-900 dark:border-zinc-800";
                          
                          if (isSubmitted) {
                            if (isCorrect) {
                              btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold";
                            } else if (isSelected) {
                              btnStyle = "border-rose-500 bg-rose-500/10 text-rose-600 font-bold";
                            } else {
                              btnStyle = "border-gray-100 opacity-50 text-gray-400";
                            }
                          } else if (isSelected) {
                            btnStyle = "border-indigo-650 bg-indigo-50 text-indigo-650 font-bold";
                          }

                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={isSubmitted}
                              onClick={() => handleSelectOption(q.id, oIdx)}
                              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isSubmitted && isCorrect && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-505 text-emerald-500" />}
                              {isSubmitted && isSelected && !isCorrect && <XCircle className="h-4.5 w-4.5 text-rose-505 text-rose-500" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {isSubmitted && (
                        <div className="mt-4 p-4 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/15 border border-indigo-100/30 text-xs leading-relaxed">
                          <p className="font-bold text-indigo-900 dark:text-indigo-400 mb-0.5">Explanation (விளக்கம்):</p>
                          <p className="text-gray-750 dark:text-zinc-300 font-serif text-[11px]">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
          )}

        </div>
      )}

    </div>
  );
}
