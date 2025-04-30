import axios from 'axios';
import L from 'leaflet';
import { backMarkersColor } from './BackMarkerColor'

const createMarkerList = (markersData: any[], markerRefs: React.RefObject<L.CircleMarker[]>, mapInstanceRef: React.RefObject<L.Map>, setSelectedMarker: (marker: any) => void, setSliderOpen: (open: boolean) => void) => {
    return markersData.map((marker: any) => {
        const { _id, department, treatedDiseases, address, phone, lat, lng } = marker;

        const circleMarker = L.circleMarker([lat, lng], {
            radius: 8,
            fillColor: "#3388ff",
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
        }).on('click', () => {
            backMarkersColor(markerRefs);
            circleMarker.setStyle({
                fillColor: "yellow",
                color: "black",
                fillOpacity: 1,
                weight: 2,
            });

            setSelectedMarker({ department, treatedDiseases, address, phone, lat, lng });
            setSliderOpen(true);

            mapInstanceRef.current?.setView([lat, lng]);
        });

        circleMarker.feature = {
            type: 'Feature',
            properties: { _id, department, treatedDiseases, address, phone },
            geometry: { type: 'Point', coordinates: [lng, lat] },
        };

        if (markerRefs.current) {
            markerRefs.current.push(circleMarker);
        }

        return circleMarker;
    });
};

export const fetchMarkers = async (markerRefs: React.RefObject<L.CircleMarker[]>, mapInstanceRef: React.RefObject<L.Map>, setSelectedMarker: (marker: any) => void, setSliderOpen: (open: boolean) => void, setMarkers: (markers: any[]) => void) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/api/map/locations`);
        const markersData = response.data;

        if (markerRefs.current) {
            markerRefs.current.forEach(marker => {
                mapInstanceRef.current?.removeLayer(marker);
            });
        }

        const markerList: L.CircleMarker[] = createMarkerList(markersData, markerRefs, mapInstanceRef, setSelectedMarker, setSliderOpen);

        markerList.forEach(marker => mapInstanceRef.current?.addLayer(marker));

        setMarkers(markersData);
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
    }
};
