'use client';

import { fetchCategories } from '@/api/categories';
import ScrollProgressBar from '@/Layout/ScrollProgress';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import logo from '../../public/img/logo.png';
import CategoriesDropdown from './Navbar/CategoriesDropdown';
import FundacjaDropdown from './Navbar/FundacjaDropdown';
import SocialLinks from './Navbar/SocialLinks';
import { Search, Brain } from 'lucide-react';
import type { Category } from '@/types/news';

const MOBILE_BREAKPOINT = 1050;
const SCROLL_THRESHOLD = 10;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500 ease-out
          ${isScrolled
            ? 'h-[72px] shadow-lg bg-white/90 backdrop-blur-xl border-b border-gray-100/50'
            : 'h-[100px] bg-white/95 backdrop-blur-md'
          }
        `}
      >
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <Image
              src={logo}
              alt="Fundacja Chorób Mózgu"
              priority
              className="transition-all duration-500 ease-out group-hover:scale-[1.02]"
              style={{
                height: isScrolled ? '64px' : '90px',
                width: 'auto',
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <ul className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-700 tracking-wide">
              <li>
                <CategoriesDropdown categories={categories} />
              </li>
              <li>
                <FundacjaDropdown />
              </li>
              <li>
                <Link
                  href="/mapa"
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text_hover_anim"
                >
                  MAPA OŚRODKÓW
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <Search size={15} strokeWidth={2.5} />
                  <span className="text_hover_anim">SZUKAJ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/brain"
                  className="px-3 py-2 rounded-lg hover:bg-teal-50 transition-colors flex items-center gap-1.5 text-teal-700"
                >
                  <Brain size={16} strokeWidth={2.5} />
                  <span className="text_hover_anim">MÓZG</span>
                </Link>
              </li>
            </ul>
          )}

          {/* Social Links — visible on all screens */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest hidden sm:block">
              Śledź nas
            </span>
            <SocialLinks />
          </div>
        </div>

        <ScrollProgressBar />
      </nav>
    </>
  );
};

export default Navbar;