import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { Button } from "./ui/button";
import kappa from "../Assets/kappa.png";
import type { Algorithm } from "../types";

interface NavBarResultProps {
  algorithm: Algorithm;
}

const NavBarResult: React.FC<NavBarResultProps> = ({ algorithm }) => {
  return (
    <div className="flex items-center justify-between p-4 text-kappa-gray bg-kappa-dark-gray">
      <div className="flex items-center">
        <img
          className="h-16 mr-4 duration-300 hover:animate-bounce"
          src={kappa}
          alt="kappa"
        />
        <h1 className="hidden text-6xl font-bold md:inline text-kappa-green">
          {algorithm === "kmeans" ? "K-Means" : "DBSCAN"} Prediction
        </h1>
      </div>
      <Link to="/">
        <Button
          variant="outline"
          size="lg"
          className="text-2xl font-bold bg-transparent border-kappa-green text-kappa-green hover:bg-kappa-black"
        >
          <Home className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
};

export default NavBarResult;
