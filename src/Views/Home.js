import { InstantSearch } from "react-instantsearch-dom";
import ComicCard from "../Components/ComicCard";
import NavBar from "../Components/NavBar";
import UserPreferences from "../Components/UserPreferences";
import algoliasearch from "algoliasearch/lite";
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from "../env";

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const Home = ({ prefs, setPrefs, setAlgorithm }) => {
  return (
    <InstantSearch searchClient={searchClient} indexName="comics">
      <NavBar />
      <UserPreferences
        prefs={prefs}
        setPrefs={setPrefs}
        setAlgorithm={setAlgorithm}
      />
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <ComicCard setPrefs={setPrefs} prefs={prefs} />
        </div>
      </div>
    </InstantSearch>
  );
};

export default Home;
