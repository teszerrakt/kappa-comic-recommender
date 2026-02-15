import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ComicCardOverlayProps {
  id: string;
  children: ReactNode;
}

const ComicCardOverlay: React.FC<ComicCardOverlayProps> = ({ id, children }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate({ to: "/comic/$id", params: { id } });
  };

  return (
    <div className="relative group">
      {children}

      {/* Overlay */}
      <div className="absolute inset-0 bg-kappa-black/70 flex items-center justify-center transition-opacity duration-300 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
        <button
          type="button"
          className="flex items-center gap-2 text-kappa-green font-semibold text-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kappa-green focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          onClick={handleViewDetails}
          aria-label="View comic details"
        >
          <span>View Details</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ComicCardOverlay;
