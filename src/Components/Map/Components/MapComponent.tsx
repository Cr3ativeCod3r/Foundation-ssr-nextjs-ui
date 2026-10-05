'use client'

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import '@/Components/Map/assets/map.css';
import 'leaflet/dist/leaflet.css';
import type { MapPoint } from '@/types/location';
import { facilitiesLabel } from '@/Components/Map/utils';

const POLAND_CENTER: L.LatLngExpression = [52.0693, 19.4803];

const MARKER_STYLE: L.CircleMarkerOptions = {
    radius: 8,
    fillColor: '#0d9488',
    color: '#ffffff',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.9,
};

const SELECTED_STYLE: L.CircleMarkerOptions = {
    radius: 11,
    fillColor: '#f59e0b',
    color: '#ffffff',
    weight: 3,
    fillOpacity: 1,
};

/** A point holding several facilities is drawn bigger and darker */
function styleFor(point: MapPoint, selected: boolean): L.CircleMarkerOptions {
    if (selected) return SELECTED_STYLE;
    return point.locations.length > 1
        ? { ...MARKER_STYLE, radius: 10, fillColor: '#115e59' }
        : MARKER_STYLE;
}

interface MapComponentProps {
    points: MapPoint[];
    selectedKey: string | null;
    onSelect: (key: string) => void;
    onMapMove: () => void;
    mapInstanceRef: React.MutableRefObject<L.Map | null>;
}

/**
 * Leaflet map drawing one circle marker per point on a shared canvas
 * renderer (much faster than SVG/DOM markers for hundreds of points).
 */
const MapComponent: React.FC<MapComponentProps> = ({
    points,
    selectedKey,
    onSelect,
    onMapMove,
    mapInstanceRef,
}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const layerRef = useRef<L.LayerGroup | null>(null);
    const markersRef = useRef(new Map<string, { marker: L.CircleMarker; point: MapPoint }>());

    // Keep the latest callbacks without re-creating the map
    const onSelectRef = useRef(onSelect);
    const onMapMoveRef = useRef(onMapMove);
    onSelectRef.current = onSelect;
    onMapMoveRef.current = onMapMove;

    // Map instance — created once
    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(mapRef.current, { zoomControl: false, preferCanvas: true })
            .setView(POLAND_CENTER, 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap',
        }).addTo(map);
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        map.on('dragstart', () => onMapMoveRef.current());

        layerRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;

        return () => {
            map.remove();
            mapInstanceRef.current = null;
            layerRef.current = null;
            markersRef.current.clear();
        };
    }, [mapInstanceRef]);

    // Markers — rebuilt when the visible points change (e.g. filter)
    useEffect(() => {
        const layer = layerRef.current;
        if (!layer) return;

        layer.clearLayers();
        markersRef.current.clear();

        for (const point of points) {
            const marker = L.circleMarker([point.lat, point.lng], styleFor(point, point.key === selectedKey))
                .on('click', () => onSelectRef.current(point.key));

            const name = point.locations.length > 1
                ? `${facilitiesLabel(point.locations.length)} · ${point.locations[0].miasto ?? ''}`
                : point.locations[0].nazwa;
            marker.bindTooltip(name, { direction: 'top', offset: [0, -8] });

            marker.addTo(layer);
            markersRef.current.set(point.key, { marker, point });
        }
        // selectedKey is handled by the effect below
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [points]);

    // Selection highlight
    useEffect(() => {
        markersRef.current.forEach(({ marker, point }, key) => {
            marker.setStyle(styleFor(point, key === selectedKey));
            if (key === selectedKey) marker.bringToFront();
        });
    }, [selectedKey, points]);

    return <div ref={mapRef} id="map" className="h-full w-full z-0" />;
};

export default MapComponent;
