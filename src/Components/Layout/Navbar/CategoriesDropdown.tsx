import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

interface Category {
  slug: string;
  name: string;
}
type CategoriesDropdownProps = {
  categories: { name: string; slug: string }[];
  handleNavigation: (path: string) => void;
};
const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ categories }) => {
  const filteredCategories = categories.filter(
    (cat) => cat.slug !== "projekty" && cat.slug !== "aktualnosci"
  );

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