import { useState } from "react";
import { ShieldAlert, Phone, UserCheck, AlertTriangle, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TherapistPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // --- LOGIN STATE ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded check for demo purposes
    if (username === "admin" && password === "mindful") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials. Try 'admin' / 'mindful'");
    }
  };

  // --- IF NOT LOGGED IN: SHOW LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 animate-in fade-in zoom-in-95">
        <Card className="w-full max-w-md p-8 bg-white shadow-2xl border-t-4 border-slate-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-800">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Therapist Portal</h1>
            <p className="text-slate-500 text-sm">Restricted access for medical staff only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 ml-1">Therapist ID</label>
              <input 
                type="text" 
                placeholder="Enter ID (admin)" 
                className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 bg-slate-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter Password (mindful)" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 bg-slate-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

            <Button type="submit" className="w-full bg-slate-900 hover:bg-black text-white py-6 text-lg">
              <LogIn className="w-5 h-5 mr-2" /> Login
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">Authorized Personnel Only • 256-bit Encrypted</p>
          </div>
        </Card>
      </div>
    );
  }

  // --- IF LOGGED IN: SHOW DASHBOARD ---
  const patients = [
    { id: 1, name: "Student A", status: "Critical", note: "Reported panic attack during finals.", action: "Connect" },
    { id: 2, name: "Student B", status: "Stable", note: "Mood improving, logging consistently.", action: "None" },
    { id: 3, name: "Student C", status: "At Risk", note: "High stress, low sleep reported.", action: "Monitor" },
    { id: 4, name: "Student D", status: "Stable", note: "Routine check-in normal.", action: "None" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Therapist Dashboard</h1>
          <p className="text-slate-500">Real-time monitoring of student population.</p>
        </div>
        <div className="flex gap-3">
             <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 border border-transparent hover:border-slate-200 rounded-lg transition-all">
                Logout
             </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-600 border border-red-100 rounded-full font-bold animate-pulse">
              <ShieldAlert className="w-5 h-5" /> Live Alerts Active
            </button>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Patient ID</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Clinical Status</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Latest Flag</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-slate-700">{p.name}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                    p.status === 'Critical' ? 'bg-red-100 text-red-700' : 
                    p.status === 'At Risk' ? 'bg-orange-100 text-orange-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {p.status === 'Critical' && <AlertTriangle className="w-3 h-3" />}
                    {p.status === 'Stable' && <UserCheck className="w-3 h-3" />}
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-500">{p.note}</td>
                <td className="p-4">
                  {p.status === 'Critical' ? (
                    <button onClick={() => alert("Secure line initiated...")} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-red-100">
                      <Phone className="w-3 h-3" /> Connect
                    </button>
                  ) : (
                    <span className="text-slate-300 text-xs italic">No action req.</span>
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
