import { IoIosNavigate } from 'react-icons/io';
import { BsPinMap } from 'react-icons/bs';
import { FaSquarePhone } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import type { MapLocation, MapPoint } from '@/types/location';
import { facilitiesLabel, splitPhoneLine } from '@/Components/Map/utils';

interface SliderProps {
  isSliderOpen: boolean;
  toggleSlider: () => void;
  point: MapPoint | null;
}

const getGoogleMapsLink = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

function PhoneLines({ phone }: { phone: string }) {
  return (
    <div className="space-y-1">
      {phone.split('\n').map((line, i) => (
        <p key={i} className="text-sm leading-relaxed text-slate-700">
          {splitPhoneLine(line).map((part, j) =>
            part.tel ? (
              <a key={j} href={`tel:${part.tel}`} className="font-semibold text-teal-700 hover:underline whitespace-nowrap">
                {part.text}
              </a>
            ) : (
              <span key={j} className="text-slate-500">{part.text}</span>
            ),
          )}
        </p>
      ))}
    </div>
  );
}

/** Facility details; the name is hidden when the panel header already shows it */
function LocationCard({ location, showName = true }: { location: MapLocation; showName?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm [&>*:first-child]:mt-0">
      {showName && (
        <>
          <h4 className="font-bold leading-snug text-slate-800">{location.oddzial ?? location.nazwa}</h4>
          {location.placowka && location.placowka !== location.oddzial && (
            <p className="mt-0.5 text-sm text-slate-500">{location.placowka}</p>
          )}
        </>
      )}

      {location.rodzaje && location.rodzaje.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {location.rodzaje.map((type) => (
            <span key={type} className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700 ring-1 ring-teal-100">
              {type}
            </span>
          ))}
        </div>
      )}

      {location.telefon && (
        <div className="mt-3 flex items-start gap-3 border-t border-slate-200/70 pt-3 first:border-t-0 first:pt-0">
          <FaSquarePhone size={18} className="mt-0.5 shrink-0 text-teal-600" />
          <PhoneLines phone={location.telefon} />
        </div>
      )}
    </div>
  );
}

/** Side panel with every facility at the selected map point */
const Slider: React.FC<SliderProps> = ({ isSliderOpen, toggleSlider, point }) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    // Swipe left to close
    if (touchStartX - e.changedTouches[0].clientX > 50) toggleSlider();
    setTouchStartX(null);
  };

  const first = point?.locations[0];
  const isGroup = (point?.locations.length ?? 0) > 1;

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
        className={`fixed top-0 left-0 h-[100dvh] w-[85vw] max-w-[420px] bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-out flex flex-col ${
          isSliderOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {point && first ? (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {/* Header */}
              <div className="mb-6 mt-2 flex items-start justify-between gap-4">
                <div>
                  {isGroup && (
                    <span className="mb-2 inline-block rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white">
                      {facilitiesLabel(point.locations.length)} pod tym adresem
                    </span>
                  )}
                  <h3 className="text-xl font-extrabold leading-tight text-slate-800">
                    {isGroup ? first.placowka ?? first.miasto : first.oddzial ?? first.nazwa}
                  </h3>
                  {!isGroup && first.placowka && first.placowka !== first.oddzial && (
                    <p className="mt-1 text-sm text-slate-500">{first.placowka}</p>
                  )}
                </div>
                <button
                  onClick={toggleSlider}
                  aria-label="Zamknij"
                  className="shrink-0 rounded-full bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-slate-200"
                >
                  <MdClose size={22} />
                </button>
              </div>

              {/* Address */}
              <div className="mb-4 flex items-start gap-4 rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
                <div className="shrink-0 rounded-full bg-white p-3 text-teal-600 shadow-sm">
                  <BsPinMap size={20} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="mb-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Adres</span>
                  <span className="text-sm font-medium leading-relaxed text-slate-700">{first.adres}</span>
                </div>
              </div>

              {/* Facilities */}
              {isGroup ? (
                <div className="space-y-3">
                  {point.locations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
              ) : (
                <LocationCard location={first} showName={false} />
              )}
            </div>

            {/* Bottom Button */}
            <div className="border-t border-slate-100 p-4 pb-6">
              <a
                href={getGoogleMapsLink(point.lat, point.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 py-4 text-lg font-bold text-white shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-0.5 hover:bg-teal-700 active:scale-95"
              >
                <IoIosNavigate size={24} />
                Nawiguj do placówki
              </a>
            </div>
          </>
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center p-6 text-center text-slate-400">
            <button
              onClick={toggleSlider}
              aria-label="Zamknij"
              className="absolute right-6 top-8 rounded-full bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-slate-200"
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
