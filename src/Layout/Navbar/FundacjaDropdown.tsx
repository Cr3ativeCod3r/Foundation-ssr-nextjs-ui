import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

interface FundacjaLink {
  name: string;
  path: string;
  
}

interface FundacjaDropdownProps {
  handleNavigation: (path: string) => void;
}

const FundacjaDropdown: React.FC<FundacjaDropdownProps> = ({ handleNavigation }) => {
  const fundacjaLinks: FundacjaLink[] = [
    { name: "Aktualności", path: "/aktualnosci" },
    { name: "Projekty", path: "/projekty" },
    { name: "Statut", path: "/statut" },
    { name: "Współpraca", path: "/wspolpraca" },
    { name: "Kontakt", path: "/kontakt" },
    { name: "O nas", path: "/o-nas" },
  ];

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