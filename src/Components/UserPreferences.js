import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStar, faMagic } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UserPreferences = ({ prefs, setPrefs, setAlgorithm }) => {
  const handleDelete = (id) => () => {
    setPrefs((chips) => chips.filter((chip) => chip.id !== id));
  };

  const Button = ({ children, algorithm }) => (
    <button
      className="p-2 text-2xl font-bold text-center duration-300 border border-kappa-dark-gray text-kappa-dark-gray bg-kappa-green rounded-xl hover:bg-kappa-dark-gray hover:border-kappa-green hover:text-kappa-green"
      onClick={() => setAlgorithm(algorithm)}
    >
      <FontAwesomeIcon icon={faMagic} className="mr-2" />
      {children}
    </button>
  );

  return (
    <div
      className={`${prefs.length > 0 ? "block" : "hidden"} bg-kappa-dark-gray`}
    >
      <div className="grid gap-2 p-4 md:grid-cols-2">
        {prefs.map((pref) => (
          <div
            key={pref.id}
            className="flex justify-between px-2 pb-2 border-b text-kappa-green border-kappa-green"
          >
            <div>
              <span className="">
                {pref.title} | {pref.rating}
              </span>
              <FontAwesomeIcon className="ml-1" icon={faStar} />
            </div>
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
        <Link to="/kmeans">
          <Button algorithm="kmeans">K-Means</Button>
        </Link>
        <Link to="/dbscan">
          <Button algorithm="dbscan">DBSCAN</Button>
        </Link>
      </div>
    </div>
  );
};

export default UserPreferences;
