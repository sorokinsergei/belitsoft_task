export interface MoviesSearch {
  profession: ScoredMovie[];
}

export interface ScoredMovie {
  score: number;
  show: Movie;
}

export interface Movie {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string;
  ended: string | null;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: null;
  webChannel: {
    id: number;
    name: string;
    country: null;
    officialSite: string | null;
  } | null;
  dvdCountry: null;
  externals: {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
  };
  image: {
    medium: string | null;
    original: string | null;
  } | null;
  summary: string | null;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode?: {
      href: string;
      name?: string;
    };
  };
}
