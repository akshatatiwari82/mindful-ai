import { useState } from "react";
import { ShieldAlert, Phone, Search, BellRing } from "lucide-react";

// Mock Data matching your reference image
const patients = [
  { id: 1, name: "Student A", status: "Critical", note: "Reported panic attack.", action: "Connect" },
  { id: 2, name: "Student B", status: "Stable", note: "Improving.", action: "None" },
  { id: 3, name: "Student C", status: "At Risk", note: "Exam stress.", action: "Monitor" },
  { id: 4, name: "Student D", status: "Stable", note: "Sleeping better.", action: "None" },
];

const TherapistPortal = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in">
      
      {/* HEADER SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Therapist Portal</h1>
          <p className="text-slate-500">Live monitoring of student mental health status.</p>
        </div>
        <button className="bg-red-50 text-red-600 px-6 py-2 rounded-full flex items-center gap-2 font-bold border border-red-100 animate-pulse hover:bg-red-100 transition-colors">
          <ShieldAlert className="w-5 h-5" /> Live Alert
        </button>
      </div>

      {/* DASHBOARD TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="p-5 text-sm font-bold text-slate-600 uppercase tracking-wider">Patient</th>
              <th className="p-5 text-sm font-bold text-slate-600 uppercase tracking-wider">Clinical Status</th>
              <th className="p-5 text-sm font-bold text-slate-600 uppercase tracking-wider">Latest Note</th>
              <th className="p-5 text-sm font-bold text-slate-600 uppercase tracking-wider">Intervention</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-semibold text-slate-700">{p.name}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${
                    p.status === 'Critical' ? 'bg-red-100 text-red-600' : 
                    p.status === 'At Risk' ? 'bg-orange-100 text-orange-600' : 
                    'bg-green-100 text-green-600'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-5 text-slate-500 text-sm">{p.note}</td>
                <td className="p-5">
                  {p.status === 'Critical' ? (
                    <button onClick={() => alert("Connecting securely...")} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 shadow-md shadow-red-100 transition-all">
                      <Phone className="w-4 h-4" /> Connect
                    </button>
                  ) : (
                    <span className="text-slate-400 text-sm italic">No action needed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TherapistPortal;
