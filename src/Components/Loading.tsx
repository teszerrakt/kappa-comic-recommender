import kappa from "../Assets/kappa.png";

const Loading = () => {
  return (
    <output
      className="flex flex-col items-center justify-center py-12 text-center"
      aria-live="polite"
    >
      <img className="h-20 animate-bounce" src={kappa} alt="Loading" />
      <p className="mt-3 text-lg font-semibold text-kappa-green animate-pulse">Loading...</p>
    </output>
  );
};

export default Loading;
