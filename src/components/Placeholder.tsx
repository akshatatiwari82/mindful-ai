import { Link } from "react-router-dom";
import { Construction } from "lucide-react";

interface PlaceholderProps {
  title: string;
}

const Placeholder = ({ title }: PlaceholderProps) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center space-y-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
        <Construction className="w-10 h-10 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 max-w-md">
          This feature is currently under development. Check back soon for updates!
        </p>
      </div>
      <Link 
        to="/" 
        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
};

export default Placeholder;
