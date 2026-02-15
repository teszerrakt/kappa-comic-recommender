import { Skeleton } from "./ui/skeleton";

const ResultsSkeleton = () => {
  const cardKeys = Array.from({ length: 10 }, (_, index) => `prediction-skeleton-${index + 1}`);
  const starKeys = [1, 2, 3, 4, 5];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cardKeys.map((key) => (
        <div key={key} className="rounded-lg border border-border bg-card p-2">
          <Skeleton className="h-96 w-full rounded-xl" />
          <div className="mt-4 flex flex-col items-center gap-3">
            <Skeleton className="h-4 w-4/5" />
            <div className="flex gap-2">
              {starKeys.map((star) => (
                <Skeleton key={`${key}-star-${star}`} className="h-4 w-4" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsSkeleton;
