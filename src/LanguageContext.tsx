import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

// --- TRANSLATIONS ---
const translations = {
  en: {
    dashboard: {
      title: "Mental Exercises",
      subtitle: "Clinical tools for immediate relief",
      startBtn: "Start Session",
      back: "Back to Menu",
      howTo: "How it works:",
    },
    exercises: {
      boxBreathing: {
        title: "Box Breathing",
        desc: "Reduce cortisol with rhythm.",
        duration: "4 min",
        tutorial: ["Inhale for 4s", "Hold for 4s", "Exhale for 4s", "Hold for 4s"]
      },
      bodyScan: {
        title: "Body Scan",
        desc: "Release physical tension.",
        duration: "10 min",
        tutorial: ["Lie down comfortably", "Focus on your toes", "Move focus up to your head"]
      },
      grounding: {
        title: "5-4-3-2-1 Grounding",
        desc: "Stop panic attacks instantly.",
        duration: "5 min",
        tutorial: ["Find 5 things you see", "Find 4 things you touch", "Find 3 things you hear", "Find 2 things you smell", "Find 1 thing you taste"]
      },
      lovingKindness: {
        title: "Loving Kindness",
        desc: "Boost compassion & empathy.",
        duration: "15 min",
        tutorial: ["Visualize yourself", "Visualize a loved one", "Send positive wishes to both"]
      },
      cbt: {
        title: "Cognitive Reframing",
        desc: "Challenge negative thoughts.",
        duration: "10 min",
        tutorial: ["Write down the negative thought", "Examine the evidence", "Create a balanced thought"]
      },
      pmr: {
        title: "Muscle Relaxation",
        desc: "Release deep body tension.",
        duration: "15 min",
        tutorial: ["Tense a muscle group for 5s", "Release instantly", "Feel the tension leave"]
      }
    }
  },
  hi: {
    dashboard: {
      title: "मानसिक व्यायाम",
      subtitle: "तत्काल राहत के लिए नैदानिक उपकरण",
      startBtn: "सत्र शुरू करें",
      back: "वापस जाएं",
      howTo: "यह कैसे काम करता है:",
    },
    exercises: {
      boxBreathing: {
        title: "बॉक्स ब्रीदिंग",
        desc: "लय के साथ तनाव कम करें।",
        duration: "4 मिनट",
        tutorial: ["4 सेकंड सांस लें", "4 सेकंड रोकें", "4 सेकंड सांस छोड़ें", "4 सेकंड रोकें"]
      },
      bodyScan: {
        title: "बॉडी स्कैन",
        desc: "शारीरिक तनाव दूर करें।",
        duration: "10 मिनट",
        tutorial: ["आराम से लेट जाएं", "पैरों की उंगलियों पर ध्यान दें", "सिर तक ध्यान ले जाएं"]
      },
      grounding: {
        title: "5-4-3-2-1 ग्राउंडिंग",
        desc: "घबराहट के दौरे को तुरंत रोकें।",
        duration: "5 मिनट",
        tutorial: ["5 चीजें देखें", "4 चीजें महसूस करें", "3 चीजें सुनें", "2 चीजें सूंघें", "1 चीज चखें"]
      },
      lovingKindness: {
        title: "प्रेम और करुणा",
        desc: "सहानुभूति और दया बढ़ाएं।",
        duration: "15 मिनट",
        tutorial: ["खुद की कल्पना करें", "प्रियजन की कल्पना करें", "दोनों को शुभकामनाएं भेजें"]
      },
      cbt: {
        title: "संज्ञानात्मक रिफ्रेमिंग",
        desc: "नकारात्मक विचारों को चुनौती दें।",
        duration: "10 मिनट",
        tutorial: ["नकारात्मक विचार लिखें", "सबूत की जांच करें", "संतुलित विचार बनाएं"]
      },
      pmr: {
        title: "मांसपेशी विश्राम",
        desc: "शरीर के गहरे तनाव को छोड़ें।",
        duration: "15 मिनट",
        tutorial: ["मांसपेशियों को 5 सेकंड कसें", "तुरंत छोड़ दें", "तनाव को जाता हुआ महसूस करें"]
      }
    }
  }
};

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
