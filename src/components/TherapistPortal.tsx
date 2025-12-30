import { ShieldAlert, Phone, UserCheck, AlertTriangle } from "lucide-react";

const TherapistPortal = () => {
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
        <button className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-600 border border-red-100 rounded-full font-bold animate-pulse">
          <ShieldAlert className="w-5 h-5" /> Live Alerts Active
        </button>
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
