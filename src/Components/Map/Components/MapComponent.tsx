'use client'

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import '@/Components/Map/assets/map.css';
import 'leaflet/dist/leaflet.css';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import { fetchMarkers } from '@/Components/Map/Components/FetchMarkers';

interface MapComponentProps {
    setMarkers: React.Dispatch<React.SetStateAction<any[]>>;
    setSelectedMarker: React.Dispatch<React.SetStateAction<any | null>>;
    setSliderOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mapInstanceRef: React.MutableRefObject<L.Map | null>;
    markerRefs: React.MutableRefObject<L.CircleMarker[]>;
}

const MapComponent: React.FC<MapComponentProps> = ({
    setMarkers,
    setSelectedMarker,
    setSliderOpen,
    mapInstanceRef,
    markerRefs
}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mapRef.current) {
           const mapInstance = L.map(mapRef.current, { zoomControl: false })
  .setView([52.32552392507825, 18.960972245741033], 6);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(mapInstance);

        

            mapInstance.on('drag', () => setSliderOpen(false));
            mapInstanceRef.current = mapInstance;

            // Pass a safe reference to fetchMarkers
            if (mapInstanceRef.current) {
                fetchMarkers(markerRefs, { current: mapInstanceRef.current }, setSelectedMarker, setSliderOpen, (newMarkers) => {
                    setMarkers((prevMarkers) => {
                        return JSON.stringify(prevMarkers) === JSON.stringify(newMarkers) ? prevMarkers : newMarkers;
                    });
                });
            }
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [mapInstanceRef, markerRefs, setMarkers, setSelectedMarker, setSliderOpen]);

    return <div ref={mapRef} id="map" className="h-full w-full z-0" />;
};

export default MapComponent;