'use client';
import { useState } from 'react';
import Link from 'next/link';

import { IoMdHome } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function BottomMenu() {
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', name: 'Główna', icon: <IoMdHome size={20} />, href: '/' },
    { id: 'categories', name: 'Kategorie', icon: <TbCategoryFilled size={20} />, href: '/kategorie' },
    { id: 'foundation', name: 'Fundacja', icon: <MdPeopleAlt size={20} />, href: '/fundacja' },
    { id: 'map', name: 'Ośrodki', icon: <FaMapMarkedAlt size={20} />, href: '/mapa' },
    { id: 'brain', name: 'Mózg', icon: <FaBrain size={20} />, href: '/brain' },
    { id: 'szukaj', name: 'Szukaj', icon: <FaSearch size={20} />, href: '/search' },
  ];

  return (
    <div className="bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 lg:hidden sm: fixed">
      <div className="max-w-screen-xl mx-auto">
        <nav className="flex justify-around items-center py-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center py-2 rounded-lg transition-colors relative"
            >
              {activeTab === item.id && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[#99d1c6]"></div>
              )}
              <div className={`mb-1 ${activeTab === item.id ? 'text-[#99d1c6]' : 'text-gray-500'}`}>
                {item.icon}
              </div>
              <span className={`text-xs font-medium ${activeTab === item.id ? 'text-[#99d1c6]' : 'text-gray-500'}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}