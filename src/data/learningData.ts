/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubjectModule } from "../types";

export const SUBJECT_LIST: SubjectModule[] = [
  {
    id: "general-tamil",
    title: "General Tamil",
    tamilTitle: "பொதுத் தமிழ்",
    icon: "BookOpen",
    description: "Covers Part A (Grammar), Part B (Literature), Part C (Tamil Scholars) which accounts for 100/200 questions in the Group 4 exam.",
    chapters: [
      {
        id: "tamil-gt1",
        title: "Part A: Tamil Grammar basics",
        tamilTitle: "பகுதி அ: தமிழ் இலக்கணம் மற்றும் நால்வகைச் சொற்கள்",
        notes: "தமிழ் இலக்கணம் ஐந்து வகைப்படும்: எழுத்து, சொல், பொருள், யாப்பு, அணி. சொற்கள் நான்கு வகைப்படும்: பெயர்ச்சொல், வினைச்சொல், இடைச்சொல், உரிச்சொல். இவற்றுள் பெயர்ச்சொல்லும் வினைச்சொல்லும் தனித்து இயங்கும் தன்மை கொண்டவை.",
        importantPoints: [
          "நால்வகைச் சொற்கள்: பெயர், வினை, இடை, உரி.",
          "இடைச்சொல் தனித்து இயங்காது, பெயர்ச்சொல்லையோ வினைச்சொல்லையோ சார்ந்தே வரும்.",
          "பெயர்ச்சொற்கள் ஆறு வகைப்படும்: பொருட்பெயர், இடப்பெயர், காலப்பெயர், சினைப்பெயர், பண்புப்பெயர், தொழிற்பெயர்."
        ],
        practiceQuestions: [
          {
            id: "tq1",
            question: "கீழ்க்கண்டவற்றுள் தொழிற்பெயரைத் தேர்ந்தெடுக்கவும்:",
            options: [
              "படித்தல் (Learning / Reading)",
              "அழகு (Beauty)",
              "மதுரை (Madurai)",
              "அவன் (He)"
            ],
            correctIndex: 0,
            explanation: "தொழிலை உணர்த்தும் பெயர் தொழிற்பெயர் எனப்படும். படித்தல் என்பது படித்தலாகிய தொழிலைக் குறிப்பதால் இது தொழிற்பெயர்."
          },
          {
            id: "tq2",
            question: "சொல்லின் இறுதியில் மட்டுமே வரும் சொல் எது?",
            options: [
              "பெயர்ச்சொல்",
              "இடைச்சொல்",
              "உரிச்சொல்",
              "வினைமுற்று"
            ],
            correctIndex: 1,
            explanation: "இடைச்சொற்கள் பொதுவாகப் பெயர் மற்றும் வினையைச் சார்ந்து அவற்றுக்கு இடையிலோ அல்லது இறுதியிலோ வருகின்றன (எ.கா: மற்றொன்று, அவன்தான்)."
          }
        ],
        revisionSheet: "இலக்கண வகைகள்: எழுத்து (2), சொல் (4), பொருள் (2 - அகம்/புறம்), யாப்பு (6), அணி. பெயர்ச்சொல் 6 வகைப்படும் என்பதை நினைவில் கொள்க. தொழிற்பெயர் விகுதிகள்: தல், அல், அம், ஐ, கை, வை, போன்றவை."
      },
      {
        id: "tamil-gt2",
        title: "Part B: Thirukkural Studies",
        tamilTitle: "பகுதி ஆ: திருக்குறள் மற்றும் சங்க இலக்கியம்",
        notes: "திருக்குறள் உலகப் பொதுமறை எனப் போற்றப்படுகிறது. இதனை இயற்றியவர் திருவள்ளுவர். இது அறத்துப்பால், பொருட்பெயர், காமத்துப்பால் என்னும் முப்பால்களைக் கொண்டது. மொத்த அதிகாரங்கள் 133, பாடல்கள் 1330 ஆகும். இது பதினெண் கீழ்க்கணக்கு நூல்களுள் ஒன்றாகும்.",
        importantPoints: [
          "அறத்துப்பால் - 38 அதிகாரங்கள்.",
          "பொருட்பால் - 70 அதிகாரங்கள்.",
          "இன்பத்துப்பால் / காமத்துப்பால் - 25 அதிகாரங்கள்.",
          "திருக்குறள் முதன்முதலில் அச்சிடப்பட்ட ஆண்டு: 1812."
        ],
        practiceQuestions: [
          {
            id: "tq3",
            question: "முப்பாலிலும் இல்லாத அதிகாரம் கீழ்க்கண்டவற்றுள் எது?",
            options: [
              "அன்புடைமை",
              "ஒழுக்கமுடைமை",
              "தேசபக்தி",
              "காலமறிதல்"
            ],
            correctIndex: 2,
            explanation: "தேசபக்தி என்னும் அதிகாரம் திருக்குறளில் இல்லை. அன்பு, ஒழுக்கம், காலமறிதல் ஆகியவை திருக்குறள் அதிகாரங்கள் ஆகும்."
          }
        ],
        revisionSheet: "திருக்குறளின் வேறு பெயர்கள்: முப்பால், உத்தரவேதம், தெய்வநூல், உலகப்பொதுமறை, வாயுறை வாழ்த்து, தமிழ்மறை. உரை எழுதியவர்களில் சிறந்த உரை பரிமேலழகர் உரை ஆகும்."
      }
    ]
  },
  {
    id: "history",
    title: "History & Culture",
    tamilTitle: "இந்திய வரலாறு மற்றும் பண்பாடு",
    icon: "History",
    description: "Syllabus includes Indus Valley Civilization, Guptas, Delhi Sultans, Mughals, Marathas, Southern Indian History, and Indian National Movement.",
    chapters: [
      {
        id: "hist-1",
        title: "Indus Valley Civilization",
        tamilTitle: "சிந்துவெளி நாகரிகம்",
        notes: "The Indus Valley Civilization was a Bronze Age civilization in North-Western South Asia, lasting from 3300 BCE to 1300 BCE. Characterized by grid-planned cities, baked brick houses, structured drainage systems, and great granaries.",
        importantPoints: [
          "Harappa was first excavated by Madho Sarup Vats and Daya Ram Sahni in 1921.",
          "Mohenjo-daro was excavated by R.D. Banerji in 1922; it translates to 'Mound of the Dead'.",
          "Lothal is a notable port city situated in Gujarat, indicating massive maritime trade.",
          "The civilization did not know the use of Iron, and horses were not commonly documented."
        ],
        practiceQuestions: [
          {
            id: "hq1",
            question: "Which of the following sites was the ancient dockyard / port city of the Indus Valley Civilization?",
            options: [
              "Kalibangan",
              "Lothal",
              "Banawali",
              "Ropar"
            ],
            correctIndex: 1,
            explanation: "Lothal in Gujarat served as an active marine trading port and dockyard of the Harappans."
          },
          {
            id: "hq2",
            question: "சிந்துவெளி மக்கள் அறிந்திராத முக்கிய உலோகம் எது?",
            options: [
              "செம்பு (Copper)",
              "வெண்கலம் (Bronze)",
              "இரும்பு (Iron)",
              "தங்கம் (Gold)"
            ],
            correctIndex: 2,
            explanation: "சிந்துவெளி நாகரிக மக்கள் வெண்கலக் காலத்தைச் சேர்ந்தவர்கள். அவர்கள் இரும்பின் பயனை அறிந்திருக்கவில்லை."
          }
        ],
        revisionSheet: "Key excavations: Harappa (1921, Ravi river), Mohenjo-Daro (1922, Indus, Great Bath), Lothal (Dockyard), Kalibangan (Black Bangles, Ploughed fields). Metal: Bronze known, Iron unknown. Animals: Bull known, Horse unknown/rare."
      },
      {
        id: "hist-2",
        title: "Indian National Movement (INM)",
        tamilTitle: "இந்திய தேசிய இயக்கம்",
        notes: "Examines the struggle for freedom from East India Company rules up to Independence in 1947, incorporating early uprisings, the Indian National Congress formation (1885), and moderate, extremist, and Gandhian eras.",
        importantPoints: [
          "INC was formed in December 1885 by A.O. Hume. First President was W.C. Bonnerjee in Bombay.",
          "Swadeshi Movement started in 1905 because of Bengal Partition by Lord Curzon.",
          "V.O. Chidambaranar established Swadeshi Steam Navigation Company in Tuticorin, Tamil Nadu."
        ],
        practiceQuestions: [
          {
            id: "hq3",
            question: "Who was the founder of the 'Swadeshi Steam Navigation Company' in Tamil Nadu?",
            options: [
              "Subramania Bharati",
              "V.O. Chidambaranar",
              "Kamarájar",
              "Rajaji"
            ],
            correctIndex: 1,
            explanation: "V.O. Chidambaranar (Kappalottiya Thamizhan) started the Swadeshi Steam Navigation Company to contest British monopolies."
          }
        ],
        revisionSheet: "Moderate Leaders: Gokhale, Naoroji. Extremist Leaders: Lal-Bal-Pal. Partition of Bengal (1905). Non-Cooperation Movement (1920), Civil Disobedience (1930), Quit India (1942). Tamil Nadu leaders: VOC, Bharati, Rajaji, Periyar."
      }
    ]
  },
  {
    id: "indian-polity",
    title: "Indian Polity",
    tamilTitle: "இந்திய ஆட்சியியல்",
    icon: "Compass",
    description: "Structure of Indian Constitution, Citizenship, Fundamental Rights, duties, DPSP, Union Executive, Parliament, Judiciary, and State Governance.",
    chapters: [
      {
        id: "pol-1",
        title: "Making of the Constitution & Preamble",
        tamilTitle: "அரசியலமைப்பு உருவாக்கம் மற்றும் முகவுரை",
        notes: "The Constitution of India was drafted by the Constituent Assembly. On 29th August 1947, a Drafting Committee was set up under the chairmanship of Dr. B.R. Ambedkar (Father of Indian Constitution). It took 2 years, 11 months, and 18 days to complete.",
        importantPoints: [
          "First meeting of Constituent Assembly: 9th December 1946 (Interim President: Dr. Sachchidananda Sinha).",
          "Permanent President: Dr. Rajendra Prasad. Objective Resolution by Nehru on 13th Dec 1946 became the Preamble.",
          "Adopted on: 26th Nov 1949. Enacted on: 26th Jan 1950.",
          "The Preamble was amended only once in 1976 by the 42nd Amendment, adding: Socialist, Secular, and Integrity."
        ],
        practiceQuestions: [
          {
            id: "pq1",
            question: "Who was the Chairman of the Drafting Committee of the Constituent Assembly?",
            options: [
              "Dr. Rajendra Prasad",
              "Dr. B.R. Ambedkar",
              "Jawaharlal Nehru",
              "Sardar Vallabhbhai Patel"
            ],
            correctIndex: 1,
            explanation: "Dr. B.R. Ambedkar is revered as the Chief Architect/Father of the Indian Constitution and chaired the Drafting Committee."
          },
          {
            id: "pq2",
            question: "The words 'Socialist, Secular, and Integrity' were added to the Preamble by which Constitutional Amendment Act?",
            options: [
              "44th Amendment Act",
              "42nd Amendment Act",
              "86th Amendment Act",
              "73rd Amendment Act"
            ],
            correctIndex: 1,
            explanation: "The 42nd Amendment of 1976 (known as the mini-constitution) added Socialist, Secular, and Integrity keywords."
          }
        ],
        revisionSheet: "Time taken: 2y, 11m, 18d. Budget: 64 Lakhs. Borrowed features: UK (Parliamentary), USA (Fundamental Rights, Judicial review), Ireland (DPSP), Russia (Duties). Preamble amendment: 42nd CAA (1976)."
      }
    ]
  },
  {
    id: "geography",
    title: "Geography of India",
    tamilTitle: "இந்தியப் புவியியல்",
    icon: "Map",
    description: "Physical features, monsoons, rainfall, soil types, forests, agriculture, minerals, transport, communication, and disaster mitigation.",
    chapters: [
      {
        id: "geo-1",
        title: "Location, Relief and Drainage of India",
        tamilTitle: "இந்தியாவின் அமைவிடம், இயற்கை அமைப்பு",
        notes: "India is the 7th largest country in the world and 2nd in Asia by area. It covers 32,87,263 sq.km. India lies entirely in the Northern and Eastern hemispheres, with the Tropic of Cancer (23°30' N) dividing the country into two halves.",
        importantPoints: [
          "Land frontier size: 15,200 km. Coastline size (including islands): 7,516.6 km.",
          "Active standard meridian of India is 82°30' E, passing through Mirzapur (UP), determining Indian Standard Time (IST - GMT +5.30).",
          "Karakoram (K2 / Mount Godwin-Austen) is the highest peak in India (8,611m), and Kangchenjunga is the highest in the Himalayas region of India (8,586m)."
        ],
        practiceQuestions: [
          {
            id: "gq1",
            question: "The Indian Standard Meridian (82°30' E) passes through which of the following cities?",
            options: [
              "Chennai",
              "Mirzapur (Allahabad)",
              "Kolkata",
              "Mumbai"
            ],
            correctIndex: 1,
            explanation: "IST is aligned to the 82.5 deg East meridian, which passes close to Mirzapur in Uttar Pradesh."
          }
        ],
        revisionSheet: "North-South extent: 3,214 km (Indira Col to Kanyakumari). West-East extent: 2,933 km (Rann of Kutch to Kibithu). Southern boundary: Pygmalion Point (Indira Point) in Nicobar. Himalayan ranges: Greater (Himadri), Lesser (Himachal), Outer (Shiwaliks)."
      }
    ]
  },
  {
    id: "economics",
    title: "Economics",
    tamilTitle: "இந்தியப் பொருளாதாரம்",
    icon: "TrendingUp",
    description: "Features of Indian economy, Five Year Plans, Planning Commission, NITI Aayog, rural development, finance, inflation, taxation, GST.",
    chapters: [
      {
        id: "eco-1",
        title: "Five Year Plans & NITI Aayog",
        tamilTitle: "ஐந்தாண்டுத் திட்டங்கள் மற்றும் நிதி ஆயோக்",
        notes: "The Planning Commission was established in 1950 to frame Five Year Plans. Major components are based on Soviet economic state structures. On January 1, 2015, Planning Commission was replaced with NITI Aayog (National Institution for Transforming India) focusing on cooperative federalism.",
        importantPoints: [
          "First Five Year Plan (1951-56) followed the Harrod-Domar economy model, prioritizing Agriculture.",
          "Second Five Year Plan (1956-61) was based on the Mahalanobis model, emphasizing rapid Industrialization.",
          "Guiding Chairperson of NITI Aayog is always the Prime Minister of India."
        ],
        practiceQuestions: [
          {
            id: "eq1",
            question: "Who acts as the ex-officio Chairperson of NITI Aayog?",
            options: [
              "President of India",
              "Finance Minister of India",
              "Prime Minister of India",
              "Governor of RBI"
            ],
            correctIndex: 2,
            explanation: "The Prime Minister of India acts as the institutional Chairperson of NITI Aayog."
          }
        ],
        revisionSheet: "1st FYP (1951-56, Harrod-Domar, Agri). 2nd FYP (1956-61, Mahalanobis, Heavy Industries). Plan Holidays (1966-69). 12th FYP (last plan, 2012-17). NITI Aayog established: 1st Jan 2015."
      }
    ]
  },
  {
    id: "general-science",
    title: "General Science",
    tamilTitle: "பொது அறிவியல்",
    icon: "FlaskConical",
    description: "Physics, Chemistry, Botany, and Zoology basics corresponding to standard school board textbooks from Class 6 to 10.",
    chapters: [
      {
        id: "sci-1",
        title: "Force, Motion and Newton's Laws",
        tamilTitle: "விசை, இயக்கம் மற்றும் நியூட்டனின் விதிகள்",
        notes: "Newton's laws of motion are three physical laws that lay the foundation for classical mechanics. Force (F) is measured in Newtons (N). Acceleration is rate of change of velocity. Speed is distance divided by time.",
        importantPoints: [
          "Newton's First Law (Law of Inertia): An object remains in its state of rest unless acted upon by an external force.",
          "Newton's Second Law: Force = Mass x Acceleration (F = ma).",
          "Newton's Third Law: For every action, there is an equal and opposite reaction (e.g. Jet propulsion, rocket launch)."
        ],
        practiceQuestions: [
          {
            id: "sq1",
            question: "Working of a rocket propulsion system highlights which laws of motion?",
            options: [
              "Newton's First Law",
              "Newton's Second Law",
              "Newton's Third Law",
              "Law of gravitation"
            ],
            correctIndex: 2,
            explanation: "Rocket emission expels gas downward (action), creating an equal trust upwards (reaction), confirming Newton's Third Law."
          }
        ],
        revisionSheet: "Inertia: Rest, Motion, Direction. F = ma is 2nd law. Force unit: Newton (SI) / Dyne (CGS). Rocket propulsion uses Newton's 3rd law and conservation of linear momentum."
      }
    ]
  },
  {
    id: "aptitude",
    title: "Aptitude & Mental Ability",
    tamilTitle: "திறனறிவும் மனக்கணக்கு குறியீடும்",
    icon: "Calculator",
    description: "Simplification, HCF & LCM, Ratio, Percentage, Simple Interest, Compound Interest, Area, Volume, Time & Work, Logical Reasoning.",
    chapters: [
      {
        id: "apt-1",
        title: "Percentage Concepts",
        tamilTitle: "விழுக்காடு (Percentage)",
        notes: "Percentage is a fraction expressed with 100 as the denominator. Important for calculations in Profit/Loss, Interest, and Population growth.",
        importantPoints: [
          "To convert a fraction to percentage, multiply by 100. (e.g., 4/5 * 100 = 80%).",
          "If A's income is R% more than B's, then B's income is [R / (100 + R)] * 100 % less than A's.",
          "Net change if value increases by x% and then decreases by y%: (x - y - xy/100) %."
        ],
        practiceQuestions: [
          {
            id: "aq1",
            question: "A student has to secure 40% marks to pass. If he gets 178 marks and fails by 22 marks, what are the maximum marks?",
            options: [
              "400",
              "500",
              "600",
              "450"
            ],
            correctIndex: 1,
            explanation: "Passing mark = 178 + 22 = 200. Since 40% of Max Marks = 200, Max Marks = (200 * 100) / 40 = 500."
          }
        ],
        revisionSheet: "Pass Mark scenario: fail deficit added with existing mark. Salary comparison: x% increase -> [x/(100+x)]*100 reduction needed to restore basic state."
      }
    ]
  }
];
