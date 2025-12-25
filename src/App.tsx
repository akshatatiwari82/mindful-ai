import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MoodTracker from "./components/MoodTracker";
import Exercises from "./components/Exercises";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        {/* Navbar stays at the top always */}
        <Navbar />

        {/* Main Content Area */}
        <main className="py-8">
          <Routes>
            {/* The "/" path means this is the FIRST page you see (Home) */}
            <Route path="/" element={<MoodTracker />} />
            
            {/* These are the add-on pages */}
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
