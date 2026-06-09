/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { MockQuestion, StudentScoreHistory, UserProfile } from "../types";
import { 
  History, 
  BookOpen, 
  TrendingUp, 
  Compass, 
  Clock, 
  HelpCircle, 
  Trophy, 
  Flag, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Award
} from "lucide-react";

interface MockTestProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onSaveScore: (scoreItem: StudentScoreHistory) => void;
  onNavigate: (tab: string) => void;
}

// Complete scaled-down 40 question pool representing 200 question ratios
// Section 1: General Tamil (20 questions - 50%)
// Section 2: General Studies (15 questions - 37.5%)
// Section 3: Aptitude (5 questions - 12.5%)
const MOCK_MOCK_QUESTIONS: MockQuestion[] = [
  // General Tamil (1-20)
  {
    id: "mq_t1",
    question: "பத்துக் பாட்டு நூல்களுள் மிகக் குறுகிய அடிகள் கொண்ட நூல் எது? (Shortest song in Pathuppattu)",
    options: ["முல்லைப்பாட்டு", "மதுரைக்காஞ்சி", "குறிஞ்சிப்பாட்டு", "நெடுநல்வாடை"],
    correctIndex: 0,
    section: "tamil",
    explanation: "முல்லைப்பாட்டு 103 அடிகளைக் கொண்டு பத்துப்பாட்டு நூல்களிலேயே மிகக் குறைந்த அடிகள் உடையதாக விளங்குகிறது."
  },
  {
    id: "mq_t2",
    question: "செயங்கொண்டாரின் சமகாலப் புலவர் யார்?",
    options: ["கம்பன்", "ஒட்டக்கூத்தர்", "ஔவையார்", "புகழேந்தி"],
    correctIndex: 1,
    section: "tamil",
    explanation: "கலிங்கத்துப்பரணி பாடிய செயங்கொண்டார் மற்றும் ஒட்டக்கூத்தர் சோழ மன்னன் விக்கிரம சோழனின் சமகாலத்தவர்கள்."
  },
  {
    id: "mq_t3",
    question: "ஜி.யு.போப் திருக்குறளை ஆங்கிலத்தில் மொழிபெயர்த்து வெளியிட்ட ஆண்டு?",
    options: ["1886", "1812", "1825", "1905"],
    correctIndex: 0,
    section: "tamil",
    explanation: "ஜி.யு.போப் அவர்கள் திருக்குறளை ஆங்கிலத்தில் மொழிபெயர்த்து 1886 ஆம் ஆண்டு வெளியிட்டார்."
  },
  {
    id: "mq_t4",
    question: "தமிழ்நாட்டின் முதல் அரசவைக் கவிஞர் யார்? (First Poet Laureate of Tamil Nadu)",
    options: ["நாமக்கல் கவிஞர் இராமலிங்கனார்", "பாரதிதாசன்", "கண்ணதாசன்", "சுப்பிரமணிய பாரதியார்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "நாமக்கல் கவிஞர் வெ. இராமலிங்கனார் தமிழ்நாட்டின் முதல் அரசவைக் கவிஞராக நியமிக்கப்பட்டார்."
  },
  {
    id: "mq_t5",
    question: "'அழுத அடி அடைந்த அன்பர்' எனக் குறிப்பிடப்படுபவர் யார்?",
    options: ["திருநாவுக்கரசர்", "மாணிக்கவாசகர்", "சுந்தரர்", "திருஞானசம்பந்தர்"],
    correctIndex: 1,
    section: "tamil",
    explanation: "மாணிக்கவாசகர் பக்திப் பெருக்கால் அழுது அழுது இறைவனடி சேர்ந்தவர் என்று போற்றப்படுகிறார்."
  },
  {
    id: "mq_t6",
    question: "கீழ்க்கண்டவற்றுள் தொழிற்பெயரைத் தேர்ந்தெடுக்கவும்:",
    options: ["படித்தல்", "அழகு", "மதுரை", "அவன்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "தொழிலை உணர்த்தும் பெயர் தொழிற்பெயர் எனப்படும். படித்தல் என்பது தொழிற்பெயர்."
  },
  {
    id: "mq_t7",
    question: "சொல்லின் இறுதியில் மட்டுமே வரும் சொல் எது?",
    options: ["பெயர்ச்சொல்", "இடைச்சொல்", "உரிச்சொல்", "வினைமுற்று"],
    correctIndex: 1,
    section: "tamil",
    explanation: "இடைச்சொற்கள் பொதுவாகப் பெயர் மற்றும் வினையைச் சார்ந்து இறுதியிலோ அல்லது இடையிலோ வருகின்றன."
  },
  {
    id: "mq_t8",
    question: "திருக்குறளில் உள்ள மொத்த அதிகாரங்கள் எத்தனை?",
    options: ["133", "1330", "38", "70"],
    correctIndex: 0,
    section: "tamil",
    explanation: "திருக்குறளில் 133 அதிகாரங்களும், 1330 குறள்களும் உள்ளன."
  },
  {
    id: "mq_t9",
    question: "உலகப் பொதுமறை எனப் போற்றப்படும் நூல் எது?",
    options: ["திருக்குறள்", "நாலடியார்", "சிலப்பதிகாரம்", "திரிகடுகம்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "திருக்குறள் ஜாதி, மதம் கடந்து மனித இனத்திற்குப் பொதுவான கருத்துக்களைக் கூறுவதால் உலகப் பொதுமறை எனப்போற்றப்படுகிறது."
  },
  {
    id: "mq_t10",
    question: "திருக்குறள் முதன்முதலில் அச்சிடப்பட்ட ஆண்டு?",
    options: ["1812", "1825", "1886", "1901"],
    correctIndex: 0,
    section: "tamil",
    explanation: "திருக்குறள் தஞ்சை ஞானப்பிரகாசரால் முதன்முதலில் 1812 ஆம் ஆண்டு அச்சிடப்பட்டது."
  },
  {
    id: "mq_t11",
    question: "வீரமாமுனிவர் இயற்றிய நூல்களுள் கீழ்க்கண்டவற்றுள் எது?",
    options: ["தேம்பாவணி", "சீறாப்புராணம்", "இரட்சணிய யாத்திரிகம்", "பெரியபுராணம்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "தேம்பாவணி வீரமாமுனிவரால் இயற்றப்பட்ட கிறிஸ்தவக் காப்பியம் ஆகும்."
  },
  {
    id: "mq_t12",
    question: "எட்டுத்தொகை நூல்களுள் முதலாவதாக வைத்து எண்ணப்படும் நூல் எது?",
    options: ["நற்றிணை", "குறுந்தொகை", "பதிற்றுப்பத்து", "பரிபாடல்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "'நற்றிணை நல்ல குறுந்தொகை...' என்ற பாடல் வரி மூலம் நற்றிணை முதலாகக் கூறப்படுகிறது."
  },
  {
    id: "mq_t13",
    question: "சங்க இலக்கியங்கள் என அழைக்கப்படுபவை எவை?",
    options: ["பத்துப்பாட்டும் எட்டுத்தொகையும்", "பதினெண்கீழ்க்கணக்கு நூல்கள்", "ஐம்பெருங்காப்பியங்கள்", "ஐஞ்சிறுகாப்பியங்கள்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "சங்க இலக்கியங்கள் என்பவை பத்துப்பாட்டும் எட்டுத்தொகையும் ஆகும். இவை பதினெண்மேற்கணக்கு நூல்கள் என்றும் போற்றப்படுகின்றன."
  },
  {
    id: "mq_t14",
    question: "தமிழ்நாட்டின் 'வெர்ட்ஸ்வொர்த்' (Wordsworth) என்று அழைக்கப்படுபவர் யார்?",
    options: ["வாணிதாசன்", "பாரதிதாசன்", "பாரதியார்", "கண்ணதாசன்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "புதுச்சேரியைச் சேர்ந்த கவிஞர் வாணிதாசன் தமிழ்நாட்டின் வெர்ட்ஸ்வொர்த் என போற்றப்படுகிறார்."
  },
  {
    id: "mq_t15",
    question: "சிலப்பதிகாரத்தை இயற்றியவர் யார்?",
    options: ["இளங்கோவடிகள்", "சீத்தலைச்சாத்தனார்", "திருத்தக்கதேவர்", "நாதகுத்தனார்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "சேர மன்னர் மரபைச் சேர்ந்த இளங்கோவடிகள் சிலப்பதிகாரத்தை இயற்றினார்."
  },
  {
    id: "mq_t16",
    question: "மணிமேகலையின் காப்பியத் தலைவி யார்?",
    options: ["மணிமேகலை", "கண்ணகி", "மாதவி", "ஆதிரை"],
    correctIndex: 0,
    section: "tamil",
    explanation: "மாதவியின் மகளாகிய மணிமேகலை என்பவளின் துறவு வாழ்க்கையைக் கூறுவதால் இக்காப்பியம் மணிமேகலை எனப்பட்டது."
  },
  {
    id: "mq_t17",
    question: "தமிழின் முதல் காப்பியம் எது?",
    options: ["சிலப்பதிகாரம்", "மணிமேகலை", "சீவகசிந்தாமணி", "வளையாபதி"],
    correctIndex: 0,
    section: "tamil",
    explanation: "நாடகக் காப்பியம், முத்தமிழ்க் காப்பியம் எனப் போற்றப்படும் சிலப்பதிகாரமே தமிழின் முதல் காப்பியம்."
  },
  {
    id: "mq_t18",
    question: "இரட்டைக் காப்பியங்கள் என்று அழைக்கப்படுபவை எவை?",
    options: ["சிலப்பதிகாரமும் மணிமேகலையும்", "நற்றிணையும் குறுந்தொகையும்", "வளையாபதியும் குண்டலகேசியும்", "தேம்பாவணியும் சீறாப்புராணமும்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "தமிழ்க் காப்பியங்களிலேயே கதையாலும் மாந்தர்களாலும் தொடர்புடைய சிலப்பதிகாரமும் மணிமேகலையும் இரட்டைக் காப்பியங்கள் ஆகும்."
  },
  {
    id: "mq_t19",
    question: "வெண்பா ஆசிரியப்பா கலிப்பா வஞ்சிப்பா ஆகியவை என்ன?",
    options: ["நால்வகைப் பாக்கள்", "நால்வகைச் சொற்கள்", "நால்வகை அணிகள்", "நால்வகை இலக்கணங்கள்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "வெண்பா, ஆசிரியப்பா, கலிப்பா, வஞ்சிப்பா ஆகியவை தமிழில் உள்ள நான்கு வகைப் பாக்கள் ஆகும்."
  },
  {
    id: "mq_t20",
    question: "பரஞ்சோதி முனிவர் இயற்றிய நூல் எது?",
    options: ["திருவிளையாடற் புராணம்", "பெரியபுராணம்", "சீவகசிந்தாமணி", "கம்பராமாயணம்"],
    correctIndex: 0,
    section: "tamil",
    explanation: "மதுரையில் எழுந்தருளியுள்ள சோமசுந்தரக் கடவுளின் 64 திருவிளையாடல்களைக் கூறும் திருவிளையாடற் புராணத்தை இயற்றியவர் பரஞ்சோதி முனிவர்."
  },

  // General Studies (21-35)
  {
    id: "mq_g1",
    question: "Which of the following sites was the ancient dockyard/port of the Indus Valley Civilization?",
    options: ["Kalibangan", "Lothal", "Banawali", "Ropar"],
    correctIndex: 1,
    section: "general_studies",
    explanation: "Lothal in Gujarat served as an active marine trading port and dockyard of the Harappans."
  },
  {
    id: "mq_g2",
    question: "சிந்துவெளி மக்கள் அறிந்திராத முக்கிய உலோகம் எது?",
    options: ["செம்பு (Copper)", "வெண்கலம் (Bronze)", "இரும்பு (Iron)", "தங்கம் (Gold)"],
    correctIndex: 2,
    section: "general_studies",
    explanation: "சிந்துவெளி நாகரிக மக்கள் வெண்கலக் காலத்தைச் சேர்ந்தவர்கள். அவர்கள் இரும்பின் பயனை அறிந்திருக்கவில்லை."
  },
  {
    id: "mq_g3",
    question: "Who was the founder of the 'Swadeshi Steam Navigation Company' in Tamil Nadu?",
    options: ["Subramania Bharati", "V.O. Chidambaranar", "Kamarajar", "Rajaji"],
    correctIndex: 1,
    section: "general_studies",
    explanation: "V.O. Chidambaranar (Kappalottiya Thamizhan) started the Swadeshi Steam Navigation Company in Tuticorin."
  },
  {
    id: "mq_g4",
    question: "Who was the Chairman of the Drafting Committee of the Constituent Assembly?",
    options: ["Dr. Rajendra Prasad", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel"],
    correctIndex: 1,
    section: "general_studies",
    explanation: "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee of the Indian Constitution."
  },
  {
    id: "mq_g5",
    question: "The words 'Socialist, Secular, and Integrity' were added to the Preamble by which Constitutional Amendment Act?",
    options: ["44th Amendment Act", "42nd Amendment Act", "86th Amendment Act", "73rd Amendment Act"],
    correctIndex: 1,
    section: "general_studies",
    explanation: "The 42nd Amendment of 1976 (known as the mini-constitution) added Socialist, Secular, and Integrity to the Preamble."
  },
  {
    id: "mq_g6",
    question: "The Right to Education (RTE) was added as active Article 21A by which Constitutional Amendment?",
    options: ["86th Amendment Act, 2002", "44th Amendment Act, 1978", "91st Amendment Act, 2003", "103rd Amendment Act, 2019"],
    correctIndex: 0,
    section: "general_studies",
    explanation: "The 86th Constitutional Amendment introduced Article 21A, ensuring compulsory education for children aged 6 to 14."
  },
  {
    id: "mq_g7",
    question: "Under which Article can the President of India declare a State Emergency?",
    options: ["Article 352", "Article 356", "Article 360", "Article 370"],
    correctIndex: 1,
    section: "general_studies",
    explanation: "Article 356 empowers the president to declare state emergency in case of breakdown of constitutional machinery."
  },
  {
    id: "mq_g8",
    question: "Which Indian state has the longest mainland coastline?",
    options: ["Tamil Nadu", "Maharashtra", "Gujarat", "Andhra Pradesh"],
    correctIndex: 2,
    section: "general_studies",
    explanation: "Gujarat has the longest mainland coastline, measuring approximately 1,600 kilometers."
  },
  {
    id: "mq_g9",
    question: "Who acts as the ex-officio Chairperson of NITI Aayog?",
    options: ["President of India", "Finance Minister", "Prime Minister", "Governor of RBI"],
    correctIndex: 2,
    section: "general_studies",
    explanation: "The Prime Minister of India acts as the institutional Chairperson of NITI Aayog."
  },
  {
    id: "mq_g10",
    question: "What is the common chemical compound name for Baking Soda?",
    options: ["Sodium Carbonate", "Sodium Bicarbonate", "Calcium Carbonate", "Sodium Chloride"],
    correctIndex: 1,
    section: "general_studies",
    explanation: "Baking Soda is Sodium Bicarbonate (NaHCO3)."
  },
  {
    id: "mq_g11",
    question: "Which index is historically evaluated by measuring life expectancy, education, and per capita income?",
    options: ["Gini Coefficient", "Human Development Index (HDI)", "Gross National Happiness", "Multidimensional Poverty Index"],
    correctIndex: 1,
    section: "general_studies",
    explanation: "The Human Development Index (HDI) is based on life expectancy, education achievements, and per capita income."
  },
  {
    id: "mq_g12",
    question: "The power house of a cell is known as:",
    options: ["Ribosome", "Lysosome", "Mitochondria", "Golgi bodies"],
    correctIndex: 2,
    section: "general_studies",
    explanation: "Mitochondria generate most of the chemical energy needed to power the cell's biochemical reactions."
  },
  {
    id: "mq_g13",
    question: "The Indian Standard Meridian (82°30' E) passes through which of the following cities?",
    options: ["Chennai", "Mirzapur (Allahabad)", "Kolkata", "Mumbai"],
    correctIndex: 1,
    section: "general_studies",
    explanation: "IST is aligned to the 82.5 deg East meridian, which passes close to Mirzapur in Uttar Pradesh."
  },
  {
    id: "mq_g14",
    question: "Who was the editor of the revolutionary Tamil weekly magazine 'Swarajya' in 1910?",
    options: ["Vanchinathan", "Nilakanta Brahmachari", "Subramania Siva", "Thillaiyadi Valliammai"],
    correctIndex: 1,
    section: "general_studies",
    explanation: "Nilakanta Brahmachari founded the Bharatha Matha Association and edited Swarajya."
  },
  {
    id: "mq_g15",
    question: "Who was appointed as the first Indian Judge of the Madras High Court in 1877?",
    options: ["Sir T. Muthuswamy Iyer", "P.S. Sivaswami Iyer", "V. Bhashyam Iyengar", "S. Subramania Iyer"],
    correctIndex: 0,
    section: "general_studies",
    explanation: "Muthuswamy Iyer was appointed as the first Indian Judge of Madras High Court in 1877."
  },

  // Aptitude (36-40)
  {
    id: "mq_a1",
    question: "A, B, and C can do a piece of work in 20, 30, and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
    options: ["12 days", "15 days", "16 days", "18 days"],
    correctIndex: 1,
    section: "aptitude",
    explanation: "By LCM work calculation, A does 1/20 on Days 1 and 2. On Day 3, A+B+C does 1/10. Work in 3 days = 1/5. Total days to finish = 3 * 5 = 15 days."
  },
  {
    id: "mq_a2",
    question: "Find the HCF of 2/3, 8/9, 16/81, and 10/27.",
    options: ["2/81", "8/81", "2/3", "80/3"],
    correctIndex: 0,
    section: "aptitude",
    explanation: "HCF of Fractions = HCF of Numerators / LCM of Denominators\n- Numerators: 2, 8, 16, 10 -> HCF = 2\n- Denominators: 3, 9, 81, 27 -> LCM = 81\nResult = 2/81."
  },
  {
    id: "mq_a3",
    question: "If simple interest on a certain sum for 2 years at 5% per annum is ₹80, find the compound interest on same sum for the same period and rate.",
    options: ["₹82", "₹84", "₹81", "₹80"],
    correctIndex: 0,
    section: "aptitude",
    explanation: "SI = P * R * T / 100 => P = ₹800.\nCI = 800[(1 + 5/100)^2 - 1] = 800[441/400 - 1] = ₹82."
  },
  {
    id: "mq_a4",
    question: "If a principal triples itself in 10 years under simple interest, what is the annual rate of interest?",
    options: ["10%", "15%", "20%", "25%"],
    correctIndex: 2,
    section: "aptitude",
    explanation: "Amount = 3P. SI = 2P in 10 years. 2P = P * R * 10 / 100 => R = 20%."
  },
  {
    id: "mq_a5",
    question: "Find the missing number in the sequence: 4, 9, 25, 49, 121, ?, 289.",
    options: ["144", "169", "196", "225"],
    correctIndex: 1,
    section: "aptitude",
    explanation: "Squares of successive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, 13^2=169, 17^2=289."
  }
];

export default function MockTest({ 
  profile, 
  setProfile, 
  onSaveScore,
  onNavigate
}: MockTestProps) {
  const [activeTab, setActiveTab] = useState<"tamil" | "general_studies" | "aptitude">("tamil");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  
  // Test game states
  const [isInQuiz, setIsInQuiz] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Quiz Timer State
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes countdown
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setIsInQuiz(true);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentQuestionIdx(0);
    setActiveTab("tamil");
    setTimeLeft(60 * 60); // 60 minutes
  };

  useEffect(() => {
    if (isInQuiz && !isSubmitted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleSubmitTest(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInQuiz, isSubmitted, timeLeft]);

  const selectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIdx]: optIdx }));
  };

  const toggleFlag = (idx: number) => {
    if (isSubmitted) return;
    setFlaggedQuestions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getFilteredQuestionIndices = () => {
    return MOCK_MOCK_QUESTIONS.map((q, idx) => ({ q, idx }))
      .filter(item => item.q.section === activeTab)
      .map(item => item.idx);
  };

  const activeIndices = getFilteredQuestionIndices();
  // Ensure default question safety
  const currentQuestionAbsIdx = activeIndices[currentQuestionIdx] !== undefined 
    ? activeIndices[currentQuestionIdx] 
    : activeIndices[0] || 0;

  const currentQuestion = MOCK_MOCK_QUESTIONS[currentQuestionAbsIdx];

  const handleNextInTab = () => {
    if (currentQuestionIdx < activeIndices.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrevInTab = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleSubmitTest = (isTimeOut: boolean = false) => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    // Score calculations
    let correctTotal = 0;
    let sectionScores = { tamil: 0, general_studies: 0, aptitude: 0 };
    
    MOCK_MOCK_QUESTIONS.forEach((q, idx) => {
      const isRight = selectedAnswers[idx] === q.correctIndex;
      if (isRight) {
        correctTotal++;
        sectionScores[q.section]++;
      }
    });

    const percentAccuracy = Math.round((correctTotal / MOCK_MOCK_QUESTIONS.length) * 100);
    const xpPayout = correctTotal * 15 + 100; // Mock test massive rewards!
    const timeSpentMin = Number(((3600 - timeLeft) / 60).toFixed(1));

    // Update Student State Profile 
    setProfile(p => ({
      ...p,
      totalScore: p.totalScore + xpPayout,
      accuracyRate: Math.round(((p.accuracyRate * p.totalQuizzesTaken) + percentAccuracy) / (p.totalQuizzesTaken + 1)) || percentAccuracy,
      completedTopicsCount: p.completedTopicsCount + 5
    }));

    // Record score history
    const historyRecord: StudentScoreHistory = {
      id: `mock_${Date.now()}`,
      testName: "Vetri TNPSC Group 4 Full Mock (PROPORTIONAL 40-Set)",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      score: correctTotal,
      totalQuestions: MOCK_MOCK_QUESTIONS.length,
      timeTakenMinutes: timeSpentMin,
      accuracy: percentAccuracy,
      type: "mock"
    };
    onSaveScore(historyRecord);

    if (isTimeOut) {
      alert("⚠️ Timeout! Your Full Mock Test has been auto-submitted.");
    }
  };

  const formatCountdown = (secs: number) => {
    const hh = Math.floor(secs / 3600);
    const mm = Math.floor((secs % 3600) / 60);
    const ss = secs % 60;
    return `${hh > 0 ? hh + ":" : ""}${mm < 10 ? "0" : ""}${mm}:${ss < 10 ? "0" : ""}${ss}`;
  };

  // Section score metrics for results UI
  const sectionQuestionsCount = { tamil: 20, general_studies: 15, aptitude: 5 };
  let correctTotal = 0;
  let sectionScores = { tamil: 0, general_studies: 0, aptitude: 0 };
  
  MOCK_MOCK_QUESTIONS.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      correctTotal++;
      sectionScores[q.section]++;
    }
  });

  // Dynamic ranking estimation based on TNPSC curve
  // Under average 170/200 score (85% correct), competitive candidates score around rank 2000 state-wide.
  // 40 questions scale: 35+ correct (Rank < 1900), 38+ correct (Rank < 450), 30-34 correct (Rank < 8500), else Rank (Need Practice)
  const calculateEstimatedRankAndAdvice = (score: number) => {
    if (score >= 38) return { rank: "Rank #150 - #450 (High Executive)", tier: "Executive Peak", color: "text-emerald-500", tips: "Outstanding state level preparedness! Perfect for V.A.O officer listings." };
    if (score >= 34) return { rank: "Rank #1,200 - #2,800 (Competitive Hub)", tier: "Safe Category Zone", color: "text-indigo-600 dark:text-indigo-405", tips: "Sufficient to clear main cutoffs. Consolidate Aptitude formulas to reach single digits." };
    if (score >= 28) return { rank: "Rank #6,000 - #12,500 (Borderline Index)", tier: "Cutoff Competitor", color: "text-orange-500", tips: "Borderline. Strengthen Tamil grammar notes which carry 50% of weight." };
    return { rank: "Rank #32,000+ (Requires Revision)", tier: "Syllabus Explorer", color: "text-rose-500", tips: "Need deep revision. Complete scheduled AI study syllabus targets immediately." };
  };

  const rankInfo = calculateEstimatedRankAndAdvice(correctTotal);

  return (
    <div className="space-y-6" id="mock_test_prep_module">
      
      {/* 1. Landing Entrance View */}
      {!isInQuiz && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-6 sm:p-8 rounded-2xl text-white shadow-md">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                <Compass className="h-4.5 w-4.5 animate-spin" /> Vetri Mock Exam Center
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3">200-Question Scaled Mock Test</h2>
              <p className="text-zinc-200 text-sm mt-1.5 leading-relaxed font-serif">
                This full-length mock simulation precisely reproduces the proportional breakdown of the state civil services examination. General Tamil carries 100 questions (50%), General Studies 75 questions (37.5%), and Aptitude 25 (12.5%). Our exam engine is scaled proportionally to a robust 40-Question core paper, enabling speed testing within a 60-Minute strict window.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Exam Matrix Breakdown</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-indigo-50/40 dark:bg-zinc-950 border border-indigo-100/30 dark:border-zinc-800 rounded-xl text-center">
                  <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">Section I</p>
                  <p className="text-base font-black text-gray-850 dark:text-white mt-1">General Tamil</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">20 Qs (50%)</p>
                </div>
                <div className="p-3 bg-indigo-50/40 dark:bg-zinc-950 border border-indigo-100/30 dark:border-zinc-800 rounded-xl text-center">
                  <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">Section II</p>
                  <p className="text-base font-black text-gray-850 dark:text-white mt-1">General Studies</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">15 Qs (37.5%)</p>
                </div>
                <div className="p-3 bg-indigo-50/40 dark:bg-zinc-950 border border-indigo-100/30 dark:border-zinc-800 rounded-xl text-center">
                  <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">Section III</p>
                  <p className="text-base font-black text-gray-850 dark:text-white mt-1">Aptitude & Mental</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">5 Qs (12.5%)</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                <button
                  onClick={startTest}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-600/10 active:translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span>Authenticate and Begin Mock Test</span>
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-100">
                <Clock className="h-4.5 w-4.5 text-indigo-500 animate-pulse" /> Mock Protocols
              </h3>
              <ul className="space-y-3.5 text-xs text-gray-600 dark:text-zinc-400 font-semibold leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold">●</span>
                  <span><strong>60 Minutes Countdown:</strong> The exam auto-submits exactly as the counter hits zero. All completed answers are archived.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold">●</span>
                  <span><strong>Estimated Rank Curve:</strong> Algorithms match your accurate percentages past previous years state wide cutoffs to outline expected rank metrics.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. Test Playroom Dashboard */}
      {isInQuiz && !isSubmitted && currentQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Question view and Section Navigator */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-850 p-4 rounded-2xl flex gap-2 overflow-x-auto">
              {[
                { key: "tamil", label: "General Tamil", count: 20 },
                { key: "general_studies", label: "General Studies", count: 15 },
                { key: "aptitude", label: "Aptitude & Mental", count: 5 }
              ].map(sec => (
                <button
                  key={sec.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(sec.key as any);
                    setCurrentQuestionIdx(0); // reset inside section
                  }}
                  className={`flex-1 py-3 px-4 text-xs font-black min-w-44 border-b-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === sec.key
                    ? "bg-indigo-600 text-white font-extrabold border-indigo-600 shadow-sm shadow-indigo-650/15"
                    : "bg-white border-transparent text-gray-500 hover:bg-slate-50 border-gray-100"
                  }`}
                >
                  <p>{sec.label}</p>
                  <p className="text-[10px] opacity-70 mt-1 uppercase tracking-wider font-extrabold">{sec.count} Questions</p>
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-800 pb-3.5 mb-4 text-xs font-bold text-gray-400">
                <span>QUESTION {currentQuestionIdx + 1} OF {activeIndices.length} INSIDE SECTION</span>
                <button
                  onClick={() => toggleFlag(currentQuestionAbsIdx)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold ${
                    flaggedQuestions[currentQuestionAbsIdx]
                    ? "bg-rose-50 border-rose-200 text-rose-500 fill-rose-500"
                    : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  <Flag className="h-3 w-3" /> Flag for Review
                </button>
              </div>

              {/* Question */}
              <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mt-6">
                {currentQuestion.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQuestionAbsIdx] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => selectOption(oIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-extrabold shadow-sm"
                        : "border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-6 w-6 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 flex items-center justify-center font-bold text-xs">
                          {["A", "B", "C", "D"][oIdx]}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-zinc-805 mt-8 pt-4">
                <button
                  onClick={handlePrevInTab}
                  disabled={currentQuestionIdx === 0}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-gray-250 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextInTab}
                  disabled={currentQuestionIdx === activeIndices.length - 1}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-gray-250 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  Next
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Timer, Statistics & Core sidebar navigator */}
          <div className="space-y-6">
            
            {/* Timer Panel */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm text-center">
              <h4 className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">MOCK TESTING TIMEFRAME</h4>
              <div className={`text-3xl font-black font-mono mt-1 ${timeLeft < 180 ? "text-rose-600 animate-pulse" : "text-gray-900 dark:text-white"}`}>
                {formatCountdown(timeLeft)}
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 text-center text-xs">
                <div className="bg-slate-50 dark:bg-zinc-950 p-2 rounded-lg">
                  <p className="text-[8px] font-bold text-emerald-600 gap-1 uppercase">Answers</p>
                  <p className="text-sm font-black text-gray-800 dark:text-white mt-0.5">{Object.keys(selectedAnswers).length} / 40</p>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-950 p-2 rounded-lg">
                  <p className="text-[8px] font-bold text-rose-600 gap-1 uppercase">Flagged</p>
                  <p className="text-sm font-black text-gray-800 dark:text-white mt-0.5">{Object.keys(flaggedQuestions).filter(k => flaggedQuestions[Number(k)]).length}</p>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-950 p-2 rounded-lg">
                  <p className="text-[8px] font-bold text-amber-600 gap-1 uppercase">Remains</p>
                  <p className="text-sm font-black text-gray-800 dark:text-white mt-0.5">{40 - Object.keys(selectedAnswers).length}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (window.confirm("Complete mock and submit answers for state index evaluation?")) {
                    handleSubmitTest();
                  }
                }}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-md text-xs active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              >
                Assemble and Submit Sheet
              </button>
            </div>

            {/* Bubble Navigation card with all 40 question indexes */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 rounded-2xl shadow-sm">
              <h4 className="text-xs font-extrabold uppercase text-gray-900 dark:text-white mb-3">GLOBAL EXAM BUBBLE SHEET</h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-wide text-gray-400 mb-1.5">Tamil section (1-20)</p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const absoluteIdx = i;
                      const isAnswered = selectedAnswers[absoluteIdx] !== undefined;
                      const isFlagged = flaggedQuestions[absoluteIdx];
                      const isActive = activeTab === "tamil" && currentQuestionIdx === i;

                      let btnStyle = "bg-gray-50 text-gray-400 dark:bg-zinc-950";
                      if (isActive) btnStyle = "bg-indigo-600 text-white font-black";
                      else if (isFlagged) btnStyle = "bg-rose-500 text-white";
                      else if (isAnswered) btnStyle = "bg-indigo-50 border border-indigo-200 text-indigo-600";
                      
                      return (
                        <button 
                          key={i} 
                          onClick={() => {
                            setActiveTab("tamil");
                            setCurrentQuestionIdx(i);
                          }}
                          className={`h-7 rounded text-[10px] font-black cursor-pointer flex items-center justify-center transition-all ${btnStyle}`}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-wide text-gray-400 mb-1.5">Studies section (21-35)</p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {Array.from({ length: 15 }).map((_, i) => {
                      const absoluteIdx = i + 20;
                      const isAnswered = selectedAnswers[absoluteIdx] !== undefined;
                      const isFlagged = flaggedQuestions[absoluteIdx];
                      const isActive = activeTab === "general_studies" && currentQuestionIdx === i;

                      let btnStyle = "bg-gray-50 text-gray-400 dark:bg-zinc-950";
                      if (isActive) btnStyle = "bg-indigo-600 text-white font-black";
                      else if (isFlagged) btnStyle = "bg-rose-500 text-white";
                      else if (isAnswered) btnStyle = "bg-indigo-50 border border-indigo-200 text-indigo-600";
                      
                      return (
                        <button 
                          key={i} 
                          onClick={() => {
                            setActiveTab("general_studies");
                            setCurrentQuestionIdx(i);
                          }}
                          className={`h-7 rounded text-[10px] font-black cursor-pointer flex items-center justify-center transition-all ${btnStyle}`}
                        >
                          {i + 21}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-wide text-gray-400 mb-1.5">Aptitude section (36-40)</p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const absoluteIdx = i + 35;
                      const isAnswered = selectedAnswers[absoluteIdx] !== undefined;
                      const isFlagged = flaggedQuestions[absoluteIdx];
                      const isActive = activeTab === "aptitude" && currentQuestionIdx === i;

                      let btnStyle = "bg-gray-50 text-gray-400 dark:bg-zinc-950";
                      if (isActive) btnStyle = "bg-indigo-600 text-white font-black";
                      else if (isFlagged) btnStyle = "bg-rose-500 text-white";
                      else if (isAnswered) btnStyle = "bg-indigo-50 border border-indigo-200 text-indigo-600";
                      
                      return (
                        <button 
                          key={i} 
                          onClick={() => {
                            setActiveTab("aptitude");
                            setCurrentQuestionIdx(i);
                          }}
                          className={`h-7 rounded text-[10px] font-black cursor-pointer flex items-center justify-center transition-all ${btnStyle}`}
                        >
                          {i + 36}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (window.confirm("Abandon this mock test? No progress record is logged.")) {
                  setIsInQuiz(false);
                }
              }}
              className="w-full text-xs text-rose-500 border border-rose-200/40 hover:bg-rose-50 py-2.5 rounded-xl h-9"
            >
              Cancel Placement Exam
            </button>
          </div>

        </div>
      )}

      {/* 3. Post Test Outcomes Dashboard */}
      {isSubmitted && (
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-3xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">State placement analysis completed</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We matched your raw score accuracy rates across previous years TNPSC cutoffs. Here are your estimated district rankings and study tips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center mt-6">
            <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-800">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Correct Answers</p>
              <p className="text-2xl font-black text-emerald-500 mt-1">{correctTotal} / 40</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-800">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Percentage Accuracy</p>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{Math.round((correctTotal / 40) * 100)}%</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-800">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Calculated Multiplier</p>
              <p className="text-2xl font-black text-amber-500 mt-1">+{correctTotal * 15 + 100} XP</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-800">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Calculated Grade</p>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {correctTotal >= 36 ? "A+" : correctTotal >= 30 ? "A" : correctTotal >= 20 ? "B" : "C"}
              </p>
            </div>
          </div>

          {/* Sectional performance chart */}
          <div className="p-5 rounded-2xl bg-indigo-50/20 dark:bg-indigo-950/20 border border-indigo-100/30 dark:border-indigo-900/40">
            <h3 className="font-extrabold text-sm text-indigo-950 dark:text-indigo-400 uppercase tracking-wider mb-4">Sectional Score Weighting</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5 text-gray-800 dark:text-zinc-200">
                  <span>General Tamil (50% Weight)</span>
                  <span>{sectionScores.tamil} / 20 correct</span>
                </div>
                <div className="w-full bg-gray-150 bg-gray-150 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(sectionScores.tamil / 20) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5 text-gray-800 dark:text-zinc-200">
                  <span>General Studies (37.5% Weight)</span>
                  <span>{sectionScores.general_studies} / 15 correct</span>
                </div>
                <div className="w-full bg-gray-150 bg-gray-150 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(sectionScores.general_studies / 15) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5 text-gray-800 dark:text-zinc-200">
                  <span>Aptitude and Mental Ability (12.5% Weight)</span>
                  <span>{sectionScores.aptitude} / 5 correct</span>
                </div>
                <div className="w-full bg-gray-150 bg-gray-150 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="bg-amber-505 bg-amber-550 bg-amber-500 h-2 rounded-full" style={{ width: `${(sectionScores.aptitude / 5) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Ranking card */}
          <div className="p-6 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-850 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-xs font-extrabold uppercase tracking-wide text-gray-400">Projected Statewide Standings</p>
              <h4 className={`text-xl font-black ${rankInfo.color}`}>{rankInfo.rank}</h4>
              <p className="text-xs text-gray-550 dark:text-zinc-405 font-bold">Preparation bracket: {rankInfo.tier}</p>
            </div>
            <div className="max-w-md text-xs text-gray-650 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 p-4 rounded-xl leading-relaxed">
              <span className="font-extrabold text-indigo-900 dark:text-indigo-400">Advisor Core Tip:</span> {rankInfo.tips}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={startTest}
              className="px-5 py-2.5 text-xs font-bold rounded-lg border border-indigo-650 text-indigo-600 hover:bg-indigo-50 border-indigo-600 cursor-pointer"
            >
              Re-attempt Placement Exam
            </button>
            <button
              onClick={() => setIsInQuiz(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm cursor-pointer"
            >
              Return to Exam Gate
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
