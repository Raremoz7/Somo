import { useState, useEffect } from "react";
import { Link, useLocation, useOutlet } from "react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { PageTransitionProvider, usePageTransition } from "./PageTransitionContext";
import svgLogoSimplified from "../../imports/svg-f0leoh9j40";

// SVG Paths from the design
const svgPaths = {
  home: "M4 19V10C4 9.68333 4.07083 9.38333 4.2125 9.1C4.35417 8.81667 4.55 8.58333 4.8 8.4L10.8 3.9C11.15 3.63333 11.55 3.5 12 3.5C12.45 3.5 12.85 3.63333 13.2 3.9L19.2 8.4C19.45 8.58333 19.6458 8.81667 19.7875 9.1C19.9292 9.38333 20 9.68333 20 10V19C20 19.55 19.8042 20.0208 19.4125 20.4125C19.0208 20.8042 18.55 21 18 21H15C14.7167 21 14.4792 20.9042 14.2875 20.7125C14.0958 20.5208 14 20.2833 14 20V15C14 14.7167 13.9042 14.4792 13.7125 14.2875C13.5208 14.0958 13.2833 14 13 14H11C10.7167 14 10.4792 14.0958 10.2875 14.2875C10.0958 14.4792 10 14.7167 10 15V20C10 20.2833 9.90417 20.5208 9.7125 20.7125C9.52083 20.9042 9.28333 21 9 21H6C5.45 21 4.97917 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19Z",
  icon2: "M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V8C4 7.45 4.19583 6.97917 4.5875 6.5875C4.97917 6.19583 5.45 6 6 6H8C8 4.9 8.39167 3.95833 9.175 3.175C9.95833 2.39167 10.9 2 12 2C13.1 2 14.0417 2.39167 14.825 3.175C15.6083 3.95833 16 4.9 16 6H18C18.55 6 19.0208 6.19583 19.4125 6.5875C19.8042 6.97917 20 7.45 20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM10 6H14C14 5.45 13.8042 4.97917 13.4125 4.5875C13.0208 4.19583 12.55 4 12 4C11.45 4 10.9792 4.19583 10.5875 4.5875C10.1958 4.97917 10 5.45 10 6ZM15 11C15.2833 11 15.5208 10.9042 15.7125 10.7125C15.9042 10.5208 16 10.2833 16 10V8H14V10C14 10.2833 14.0958 10.5208 14.2875 10.7125C14.4792 10.9042 14.7167 11 15 11ZM9 11C9.28333 11 9.52083 10.9042 9.7125 10.7125C9.90417 10.5208 10 10.2833 10 10V8H8V10C8 10.2833 8.09583 10.5208 8.2875 10.7125C8.47917 10.9042 8.71667 11 9 11Z",
  icon3: "M4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V8C2 7.45 2.19583 6.97917 2.5875 6.5875C2.97917 6.19583 3.45 6 4 6H8V4C8 3.45 8.19583 2.97917 8.5875 2.5875C8.97917 2.19583 9.45 2 10 2H14C14.55 2 15.0208 2.19583 15.4125 2.5875C15.8042 2.97917 16 3.45 16 4V6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4ZM10 6H14V4H10V6Z",
  icon4: "M5 21C4.71667 21 4.47917 20.9042 4.2875 20.7125C4.09583 20.5208 4 20.2833 4 20V17.575C4 17.3083 4.05 17.0542 4.15 16.8125C4.25 16.5708 4.39167 16.3583 4.575 16.175L17.175 3.6C17.375 3.4 17.6 3.25 17.85 3.15C18.1 3.05 18.35 3 18.6 3C18.8667 3 19.1208 3.05 19.3625 3.15C19.6042 3.25 19.8167 3.4 20 3.6L21.4 5C21.6 5.18333 21.75 5.39583 21.85 5.6375C21.95 5.87917 22 6.13333 22 6.4C22 6.65 21.95 6.9 21.85 7.15C21.75 7.4 21.6 7.625 21.4 7.825L8.825 20.425C8.64167 20.6083 8.42917 20.75 8.1875 20.85C7.94583 20.95 7.69167 21 7.425 21H5ZM18.65 7.775L20 6.425L18.575 5L17.225 6.35L18.65 7.775ZM14 21C15.2333 21 16.375 20.6917 17.425 20.075C18.475 19.4583 19 18.6 19 17.5C19 16.9667 18.8667 16.5042 18.6 16.1125C18.3333 15.7208 17.9833 15.3583 17.55 15.025C17.3167 14.8583 17.0667 14.775 16.8 14.775C16.5333 14.775 16.3083 14.875 16.125 15.075C15.9417 15.275 15.85 15.5208 15.85 15.8125C15.85 16.1042 15.9667 16.3333 16.2 16.5C16.4333 16.6833 16.625 16.85 16.775 17C16.925 17.15 17 17.3167 17 17.5C17 17.8833 16.6958 18.2292 16.0875 18.5375C15.4792 18.8458 14.7833 19 14 19C13.7167 19 13.4792 19.0958 13.2875 19.2875C13.0958 19.4792 13 19.7167 13 20C13 20.2833 13.0958 20.5208 13.2875 20.7125C13.4792 20.9042 13.7167 21 14 21ZM9 6C9 6.23333 8.85417 6.44583 8.5625 6.6375C8.27083 6.82917 7.6 7.16667 6.55 7.65C5.21667 8.23333 4.29167 8.7625 3.775 9.2375C3.25833 9.7125 3 10.3 3 11C3 11.4333 3.1 11.8167 3.3 12.15C3.5 12.4833 3.75833 12.775 4.075 13.025C4.29167 13.2083 4.53333 13.2875 4.8 13.2625C5.06667 13.2375 5.29167 13.1167 5.475 12.9C5.65833 12.6833 5.74167 12.4417 5.725 12.175C5.70833 11.9083 5.59167 11.6833 5.375 11.5C5.25833 11.4167 5.16667 11.3333 5.1 11.25C5.03333 11.1667 5 11.0833 5 11C5 10.8 5.15 10.6 5.45 10.4C5.75 10.2 6.38333 9.89167 7.35 9.475C8.81667 8.84167 9.79167 8.26667 10.275 7.75C10.7583 7.23333 11 6.65 11 6C11 5.08333 10.6333 4.35417 9.9 3.8125C9.16667 3.27083 8.2 3 7 3C6.25 3 5.57917 3.13333 4.9875 3.4C4.39583 3.66667 3.94167 3.99167 3.625 4.375C3.44167 4.59167 3.36667 4.83333 3.4 5.1C3.43333 5.36667 3.55833 5.58333 3.775 5.75C3.99167 5.93333 4.23333 6.00833 4.5 5.975C4.76667 5.94167 4.99167 5.83333 5.175 5.65C5.40833 5.41667 5.66667 5.25 5.95 5.15C6.23333 5.05 6.58333 5 7 5C7.68333 5 8.1875 5.1 8.5125 5.3C8.8375 5.5 9 5.73333 9 6Z",
  mail: "M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 12.825C12.0833 12.825 12.1708 12.8125 12.2625 12.7875C12.3542 12.7625 12.4417 12.725 12.525 12.675L19.6 8.25C19.7333 8.16667 19.8333 8.0625 19.9 7.9375C19.9667 7.8125 20 7.675 20 7.525C20 7.19167 19.8583 6.94167 19.575 6.775C19.2917 6.60833 19 6.61667 18.7 6.8L12 11L5.3 6.8C5 6.61667 4.70833 6.6125 4.425 6.7875C4.14167 6.9625 4 7.20833 4 7.525C4 7.69167 4.03333 7.8375 4.1 7.9625C4.16667 8.0875 4.26667 8.18333 4.4 8.25L11.475 12.675C11.5583 12.725 11.6458 12.7625 11.7375 12.7875C11.8292 12.8125 11.9167 12.825 12 12.825Z"
};

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "SERVICOS", path: "/servicos", children: [
    { label: "Web", path: "/web" },
    { label: "Social", path: "/social" },
    { label: "Videos", path: "/videos" },
    { label: "CRM", path: "/crm" },
  ]},
  { label: "SISTEMAS", path: "/crm" },
  { label: "SOBRE", path: "/sobre" },
  { label: "PORTFOLIO", path: "/portfolio" },
];

