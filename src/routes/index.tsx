import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { InstantSearch } from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from "../env";
import ComicCard from "../Components/ComicCard";
import NavBar from "../Components/NavBar";
import UserPreferences from "../Components/UserPreferences";
import TutorialModal from "../Components/TutorialModal";
import FloatingHelpButton from "../Components/FloatingHelpButton";
import { usePreferences } from "../context/PreferencesContext";

// algoliasearch v5 liteClient type is incompatible with react-instantsearch's expected type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY) as any;

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { prefs, setPrefs } = usePreferences();
  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="comics">
        <NavBar />
        <div className="p-4">
          <UserPreferences prefs={prefs} setPrefs={setPrefs} />
        </div>
        <div className="p-4 pb-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <ComicCard setPrefs={setPrefs} prefs={prefs} />
          </div>
        </div>
      </InstantSearch>
      <TutorialModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
      <FloatingHelpButton />
    </>
  );
}
