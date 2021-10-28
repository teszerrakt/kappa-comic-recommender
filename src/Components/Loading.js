import kappa from "../kappa.png";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 z-50 bg-kappa-black">
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <img className="h-32 animate-bounce" src={kappa} alt="kappa" />
        <h1 className="text-2xl font-bold text-kappa-green animate-pulse">
          Please wait...
        </h1>
      </div>
    </div>
  );
};

export default Loading;
