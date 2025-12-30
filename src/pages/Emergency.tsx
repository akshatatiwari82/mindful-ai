import { Phone, ShieldAlert, Ambulance, MapPin, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Emergency = () => {
  const contacts = [
    {
      name: "National Emergency",
      number: "112",
      desc: "Police, Fire, Ambulance",
      color: "bg-red-50 text-red-700 border-red-200",
      btnColor: "bg-red-600 hover:bg-red-700 text-white",
      icon: <ShieldAlert className="w-8 h-8" />
    },
    {
      name: "Mental Health Helpline",
      number: "14416", // Tele-MANAS (Standard India) or use 988 for Intl.
      desc: "24/7 Professional Support",
      color: "bg-purple-50 text-purple-700 border-purple-200",
      btnColor: "bg-purple-600 hover:bg-purple-700 text-white",
      icon: <Phone className="w-8 h-8" />
    },
    {
      name: "Ambulance Services",
      number: "108",
      desc: "Medical Emergencies",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      btnColor: "bg-blue-600 hover:bg-blue-700 text-white",
      icon: <Ambulance className="w-8 h-8" />
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center justify-center p-4 bg-red-100 text-red-600 rounded-full mb-2 animate-pulse">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800">Emergency Support</h1>
        <p className="text-slate-500 max-w-lg mx-auto text-lg">
          If you or someone else is in immediate danger, please contact emergency services immediately.
        </p>
      </div>

      {/* SOS BIG BUTTON */}
      <div className="flex justify-center py-6">
        <a href="tel:112">
          <button className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative px-12 py-6 bg-red-600 rounded-full leading-none flex items-center divide-x divide-red-400 shadow-xl">
              <span className="flex items-center gap-4 text-white font-bold text-2xl tracking-widest uppercase">
                <Phone className="w-8 h-8 animate-bounce" /> Call 112 Now
              </span>
            </div>
          </button>
        </a>
      </div>

      {/* CARDS GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {contacts.map((contact, idx) => (
          <Card 
            key={idx} 
            className={`p-6 border-2 ${contact.color} hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1`} 
            onClick={() => window.open(`tel:${contact.number}`)}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-white rounded-full shadow-sm">{contact.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{contact.name}</h3>
                <p className="text-sm opacity-80 font-medium">{contact.desc}</p>
              </div>
              <div className="text-3xl font-black tracking-wider mt-2">{contact.number}</div>
              <Button className={`w-full mt-4 ${contact.btnColor} shadow-md`}>
                Call Now
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* LOCATION & DISCLAIMER */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Card className="p-6 bg-slate-900 text-white border-none shadow-lg">
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 text-emerald-400 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2 text-emerald-400">Location Tips</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Stay calm. Tell the operator your exact location, landmarks, and the nature of the emergency. Do not hang up until told to do so.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-50 border-slate-200">
          <div className="flex items-start gap-4">
            <ShieldAlert className="w-8 h-8 text-slate-400 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2 text-slate-700">AI Disclaimer</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                MindfulAI is an assistant, not a replacement for professional medical help. In a life-threatening situation, always prioritize calling 112 or local authorities.
              </p>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Emergency;
