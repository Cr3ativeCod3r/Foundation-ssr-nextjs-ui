'use client'

import { useEffect, useRef, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Slider from '@/Components/Map/Layout/Slider';
import Select from 'react-select';

import { MdManageSearch } from "react-icons/md";
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
            <div className='overflow-hidden h-[100vh] bg-white mt-[-120px] z-999'>
                <Slider isSliderOpen={isSliderOpen} toggleSlider={toggleSlider} marker={selectedMarker} />

                <div className="h-[87vh] mt-[100px] w-full relative show-in">
                    <div className="flex justify-center gap-4 absolute z-10 top-2 w-[90vw]">
                        <div className="flex items-center bg-white p-2 lg:ml-44 sm: ml-auto rounded shadow-md">
                            <MdManageSearch className="text-2xl text-gray-500 mr-2" />
                            <Select
                                options={customLayerNames}
                                onChange={handleCategoryChange}
                                onFocus={() => setSliderOpen(false)}
                                placeholder="Wybierz kategorię..."
                                className="lg:w-[280px] sm: w-[220px] text-slate-800"
                                value={customLayerNames.find(layer => layer.value === selectedCategory)}
                            />
                        </div>
                        <div className="lg:flex sm: hidden items-center bg-white p-2 rounded shadow-md">
                            <MdManageSearch className="text-2xl text-gray-500 mr-2" />
                            <Select
                                options={memoizedMarkers.map(marker => ({
                                    value: marker._id,
                                    label: marker.department,
                                }))}
                                onFocus={() => setSliderOpen(false)}
                                onChange={handlePointSelection}
                                placeholder="Szukaj punktu..."
                                className="lg:w-[280px] sm: w-[60vw] text-slate-800"
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