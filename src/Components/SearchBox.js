import { useSearchBox } from "react-instantsearch";

const SearchBox = () => {
  const { query, refine } = useSearchBox();
  
  return (
    <form noValidate action="" role="search">
      <input
        placeholder="Comic Title"
        className="p-4 w-3/5-vw rounded-xl bg-kappa-black focus:outline-none focus:ring-2 focus:ring-kappa-green focus:border-transparent"
        type="search"
        value={query}
        onChange={(event) => refine(event.currentTarget.value)}
      />
    </form>
  );
};

export default SearchBox;
