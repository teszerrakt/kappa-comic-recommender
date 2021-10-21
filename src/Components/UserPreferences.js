import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const UserPreferences = ({ prefs, setPrefs }) => {
  const handleDelete = (id) => () => {
    setPrefs((chips) => chips.filter((chip) => chip.id !== id));
  };

  return (
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
  );
};

export default UserPreferences;
