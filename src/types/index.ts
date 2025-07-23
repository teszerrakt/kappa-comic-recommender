export interface UserPreference {
  id: string;
  title: string;
  rating: number;
}

export interface ComicHit {
  id: string;
  title: string;
  imageUrl: string;
}

export type Algorithm = "kmeans" | "dbscan";

export interface PredictionResponse {
  id: string;
  title: string;
  imageUrl: string;
  // Add other fields that come from the API response
}

export interface PredictionState {
  loading: boolean;
  data: PredictionResponse[] | null;
  error: boolean;
}