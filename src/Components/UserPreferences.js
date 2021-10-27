import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserPreferences = ({ prefs, setPrefs }) => {
  const handleDelete = (id) => () => {
    setPrefs((chips) => chips.filter((chip) => chip.id !== id));
  };

  const predict = (algorithm) => {
    axios
      .post(`https://reqres.in/api/${algorithm}`, prefs)
      .then((response) => console.log(response));
  };

  const Button = ({ children, algorithm }) => (
    <button
      className="p-2 text-2xl font-bold text-center duration-300 border border-kappa-black text-kappa-black bg-kappa-green rounded-xl hover:bg-kappa-black hover:border-kappa-green hover:text-kappa-green"
      onClick={() => predict(algorithm)}
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="grid gap-2 p-4 md:grid-cols-2">
        {prefs.map((pref) => (
          <div
            key={pref.id}
            className="flex justify-between px-2 pb-2 border-b text-kappa-green border-kappa-green"
          >
            <span className="">
              {pref.title} | {pref.rating}
            </span>
            <FontAwesomeIcon
              className="text-2xl duration-300 cursor-pointer text-kappa-gray hover:text-kappa-green"
              icon={faTimes}
              onClick={handleDelete(pref.id)}
            />
          </div>
        ))}
      </div>
      <div
        className={`${
          prefs.length >= 5 ? "flex" : "hidden"
        } justify-center gap-2 p-2`}
      >
        <Button algorithm="kmeans">K-Means</Button>
        <Button algorithm="dbscan">DBSCAN</Button>
      </div>
    </div>
  );
};

export default UserPreferences;
