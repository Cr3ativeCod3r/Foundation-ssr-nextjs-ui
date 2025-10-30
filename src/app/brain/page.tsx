'use client'
import React, { useState, useEffect } from 'react';
import { Brain, Activity, Zap } from 'lucide-react';
import regions from './regions';

const BrainRegionsApp = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    fetch('/brain.svg')
      .then(response => response.text())
      .then(data => setSvgContent(data))
      .catch(error => console.error('Błąd ładowania SVG:', error));
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    const svgContainer = document.getElementById('brain-svg-container');
    if (!svgContainer) return;

    const svg = svgContainer.querySelector('svg');
    if (svg) {
      svg.style.maxWidth = '500px';
      svg.style.height = 'auto';
      svg.style.margin = '0 auto';
      svg.style.display = 'block';
    }

    const paths = svgContainer.querySelectorAll('path, ellipse, circle, rect, polygon');
    
    paths.forEach(element => {
      const fill = element.getAttribute('fill');
      if (!fill) return;

      const color = fill.toLowerCase();
      let region = null;

      // Dopasowanie kolorów do regionów
      if (color.includes('#93c5fd') || color.includes('lightblue') || color.includes('rgb(147, 197, 253)')) {
        region = 'blue';
      } else if (color.includes('#fef08a') || color.includes('lightyellow') || color.includes('yellow') || color.includes('rgb(254, 240, 138)')) {
        region = 'yellow';
      } else if (color.includes('#bef264') || color.includes('lightgreen') || color.includes('rgb(190, 242, 100)')) {
        region = 'green';
      } else if (color.includes('#f9a8d4') || color.includes('pink') || color.includes('rgb(249, 168, 212)')) {
        region = 'pink';
      } else if (color.includes('white') || color.includes('#fff') || color.includes('rgb(255, 255, 255)')) {
        region = 'white';
      }

      if (region) {
        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.3s';
        element.dataset.region = region;
        element.dataset.originalFill = fill;
        
        element.addEventListener('mouseenter', () => {
          element.style.opacity = '0.8';
        });
        
        element.addEventListener('mouseleave', () => {
          element.style.opacity = '1';
        });
        
        element.addEventListener('click', () => {
          setSelectedRegion(region);
        });
      }
    });
  }, [svgContent]);




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
  

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* SVG Brain from file */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div 
              id="brain-svg-container"
              className="w-full lg:h-[500px] sm: h-[300px] flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />

            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {Object.entries(regions).map(([key, region]) => (
                <button
                  key={key}
                  onClick={() => setSelectedRegion(key)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg border-2 hover:scale-105 transition-transform text-xs"
                  style={{ 
                    backgroundColor: region.color,
                    borderColor: selectedRegion === key ? '#1e293b' : 'transparent'
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                  <span className="font-medium text-gray-800">{region.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Information Panel */}
          <div className="space-y-3">
            {selectedRegion ? (
              <div className="bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: regions[selectedRegion].color }}
                  >
                    <Activity className="w-5 h-5 text-gray-800" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {regions[selectedRegion].name}
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <h3 className="text-md font-semibold text-blue-900 mb-1 flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      Główne funkcje
                    </h3>
                    <p className="text-gray-700 text-md leading-relaxed">
                      {regions[selectedRegion].functions}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-3">
                    <h3 className="text-md font-semibold text-purple-900 mb-1">
                      Szczegółowy opis
                    </h3>
                    <p className="text-gray-700 text-md leading-relaxed">
                      {regions[selectedRegion].details}
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-xl p-3">
                    <h3 className="text-sm font-semibold text-red-900 mb-2">
                      Powiązane schorzenia
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {regions[selectedRegion].diseases.map((disease, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-red-200 text-red-900 rounded-full text-sm font-medium"
                        >
                          {disease}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-4 text-center">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-600 mb-1">
                  Wybierz część mózgu
                </h3>
                <p className="text-gray-500 text-sm">
                  Kliknij na dowolną część mózgu po lewej stronie, aby zobaczyć szczegółowe informacje
                </p>
              </div>
            )}

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainRegionsApp;