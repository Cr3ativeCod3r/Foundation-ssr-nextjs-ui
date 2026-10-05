/**
 * Map location types — Strapi "Lokalizacje" collection
 */

/** Single facility as returned by Strapi */
export interface MapLocation {
  id: number;
  documentId: string;
  /** Full name: "Oddział …, Szpital …" */
  nazwa: string;
  oddzial: string | null;
  placowka: string | null;
  adres: string;
  miasto: string | null;
  /** One labelled number per line, e.g. "Rejestracja: (71) 734-31-00" */
  telefon: string | null;
  lat: number;
  lng: number;
  choroby: string[] | null;
  /** Service types, e.g. "Rehabilitacja neurologiczna" */
  rodzaje: string[] | null;
}

/** Facilities sharing the same coordinates — drawn as a single marker */
export interface MapPoint {
  key: string;
  lat: number;
  lng: number;
  locations: MapLocation[];
}
