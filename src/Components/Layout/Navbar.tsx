'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from '../../../public/img/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchCategories } from "@/api/categories";
import CategoriesDropdown from './Navbar/CategoriesDropdown';
import SocialLinks from './Navbar/SocialLinks';
import FundacjaDropdown from './Navbar/FundacjaDropdown';
// Main Navbar Component
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    closeMenu();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "h-[100px]" : "h-[120px]"} bg-white shadow-md backdrop-blur-md`}>
        <div className="container mx-auto px-4 flex justify-between items-center h-full">

          <div className="cursor-pointer">
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                priority
                className="transition-all duration-300"
                style={{ width: 'auto', height: isScrolled ? '120px' : '180px' }}
                onClick={closeMenu}
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-4 text-slate-700 text-base font-semibold">
            
            <li>
              <CategoriesDropdown
                categories={categories}
                isMobile={false}
                handleNavigation={handleNavigation}
                closeMenu={closeMenu}
              />
            </li>
            <li>
              <FundacjaDropdown
                isMobile={false}
                handleNavigation={handleNavigation}
                closeMenu={closeMenu}
              />
            </li>
            <li>
              <Link href="/mapa" className="hover:text-blue-500 transition ml-4 text_hover_anim">MAPA OŚRODKÓW</Link>
            </li>
          </ul>

          {/* Socials */}
          <div className="flex-col text-center items-center mr-4">
            <span className="text-xs text-gray-600 mb-1">Śledź nas</span>
            <SocialLinks />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {menuOpen ? (
              <AiOutlineClose className="text-3xl cursor-pointer" onClick={closeMenu} />
            ) : (
              <AiOutlineMenu className="text-3xl cursor-pointer" onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`fixed top-[${isScrolled ? '100px' : '120px'}] left-0 w-full h-screen bg-gray-800 text-white z-40 flex flex-col items-center py-16`}
          style={{ top: isScrolled ? '100px' : '120px' }}>
          <ul className="space-y-6 text-xl w-4/5">
            <li>
              <button
                onClick={() => handleNavigation('/map')}
                className="hover:text-blue-300 transition w-full text-center"
              >
                MAPA OŚRODKÓW
              </button>
            </li>
            <li className="flex flex-col items-center">
              <CategoriesDropdown
                categories={categories}
                isMobile={true}
                handleNavigation={handleNavigation}
                closeMenu={closeMenu}
              />
            </li>
            <li className="flex flex-col items-center">
              <FundacjaDropdown
                isMobile={true}
                handleNavigation={handleNavigation}
                closeMenu={closeMenu}
              />
            </li>
            {/* <li className="pt-8">
              <div className="flex flex-col items-center">
                <span className="mb-4">Śledź nas</span>
                <SocialLinks isMobile={true} />
              </div>
            </li> */}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;