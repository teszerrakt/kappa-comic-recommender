import { useSearchBox } from "react-instantsearch";

const SearchBox: React.FC = () => {
  const { query, refine } = useSearchBox();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    refine(event.currentTarget.value);
  };

  return (
    <search className="w-full md:w-auto">
      <input
        aria-label="Search comics"
        placeholder="Search for a comic title"
        className="p-3 md:p-4 w-full md:w-[420px] lg:w-[520px] rounded-xl bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-kappa-green focus:border-transparent"
        type="search"
        value={query}
        onChange={handleChange}
      />
    </search>
  );
};

export default SearchBox;