const socialIcons = [
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "X", href: "#" },
  { name: "Behance", href: "#" },
];

export default function Layout() {
  return (
    <PageTransitionProvider>
      <LayoutInner />
    </PageTransitionProvider>
  );
}

function LayoutInner() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { isTransitioning } = usePageTransition();

  // Pages with Dark Hero (initially white text)
  const hasDarkHero = ["/", "/social", "/videos", "/portfolio", "/servicos", "/web", "/crm", "/sobre", "/contato"].includes(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const threshold = hasDarkHero ? window.innerHeight - 100 : 50;
      setIsScrolled(window.scrollY > threshold);
    };
    
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDarkHero]);

  const isLightMode = !hasDarkHero || isScrolled;
  const standardColor = isLightMode ? "#78787D" : "#9CA3AF"; 
  const logoColor = "#d7f20d";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#d7f20d] origin-left z-[60]"
        style={{ scaleX }}
      />
      
      {/* Navigation */}
      <nav 
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95%] rounded-[60px] border px-3 py-2 md:py-3 md:px-6 transition-all duration-300 backdrop-blur-[15px] bg-[rgba(255,255,255,0.03)] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.5)] border-white/10"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 h-8 relative">
          
          {/* SOMO Simplified Logo - All Sizes */}
          <div className="flex items-center mr-0.5 md:mr-1 relative flex-shrink-0">
             <Link
               to="/"
               className="relative z-10 flex items-center group hover:scale-105 transition-transform"
             >
               <div className="relative flex items-center justify-center">
                 <div className={`absolute inset-[-6px] rounded-xl transition-colors ${isLightMode ? "bg-black/5" : "bg-white/10"}`} />
                 <svg
                   viewBox="0 0 703.19 389.95"
                   className="relative z-10 w-[20px] h-[20px] md:w-[24px] md:h-[24px] rotate-[135deg] transition-all group-hover:drop-shadow-[0_0_8px_rgba(215,242,13,0.5)]"
                   fill="none"
                 >
                   <path
                     d={svgLogoSimplified.p3d1bf00}
                     fill="#d7f20d"
                     stroke="#d7f20d"
                     strokeMiterlimit="10"
                     strokeWidth="35.43"
                   />
                 </svg>
               </div>
             </Link>
          </div>

          {/* Nav Links - All Sizes */}
          <div className="flex items-center gap-2 md:gap-3 lg:gap-5 whitespace-nowrap">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="relative">
                        <Link
                        to={link.path}
                        className="font-['Audiowide',cursive] text-[11px] md:text-[13px] lg:text-[14px] tracking-wide transition-colors relative z-10"
                        style={{ color: servicesOpen || location.pathname.startsWith(link.path) ? "#d7f20d" : standardColor }}
                        >
                        {link.label}
                        </Link>
                        {location.pathname.startsWith(link.path) && (
                            <motion.div 
                                layoutId="nav-pill"
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d7f20d] rounded-full mx-auto w-3/4"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </div>
                    <AnimatePresence>
                        {servicesOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[200px]"
                        >
                            <div className="relative bg-[#050505]/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] p-2 overflow-hidden">
                                {/* Neon Accent Line */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d]/60 to-transparent" />
                                
                                <div className="flex flex-col gap-1 relative z-10">
                                    {link.children.map((child) => (
                                        <Link
                                        key={child.path}
                                        to={child.path}
                                        className="group flex items-center justify-between px-4 py-2.5 text-[13px] font-['Audiowide',cursive] text-white/70 hover:text-[#0d2618] hover:bg-[#d7f20d] rounded-xl transition-all duration-300"
                                        >
                                            <span className="relative z-10">{child.label}</span>
                                            {/* Animated Arrow */}
                                            <svg 
                                                className="w-3.5 h-3.5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="2.5" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="relative">
                    <Link
                        to={link.path}
                        className="font-['Audiowide',cursive] text-[11px] md:text-[13px] lg:text-[14px] tracking-wide transition-colors relative z-10"
                        style={{ color: location.pathname === link.path ? "#d7f20d" : standardColor }}
                    >
                        {link.label}
                    </Link>
                    {location.pathname === link.path && (
                        <motion.div 
                            layoutId="nav-pill"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d7f20d] rounded-full mx-auto w-3/4"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content with Page Transitions */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={isTransitioning ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ 
                duration: isTransitioning ? 0.1 : 0.5, 
                ease: [0.25, 0.1, 0.25, 1.0]
            }}
            className="min-h-screen"
          >
            {currentOutlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d2618] text-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#d7f20d] rounded-full flex items-center justify-center">
                  <span className="text-[#0d2618] text-[10px] font-['Audiowide',cursive]">S</span>
                </div>
                <span className="font-['Audiowide',cursive] text-[18px]">SOMO</span>
              </div>
              <p className="text-white/50 text-[14px] mb-4 font-['Geist',sans-serif]">Parceiros digitais para o seu negocio crescer.</p>
              <div className="flex gap-2">
                {socialIcons.map((icon) => (
                  <a key={icon.name} href={icon.href} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d7f20d]/30 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d7f20d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {icon.name === "Instagram" && <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></>}
                      {icon.name === "LinkedIn" && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>}
                      {icon.name === "X" && <><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46L20 4"/></>}
                      {icon.name === "Behance" && <><path d="M3 12h7m-7-5h6a3 3 0 0 1 0 4H3m11 6h5a3 3 0 0 0 0-4h-5a3 3 0 0 0 0 4z"/></>}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-['Audiowide',cursive] text-[14px] text-[#d7f20d] mb-4 uppercase">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {["Home", "Servicos", "Portfolio", "Sobre"].map((item) => (
                  <a key={item} href="#" className="text-white/60 text-[14px] hover:text-white transition-colors font-['Geist',sans-serif]">{item}</a>
                ))}
              </div>
            </div>

            {/* All Pages */}
            <div>
              <h4 className="font-['Audiowide',cursive] text-[14px] text-[#d7f20d] mb-4 uppercase">Paginas</h4>
              <div className="flex flex-col gap-2">
                {["Web", "Social", "CRM", "Videos", "Portfolio"].map((item) => (
                  <a key={item} href="#" className="text-white/60 text-[14px] hover:text-white transition-colors font-['Geist',sans-serif]">{item}</a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-['Audiowide',cursive] text-[14px] text-[#d7f20d] mb-4 uppercase">Contato</h4>
              <p className="text-white/60 text-[14px] font-['Geist',sans-serif]">hello@somo.io</p>
              <p className="text-white/60 text-[14px] mt-2 font-['Geist',sans-serif]">Sao Paulo, Brasil</p>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-[13px] font-['Geist',sans-serif]">Powered by <span className="text-[#d7f20d]">SOMO</span>. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}