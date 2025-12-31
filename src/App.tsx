import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// 1. Define simple components directly in this file to test
const Home = () => <div className="p-10 text-2xl">🏠 Home Page Loaded</div>;
const Chat = () => <div className="p-10 text-2xl">💬 Chat Page Loaded</div>;
const MoodTracker = () => <div className="p-10 text-2xl">📊 Mood Tracker Loaded</div>;

// 2. Simple Navbar for testing
const Navbar = () => (
  <nav className="p-4 bg-teal-600 text-white flex gap-4">
    <Link to="/">Home</Link>
    <Link to="/chat">Chat</Link>
    <Link to="/mood-tracker">Mood</Link>
  </nav>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        {/* Catch-all route for broken links */}
        <Route path="*" element={<div className="p-10">404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
