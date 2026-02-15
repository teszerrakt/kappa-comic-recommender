import { X, Star, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import type { UserPreference, Algorithm } from "../types";

interface UserPreferencesProps {
  prefs: UserPreference[];
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
  currentAlgorithm?: Algorithm;
}

interface AlgorithmButtonProps {
  children: React.ReactNode;
  algorithm: Algorithm;
}

const AlgorithmButton: React.FC<AlgorithmButtonProps> = ({
  children,
  algorithm,
}) => (
  <Link to="/results" search={{ algorithm }}>
    <Button
      variant="outline"
      size="lg"
      className="text-lg text-kappa-green bg-transparent border-kappa-green hover:bg-kappa-green hover:text-kappa-black transition-colors"
    >
      <Sparkles className="mr-2 h-5 w-5" />
      {children}
    </Button>
  </Link>
);

const UserPreferences: React.FC<UserPreferencesProps> = ({
  prefs,
  setPrefs,
  currentAlgorithm,
}) => {
  const handleDelete = (id: string) => () => {
    setPrefs((chips) => chips.filter((chip) => chip.id !== id));
  };

  return (
    <Card
      className={`${prefs.length > 0 ? "block" : "hidden"} bg-kappa-dark-gray border-kappa-gray/30`}
    >
      <CardContent className="p-4">
        <div className="grid gap-2 md:grid-cols-2">
          {prefs.map((pref) => (
            <div
              key={pref.id}
              className="flex justify-between items-center px-3 py-2 bg-kappa-black/30 rounded-lg border border-kappa-green/20"
            >
              <div className="flex items-center text-kappa-green">
                <span>
                  {pref.title} | {pref.rating}
                </span>
                <Star className="ml-2 h-4 w-4 fill-kappa-green" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-kappa-gray hover:text-kappa-green hover:bg-kappa-green/10 p-1 h-auto"
                onClick={handleDelete(pref.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div
          className={`${
            prefs.length >= 5 ? "flex" : "hidden"
          } justify-center gap-4 mt-4 pt-4 border-t border-kappa-green/20`}
        >
          {currentAlgorithm !== "kmeans" && (
            <AlgorithmButton algorithm="kmeans">K-Means</AlgorithmButton>
          )}
          {currentAlgorithm !== "dbscan" && (
            <AlgorithmButton algorithm="dbscan">DBSCAN</AlgorithmButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPreferences;
