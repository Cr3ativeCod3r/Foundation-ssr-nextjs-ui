export const handleCategoryFilterChange = (selectedOption: any, { setSelectedCategory, mapInstanceRef, markerRefs }: { setSelectedCategory: Function; mapInstanceRef: any; markerRefs: any }) => {
    const selectedValue = selectedOption ? selectedOption.value : "all";
    setSelectedCategory(selectedValue);
  
    markerRefs.current.forEach((marker: { feature?: { properties?: { treatedDiseases: any[] } } }) => {
      mapInstanceRef.current!.removeLayer(marker);
    });
  
    markerRefs.current.forEach((marker: { feature?: { properties?: { treatedDiseases: any[] } } }) => {
      const diseases = marker.feature?.properties?.treatedDiseases || [];
      if (selectedValue === "all" || diseases.includes(selectedValue)) {
        mapInstanceRef.current!.addLayer(marker);
      }
    });
  };