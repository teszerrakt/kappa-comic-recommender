import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    <input
      placeholder="Comic Title"
      className="p-4 w-3/5-vw rounded-xl bg-kappa-black focus:outline-none focus:ring-2 focus:ring-kappa-green focus:border-transparent"
      type="search"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
