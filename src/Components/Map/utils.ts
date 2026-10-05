import type { MapLocation, MapPoint } from '@/types/location';

export const ALL_FILTER = 'all';

export interface MapFilter {
  value: string;
  label: string;
  count: number;
}

/** Groups facilities by coordinates so overlapping ones share one marker */
export function groupByPoint(locations: MapLocation[]): MapPoint[] {
  const points = new Map<string, MapPoint>();

  for (const location of locations) {
    const key = `${location.lat},${location.lng}`;
    const point = points.get(key);
    if (point) point.locations.push(location);
    else points.set(key, { key, lat: location.lat, lng: location.lng, locations: [location] });
  }

  return [...points.values()];
}

/** Filter values: "rodzaj:<name>" or "choroba:<name>" */
export function matchesFilter(location: MapLocation, filter: string): boolean {
  if (filter === ALL_FILTER) return true;
  const [kind, name] = filter.split(/:(.*)/s);
  const values = kind === 'choroba' ? location.choroby : location.rodzaje;
  return values?.includes(name) ?? false;
}

function countValues(locations: MapLocation[], pick: (l: MapLocation) => string[] | null) {
  const counts = new Map<string, number>();
  for (const location of locations) {
    for (const value of pick(location) ?? []) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

/**
 * Filter chips built from the data: service types, plus diseases when
 * there is more than one (a single disease would just repeat "Wszystkie").
 */
export function buildFilters(locations: MapLocation[]): MapFilter[] {
  const diseases = countValues(locations, (l) => l.choroby);
  const types = countValues(locations, (l) => l.rodzaje);

  return [
    { value: ALL_FILTER, label: 'Wszystkie', count: locations.length },
    ...(diseases.length > 1
      ? diseases.map(([name, count]) => ({ value: `choroba:${name}`, label: name, count }))
      : []),
    ...types.map(([name, count]) => ({ value: `rodzaj:${name}`, label: name, count })),
  ];
}

/** "2 placówki", "5 placówek" */
export function facilitiesLabel(count: number): string {
  if (count === 1) return '1 placówka';
  const lastDigit = count % 10;
  const lastTwo = count % 100;
  const few = lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14);
  return `${count} ${few ? 'placówki' : 'placówek'}`;
}

const PHONE_RE = /(\+?\d[\d ()-]{5,}\d)/g;

/** Splits a phone line into text and dialable number parts */
export function splitPhoneLine(line: string): { text: string; tel?: string }[] {
  return line
    .split(PHONE_RE)
    .filter(Boolean)
    .map((part) => {
      if (!/^\+?\d[\d ()-]{5,}\d$/.test(part)) return { text: part };
      const digits = part.replace(/\D/g, '');
      return { text: part, tel: digits.length === 9 ? `+48${digits}` : `+${digits}` };
    });
}
