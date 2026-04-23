import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/img/logo.png';
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

const FOOTER_LINKS = {
  fchm: [
    { name: 'Znajdź lek', href: 'https://www.sluzbazdrowia.com.pl/leki.php', external: true },
    { name: 'Mapa Ośrodków', href: '/mapa' },
    { name: 'Aktualności', href: '/aktualnosci' },
  ],
  about: [
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'Statut', href: '/statut' },
    { name: 'Projekty', href: '/projekty' },
    { name: 'O nas', href: '/o-nas' },
  ],
} as const;

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/fundacjachorobmozgu', icon: FaFacebook, label: 'Facebook' },
  { href: 'https://www.youtube.com/@fundacjachorobmozgu/videos', icon: FaYoutube, label: 'YouTube' },
  { href: 'https://www.linkedin.com/company/fundacja-chor%C3%B3b-m%C3%B3zgu/posts/?feedView=all', icon: FaLinkedin, label: 'LinkedIn' },
] as const;

const Footer: React.FC = () => {
  return (
    <footer className="hidden lg:block">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-500" />

      {/* Main footer */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Logo & Copyright */}
            <div className="md:col-span-1">
              <Image
                src={logo}
                alt="Fundacja Chorób Mózgu"
                height={60}
                className="brightness-0 invert opacity-80 mb-4"
              />
              <p className="text-sm font-medium text-slate-400 mb-1">
                © 2025 FCHM. Wszystkie prawa zastrzeżone.
              </p>
              <p className="text-xs text-slate-500">
                Projekt i implementacja:{' '}
                <a
                  href="https://www.linkedin.com/in/kamil-banaszek-956938267/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors"
                >
                  Kamil Banaszek
                </a>
              </p>
            </div>

            {/* FCHM Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                FCHM
              </h3>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.fchm.map((link) => (
                  <li key={link.href}>
                    {'external' in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                O nas
              </h3>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.about.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Śledź nas
              </h3>
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="
                      text-xl text-slate-500
                      hover:text-teal-400
                      hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]
                      transition-all duration-200
                      hover:scale-110
                    "
                  >
                    <Icon />
                  </a>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                Strona należy do Fundacji Chorób Mózgu
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800">
          <div className="container mx-auto px-6 py-4">
            <p className="text-xs text-slate-600 text-center">
              Fundacja Chorób Mózgu — edukujemy, wspieramy, łączymy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;