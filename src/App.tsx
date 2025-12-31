import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MoodTracker from "./components/MoodTracker";
import Exercises from "./components/Exercises";
import AdminDashboard from "./components/AdminDashboard";

// Temporary Placeholders to stop the build error
const Home = () => <div className="p-8">Home Page Content</div>;
const Chat = () => <div className="p-8">AI Chat Interface</div>;
const Emergency = () => <div className="p-8 text-red-600 font-bold">Emergency Contacts</div>;
const TherapistPortal = () => <div className="p-8">Therapist Portal</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar />
        <main>
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
