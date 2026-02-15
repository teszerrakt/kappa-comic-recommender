import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import NavBarResult from "../Components/NavBarResult";
import UserPreferences from "../Components/UserPreferences";
import Loading from "../Components/Loading";
import PredictionCard from "../Components/PredictionCard";
import { KAPPA_API_TOKEN, KAPPA_API_URL } from "../env";
import { usePreferences } from "../context/PreferencesContext";
import type { PredictionResponse, Algorithm } from "../types";

interface ResultSearch {
  algorithm: Algorithm;
}

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>): ResultSearch => ({
    algorithm:
      (search.algorithm as Algorithm) === "dbscan" ? "dbscan" : "kmeans",
  }),
  component: ResultPage,
});

function ResultPage() {
  const { algorithm } = Route.useSearch();
  const { prefs, setPrefs } = usePreferences();

  const {
    mutate,
    data,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (
      preferences: typeof prefs,
    ): Promise<PredictionResponse[]> => {
      const response = await fetch(`${KAPPA_API_URL}/api/${algorithm}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": KAPPA_API_TOKEN,
        },
        body: JSON.stringify(preferences),
      });
      if (!response.ok) throw new Error("Prediction failed");
      return response.json();
    },
  });

  useEffect(() => {
    if (prefs.length > 0) {
      mutate(prefs);
    }
  }, [algorithm, mutate, prefs]);

  let content: React.ReactNode = null;

  if (isError) {
    content = (
      <h1 className="p-4 text-center text-red-400">
        Error has occurred, try again later.
      </h1>
    );
  }

  if (isPending) {
    content = <Loading />;
  }

  if (data) {
    content = (
      <div className="p-4 pb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <PredictionCard setPrefs={setPrefs} prefs={prefs} hits={data} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <NavBarResult algorithm={algorithm} />
      <div className="p-4">
        <UserPreferences
          prefs={prefs}
          setPrefs={setPrefs}
          currentAlgorithm={algorithm}
        />
      </div>
      {content}
    </div>
  );
}
