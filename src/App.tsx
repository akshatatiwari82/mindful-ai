import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Temporary components so the app doesn't crash while you build the files
const Home = () => <div className="p-10 text-center"><h1>Welcome to MindfulAI</h1></div>;
const Chat = () => <div className="p-10 text-center"><h1>AI Therapy Chat</h1></div>;
const MoodTracker = () => <div className="p-10 text-center"><h1>Your Mood History</h1></div>;
const Exercises = () => <div className="p-10 text-center"><h1>Mindfulness Exercises</h1></div>;
const Emergency = () => <div className="p-10 text-center text-red-600"><h1>Emergency Resources</h1></div>;
const TherapistPortal = () => <div className="p-10 text-center"><h1>Therapist Portal</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar is OUTSIDE Routes so it shows on every page */}
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/therapist" element={<TherapistPortal />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
