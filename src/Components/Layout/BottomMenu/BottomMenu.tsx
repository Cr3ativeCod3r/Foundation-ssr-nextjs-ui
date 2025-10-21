'use client';
import { useState } from 'react';
import { AiOutlineHome, AiOutlineAppstore, AiOutlineTeam, AiOutlineEnvironment } from 'react-icons/ai';
import Link from 'next/link';

export default function BottomMenu() {
  const [activeTab, setActiveTab] = useState('home');


  const menuItems = [
    { id: 'home', name: 'Główna', icon: <AiOutlineHome size={24} />, href: '/' },
    { id: 'categories', name: 'Kategorie', icon: <AiOutlineAppstore size={24} />, href: '/kategorie' },
    { id: 'foundation', name: 'Fundacja', icon: <AiOutlineTeam size={24} />, href: '/fundacja' },
    { id: 'map', name: 'Ośrodki', icon: <AiOutlineEnvironment size={24} />, href: '/mapa' }
  ];

  return (
    <div className=" bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 lg:hidden sm: fixed">
      <div className="max-w-screen-xl mx-auto">
        <nav className="flex justify-around items-center py-1">
          {menuItems.map((item) => (
        <Link
        key={item.id}
        href={item.href}
        onClick={() => setActiveTab(item.id)}
        className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
          activeTab === item.id
            ? 'text-blue-600'
            : 'text-gray-500 hover:text-blue-500'
        }`}
      >
        <div className="mb-1">{item.icon}</div>
        <span className="text-xs font-medium">{item.name}</span>
      </Link>))}
        </nav>
      </div>
    </div>
  );
}