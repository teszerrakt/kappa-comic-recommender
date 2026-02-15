import { Link } from "@tanstack/react-router";
import kappa from "../Assets/kappa.png";
import SearchBox from "./SearchBox";

interface NavBarProps {
  showSearch?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ showSearch = true }) => {
  return (
    <nav className="flex items-center justify-between p-4 text-kappa-gray bg-card">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            className="h-12 transition-transform duration-200 hover:scale-105"
            src={kappa}
            alt="Kappa logo"
          />
          <span className="hidden text-3xl font-bold md:inline text-kappa-green">kappa</span>
          <span className="text-lg font-bold text-kappa-green md:hidden">kappa</span>
        </Link>
      </div>

      {showSearch && <SearchBox />}
    </nav>
  );
};

export default NavBar;
