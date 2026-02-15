import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import NavBarResult from "../Components/NavBarResult";
import PredictionCard from "../Components/PredictionCard";
import ResultsSkeleton from "../Components/ResultsSkeleton";
import UserPreferences from "../Components/UserPreferences";
import { Button } from "../Components/ui/button";
import { usePreferences } from "../context/PreferencesContext";
import { KAPPA_API_TOKEN, KAPPA_API_URL } from "../env";
import type { Algorithm, PredictionResponse } from "../types";

interface ResultSearch {
  algorithm: Algorithm;
}

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>): ResultSearch => ({
    algorithm: (search.algorithm as Algorithm) === "dbscan" ? "dbscan" : "kmeans",
  }),
  component: ResultPage,
});

function ResultPage() {
  const { algorithm } = Route.useSearch();
  const { prefs, setPrefs } = usePreferences();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["predictions", algorithm, prefs],
    queryFn: async (): Promise<PredictionResponse[]> => {
      const response = await fetch(`${KAPPA_API_URL}/api/${algorithm}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": KAPPA_API_TOKEN,
        },
        body: JSON.stringify(prefs),
      });
      if (!response.ok) throw new Error("Prediction failed");
      return response.json();
    },
    enabled: prefs.length >= 5,
  });

  const renderContent = () => {
    if (isError) {
      return (
        <div className="py-10 text-center">
          <h2 className="text-xl font-semibold text-destructive">Prediction failed</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error?.message || "Please try again in a moment."}
          </p>
          <Button variant="kappa" className="mt-4" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      );
    }

    if (isPending) {
      return <ResultsSkeleton />;
    }

    if (prefs.length < 5) {
      return (
        <div className="py-10 text-center">
          <h2 className="text-xl font-semibold text-kappa-green">
            Rate more comics to unlock predictions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add {5 - prefs.length} more ratings and we will generate recommendations.
          </p>
          <Button variant="kappa" className="mt-4" asChild>
            <Link to="/">Go to home</Link>
          </Button>
        </div>
      );
    }

    if (data?.length) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <PredictionCard setPrefs={setPrefs} prefs={prefs} hits={data} />
        </div>
      );
    }

    return (
      <div className="py-10 text-center">
        <h2 className="text-xl font-semibold text-kappa-green">No recommendations yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adding a few more ratings to improve the results.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <NavBarResult algorithm={algorithm} />
      <main className="mx-auto w-full max-w-7xl px-4 pb-10">
        <section className="pt-4">
          <UserPreferences prefs={prefs} setPrefs={setPrefs} currentAlgorithm={algorithm} />
        </section>
        <section className="pt-4">{renderContent()}</section>
      </main>
    </div>
  );
}
