import SearchBox from "./SearchBox";
import kappa from "../Assets/kappa.png";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-4 text-kappa-gray bg-kappa-dark-gray">
      <div className="flex items-center">
        <img
          className="h-16 mr-4 duration-300 hover:animate-bounce"
          src={kappa}
          alt="kappa"
        />
        <h1 className="hidden text-6xl font-bold md:inline text-kappa-green">
          kappa
        </h1>
      </div>

      <SearchBox />
    </div>
  );
};

export default NavBar;
