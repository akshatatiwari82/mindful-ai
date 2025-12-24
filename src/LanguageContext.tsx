import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- FULL DATA DICTIONARY ---
export const translations = {
  en: {
    dashboard: {
      title: "Self-Care Exercises",
      subtitle: "Practice mindfulness and find your calm",
      startBtn: "Begin Exercise",
      howTo: "How to practice:",
      back: "Back to Dashboard",
      active: "Active",
      reset: "Reset"
    },
    exercises: {
      boxBreathing: {
        title: "Box Breathing",
        desc: "Calm your nervous system with this 4-4-4-4 technique",
        duration: "4 min",
        tutorial: [
          "Inhale slowly for 4 seconds.",
          "Hold your breath for 4 seconds.",
          "Exhale slowly for 4 seconds.",
          "Hold empty for 4 seconds."
        ],
        phases: {
          inhale: "Inhale",
          hold: "Hold",
          exhale: "Exhale"
        }
      },
      bodyScan: {
        title: "Body Scan",
        desc: "Release tension by bringing awareness to each part of your body",
        duration: "10 min",
        tutorial: [
          "Find a quiet space and sit comfortably.",
          "Close your eyes and breathe deeply.",
          "Focus on one body part at a time.",
          "Release tension as you exhale."
        ]
      },
      grounding: {
        title: "5-4-3-2-1 Grounding",
        desc: "Anchor yourself in the present moment",
        duration: "5 min",
        tutorial: [
          "Acknowledge 5 things you see.",
          "Acknowledge 4 things you can touch.",
          "Acknowledge 3 things you hear.",
          "Acknowledge 2 things you smell.",
          "Acknowledge 1 thing you taste."
        ]
      },
      lovingKindness: {
        title: "Loving Kindness",
        desc: "Cultivate compassion for yourself and others",
        duration: "8 min",
        tutorial: ["Sit quietly", "Focus on your heart", "Send good wishes to yourself", "Send good wishes to others"]
      }
    },
    emergency: {
      title: "Crisis Support",
      subtitle: "You are not alone. Help is available 24/7.",
      police: "Police / General Emergency",
      ambulance: "Ambulance",
      suicide: "Tele-MANAS (Mental Health)",
      call: "Call Now"
    }
  },
  hi: {
    dashboard: {
      title: "आत्म-देखभाल व्यायाम",
      subtitle: "माइंडफुलनेस का अभ्यास करें और अपनी शांति पाएं",
      startBtn: "अभ्यास शुरू करें",
      howTo: "अभ्यास कैसे करें:",
      back: "डैशबोर्ड पर वापस जाएं",
      active: "सक्रिय",
      reset: "रीसेट"
    },
    exercises: {
      boxBreathing: {
        title: "बॉक्स ब्रीदिंग (Box Breathing)",
        desc: "इस 4-4-4-4 तकनीक के साथ अपने तंत्रिका तंत्र को शांत करें",
        duration: "4 मिनट",
        tutorial: [
          "4 सेकंड के लिए धीरे-धीरे सांस लें।",
          "4 सेकंड के लिए सांस रोकें।",
          "4 सेकंड के लिए धीरे-धीरे सांस छोड़ें।",
          "4 सेकंड के लिए खाली रहें।"
        ],
        phases: {
          inhale: "सांस लें",
          hold: "रुकें",
          exhale: "सांस छोड़ें"
        }
      },
      bodyScan: {
        title: "बॉडी स्कैन (Body Scan)",
        desc: "अपने शरीर के प्रत्येक भाग के प्रति जागरूकता लाकर तनाव मुक्त करें",
        duration: "10 मिनट",
        tutorial: [
          "एक शांत जगह ढूंढें और आराम से बैठें।",
          "अपनी आंखें बंद करें और गहरी सांस लें।",
          "एक बार में शरीर के एक हिस्से पर ध्यान केंद्रित करें।",
          "सांस छोड़ते समय तनाव को मुक्त करें।"
        ]
      },
      grounding: {
        title: "5-4-3-2-1 ग्राउंडिंग",
        desc: "अपनी इंद्रियों का उपयोग करके वर्तमान में वापस आएं",
        duration: "5 मिनट",
        tutorial: [
          "5 चीजें जो आप देख सकते हैं।",
          "4 चीजें जो आप छू सकते हैं।",
          "3 चीजें जो आप सुन सकते हैं।",
          "2 चीजें जो आप सूंघ सकते हैं।",
          "1 चीज जिसका आप स्वाद ले सकते हैं।"
        ]
      },
      lovingKindness: {
        title: "प्रेम और दया (Loving Kindness)",
        desc: "अपने और दूसरों के लिए करुणा विकसित करें",
        duration: "8 मिनट",
        tutorial: ["शांत बैठें", "अपने दिल पर ध्यान दें", "शुभकामनाएं भेजें", "दूसरों को शुभकामनाएं भेजें"]
      }
    },
    emergency: {
      title: "आपातकालीन सहायता",
      subtitle: "आप अकेले नहीं हैं। मदद 24/7 उपलब्ध है।",
      police: "पुलिस / सामान्य आपातकालीन",
      ambulance: "एम्बुलेंस",
      suicide: "टेली-मानस (मानसिक स्वास्थ्य)",
      call: "अभी कॉल करें"
    }
  }
};

// --- SETUP PROVIDER ---
type Language = 'en' | 'hi';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Safe Fallback: If data is missing, use English as backup to prevent crashes
  const t = translations[language] || translations['en'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};