import { useState } from "react";
import { Users, ShieldAlert, Phone, Activity } from "lucide-react";

const patients = [
  { id: 1, name: "Student A", status: "Critical", mood: "struggling", note: "Reported panic attack." },
  { id: 2, name: "Student B", status: "Stable", mood: "good", note: "Improving." },
  { id: 3, name: "Student C", status: "At Risk", mood: "low", note: "Exam stress." },
];

const AdminDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Therapist Portal</h1>
          <p className="text-slate-500">Live monitoring of student mental health status.</p>
        </div>
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full flex items-center gap-2 font-bold border border-red-100 animate-pulse">
          <ShieldAlert className="w-5 h-5" /> Live Alert
        </div>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr><th className="p-4">Patient</th><th className="p-4">Clinical Status</th><th className="p-4">Latest Note</th><th className="p-4">Intervention</th></tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${p.status === 'Critical' ? 'bg-red-100 text-red-700' : p.status === 'At Risk' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{p.status}</span></td>
                <td className="p-4 text-slate-500 text-sm">{p.note}</td>
                <td className="p-4">
                  {p.status === 'Critical' && <button onClick={() => alert("Emergency Protocol Initiated")} className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"><Phone className="w-3 h-3" /> Connect</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminDashboard;
