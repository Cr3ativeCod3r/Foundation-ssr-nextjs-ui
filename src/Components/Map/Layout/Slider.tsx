import { IoIosNavigate } from 'react-icons/io';
import { BsPinMap } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { FaSquarePhone } from "react-icons/fa6";

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

const Slider: React.FC<SliderProps> = ({ isSliderOpen, marker }) => {

  const getGoogleMapsLink = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lng},${lat}`;
  };


  return (
    <>
      <div
        className={`slider ${isSliderOpen ? 'slider-open' : 'slider-closed'} bg-gradient-to-b -pt-[120px] from-slate-600 to-slate-800 overflow-x-auto lg:pt-[120px] sm: pt-[50px] text-white`}
      >
        <div>
          {marker ? (
            <div className="bg-slate-600 p-4 rounded-md relative">
              <GiPositionMarker className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl text-gray-300" />
              <h3 className="lg:text-lg sm: text-md font-bold lg:mb-12 sm: mb-4 mt-4 text-left">
                {marker.department}
              </h3>
              <p className=" flex items-center text-sm mb-2 lg:text-xl sm:text-md">
                <BsPinMap className="mr-2 text-2xl text-yellow-300" />
                <span className='w-[300px]'>{marker.address}</span>
              </p>
              <div className="flex items-center text-xl space-x-2 my-8">
                <FaSquarePhone className='text-2xl text-green-300' />
                <span className='w-[300px] lg:text-lg sm: text-sm'>{marker.phone}</span>
              </div>

              <div className="flex items-center space-x-2 lg:text-xl sm: text-sm">
                <IoIosNavigate className="text-blue-400 lg:text-3xl sm: text-xl" />
                <a
                  href={getGoogleMapsLink(marker.lng, marker.lat)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300 lg:text-xl sm: text-sm"
                >
                  Nawiguj mnie
                </a>
              </div>
            </div>
          ) : (
            <p>Wybierz marker, aby zobaczyć szczegóły.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Slider;