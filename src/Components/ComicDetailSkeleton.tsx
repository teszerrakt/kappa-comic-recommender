import { Skeleton } from "./ui/skeleton";

const ComicDetailSkeleton = () => {
  const statKeys = ["score", "rank", "members", "favorites"];
  const categoryKeys = ["category-1", "category-2", "category-3", "category-4"];
  const themeKeys = ["theme-1", "theme-2", "theme-3", "theme-4"];
  const demoKeys = ["demo-1", "demo-2", "demo-3"];

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-start gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <div className="mt-3 flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="mt-4 h-[420px] w-full rounded-lg" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {statKeys.map((key) => (
                <div key={key} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border p-4">
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="space-y-2 p-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border p-4">
                <Skeleton className="h-5 w-28" />
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <Skeleton className="h-4 w-20" />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {categoryKeys.map((key) => (
                      <Skeleton key={key} className="h-6 w-16" />
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-20" />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {themeKeys.map((key) => (
                      <Skeleton key={key} className="h-6 w-16" />
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {demoKeys.map((key) => (
                      <Skeleton key={key} className="h-6 w-16" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetailSkeleton;
