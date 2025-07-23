import { useQuery } from "@tanstack/react-query";
import { JikanMangaResponse } from "../types";

const fetchMangaDetails = async (id: string): Promise<JikanMangaResponse> => {
  const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch manga details: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const useMangaDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ["manga", id],
    queryFn: () => fetchMangaDetails(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error.message.includes('404')) {
        return false; // Don't retry for 404 errors
      }
      return failureCount < 2; // Retry up to 2 times for other errors
    },
  });
};