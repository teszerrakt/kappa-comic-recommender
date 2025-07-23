import { InstantSearch } from "react-instantsearch";
import ComicCard from "../Components/ComicCard";
import NavBar from "../Components/NavBar";
import UserPreferences from "../Components/UserPreferences";
import algoliasearch from "algoliasearch/lite";
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from "../env";
import { useState } from "react";
import TutorialModal from "../Components/TutorialModal";
import { UserPreference } from "../types";

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

interface HomeProps {
  prefs: UserPreference[];
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<HomeProps> = ({ prefs, setPrefs, setAlgorithm }) => {
  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="comics">
        <NavBar />
        <UserPreferences
          prefs={prefs}
          setPrefs={setPrefs}
          setAlgorithm={setAlgorithm}
        />
        <div className="p-4 pb-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 ">
            <ComicCard setPrefs={setPrefs} prefs={prefs} />
          </div>
        </div>
      </InstantSearch>
      <TutorialModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Home;
