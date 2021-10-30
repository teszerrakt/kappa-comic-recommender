import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Views/Home";
import Result from "./Views/Result";
import Footer from "./Components/Footer";

const App = () => {
  const [prefs, setPrefs] = useState([]); //user preferences (ratings)
  const [algorithm, setAlgorithm] = useState("");

  return (
    <Router>
      <div className="relative min-h-screen pb-10">
        <Switch>
          <Route exact path="/">
            <Home
              prefs={prefs}
              setPrefs={setPrefs}
              setAlgorithm={setAlgorithm}
            />
            ;
          </Route>
          <Route path="/kmeans">
            <Result
              prefs={prefs}
              setPrefs={setPrefs}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
            />
          </Route>
          <Route path="/dbscan">
            <Result
              prefs={prefs}
              setPrefs={setPrefs}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
