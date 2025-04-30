import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import Link from 'next/link';

interface Category {
  slug: string;
  name: string;
}

interface CategoriesDropdownProps {
  categories: Category[];
  isMobile: boolean;
  handleNavigation: (path: string) => void;
  closeMenu: () => void;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ categories, isMobile, handleNavigation, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Filter out excluded categories
  const filteredCategories = categories.filter(cat => 
    cat.slug !== "projekty" && cat.slug !== "aktualnosci"
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (slug: string) => {
    if (isMobile) {
      handleNavigation(`/${slug}`);
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
          <span className="text_hover_anim">KATEGORIE</span>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        
        {isOpen && (
          <div className="flex flex-col items-center space-y-3 mt-3 py-2 bg-gray-700 rounded w-full">
            {filteredCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className="hover:text-blue-300 transition py-1"
              >
                {cat.name}
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
        KATEGORIE
        <FaChevronDown className="ml-1 text-xs" />
      </button>
      <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md z-10 w-[200px] text-md">
        {filteredCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="block px-4 py-2 hover:bg-blue-100 text-gray-800 transition"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesDropdown;