import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

const SocialLinks: React.FC = () => {
  const links = [
    {
      href: 'https://www.facebook.com/fundacjachorobmozgu',
      icon: <FaFacebook />,
      label: 'Facebook',
      hoverColor: 'hover:text-blue-600 hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]',
      baseColor: 'text-blue-500',
    },
    {
      href: 'https://www.youtube.com/@fundacjachorobmozgu/videos',
      icon: <FaYoutube className="text-lg" />,
      label: 'YouTube',
      hoverColor: 'hover:text-red-600 hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.4)]',
      baseColor: 'text-red-500',
    },
    {
      href: 'https://www.linkedin.com/company/fundacja-chor%C3%B3b-m%C3%B3zgu/posts/?feedView=all',
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      hoverColor: 'hover:text-blue-700 hover:drop-shadow-[0_0_8px_rgba(29,78,216,0.4)]',
      baseColor: 'text-blue-600',
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {links.map(({ href, icon, label, hoverColor, baseColor }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`
            text-lg ${baseColor} ${hoverColor}
            transition-all duration-200
            hover:scale-110
          `}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;