import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, ShieldAlert, HeartPulse, Ambulance } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function EmergencyHelp() {
  const { t } = useLanguage();

  // --- SAFETY CHECK: PREVENT WHITE SCREEN ---
  // If translations are missing, stop here instead of crashing.
  if (!t || !t.emergency) {
    console.error("Emergency translations are missing!", t);
    return <div className="p-4 text-center text-red-500">Loading Emergency Data...</div>;
  }

  const emergencyContacts = [
    {
      label: t.emergency.suicide,
      number: "14416",
      icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
      color: "bg-rose-50 border-rose-200 text-rose-700",
      desc: "24/7 Govt. Mental Health Support"
    },
    {
      label: t.emergency.police,
      number: "112",
      icon: <ShieldAlert className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-50 border-blue-200 text-blue-700",
      desc: "National Emergency Number"
    },
    {
      label: t.emergency.ambulance,
      number: "108",
      icon: <Ambulance className="w-6 h-6 text-orange-500" />,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      desc: "Medical Emergency"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-4 animate-in fade-in slide-in-from-bottom-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-red-600 flex items-center justify-center gap-2">
          <ShieldAlert className="w-6 h-6" /> {t.emergency.title}
        </h2>
        <p className="text-muted-foreground">{t.emergency.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {emergencyContacts.map((contact, index) => (
          <Card key={index} className={`border-2 ${contact.color} shadow-sm hover:shadow-md transition-all`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  {contact.icon}
                </div>
                <span className="text-2xl font-bold font-display">{contact.number}</span>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold text-lg mb-1">{contact.label}</h3>
              <p className="text-xs opacity-80 mb-4 font-medium">{contact.desc}</p>
              
              <Button 
                className="w-full bg-white hover:bg-white/90 text-black border border-black/10 shadow-sm"
                onClick={() => window.location.href = `tel:${contact.number}`}
              >
                <Phone className="w-4 h-4 mr-2" /> {t.emergency.call}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
        Disclaimer: This is a prototype. In a real life-threatening emergency, please visit the nearest hospital immediately.
      </p>
    </div>
  );
}