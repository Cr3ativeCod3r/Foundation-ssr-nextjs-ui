import React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Newspaper,
  FolderKanban,
  FileText,
  Handshake,
  HeartHandshake,
  Mail,
  Info,
  Brain,
  Users,
  HeartPulse,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';

const LINKS = [
  { name: 'Raporty', path: '/raporty', icon: BarChart3, color: 'text-teal-600', bg: 'bg-teal-50' },
  { name: 'Aktualności', path: '/aktualnosci', icon: Newspaper, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Projekty', path: '/projekty', icon: FolderKanban, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { name: 'Statut', path: '/statut', icon: FileText, color: 'text-amber-500', bg: 'bg-amber-50' },
  { name: 'Współpraca', path: '/wspolpraca', icon: Handshake, color: 'text-purple-500', bg: 'bg-purple-50' },
  { name: 'Kontakt', path: '/kontakt', icon: Mail, color: 'text-rose-500', bg: 'bg-rose-50' },
  { name: 'O nas', path: '/o-nas', icon: Info, color: 'text-indigo-500', bg: 'bg-indigo-50' },
] as const;

export default function FundacjaPage() {
  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero */}
      <PageHero
        icon={HeartHandshake}
        eyebrow="Fundacja Chorób Mózgu"
        title="Fundacja"
        description="Poznaj naszą misję, projekty i ludzi, którzy wspierają pacjentów z chorobami mózgu oraz ich bliskich."
        decorations={[Users, HeartPulse, Brain, Handshake]}
      />

      {/* Cards */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 stagger-children">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                href={link.path}
                className="block group"
              >
                <div className="card-elevated p-5 flex flex-col items-center text-center h-full">
                  <div className={`w-14 h-14 rounded-2xl ${link.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={link.color} size={24} />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-700 group-hover:text-teal-700 transition-colors">
                    {link.name}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}