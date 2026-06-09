/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SCHEMES_AND_NEWS } from "../data/currentAffairs";
import { CurrentAffairItem, UserProfile } from "../types";
import { 
  Sparkles, 
  Bookmark, 
  MapPin, 
  Award, 
  Search, 
  Filter, 
  Calendar,
  Layers,
  ChevronRight,
  BookmarkCheck,
  CheckCircle,
  Megaphone
} from "lucide-react";

interface CurrentAffairsProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export default function CurrentAffairs({ profile, setProfile }: CurrentAffairsProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [newsQuery, setNewsQuery] = useState("");
  
  // State for active expanded card to view extra details
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Manage News Bookmarking
  const toggleNewsBookmark = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const isBookmarked = profile.bookmarkedCurrentAffairs.includes(itemId);
    let updated: string[];

    if (isBookmarked) {
      updated = profile.bookmarkedCurrentAffairs.filter(id => id !== itemId);
    } else {
      updated = [...profile.bookmarkedCurrentAffairs, itemId];
    }

    setProfile(p => ({
      ...p,
      bookmarkedCurrentAffairs: updated,
      // Mini reward for study archives additions
      totalScore: p.totalScore + (isBookmarked ? -5 : 10)
    }));
  };

  const filteredNews = SCHEMES_AND_NEWS.filter(item => {
    const matchesFilter = activeFilter === "All" || 
      (activeFilter === "Weekly" && item.isWeekly) || 
      (activeFilter === "Monthly" && item.isMonthly) || 
      (activeFilter === item.category);

    const matchesQuery = item.title.toLowerCase().includes(newsQuery.toLowerCase()) ||
      item.tamilTitle.includes(newsQuery) ||
      item.content.toLowerCase().includes(newsQuery.toLowerCase());

    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-6" id="current_affairs_center_module">
      
      {/* Header Promo Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-indigo-950 p-6 md:p-8 rounded-2xl text-white shadow-sm border border-teal-800 bg-indigo-900">
        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 animate-pulse">
          <Megaphone className="h-4.5 w-4.5" /> Vetri CA Center
        </span>
        <h2 className="text-2xl md:text-3xl font-black mt-3">TNPSC Current Affairs Hub</h2>
        <p className="text-zinc-200 text-sm mt-1.5 leading-relaxed max-w-xl">
          State-wide schemes, welfare programs, archaeological updates, and budget highlights. General Tamil and General studies exams heavily weight current timelines.
        </p>

        {/* Quick query filter panel */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
            <input 
              type="text" 
              placeholder="Filter schemes, dates, regions (e.g. Keeladi, Pudhumai)..." 
              value={newsQuery}
              onChange={e => setNewsQuery(e.target.value)}
              className="w-full bg-emerald-950/40 border border-emerald-400/20 rounded-xl pl-9 pr-4 py-2.5 text-xs placeholder-emerald-300/80 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white outline-none font-sans"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto">
            {["All", "Schemes", "Tamil Nadu", "National", "Weekly", "Monthly"].map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`py-2 px-3 border rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === category
                  ? "bg-amber-400 text-indigo-950 border-amber-400 font-extrabold shadow-sm"
                  : "bg-indigo-950/45 border-indigo-400/20 hover:bg-indigo-900 text-indigo-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid for Cards news briefs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => {
            const isBookmarked = profile.bookmarkedCurrentAffairs.includes(news.id);
            const isExpanded = expandedId === news.id;
            
            return (
              <div 
                key={news.id}
                onClick={() => setExpandedId(isExpanded ? null : news.id)}
                className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-teal-400/20 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full">
                      {news.category} INFO
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{news.date}</span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-xs text-teal-600 dark:text-teal-450 font-bold mt-0.5 leading-snug">{news.tamilTitle}</p>
                  
                  {/* News Summary Content block */}
                  <div className={`text-xs text-gray-550 dark:text-zinc-350 leading-relaxed mt-4 font-serif ${isExpanded ? "" : "line-clamp-3 truncate-3-lines"}`}>
                    <p className="whitespace-pre-line">{news.content}</p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-zinc-805 flex items-center justify-between text-xs" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : news.id)}
                    className="text-teal-600 dark:text-teal-400 font-black flex items-center gap-0.5 select-none"
                  >
                    <span>{isExpanded ? "Close material view" : "Review study facts"}</span>
                    <ChevronRight className={`h-4 w-4 transform transition-transform ${isExpanded ? "rotate-90" : "group-hover:translate-x-0.5"}`} />
                  </button>

                  <button 
                    onClick={(e) => toggleNewsBookmark(news.id, e)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isBookmarked 
                      ? "bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100" 
                      : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-500 hover:text-gray-650"
                    }`}
                    title="Bookmark Information Card"
                  >
                    <BookmarkCheck className={`h-4.5 w-4.5 ${isBookmarked ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-850 rounded-2xl">
            <Layers className="h-10 w-10 text-gray-300 mx-auto" />
            <p className="text-sm font-bold text-gray-500 dark:text-zinc-450 mt-3">No matching current affairs articles located.</p>
            <button 
              onClick={() => {
                setActiveFilter("All");
                setNewsQuery("");
              }}
              className="text-indigo-600 dark:text-indigo-400 font-bold text-xs mt-1 underline"
            >
              Reset active search queries
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
