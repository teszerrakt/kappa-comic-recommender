import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import Result from "./Views/Result";
import Footer from "./Components/Footer";
import { UserPreference } from "./types";

const App = () => {
  const [prefs, setPrefs] = useState<UserPreference[]>([]); //user preferences (ratings)
  const [algorithm, setAlgorithm] = useState<string>("");

  return (
    <Router>
      <div className="relative min-h-screen pb-10">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                prefs={prefs}
                setPrefs={setPrefs}
                setAlgorithm={setAlgorithm}
              />
            }
          />
          <Route
            path="/kmeans"
            element={
              <Result
                prefs={prefs}
                setPrefs={setPrefs}
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
              />
            }
          />
          <Route
            path="/dbscan"
            element={
              <Result
                prefs={prefs}
                setPrefs={setPrefs}
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
