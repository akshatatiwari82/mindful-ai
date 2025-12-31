import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MoodTracker from "./components/MoodTracker";
import Exercises from "./components/Exercises";
import AdminDashboard from "./components/AdminDashboard";
// Import your new components here
import Home from "./components/Home";
import Chat from "./components/Chat";
import Emergency from "./components/Emergency";
import TherapistPortal from "./components/TherapistPortal";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/therapist" element={<TherapistPortal />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
