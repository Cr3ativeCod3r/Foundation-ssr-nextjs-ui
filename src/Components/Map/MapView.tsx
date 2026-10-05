'use client'

import { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import Link from 'next/link';
import { MdManageSearch, MdArrowBack } from 'react-icons/md';
import type L from 'leaflet';
import Slider from '@/Components/Map/Layout/Slider';
import { ALL_FILTER, buildFilters, groupByPoint, matchesFilter } from '@/Components/Map/utils';
import type { MapLocation } from '@/types/location';

// Leaflet needs `window` — load the map on the client only
const MapComponent = dynamic(
  () => import('@/Components/Map/Components/MapComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center text-sm text-slate-400">
        Ładowanie mapy…
      </div>
    ),
  }
);

interface SearchOption {
  value: string;
  label: string;
  city: string | null;
  location: MapLocation;
}

interface MapViewProps {
  locations: MapLocation[];
}

const MapView: React.FC<MapViewProps> = ({ locations }) => {
    const mapInstanceRef = useRef<L.Map | null>(null);

    const [isSliderOpen, setSliderOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>(ALL_FILTER);

    const filters = useMemo(() => buildFilters(locations), [locations]);

    const points = useMemo(
        () => groupByPoint(locations.filter((location) => matchesFilter(location, filter))),
        [locations, filter],
    );

    const selectedPoint = useMemo(
        () => points.find((point) => point.key === selectedKey) ?? null,
        [points, selectedKey],
    );

    const searchOptions = useMemo<SearchOption[]>(
        () => locations.map((location) => ({
            value: String(location.id),
            label: location.nazwa,
            city: location.miasto,
            location,
        })),
        [locations],
    );

    const selectPoint = useCallback((key: string) => {
        setSelectedKey(key);
        setSliderOpen(true);
    }, []);

    const closeSlider = useCallback(() => setSliderOpen(false), []);

    const handleSearchSelect = (option: SearchOption | null) => {
        if (!option) return;
        const { location } = option;

        // Make sure the facility is visible under the active filter
        if (!matchesFilter(location, filter)) setFilter(ALL_FILTER);

        mapInstanceRef.current?.setView([location.lat, location.lng], 15);
        selectPoint(`${location.lat},${location.lng}`);
    };

    const handleFilterChange = (value: string) => {
        setFilter(value);
        setSliderOpen(false);
        setSelectedKey(null);
    };

    return (
        <div className='overflow-hidden h-[100dvh] bg-white z-[999] flex flex-col'>
            <Slider isSliderOpen={isSliderOpen && !!selectedPoint} toggleSlider={closeSlider} point={selectedPoint} />

            {/* Filters above the map */}
            <div className="pt-4 pb-3 bg-white w-full border-b border-slate-100 shadow-sm z-10 shrink-0">
              <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex gap-2 px-4 w-max mx-auto items-center">
                  <Link href="/" className="whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold bg-slate-800 text-white shadow-md hover:bg-slate-700 transition-all flex items-center gap-1.5 mr-1">
                    <MdArrowBack size={16} /> Wyjdź
                  </Link>

                  {filters.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => handleFilterChange(item.value)}
                      className={`
                        whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 border flex items-center gap-2
                        ${filter === item.value
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }
                      `}
                    >
                      {item.label}
                      <span className={`rounded-full px-1.5 text-[11px] ${filter === item.value ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                        {item.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="flex-1 w-full relative show-in flex lg:flex-row flex-col min-h-0">
              <div className="absolute z-[1000] top-4 w-full flex flex-col items-center pointer-events-none px-4">
                <div className="flex items-center bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-lg w-full max-w-md pointer-events-auto border border-slate-200/60">
                  <MdManageSearch className="text-3xl text-teal-600 ml-2 shrink-0" />
                  <Select<SearchOption>
                    instanceId="map-search"
                    options={searchOptions}
                    value={null}
                    onFocus={closeSlider}
                    onChange={handleSearchSelect}
                    placeholder="Szukaj placówki lub miasta…"
                    noOptionsMessage={() => 'Brak wyników'}
                    filterOption={(option, input) => {
                        const query = input.toLowerCase();
                        return option.label.toLowerCase().includes(query)
                            || (option.data.city?.toLowerCase().includes(query) ?? false);
                    }}
                    formatOptionLabel={(option) => (
                        <div className="leading-tight">
                            <div className="text-sm text-slate-800">{option.label}</div>
                            {option.city && <div className="text-xs text-slate-400">{option.city}</div>}
                        </div>
                    )}
                    className="w-full text-sm font-medium"
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: 0,
                        boxShadow: 'none',
                        background: 'transparent',
                      }),
                      menu: (base) => ({ ...base, zIndex: 1001 }),
                    }}
                  />
                </div>
              </div>

              <MapComponent
                points={points}
                selectedKey={selectedKey}
                onSelect={selectPoint}
                onMapMove={closeSlider}
                mapInstanceRef={mapInstanceRef}
              />
            </div>
        </div>
    );
};

export default MapView;
