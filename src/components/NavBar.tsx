import { Link, useLocation } from "react-router-dom";
import { Heart, Activity, ShieldAlert, Brain } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-800">
            <Brain className="w-8 h-8 text-purple-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              MindfulAI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-1 md:gap-4">
            
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive('/') 
                  ? "bg-purple-100 text-purple-700" 
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">Tracker</span>
            </Link>

            <Link 
              to="/exercises" 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive('/exercises') 
                  ? "bg-blue-100 text-blue-700" 
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="hidden md:inline">Exercises</span>
            </Link>

            {/* Admin Button (Highlighted for Demo) */}
            <Link 
              to="/admin" 
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                isActive('/admin') 
                  ? "bg-red-50 border-red-200 text-red-700" 
                  : "border-transparent text-gray-400 hover:text-red-600"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="hidden md:inline">Counselor Portal</span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
