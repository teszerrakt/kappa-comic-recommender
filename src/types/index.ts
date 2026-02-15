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
  image_url: string;
  rating: number;
}

export interface PredictionState {
  loading: boolean;
  data: PredictionResponse[] | null;
  error: boolean;
}

export interface MangaData {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: string[];
  type?: string;
  chapters?: number;
  volumes?: number;
  status?: string;
  published?: {
    from?: string;
    to?: string;
    prop?: {
      from?: {
        day?: number;
        month?: number;
        year?: number;
      };
      to?: {
        day?: number;
        month?: number;
        year?: number;
      };
    };
    string?: string;
  };
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  synopsis?: string;
  background?: string;
  authors?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  serializations?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  genres?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  themes?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  demographics?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  images?: {
    jpg?: {
      image_url?: string;
      small_image_url?: string;
      large_image_url?: string;
    };
    webp?: {
      image_url?: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  url?: string;
}

export interface JikanMangaResponse {
  data: MangaData;
}
