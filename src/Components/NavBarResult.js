import kappa from "../kappa.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NavBarResult = ({ algorithm }) => {
  return (
    <div className="flex items-center justify-between p-4 text-kappa-gray bg-kappa-dark-gray">
      <div className="flex items-center">
        <img
          className="h-16 mr-4 duration-300 hover:animate-bounce"
          src={kappa}
          alt="kappa"
        />
        <h1 className="hidden text-6xl font-bold md:inline text-kappa-green">
          {algorithm === "kmeans" ? "K-Means" : "DBSCAN"} Prediction
        </h1>
      </div>
      <Link to="/">
        <button className="px-3 py-2 text-2xl font-bold duration-300 border rounded-xl border-kappa-green text-kappa-green hover:bg-kappa-black">
          <FontAwesomeIcon icon={faHome} />
        </button>
      </Link>
    </div>
  );
};

export default NavBarResult;
