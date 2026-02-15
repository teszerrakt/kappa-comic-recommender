import { Link } from "@tanstack/react-router";
import { Sparkles, Star, X } from "lucide-react";
import type { ReactNode } from "react";
import type { Algorithm, UserPreference } from "../types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface UserPreferencesProps {
  prefs: UserPreference[];
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
  currentAlgorithm?: Algorithm;
}

interface AlgorithmButtonProps {
  children: ReactNode;
  algorithm: Algorithm;
}

const AlgorithmButton: React.FC<AlgorithmButtonProps> = ({ children, algorithm }) => (
  <Link to="/results" search={{ algorithm }}>
    <Button variant="kappaOutline" size="lg" className="text-lg">
      <Sparkles className="mr-2 h-5 w-5" />
      {children}
    </Button>
  </Link>
);

const UserPreferences: React.FC<UserPreferencesProps> = ({ prefs, setPrefs, currentAlgorithm }) => {
  const handleDelete = (id: string) => () => {
    setPrefs((chips) => chips.filter((chip) => chip.id !== id));
  };

  return (
    <Card>
      <CardContent className="p-4">
        {prefs.length === 0 ? (
          <div className="py-4 text-center">
            <h2 className="text-lg font-semibold text-kappa-green">Start rating comics</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your ratings power the recommendations. Rate at least five titles to unlock
              predictions.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-kappa-green">Your ratings</h2>
              <Button
                variant="kappaOutline"
                size="sm"
                className="text-sm"
                onClick={() => setPrefs([])}
                aria-label="Clear all ratings"
              >
                Clear all
              </Button>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {prefs.map((pref) => (
                <div
                  key={pref.id}
                  className="flex justify-between items-center px-3 py-2 bg-background/60 rounded-lg border border-border"
                >
                  <div className="flex items-center text-kappa-green">
                    <span>{pref.title}</span>
                    <span className="mx-2 text-kappa-gray">·</span>
                    <span className="text-kappa-gray">{pref.rating}</span>
                    <Star className="ml-2 h-4 w-4 fill-kappa-green text-kappa-green" />
                  </div>
                  <Button
                    variant="kappaGhost"
                    size="sm"
                    className="text-kappa-gray p-1 h-auto"
                    onClick={handleDelete(pref.id)}
                    aria-label={`Remove ${pref.title} from preferences`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {prefs.length > 0 && prefs.length < 5 && (
          <p className="mt-4 text-sm text-kappa-gray text-center">
            Rate {5 - prefs.length} more titles to unlock recommendations.
          </p>
        )}
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
