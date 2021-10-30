import { useEffect, useState } from "react";
import NavBarResult from "../Components/NavBarResult";
import UserPreferences from "../Components/UserPreferences";
import Loading from "../Components/Loading";
import axios from "axios";
import PredictionCard from "../Components/PredictionCard";

const Result = ({ prefs, setPrefs, algorithm, setAlgorithm }) => {
  const url = `https://kappa-api-2cz8r.ondigitalocean.app/api/${algorithm}`;
  const [prediction, setPrediction] = useState({
    loading: false,
    data: null,
    error: false,
  });

  let content = null;

  useEffect(() => {
    setPrediction({
      loading: true,
      data: null,
      error: false,
    });
    axios
      .post(url, prefs)
      .then((response) => {
        console.log(response);
        setPrediction({
          loading: false,
          data: response.data,
          error: false,
        });
      })
      .catch((error) => {
        setPrediction({
          loading: false,
          data: null,
          error: true,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (prediction.error) {
    content = <h1>Error has occured, try again later.</h1>;
  }

  if (prediction.loading) {
    content = <Loading />;
  }

  if (prediction.data) {
    content = (
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <PredictionCard
            setPrefs={setPrefs}
            prefs={prefs}
            hits={prediction.data}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <NavBarResult algorithm={algorithm} />
      <UserPreferences
        prefs={prefs}
        setPrefs={setPrefs}
        setAlgorithm={setAlgorithm}
      />
      {content}
    </div>
  );
};

export default Result;
