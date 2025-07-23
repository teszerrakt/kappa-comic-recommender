import { useSearchBox } from "react-instantsearch";

const SearchBox: React.FC = () => {
  const { query, refine } = useSearchBox();
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    refine(event.currentTarget.value);
  };
  
  return (
    <form noValidate action="" role="search">
      <input
        placeholder="Comic Title"
        className="p-4 w-3/5-vw rounded-xl bg-kappa-black focus:outline-none focus:ring-2 focus:ring-kappa-green focus:border-transparent"
        type="search"
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBox;
