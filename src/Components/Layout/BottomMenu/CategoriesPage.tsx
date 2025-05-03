'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCategories } from "@/api/categories";
import { Category } from "@/types/news";

const EXCLUDED_CATEGORIES = ["projekty", "aktualnosci"];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories.filter(
          (category) => !EXCLUDED_CATEGORIES.includes(category.slug)
        ));
      } catch (error) {
        console.error("Błąd podczas pobierania kategorii:", error);
        setError("Nie udało się pobrać kategorii. Spróbuj ponownie później.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);


  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
        Kategorie chorób
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}

const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    href={`/${category.slug}`}
    className="block transition-transform duration-200 hover:scale-105 "
  >
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="w-full h-16 relative">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-cover w-full"
          sizes="(max-width: 768px) 100%, 100%"
        />
      </div>
      <div className="p-2 text-center">
        <h2 className="text-sm font-medium text-gray-800">{category.name}</h2>
      </div>
    </div>
  </Link>
);
