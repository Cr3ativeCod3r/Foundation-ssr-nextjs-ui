import type { Metadata } from 'next';
import MapView from '@/Components/Map/MapView';
import { fetchLocations } from '@/api/locations';
import type { MapLocation } from '@/types/location';

// Must be a literal for Next.js — keep in sync with LOCATIONS_REVALIDATE
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Mapa ośrodków',
  description: 'Mapa ośrodków rehabilitacji neurologicznej i leczenia toksyną botulinową w Polsce.',
};

export default async function MapPage() {
  let locations: MapLocation[] = [];
  try {
    locations = await fetchLocations();
  } catch (error) {
    console.error('[MapPage] Error:', error);
  }

  return <MapView locations={locations} />;
}
