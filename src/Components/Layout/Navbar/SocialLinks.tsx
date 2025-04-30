import { FaFacebook, FaYoutube, FaLinkedin} from "react-icons/fa";

const SocialLinks = ({ isMobile = false }) => {
  const socialClasses = isMobile ? {
    container: "flex items-center space-x-6",
    facebook: "text-3xl text-blue-300 hover:text-white transition",
    youtube: "text-4xl text-red-400 hover:text-white transition",
    linkedin: "text-3xl text-blue-300 hover:text-white transition"
  } : {
    container: "flex items-center space-x-2",
    facebook: "text-2xl text-blue-500 hover:text-blue-300 transition",
    youtube: "text-3xl text-red-500 hover:brightness-110 transition",
    linkedin: "text-2xl text-blue-500 hover:brightness-110 transition"
  };

  return (
    <div className={socialClasses.container}>
      <a href="https://www.facebook.com/fundacjachorobmozgu" target="_blank" rel="noopener noreferrer">
        <FaFacebook className={socialClasses.facebook} />
      </a>
      <a href="https://www.youtube.com/@fundacjachorobmozgu/videos" target="_blank" rel="noopener noreferrer">
        <FaYoutube className={socialClasses.youtube} />
      </a>
      <a href="https://www.linkedin.com/company/fundacja-chor%C3%B3b-m%C3%B3zgu/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className={socialClasses.linkedin} />
      </a>
    </div>
  );
};

export default SocialLinks;