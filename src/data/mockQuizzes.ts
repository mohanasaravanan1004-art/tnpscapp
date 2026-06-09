/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PracticeQuestion, Quiz } from "../types";

export const MASTER_QUIZ_POOL: PracticeQuestion[] = [
  {
    id: "mq_t1",
    question: "பத்துக் பாட்டு நூல்களுள் மிகக் குறுகிய அடிகள் கொண்ட நூல் எது? (Shortest song in Pathuppattu)",
    options: [
      "முல்லைப்பாட்டு (Mullaippattu)",
      "மதுரைக்காஞ்சி (Maduraikkiñci)",
      "குறிஞ்சிப்பாட்டு (Kuriñcippattu)",
      "நெடுநல்வாடை (Nedunalvaadai)"
    ],
    correctIndex: 0,
    explanation: "முல்லைப்பாட்டு 103 அடிகளைக் கொண்டு பத்துப்பாட்டு நூல்களிலேயே மிகக் குறைந்த அடிகள் உடையதாக விளங்குகிறது. மதுரைக்காஞ்சி 782 அடிகளைக் கொண்டு மிக நீளமான நூலாக விளங்குகிறது."
  },
  {
    id: "mq_t2",
    question: "செயங்கொண்டாரின் சமகாலப் புலவர் யார்?",
    options: [
      "கம்பன்",
      "ஒட்டக்கூத்தர்",
      "ஔவையார்",
      "புகழேந்தி"
    ],
    correctIndex: 1,
    explanation: "கலிங்கத்துப்பரணி பாடிய செயங்கொண்டார் மற்றும் ஒட்டக்கூத்தர் ஆகியோர் சோழ மன்னன் விக்கிரம சோழனின் சமகாலத்தவர்களாக வாழ்ந்தனர்."
  },
  {
    id: "mq_t3",
    question: "ஜி.யு.போப் திருக்குறளை ஆங்கிலத்தில் மொழிபெயர்த்து வெளியிட்ட ஆண்டு எது? (Year G.U. Pope translated Thirukkural to English)",
    options: [
      "1886",
      "1812",
      "1825",
      "1905"
    ],
    correctIndex: 0,
    explanation: "ஜி.யு.போப் அவர்கள் தனது தீவிர முயற்சியால் திருக்குறளை முறைப்படி ஆங்கிலத்தில் மொழிபெயர்த்து 1886 ஆம் ஆண்டு வெளியிட்டார்."
  },
  {
    id: "mq_t4",
    question: "'இந்தியாவின் பறவை மனிதர்' என்று அழைக்கப்படுபவர் யார்? (Birdman of India)",
    options: [
      "சலீம் அலி (Dr. Salim Ali)",
      "மயில்சாமி அண்ணாதுரை (Mylswamy Annadurai)",
      "சதீஷ் தவான் (Satish Dhawan)",
      "எம்.எஸ்.சுவாமிநாதன் (M.S. Swaminathan)"
    ],
    correctIndex: 0,
    explanation: "டாக்டர் சலீம் அலி இந்தியாவின் முன்னணி பறவையியல் வல்லுநர் மற்றும் இயற்கை ஆர்வலர் ஆவார்."
  },
  {
    id: "mq_p1",
    question: "The Right to Education (RTE) was added as active Article 21A to the Indian Constitution by which Constitutional Amendment Act?",
    options: [
      "86th Amendment Act, 2002",
      "44th Amendment Act, 1978",
      "91st Amendment Act, 2003",
      "103rd Amendment Act, 2019"
    ],
    correctIndex: 0,
    explanation: "The 86th Constitutional Amendment introduced Article 21A, ensuring free and compulsory education as a fundamental right for children aged 6 to 14."
  },
  {
    id: "mq_p2",
    question: "Under which Article of the Constitution can the President of India declare a State Emergency / President's Rule?",
    options: [
      "Article 352",
      "Article 356",
      "Article 360",
      "Article 370"
    ],
    correctIndex: 1,
    explanation: "Article 356 empowers the president to declare state emergency in case of breakdown of constitutional machinery. Article 352 is National Emergency, Article 360 is Financial Emergency."
  },
  {
    id: "mq_h1",
    question: "Where did V.O. Chidambaranar register his Swadeshi Steam Navigation Company on 16th October 1906?",
    options: [
      "Madurai",
      "Tuticorin",
      "Madras",
      "Tirunelveli"
    ],
    correctIndex: 1,
    explanation: "V.O.C registered the company in Tuticorin closely with local merchants, aiming to counter the monopoly of the British India Steam Navigation Company."
  },
  {
    id: "mq_h2",
    question: "Who was the editor of the revolutionary Tamil weekly magazine 'Swarajya' and founded 'Bharatha Matha Association' in 1910?",
    options: [
      "Vanchinathan",
      "Nilakanta Brahmachari",
      "Subramania Siva",
      "Thillaiyadi Valliammai"
    ],
    correctIndex: 1,
    explanation: "Nilakanta Brahmachari founded the secret Bharatha Matha Society, a radical revolutionary wing modeled on local patriotism, based in Sengottai/Tirunelveli."
  },
  {
    id: "mq_g1",
    question: "Which Indian state has the longest mainland coastline?",
    options: [
      "Tamil Nadu",
      "Maharashtra",
      "Gujarat",
      "Andhra Pradesh"
    ],
    correctIndex: 2,
    explanation: "Gujarat has the longest coastline in mainland India, measuring approximately 1,600 kilometers, followed by Andhra Pradesh."
  },
  {
    id: "mq_g2",
    question: "Where is the Silent Valley National Park located in India?",
    options: [
      "Tamil Nadu",
      "Kerala",
      "Karnataka",
      "Uttarakhand"
    ],
    correctIndex: 1,
    explanation: "Silent Valley National Park is located in the Palakkad district of Kerala, within the Western Ghats biodiversity hotspot."
  },
  {
    id: "mq_e1",
    question: "The tagline of NITI Aayog is centered on which major cooperative philosophy?",
    options: [
      "Sabka Saath Sabka Vikas",
      "Cooperative Federalism",
      "Sustainable development always",
      "Growth with social justice"
    ],
    correctIndex: 1,
    explanation: "NITI Aayog acts as the ultimate platform to foster 'Cooperative Federalism', where states work systematically alongside central administrations."
  },
  {
    id: "mq_e2",
    question: "Which index is historically evaluated by measuring life expectancy, education, and per capita income?",
    options: [
      "Gini Coefficient",
      "Human Development Index (HDI)",
      "Gross National Happiness (GNH)",
      "Multidimensional Poverty Index"
    ],
    correctIndex: 1,
    explanation: "The Human Development Index (HDI) compiles three basic parameters: life expectancy at birth, education achievement levels, and Gross National Income."
  },
  {
    id: "mq_s1",
    question: "What is the common chemical compound name for Baking Soda?",
    options: [
      "Sodium Carbonate",
      "Sodium Bicarbonate",
      "Calcium Carbonate",
      "Sodium Chloride"
    ],
    correctIndex: 1,
    explanation: "Baking Soda is NaHCO3 (Sodium Bicarbonate). Washing Soda is Na2CO3 (Sodium Carbonate)."
  },
  {
    id: "mq_s2",
    question: "The power house of a cell is known as:",
    options: [
      "Ribosome",
      "Lysosome",
      "Mitochondria",
      "Golgi bodies"
    ],
    correctIndex: 2,
    explanation: "Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell's biochemical reactions."
  },
  {
    id: "mq_a1",
    question: "A, B, and C can do a piece of work in 20, 30, and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
    options: [
      "12 days",
      "15 days",
      "16 days",
      "18 days"
    ],
    correctIndex: 1,
    explanation: "Day 1: A does 1/20. Day 2: A does 1/20. Day 3: A+B+C does 1/20 + 1/30 + 1/60 = 6/60 = 1/10.\nWork in 3 days = 1/20 + 1/20 + 1/10 = 1/5.\nTo complete 1 Unit, it takes 3 * 5 = 15 days."
  },
  {
    id: "mq_a2",
    question: "Find the HCF of 2/3, 8/9, 16/81, and 10/27.",
    options: [
      "2/81",
      "8/81",
      "2/3",
      "80/3"
    ],
    correctIndex: 0,
    explanation: "HCF of Fractions = HCF of Numerators / LCM of Denominators\n- Numerators: 2, 8, 16, 10 -> HCF is 2\n- Denominators: 3, 9, 81, 27 -> LCM is 81\nResult: 2/81."
  },
  {
    id: "mq_a3",
    question: "If simple interest on a certain sum for 2 years at 5% per annum is ₹80, find the compound interest on same sum for the same period and rate.",
    options: [
      "₹82",
      "₹84",
      "₹81",
      "₹80"
    ],
    correctIndex: 0,
    explanation: "SI = P * R * T / 100 => 80 = P * 5 * 2 / 100 => P = ₹800.\nFor Compound interest:\nCI = 800[(1 + 5/100)^2 - 1] = 800[(21/20)^2 - 1] = 800[441/400 - 1] = 800[41/400] = ₹82."
  },
  {
    id: "mq_t5",
    question: "தமிழ்நாட்டின் முதல் அரசவைக் கவிஞர் யார்? (First Poet Laureate of Tamil Nadu)",
    options: [
      "பாரதிதாசன் (Bharathidasan)",
      "நாமக்கல் கவிஞர் இராமலிங்கனார் (Namakkal Ramalingam Pillai)",
      "கற்பனை பித்தன் (Karpanaipitthan)",
      "கண்ணதாசன் (Kannadasan)"
    ],
    correctIndex: 1,
    explanation: "நாமக்கல் கவிஞர் வெ. இராமலிங்கனார் அவர்கள் சுதந்திரப் போராட்டத்தில் காந்தியக் கொள்கைகளைப் பரப்பியதற்காகப் போற்றப்பட்டார். தமிழ்நாட்டின் முதல் அரசவைக் கவிஞராக இவர் நியமிக்கப்பட்டார்."
  },
  {
    id: "mq_p3",
    question: "Which Constitutional Amendment added Tenth Schedule (Anti-Defection Law) to the Indian Constitution?",
    options: [
      "52nd Amendment Act, 1985",
      "61st Amendment Act, 1989",
      "73rd Amendment Act, 1993",
      "44th Amendment Act, 1978"
    ],
    correctIndex: 0,
    explanation: "The 52nd Constitutional Amendment Act of 1985 inserted Tenth Schedule regarding defection disqualification rules of members."
  },
  {
    id: "mq_h3",
    question: "Who was the founder of the Self-Respect Movement (சுயமரியாதை இயக்கம்) in Tamil Nadu in 1925?",
    options: [
      "C.N. Annadurai",
      "E.V. Ramasamy (Periyar)",
      "P. Theagaraya Chetty",
      "K. Kamaraj"
    ],
    correctIndex: 1,
    explanation: "E.V. Ramasamy (Periyar) started the Self-Respect Movement in 1925 aiming to cultivate rationalism, self-respect, and gender-inclusive social equality."
  }
];

export function generateQuiz(size: number, category: string = "All"): Quiz {
  let filtered = [...MASTER_QUIZ_POOL];
  if (category !== "All") {
    filtered = filtered.filter(q => q.id.includes(`_${category.toLowerCase()[0]}`));
  }

  // Shuffle pool to return a randomized set
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, size);

  // If request size exceeds selection, loop the questions to fill
  while (selectedQuestions.length < size && MASTER_QUIZ_POOL.length > 0) {
    const randomItem = MASTER_QUIZ_POOL[Math.floor(Math.random() * MASTER_QUIZ_POOL.length)];
    // Ensure unique or append
    selectedQuestions.push({
      ...randomItem,
      id: `${randomItem.id}_dup_${Math.random().toString(36).substr(2, 4)}`
    });
  }

  return {
    id: `quiz_${size}_${category.toLowerCase()}`,
    title: `${category === "All" ? "Daily General Revision" : category} Practice Quiz`,
    tamilTitle: `${category === "All" ? "தினசரி வினாவிடை" : category} பயிற்சித் தேர்வு`,
    durationMinutes: size === 10 ? 10 : size === 20 ? 20 : 45,
    questions: selectedQuestions,
    category
  };
}
