'use client';

import React from "react";
import Link from "next/link";
import { FaNewspaper, FaProjectDiagram, FaFileAlt, FaHandshake, FaEnvelope, FaInfoCircle } from "react-icons/fa";

interface CategoryLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export default function CategoriesPage() {
  const categoryLinks: CategoryLink[] = [
    { name: "Aktualności", path: "/aktualnosci", icon: <FaNewspaper className="text-blue-500" /> },
    { name: "Projekty", path: "/projekty", icon: <FaProjectDiagram className="text-green-500" /> },
    { name: "Statut", path: "/statut", icon: <FaFileAlt className="text-yellow-600" /> },
    { name: "Współpraca", path: "/wspolpraca", icon: <FaHandshake className="text-purple-500" /> },
    { name: "Kontakt", path: "/kontakt", icon: <FaEnvelope className="text-red-500" /> },
    { name: "O nas", path: "/o-nas", icon: <FaInfoCircle className="text-indigo-500" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
        Fundacja
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {categoryLinks.map((category) => (
          <CategoryCard key={category.path} category={category} />
        ))}
      </div>
    </div>
  );
}

const CategoryCard = ({ category }: { category: CategoryLink }) => (
  <Link 
    href={category.path}
    className="block transition-transform duration-200 hover:scale-105"
  >
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 transition duration-200 hover:bg-blue-50 hover:border-blue-200 flex flex-col items-center text-center h-full">
      <div className="w-16 h-16 mb-3 flex items-center justify-center text-3xl">
        {category.icon}
      </div>
      <h2 className="text-sm font-medium text-gray-800">{category.name}</h2>
    </div>
  </Link>
);