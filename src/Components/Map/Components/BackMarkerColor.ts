
export const backMarkersColor = (markerRefs: React.RefObject<L.CircleMarker[]>) => {
    if (markerRefs.current) {
        markerRefs.current.forEach(marker => {
            marker.setStyle({
                fillColor: "#3388ff",
                color: "black",
                weight: 1,
                fillOpacity: 0.8,
            });
        });
    }
};