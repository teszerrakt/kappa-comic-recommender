import { createFileRoute } from "@tanstack/react-router";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useState } from "react";
import { InstantSearch, useHits } from "react-instantsearch";
import ComicCard from "../Components/ComicCard";
import FloatingHelpButton from "../Components/FloatingHelpButton";
import NavBar from "../Components/NavBar";
import TutorialModal from "../Components/TutorialModal";
import UserPreferences from "../Components/UserPreferences";
import { usePreferences } from "../context/PreferencesContext";
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from "../env";

// algoliasearch v5 liteClient type is incompatible with react-instantsearch's expected type
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY) as unknown as {
  search: (...args: unknown[]) => Promise<{ results: unknown[] }>;
};

export const Route = createFileRoute("/")({
  component: HomePage,
});

const EmptySearchState = () => {
  const { hits, results } = useHits();
  const hasQuery = (results?.query?.trim() ?? "").length > 0;

  if (hits.length > 0 || !hasQuery) return null;

  return (
    <div className="col-span-full py-10 text-center">
      <h2 className="text-xl font-semibold text-kappa-green">No matches found</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try a different title or check your spelling.
      </p>
    </div>
  );
};

function HomePage() {
  const { prefs, setPrefs } = usePreferences();
  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <div className="min-h-screen">
      <InstantSearch searchClient={searchClient} indexName="comics">
        <NavBar />
        <main className="mx-auto w-full max-w-7xl px-4 pb-10">
          <section className="pt-4">
            <UserPreferences prefs={prefs} setPrefs={setPrefs} />
          </section>
          <section className="pt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <EmptySearchState />
              <ComicCard setPrefs={setPrefs} prefs={prefs} />
            </div>
          </section>
        </main>
      </InstantSearch>
      <TutorialModal isVisible={showModal} onClose={() => setShowModal(false)} />
      <FloatingHelpButton />
    </div>
  );
}
