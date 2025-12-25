import { useState } from "react";
import { Users, AlertTriangle, Phone, ShieldAlert } from "lucide-react";

// Mock Data for Demo
const initialUsers = [
  { id: 1, name: "Alex Johnson", risk: "High", mood: "struggling", note: "Panic attack started..." },
  { id: 2, name: "Sam Smith", risk: "Low", mood: "great", note: "Feeling good!" },
  { id: 3, name: "Jordan Lee", risk: "Medium", mood: "low", note: "Just tired today." },
];

const AdminDashboard = () => {
  const [users] = useState(initialUsers);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Counselor Portal</h1>
          <p className="text-slate-500">Emergency Intervention Dashboard</p>
        </div>
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full flex items-center gap-2 font-bold border border-red-100 animate-pulse">
          <ShieldAlert className="w-5 h-5" /> 1 Critical Alert
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-slate-500 font-medium">Student Name</th>
              <th className="p-4 text-slate-500 font-medium">Risk Level</th>
              <th className="p-4 text-slate-500 font-medium">Last Check-in</th>
              <th className="p-4 text-slate-500 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    user.risk === 'High' ? 'bg-red-100 text-red-600' : 
                    user.risk === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>{user.risk}</span>
                </td>
                <td className="p-4 text-sm text-slate-500">{user.note}</td>
                <td className="p-4">
                  {user.risk === 'High' && (
                    <button onClick={() => alert("Calling Emergency Contacts...")} className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md hover:bg-red-700">
                      <Phone className="w-3 h-3" /> Connect
                    </button>
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

export default AdminDashboard;
