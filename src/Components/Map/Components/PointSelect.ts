import { Marker } from 'leaflet';
import {backMarkersColor} from './BackMarkerColor'

export const handlePointSelect = (
    selectedOption: any, 
    setSliderOpen: (open: boolean) => void, 
    setSelectedMarker: (marker: any) => void, 
    mapInstanceRef: React.RefObject<any>, 
    markerRefs: React.RefObject<any>
) => {
    const marker = markerRefs.current.find((m: Marker) => m.feature?.properties?._id === selectedOption.value);
    if (marker) {
      mapInstanceRef.current?.setView(marker.getLatLng(), 20);
      backMarkersColor(markerRefs);
      marker.setStyle({
        fillColor: "yellow",
        color: "black",
        weight: 2,
      });
      setSelectedMarker(marker.feature?.properties || null);
      setSliderOpen(true);
    }
  };