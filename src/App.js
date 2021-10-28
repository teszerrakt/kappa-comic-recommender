import algoliasearch from "algoliasearch/lite";
import { useState } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import ComicCard from "./Components/ComicCard";
import NavBar from "./Components/NavBar";
import UserPreferences from "./Components/UserPreferences";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const searchClient = algoliasearch(
  "R9Z2VSNEW5",
  "e7f63a3c29920e4f24cd39fc93d68601"
);

const App = () => {
  const [prefs, setPrefs] = useState([]); //user preferences (ratings)

  return (
    <InstantSearch searchClient={searchClient} indexName="comics">
      <NavBar />
      <UserPreferences prefs={prefs} setPrefs={setPrefs} />
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <ComicCard setPrefs={setPrefs} prefs={prefs} />
        </div>
      </div>
    </InstantSearch>
  );
};

export default App;
