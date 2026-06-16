'use client'

import { useEffect, useRef, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Slider from '@/Components/Map/Layout/Slider';
import Select from 'react-select';
import Link from 'next/link';
import { MdManageSearch, MdArrowBack } from "react-icons/md";
import { customLayerNames } from '@/Components/Map/Components/Layers';

// Import types only
import type L from 'leaflet';

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(
  () => import('@/Components/Map/Components/MapComponent'),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center">Loading map...</div>
  }
);

const MapCard: React.FC = () => {
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markerRefs = useRef<L.CircleMarker[]>([]);

    const [isSliderOpen, setSliderOpen] = useState(false);

    interface Marker {
        _id: string;
        department: string;
        address: string;
        phone: string;
        lat: number;
        lng: number;
    }

    const [markers, setMarkers] = useState<Marker[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    useEffect(() => {
        document.title = 'Mapa ośrodków';
    }, []);

    const toggleSlider = () => setSliderOpen(!isSliderOpen);

    const memoizedMarkers = useMemo(() => markers, [markers]);
    
    const safeMapRef = () => {
        return mapInstanceRef.current ? { current: mapInstanceRef.current } : null;
    };

    const handleCategoryChange = (selectedOption: any) => {
        const safe = safeMapRef();
        if (safe && typeof window !== 'undefined') {
            // Import the handler function dynamically when needed
            import('@/Components/Map/Components/CategoryChagne').then(module => {
                module.handleCategoryFilterChange(selectedOption, {
                    setSelectedCategory,
                    mapInstanceRef: safe,
                    markerRefs
                });
            });
        }
    };

    const handlePointSelection = (selectedOption: any) => {
        const safe = safeMapRef();
        if (safe && typeof window !== 'undefined') {
            // Import the handler function dynamically when needed
            import('@/Components/Map/Components/PointSelect').then(module => {
                module.handlePointSelect(selectedOption, setSliderOpen, setSelectedMarker, safe, markerRefs);
            });
        }
    };

    return (
        <>
            <div className='overflow-hidden h-[100vh] bg-white z-[999] flex flex-col'>
                <Slider isSliderOpen={isSliderOpen} toggleSlider={toggleSlider} marker={selectedMarker} />

                {/* Oddzielne miejsce na wybór choroby NAD mapą */}
                <div className="pt-4 pb-3 bg-white w-full border-b border-slate-100 shadow-sm z-10 shrink-0">
                  <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="flex gap-2 px-4 w-max mx-auto items-center">
                      
                      {/* Przycisk Wyjdź */}
                      <Link href="/" className="whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold bg-slate-800 text-[#ffffff] shadow-md hover:bg-slate-700 transition-all flex items-center gap-1.5 mr-1">
                        <MdArrowBack size={16} color="#ffffff" /> <span style={{ color: '#ffffff' }}>Wyjdź</span>
                      </Link>

                      {customLayerNames.map(layer => (
                        <button
                          key={layer.value}
                          onClick={() => {
                            setSelectedCategory(layer.value);
                            handleCategoryChange(layer);
                          }}
                          className={`
                            whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 border
                            ${selectedCategory === layer.value 
                              ? 'bg-teal-600 text-white border-teal-600 shadow-md' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }
                          `}
                        >
                          {layer.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kontener Mapy */}
                <div className="flex-1 w-full relative show-in flex lg:flex-row flex-col min-h-0">
                  <div className="absolute z-[1000] top-4 w-full flex flex-col items-center pointer-events-none px-4">
                    {/* Szukaj placówki */}
                    <div className="flex items-center bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-lg w-full max-w-md pointer-events-auto border border-slate-200/60">
                      <MdManageSearch className="text-3xl text-teal-600 ml-2" />
                      <Select
                        options={memoizedMarkers.map(marker => ({
                          value: marker._id,
                          label: marker.department,
                        }))}
                        onFocus={() => setSliderOpen(false)}
                        onChange={handlePointSelection}
                        placeholder="Szukaj placówki..."
                        className="w-full text-sm font-medium"
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: 0,
                            boxShadow: 'none',
                            background: 'transparent',
                          })
                        }}
                      />
                    </div>
                  </div>
                    <MapComponent 
                        setMarkers={setMarkers}
                        setSelectedMarker={setSelectedMarker}
                        setSliderOpen={setSliderOpen}
                        mapInstanceRef={mapInstanceRef}
                        markerRefs={markerRefs}
                    />
                </div>
            </div>
        </>
    );
};

export default MapCard;