/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PYQPaper } from "../types";

export const PREVIOUS_PAPERS_LIST: PYQPaper[] = [
  {
    id: "pyq-2024",
    year: "2024",
    title: "TNPSC Group IV Civil Services Exam (2024)",
    totalQuestions: 200,
    tamilQuestionCount: 100,
    gsQuestionCount: 75,
    aptitudeQuestionCount: 25,
    questions: [
      {
        id: "pyq_24_t1",
        question: "வீரமாமுனிவர் இயற்றிய நூல்களுள் கீழ்க்கண்டவற்றுள் எது? (Book written by Veeramamunivar)",
        options: [
          "தேம்பாவணி (Thembavani)",
          "சீறாப்புராணம் (Seerapuranam)",
          "இரட்சணிய யாத்திரிகம் (Iratchaniya Yaathirigam)",
          "பெரியபுராணம் (Periyapuranam)"
        ],
        correctIndex: 0,
        section: "tamil",
        explanation: "வீரமாமுனிவர் (Constantine Joseph Beschi) இயற்றிய காப்பியம் 'தேம்பாவணி' ஆகும். சீறாப்புராணம் உமறுப் புலவராலும், இரட்சணிய யாத்திரிகம் எச்.ஏ.கிருஷ்ண பிள்ளையாலும் இயற்றப்பட்டன."
      },
      {
        id: "pyq_24_g1",
        question: "Which of the following is associated with the 'Yellow Revolution' in India?",
        options: [
          "Milk Production",
          "Oilseeds Production (எண்ணெய் வித்துக்கள்)",
          "Fish Production",
          "Fruits Production"
        ],
        correctIndex: 1,
        section: "general_studies",
        explanation: "Yellow Revolution is linked with oilseeds production (mainly mustard and sunflower). Blue is fish, White is milk, and Gold is honey/fruits."
      },
      {
        id: "pyq_24_a1",
        question: "If a principal triples itself in 10 years under simple interest, what is the annual rate of interest?",
        options: [
          "10%",
          "15%",
          "20%",
          "25%"
        ],
        correctIndex: 2,
        section: "aptitude",
        explanation: "Let Principal be P. Amount = 3P in 10 years.\nSimple Interest SI = Amount - Principal = 3P - P = 2P.\nSI = (P * R * T) / 100 => 2P = (P * R * 10) / 100 => 2 = R / 10 => R = 20% per year."
      },
      {
        id: "pyq_24_t2",
        question: "'அழுத அடி அடைந்த அன்பர்' எனக் குறிப்பிடப்படுபவர் யார்?",
        options: [
          "திருநாவுக்கரசர்",
          "மாணிக்கவாசகர் (Manikkavasagar)",
          "சுந்தரர்",
          "திருஞானசம்பந்தர்"
        ],
        correctIndex: 1,
        section: "tamil",
        explanation: "பக்திப் பெருக்கால் அழுது அழுது இறைவனடி சேர்ந்தவர் என்று மாணிக்கவாசகர் போற்றப்படுகிறார். இவர் திருவாசகத்தை இயற்றியவர் ஆவார்."
      }
    ]
  },
  {
    id: "pyq-2022",
    year: "2022",
    title: "TNPSC Group IV Civil Services Exam (2022)",
    totalQuestions: 200,
    tamilQuestionCount: 100,
    gsQuestionCount: 75,
    aptitudeQuestionCount: 25,
    questions: [
      {
        id: "pyq_22_t1",
        question: "'கல்லூடாடி வாலிபனாய் வளர்ந்த கவிஞன்' எனத் தன்னைத்தானே வியந்தவர் யார்? (அல்லது பாரதிதாசனைப் பாடியவர்)",
        options: [
          "பாரதியார்",
          "பாரதிதாசன்",
          "வாணிதாசன்",
          "நாமக்கல் கவிஞர்"
        ],
        correctIndex: 1,
        section: "tamil",
        explanation: "தமிழைத் தன் மூச்சாகக் கருதிப் புரட்சிக் கருத்துக்களைப் புகுத்திய பாவேந்தர் பாரதிதாசன் இக்கூற்றுக்கு உரியவர்."
      },
      {
        id: "pyq_22_g1",
        question: "The Vaigai river originates in which hills of Tamil Nadu?",
        options: [
          "Varushanad Hills (வருசநாடு குன்றுகள்)",
          "Anaimalai Hills",
          "Palani Hills",
          "Nilgiri Hills"
        ],
        correctIndex: 0,
        section: "general_studies",
        explanation: "The Vaigai river rises from the Varushanad Hills of the Western Ghats in south-western Tamil Nadu (Sivagangai/Madurai valley basins)."
      },
      {
        id: "pyq_22_a1",
        question: "Find the missing number in the sequence: 4, 9, 25, 49, 121, ?, 289.",
        options: [
          "144",
          "169",
          "196",
          "225"
        ],
        correctIndex: 1,
        section: "aptitude",
        explanation: "The sequence is the squares of successive prime numbers:\n2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121. The next prime after 11 is 13.\n13^2 = 169. (Note: 17^2 = 289)."
      }
    ]
  },
  {
    id: "pyq-2019",
    year: "2019",
    title: "TNPSC Group IV Civil Services Exam (2019)",
    totalQuestions: 200,
    tamilQuestionCount: 100,
    gsQuestionCount: 75,
    aptitudeQuestionCount: 25,
    questions: [
      {
        id: "pyq_19_t1",
        question: "எட்டுத்தொகை நூல்களுள் முதலாவதாக வைத்து எண்ணப்படும் நூல் எது? (First book in Ettuthogai)",
        options: [
          "நற்றிணை",
          "குறுந்தொகை",
          "ஐங்குறுநூறு",
          "பதிற்றுப்பத்து"
        ],
        correctIndex: 0,
        section: "tamil",
        explanation: "'நற்றிணை நல்ல குறுந்தொகை ஐங்குறுநூறு பதிற்றுப்பத்து ஓங்கு பரிபாடல்...' என்னும் பழம்பாடலின் மூலம் எட்டுத்தொகையுள் முதலாவதாக வைத்து பாடப்படும் நூல் 'நற்றிணை' ஆகும்."
      },
      {
        id: "pyq_19_g1",
        question: "Who was appointed as the first Indian Judge of the Madras High Court in 1877?",
        options: [
          "Sir T. Muthuswamy Iyer",
          "P.S. Sivaswami Iyer",
          "V. Bhashyam Iyengar",
          "S. Subramania Iyer"
        ],
        correctIndex: 0,
        section: "general_studies",
        explanation: "Muthuswamy Iyer was appointed as the first Indian Judge of Madras High Court in 1877 under massive colonial criticism."
      },
      {
        id: "pyq_19_a1",
        question: "A solid cylinder has a radius of 7 cm and a height of 10 cm. Find its Total Surface Area (TSA).",
        options: [
          "748 sq.cm",
          "540 sq.cm",
          "628 sq.cm",
          "440 sq.cm"
        ],
        correctIndex: 0,
        section: "aptitude",
        explanation: "TSA of cylinder = 2 * pi * r * (h + r)\n= 2 * 22/7 * 7 * (10 + 7) = 44 * 17 = 748 sq.cm."
      }
    ]
  }
];
