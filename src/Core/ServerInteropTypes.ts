export enum NearbyCategory {
  Schools = "schools",
  Hospitals = "hospitals",
  Offices = "offices",
  Projects = "projects",
  Transit = "transit",
  Parks = "parks",
  Cemeteries = "cemeteries",
  DumpUtilities = "dump_utilities",
  Markets = "markets",
  Malls = "malls",
}

export type MapLocation = {
  lat: number;
  lng: number;
};

export type MapSnapshot = {
  file: string;
  zoom: number;
  radius_m: number;
  size: string;
  scale: number;
};

export type NearbyItem = {
  name: string;
  rating: number;
  user_ratings_total: number;
  distance_m: number;
  location: MapLocation;
};

export type NearbyData = {
  items: NearbyItem[];
};

export type MapNearby = {
  [key in NearbyCategory]: NearbyData;
};

export type DerivedItem = {
  query?: string;
  name: string;
  distance_m: number;
  location: MapLocation;
  place_id: string;
};

export enum DerivedCategory {
  MajorRoads = "major_roads",
  Metro = "metro",
  TechHub = "tech_hub",
  Railway = "railway",
  Lake = "lake",
}

export type MapDerived = {
  [key in DerivedCategory]: DerivedItem | DerivedItem[];
} & {
  generated_at: number;
};

export type PropMapData = {
  name: string;
  location: MapLocation;
  rating: number;
  user_ratings_total: number;
  snapshot: MapSnapshot;
  nearby: MapNearby;
  derived: MapDerived;
};
