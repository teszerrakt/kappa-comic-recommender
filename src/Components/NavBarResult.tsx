import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import kappa from "../Assets/kappa.png";
import type { Algorithm } from "../types";
import { Button } from "./ui/button";

interface NavBarResultProps {
  algorithm: Algorithm;
}

const NavBarResult: React.FC<NavBarResultProps> = ({ algorithm }) => {
  return (
    <nav className="flex items-center justify-between p-4 text-kappa-gray bg-card">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            className="h-12 transition-transform duration-200 hover:scale-105"
            src={kappa}
            alt="Kappa logo"
          />
          <span className="hidden text-3xl font-bold md:inline text-kappa-green">
            {algorithm === "kmeans" ? "K-Means" : "DBSCAN"} Prediction
          </span>
        </Link>
      </div>
      <div className="text-sm font-semibold text-kappa-green md:hidden">
        {algorithm === "kmeans" ? "K-Means" : "DBSCAN"}
      </div>
      <Link to="/">
        <Button
          variant="kappaOutline"
          size="lg"
          className="text-2xl font-bold"
          aria-label="Go to home"
        >
          <Home className="h-6 w-6" />
        </Button>
      </Link>
    </nav>
  );
};

export default NavBarResult;
