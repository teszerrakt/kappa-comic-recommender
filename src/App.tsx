import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Views/Home";
import Result from "./Views/Result";
import ComicDetails from "./Views/ComicDetails";
import Footer from "./Components/Footer";
import FloatingHelpButton from "./Components/FloatingHelpButton";
import { UserPreference } from "./types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  const [prefs, setPrefs] = useState<UserPreference[]>([]); //user preferences (ratings)
  const [algorithm, setAlgorithm] = useState<string>("");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="relative min-h-screen pb-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home
                    prefs={prefs}
                    setPrefs={setPrefs}
                    setAlgorithm={setAlgorithm}
                  />
                  <FloatingHelpButton />
                </>
              }
            />
            <Route
              path="/results"
              element={
                <Result
                  prefs={prefs}
                  setPrefs={setPrefs}
                  algorithm={algorithm}
                  setAlgorithm={setAlgorithm}
                />
              }
            />
            <Route path="/comic/:id" element={<ComicDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
