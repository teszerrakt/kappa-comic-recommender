import { useCallback } from "react";
import type { UserPreference } from "../types";

interface UseRatingOptions {
  prefs: UserPreference[];
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
}

interface UseRatingReturn {
  handleRatingChange: (id: string, title: string, newRating: number) => void;
  getRating: (id: string) => number;
}

export function useRating({ prefs, setPrefs }: UseRatingOptions): UseRatingReturn {
  const handleRatingChange = useCallback(
    (id: string, title: string, newRating: number): void => {
      const exists = prefs.some((pref) => pref.id === id);

      if (exists) {
        if (newRating === 0) {
          setPrefs((prev) => prev.filter((pref) => pref.id !== id));
          return;
        }

        setPrefs((prev) => prev.map((pref) => (pref.id === id ? { ...pref, rating: newRating } : pref)));
      } else if (newRating > 0) {
        setPrefs((prev) => [...prev, { id, title, rating: newRating }]);
      }
    },
    [prefs, setPrefs],
  );

  const getRating = useCallback(
    (id: string): number => {
      return prefs.find((pref) => pref.id === id)?.rating ?? 0;
    },
    [prefs],
  );

  return { handleRatingChange, getRating };
}
