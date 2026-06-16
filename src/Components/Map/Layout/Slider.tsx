import { IoIosNavigate } from 'react-icons/io';
import { BsPinMap } from 'react-icons/bs';
import { FaSquarePhone } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useState } from 'react';

interface Marker {
  address: string;
  phone: string;
  department: string;
  lat: number;
  lng: number;
}

interface SliderProps {
  isSliderOpen: boolean;
  toggleSlider: () => void;
  marker: Marker | null;
}

const Slider: React.FC<SliderProps> = ({ isSliderOpen, toggleSlider, marker }) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const getGoogleMapsLink = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    // Swipe left to close
    if (distance > 50) {
      toggleSlider();
    }
    setTouchStartX(null);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isSliderOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSlider}
      />

      {/* Sidebar */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={`fixed top-0 left-0 h-[100dvh] w-[85vw] max-w-[400px] bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-out flex flex-col ${
          isSliderOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {marker ? (
          <div className="flex flex-col h-full p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 mt-2">
              <h3 className="text-2xl font-extrabold text-slate-800 leading-tight pr-4">
                {marker.department}
              </h3>
              <button 
                onClick={toggleSlider}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-600 shrink-0"
              >
                <MdClose size={22} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                <div className="p-3 bg-white rounded-full shadow-sm text-teal-600 shrink-0">
                  <BsPinMap size={22} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Adres placówki</span>
                  <span className="text-slate-700 font-medium text-sm leading-relaxed">{marker.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                <div className="p-3 bg-white rounded-full shadow-sm text-teal-600 shrink-0">
                  <FaSquarePhone size={22} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Numer telefonu</span>
                  <span className="text-slate-700 font-medium text-sm">{marker.phone}</span>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-8 pt-4 pb-6">
              <a
                href={getGoogleMapsLink(marker.lat, marker.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-teal-600/30 hover:bg-teal-700 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <IoIosNavigate size={24} />
                Nawiguj do placówki
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-slate-400 text-center relative">
             <button 
                onClick={toggleSlider}
                className="absolute top-8 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-600"
              >
                <MdClose size={22} />
              </button>
            Wybierz marker na mapie, aby zobaczyć szczegóły placówki.
          </div>
        )}
      </div>
    </>
  );
};

export default Slider;