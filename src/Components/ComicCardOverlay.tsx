import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ComicCardOverlayProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const ComicCardOverlay: React.FC<ComicCardOverlayProps> = ({ id, title, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/comic/${id}`);
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Overlay */}
      <div 
        className={`
          absolute inset-0 bg-black/70 flex items-center justify-center 
          transition-opacity duration-300 rounded-xl cursor-pointer
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={handleViewDetails}
      >
        <div className="flex items-center gap-2 text-kappa-green font-semibold text-lg">
          <span>View Details</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ComicCardOverlay;