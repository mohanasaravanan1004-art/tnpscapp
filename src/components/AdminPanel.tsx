/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserProfile, StudentScoreHistory } from "../types";
import { 
  Lock, 
  Settings, 
  Users, 
  FilePlus2, 
  Database, 
  Cpu, 
  CheckCircle, 
  ShieldAlert,
  AlertTriangle,
  Flame,
  PlusSquare,
  Award
} from "lucide-react";

interface AdminPanelProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

// Mock student register index
const MOCK_REGISTERED_STUDENTS = [
  { id: "std_1", name: "Anbarasan M.", email: "anbu.vatta@tn.gov.in", streak: 12, accuracy: 88, status: "Active candidate" },
  { id: "std_2", name: "Senthil Kumar", email: "senthil99@gmail.com", streak: 3, accuracy: 74, status: "Active candidate" },
  { id: "std_3", name: "Priya Sundaram", email: "priya.sun@outlook.com", streak: 21, accuracy: 94, status: "Executive Premium" },
  { id: "std_4", name: "Muthu Selvam", email: "muthu_tnpsc@live.com", streak: 0, accuracy: 62, status: "Active candidate" }
];

export default function AdminPanel({ profile, setProfile }: AdminPanelProps) {
  const [adminTab, setAdminTab] = useState<"diagnostics" | "students" | "uploader">("diagnostics");
  
  // Custom syllabus uploader form state
  const [questionText, setQuestionText] = useState("");
  const [questionSection, setQuestionSection] = useState("general_studies");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [corrIdx, setCorrIdx] = useState(0);
  const [explainTxt, setExplainTxt] = useState("");
  
  const [uploaderStatus, setUploaderStatus] = useState<string | null>(null);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText || !optionA || !optionB) {
      alert("Please specify the question text and at least options A & B.");
      return;
    }

    setUploaderStatus("Authenticating cloud database writes...");
    setTimeout(() => {
      setUploaderStatus("Custom question node compiled and added successfully! (+15 XP Code Reward)");
      setProfile(p => ({ ...p, totalScore: p.totalScore + 15 }));
      
      // Reset form fields
      setQuestionText("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setExplainTxt("");
    }, 1500);
  };

  return (
    <div className="space-y-6" id="vetri_admin_backoffice_module">
      
      {/* Tab bar header */}
      <div className="flex p-1 bg-gray-100 dark:bg-zinc-900 rounded-xl max-w-md">
        <button
          onClick={() => { setAdminTab("diagnostics"); setUploaderStatus(null); }}
          className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all cursor-pointer ${
            adminTab === "diagnostics"
            ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-500 hover:text-gray-850"
          }`}
        >
          Diagnose Host
        </button>
        <button
          onClick={() => { setAdminTab("students"); setUploaderStatus(null); }}
          className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all cursor-pointer ${
            adminTab === "students"
            ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-500 hover:text-gray-850"
          }`}
        >
          Supervise Candidates
        </button>
        <button
          onClick={() => { setAdminTab("uploader"); setUploaderStatus(null); }}
          className={`flex-1 py-2 text-center text-xs font-black rounded-lg transition-all cursor-pointer ${
            adminTab === "uploader"
            ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-500 hover:text-gray-850"
          }`}
        >
          Draft Syllabus Nodes
        </button>
      </div>

      {/* VIEW 1: Diagnostics Panel */}
      {adminTab === "diagnostics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 p-6 rounded-2xl shadow-sm space-y-5">
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-zinc-800">
                <Cpu className="h-5 w-5 text-indigo-500" /> Virtual Server Diagnostics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl space-y-1">
                  <p className="text-[10px] h-3 text-gray-400 font-extrabold uppercase">Ingress Endpoint routing</p>
                  <p className="text-sm font-black text-gray-850 dark:text-white">PORT: 3000 (HTTPS Bound)</p>
                  <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">● Active State</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl space-y-1">
                  <p className="text-[10px] h-3 text-gray-400 font-extrabold uppercase">Runtime Core Stack</p>
                  <p className="text-sm font-black text-gray-850 dark:text-white">NodeJS Engine (CJS Transpile)</p>
                  <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">● TypeScript v5.8 Strip</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl space-y-1">
                  <p className="text-[10px] h-3 text-gray-400 font-extrabold uppercase">API Tunnel Status</p>
                  <p className="text-sm font-black text-gray-850 dark:text-white">Google Gemini v2p Flash</p>
                  <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">● Handshake established</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-xl space-y-1">
                  <p className="text-[10px] h-3 text-gray-400 font-extrabold uppercase">Local Storage Container</p>
                  <p className="text-sm font-black text-gray-850 dark:text-white">Web Sandbox Persistent</p>
                  <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">● SQLite / Local Key-Value</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 p-6 rounded-2xl shadow-sm space-y-3">
              <h4 className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5 border-b pb-2">
                <ShieldAlert className="h-4.5 w-4.5 text-indigo-505 text-indigo-600" /> Platform Security
              </h4>
              <p className="text-xs text-gray-550 dark:text-zinc-405 leading-relaxed font-serif">
                This is a local security dashboard simulation. Candidates can add draft questions directly. Production databases auto-backup schemas nightly to safeguard metrics.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Candidate Supervisor Index */}
      {adminTab === "students" && (
        <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b">
            <Users className="h-5 w-5 text-indigo-500" /> Registered Candidate Database Index
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-2">CANDIDATE NAME</th>
                  <th className="py-3 px-2">EMAIL CONTACT</th>
                  <th className="py-3 px-2 text-center">STUDY STREAK</th>
                  <th className="py-3 px-2 text-center">ACCURACY SCORE</th>
                  <th className="py-3 px-2 text-center">PRIVILEGE TIER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 dark:text-zinc-300">
                {MOCK_REGISTERED_STUDENTS.map(std => (
                  <tr key={std.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-2 font-black">{std.name}</td>
                    <td className="py-3.5 px-2 font-mono text-gray-500">{std.email}</td>
                    <td className="py-3.5 px-2 text-center font-bold text-amber-650 flex items-center justify-center gap-0.5">
                      <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> {std.streak} Days
                    </td>
                    <td className="py-3.5 px-2 text-center font-bold">{std.accuracy}%</td>
                    <td className="py-3.5 px-2 text-center font-semibold">
                      <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-405 text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {std.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: Syllabus Draft Uploader form */}
      {adminTab === "uploader" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 p-6 rounded-2xl shadow-sm">
            <h3 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b mb-5">
              <FilePlus2 className="h-5 w-5 text-indigo-500" /> Add Custom Assessment Node
            </h3>

            <form onSubmit={handleSubmitQuestion} className="space-y-4 text-xs font-semibold">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-400 uppercase font-bold text-[10px]">Subject Syllabus Section</label>
                  <select 
                    value={questionSection}
                    onChange={e => setQuestionSection(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 p-3 rounded-xl outline-none text-gray-700 dark:text-white"
                  >
                    <option value="general_studies">General Studies</option>
                    <option value="tamil">General Tamil</option>
                    <option value="aptitude">Aptitude & Mental Ability</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-400 uppercase font-bold text-[10px]">Correct Option Index</label>
                  <select 
                    value={corrIdx}
                    onChange={e => setCorrIdx(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 p-3 rounded-xl outline-none text-gray-700 dark:text-white"
                  >
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                    <option value={3}>Option D</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400 uppercase font-bold text-[10px]">Question draft body (வினா வாக்கியம்)</label>
                <textarea 
                  placeholder="Specify bilingual or single language question text..."
                  value={questionText}
                  onChange={e => setQuestionText(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 p-3 rounded-xl outline-none text-gray-700 dark:text-white font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-400 uppercase font-bold text-[10px]">Option A</label>
                  <input 
                    type="text" 
                    placeholder="Option A" 
                    value={optionA}
                    onChange={e => setOptionA(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 p-2.5 rounded-xl outline-none text-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400 uppercase font-bold text-[10px]">Option B</label>
                  <input 
                    type="text" 
                    placeholder="Option B" 
                    value={optionB}
                    onChange={e => setOptionB(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 p-2.5 rounded-xl outline-none text-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400 uppercase font-bold text-[10px]">Option C</label>
                  <input 
                    type="text" 
                    placeholder="Option C (Optional)" 
                    value={optionC}
                    onChange={e => setOptionC(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 p-2.5 rounded-xl outline-none text-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400 uppercase font-bold text-[10px]">Option D</label>
                  <input 
                    type="text" 
                    placeholder="Option D (Optional)" 
                    value={optionD}
                    onChange={e => setOptionD(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 p-2.5 rounded-xl outline-none text-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400 uppercase font-bold text-[10px]">Fact explanation & historical bibliography (விளக்கம்)</label>
                <textarea 
                  placeholder="Annotate correct option choice with background facts..."
                  value={explainTxt}
                  onChange={e => setExplainTxt(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 p-3 rounded-xl outline-none text-gray-700 dark:text-white font-serif text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-xl shadow-xs active:translate-y-0.5 transition-all outline-none"
              >
                Compile and Upload Question Node
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {uploaderStatus && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-805 dark:bg-emerald-950/20 dark:text-emerald-400 text-xs flex items-start gap-2 animate-pulse leading-relaxed">
                <span>🏆</span>
                <div>
                  <p className="font-extrabold text-xs uppercase">Publisher Alert:</p>
                  <p className="font-medium mt-0.5">{uploaderStatus}</p>
                </div>
              </div>
            )}

            <div className="p-6 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 rounded-2xl shadow-sm space-y-3">
              <h4 className="font-extrabold text-xs uppercase tracking-wide text-gray-400">Node Guidelines</h4>
              <p className="text-xs text-gray-550 dark:text-zinc-405 leading-relaxed font-serif">
                Drafted questions compile server-side and log simulated metadata writes. Verify alignment with TNPSC syllabus norms before publishing.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
