import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

interface FundacjaLink {
  name: string;
  path: string;
}

interface FundacjaDropdownProps {
  isMobile: boolean;
  handleNavigation: (path: string) => void;
  closeMenu: () => void;
}

const FundacjaDropdown: React.FC<FundacjaDropdownProps> = ({ isMobile, handleNavigation, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fundacjaLinks: FundacjaLink[] = [
    { name: "Aktualności", path: "/aktualnosci" },
    { name: "Projekty", path: "/projekty" },
    { name: "Statut", path: "/statut" },
    { name: "Współpraca", path: "/wspolpraca" },
    { name: "Kontakt", path: "/kontakt" },
    { name: "O nas", path: "/o-nas" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFundacjaClick = (path: string) => {
    if (isMobile) {
      handleNavigation(path);
      closeMenu();
    }
  };

  if (isMobile) {
    return (
      <div className="w-full">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center w-full py-2 hover:text-blue-300 transition"
        >
          <span className="text_hover_anim">FUNDACJA</span>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {isOpen && (
          <div className="flex flex-col items-center space-y-3 mt-3 py-2 bg-gray-700 rounded w-full">
            {fundacjaLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleFundacjaClick(link.path)}
                className="hover:text-blue-300 transition py-1"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group inline-block">
      <button className="text-gray-800 px-4 py-2 rounded-md transition flex items-center">
        FUNDACJA
        <FaChevronDown className="ml-1 text-xs" />
      </button>
      <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md z-10 w-[200px] text-md">
        {fundacjaLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="block px-4 py-2 hover:bg-blue-100 text-gray-800 transition"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FundacjaDropdown;