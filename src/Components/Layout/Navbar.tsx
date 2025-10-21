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
import ScrollProgressBar from "@/Components/Layout/ScrollProgress";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1050); 
    };
    
    handleResize();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
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
  };


  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "h-[80px]" : "h-[100px]"} bg-white shadow-md backdrop-blur-md`}>
        <div className="container mx-auto px-4 flex justify-between items-center h-full">

          <div className="cursor-pointer">
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                priority
                className="transition-all duration-300"
                style={{ height: isScrolled ? "100px" : "120px", width: "auto" }}
              />
            </Link>
          </div>

          <ul className={`hidden ${isMobile ? '' : 'md:flex'} items-center space-x-4 text-slate-700 text-base font-semibold`}>
            <li>
              <CategoriesDropdown
                categories={categories}
                handleNavigation={handleNavigation}
              />
            </li>
            <li>
              <FundacjaDropdown
                handleNavigation={handleNavigation}
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
        </div>
        <ScrollProgressBar/>
      </nav>
    </>
  );
};

export default Navbar;