import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBarResult from "../Components/NavBarResult";
import UserPreferences from "../Components/UserPreferences";
import Loading from "../Components/Loading";
import axios, { AxiosResponse } from "axios";
import PredictionCard from "../Components/PredictionCard";
import { KAPPA_API_TOKEN, KAPPA_API_URL } from "../env";
import { UserPreference, PredictionState, PredictionResponse } from "../types";

interface ResultProps {
  prefs: UserPreference[];
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
  algorithm: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
}

const Result: React.FC<ResultProps> = ({
  prefs,
  setPrefs,
  algorithm,
  setAlgorithm,
}) => {
  const [searchParams] = useSearchParams();
  const algorithmFromUrl = searchParams.get("algorithm") || algorithm;

  // Update algorithm state when URL changes
  useEffect(() => {
    if (algorithmFromUrl && algorithmFromUrl !== algorithm) {
      setAlgorithm(algorithmFromUrl);
    }
  }, [algorithmFromUrl, algorithm, setAlgorithm]);

  const url = `${KAPPA_API_URL}/api/${algorithmFromUrl}`;
  const [prediction, setPrediction] = useState<PredictionState>({
    loading: false,
    data: null,
    error: false,
  });

  let content: React.ReactNode = null;

  useEffect(() => {
    setPrediction({
      loading: true,
      data: null,
      error: false,
    });

    axios
      .post<PredictionResponse[]>(url, prefs, {
        headers: {
          "X-API-Key": KAPPA_API_TOKEN,
        },
      })
      .then((response: AxiosResponse<PredictionResponse[]>) => {
        console.log(response);
        setPrediction({
          loading: false,
          data: response.data,
          error: false,
        });
      })
      .catch((error) => {
        console.error("Prediction API error:", error);
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
      <div className="p-4 pb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 ">
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
      <NavBarResult algorithm={algorithmFromUrl} />
      <div className="p-4">
        <UserPreferences
          prefs={prefs}
          setPrefs={setPrefs}
          algo={algorithmFromUrl}
          setAlgorithm={setAlgorithm}
        />
      </div>
      {content}
    </div>
  );
};

export default Result;
