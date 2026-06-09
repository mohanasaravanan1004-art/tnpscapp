import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dns from "dns";

// Prevent resolution issues on local loopback
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily to protect against startup crashes if the key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// AI Study Planner and Doubt Solver API endpoints
app.post("/api/planner", async (req, res) => {
  const { subjectFocus, dailyHours, targetWeeks, weakAreas, userSelectedPlan } = req.body;
  const ai = getAiClient();

  if (!ai) {
    // If API key is missing or not configured, return a robust simulated responsive response
    return res.json({
      success: true,
      fallback: true,
      plan: `### 📚 Vetri Custom Study Plan (AI Demo Mode)
Since the Gemini API Key is loading or not yet configured in your panel, we have compiled a structural plan based on the standard TNPSC Group 4 Syllabus!

#### 🎯 Daily Goal: ${dailyHours || 4} Hours for ${targetWeeks || 8} Weeks
- **Target Subjects**: ${subjectFocus?.join(", ") || "General Tamil & General Studies"}
- **Focus Areas**: ${weakAreas || "Aptitude and History revision"}

---

#### 🗓️ Weekly Milestones
* **Weeks 1-2: Tamil Foundation (பொதுத் தமிழ்)**
  - Study 6th-8th Class Samacheer Kalvi Tamil Grammar (இலக்கணம்) and Literature (இலக்கியம்).
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

*🔥 Success Quote: "முயற்சி திருவினையாக்கும்" - Continual effort yields grand success.*`
    });
  }

  try {
    const systemPrompt = `You are "Vetri AI TNPSC Group 4 Advisor," an elite Tamil Nadu civil services coach. Your task is to generate a highly detailed, professional, and personalized study planner/schedule for a student preparing for the TNPSC Group 4 Exam.
The Group 4 Exam consists of:
1. General Tamil (பொதுத் தமிழ்) - 100 questions (150 marks) - Extremely important!
2. General Studies (பொது அறிவு) - 75 questions (112.5 marks)
3. Aptitude & Mental Ability (திறனறிவும் மனக்கணக்கு குறியீடும்) - 25 questions (37.5 marks)

The student provided these inputs:
- Subject Focus: ${subjectFocus?.join(", ")}
- Daily Study Limit: ${dailyHours} Hours
- Timeline: ${targetWeeks} Weeks
- Student's Weak Areas: ${weakAreas || "None specified, general syllabus spacing requested."}

Generate an extremely encouraging and structured weekly study timetable using Markdown format. Translate labels or keywords where helpful to bilingual format (Tamil and English) to match the cultural context of Tamil Nadu civil services. Highlight specific milestones, revision intervals, and practice strategies. Include a motivational Thirukkural with Tamil meanings to inspire the student. Keep the output clean, professional, and highly helpful.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Generate a custom study schedule based on my TNPSC exam preparation guidelines.",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      plan: response.text || "Failed to structure a plan. Please try again."
    });
  } catch (error: any) {
    console.error("AI Planner error:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

// Chat Doubt Solver API Endpoint
app.post("/api/chat", async (req, res) => {
  const { message, chatHistory } = req.body;
  const ai = getAiClient();

  if (!ai) {
    // Elegant system fallback response explaining historical contents instantly
    const lowerMsg = message.toLowerCase();
    let reply = "வணக்கம்! I am your Vetri TNPSC Tutor. I can answer any doubts about Tamil, Polity, Indian National Movement, History, Geography, and Science if Gemini API is active.\n\nHere is some instant info on the syllabus:\n- **General Tamil**: Divided into Part A (Grammar), Part B (Literature), Part C (Tamil Scholars).\n- **Aptitude**: Consists of Simplification, Percentage, HCF & LCM, Ratio, Simple & Compound Interest, Area, Volume, Time & Work.";
    
    if (lowerMsg.includes("tamil") || lowerMsg.includes("தமிழ்")) {
      reply = "📝 **Tamil Prep Tip:** Focus heavily on Class 6th to 10th school textbooks (Samacheer Kalvi). Part A (இலக்கணம்) contains 21 core grammatical topics which are highly scoring. Part B includes Thirukkural, Silappathikaram, and Manimekalai contents.";
    } else if (lowerMsg.includes("thirukkural") || lowerMsg.includes("திருக்குறள்")) {
      reply = "📖 **Thirukkural (திருக்குறள்) Details:**\nExams ask about 19 specific chapters (அதிகாரங்கள்) like Anbu, Panbu, Kalvi, Ozhukkam. Written by Thiruvalluvar, it contains 1330 Couplets (குறள்கள்) divided into Aram (Virtue), Porul (Wealth), and Inbam (Love).";
    } else if (lowerMsg.includes("polity") || lowerMsg.includes("ஆட்சியியல்")) {
      reply = "🏛️ **Indian Polity prep checklist:**\n1. Making of the Constitution, Preamble (முகவுரை).\n2. Citizenship, Fundamental Rights (அடிப்படை உரிமைகள்) - Part III, Articles 12-35.\n3. Directive Principles of State Policy (Part IV) & Fundamental Duties (Part IV-A).\n4. Union Executive & State Legislative.";
    }

    return res.json({
      success: true,
      fallback: true,
      reply
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: "You are Vetri TNPSC Tutor, an interactive civil services mentor helping Tamil students study for Group 4 exams. Answer questions in a balanced bilingual blend (Tamil and English) which is welcoming and extremely easy to understand. Keep your explanation highly precise, pointing out actual facts that appear frequently in TNPSC multiple-choice exams. If you quote poems or history dates, highlight them clearly.",
        temperature: 0.6,
      },
    });

    res.json({
      success: true,
      reply: response.text || "Sorry, I spent some time thinking but couldn't structure a comprehensive answer. Please ask again!"
    });
  } catch (error: any) {
    console.error("AI Chat doubt solver error:", error);
    res.status(500).json({ error: error.message || "Failed to process tutor instructions." });
  }
});

// Setup Vite Dev Middleware or Serve Production Build
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting at http://0.0.0.0:${PORT}`);
  });
}

startServer();
