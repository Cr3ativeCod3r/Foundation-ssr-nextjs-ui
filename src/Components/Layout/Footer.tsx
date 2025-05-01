import logo from "../../../public/img/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <>
            <div className='w-full bg-green-400 h-8 text-green-50 justify-center items-center flex'>Strona należy do Fundacji Chorób Mózgu</div>
            <footer className="footer sm:footer-horizontal text-gray-500 vtext-base-content p-10 bg-white">
                <aside>
                    <Image src={logo} alt="Fundacja Chorób Mózgu Logo" height={100} className='h-24 lg:ml-6 sm: -ml-6' />

                    <span className='lg:ml-12 sm: ml-0'>

                        <p className='font-bold text-gray-700'>
                            @ 2025 FCHM. Wszystkie prawa zastrzeżone
                        </p>
                        <p className='text-xs'>
                            Projekt oraz implementacja: <a className="hover:text-black" target="_blank" href='https://www.linkedin.com/in/kamil-banaszek-956938267/'>KamilBanaszek</a>
                        </p>

                    </span>
                </aside>
                <nav>
                    <h6 className="footer-title text-gray-800">FCHM</h6>
                    <Link className="text_hover_anim" href='https://www.sluzbazdrowia.com.pl/leki.php'>Znajdź lek</Link>
                    <Link className="text_hover_anim" href='/mapa'>Mapa Ośrodków</Link>
                    <Link className="text_hover_anim" href='/aktualnosci'>Aktualności</Link>
                </nav>
                <nav>
                    <h6 className="footer-title text-gray-800">O nas</h6>
                    <Link className="text_hover_anim" href='/kontakt'>Kontakt</Link>
                    <Link className="text_hover_anim" href='/statut'>Statut</Link>
                    <Link className="text_hover_anim" href='/projekty'>Projekty</Link>
                </nav>
                <nav>
                    <h6 className="footer-title text-gray-800">Śledź nas</h6>
                    <Link className="text_hover_anim" href="https://www.facebook.com/fundacjachorobmozgu" target="_blank">Facebook</Link>
                    <Link className="text_hover_anim" href="https://www.youtube.com/@fundacjachorobmozgu/videos" target="_blank">YouTube</Link>
                    <Link className="text_hover_anim" href="https://www.linkedin.com/company/fundacja-chor%C3%B3b-m%C3%B3zgu/posts/?feedView=all" target="_blank">LinkedIn</Link>
                </nav>
            </footer>
        </>
    );
};

export default Footer;