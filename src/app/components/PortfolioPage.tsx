import { useState } from "react";
import { Link } from "react-router"; // Link was implicit but good to explicit if needed
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

// Portfolio images from Figma
import imgPhoto1 from "figma:asset/b16d978217fd5db8d1e96332cf9567ea24d48ba0.png";
import imgPhoto2 from "figma:asset/72f914a24572f809fdeb87180affb53a5cae44b1.png";
import imgPhoto3 from "figma:asset/a09e52e7c1b4ca64713c97be810bf78e1e8a9850.png";
import imgBlog1 from "figma:asset/bce1f4b39d2d36cbdd81e5e228fe13752fe8bf7a.png";
import imgBlog2 from "figma:asset/7b78b6e2c09c66340cf3dbce5b34ae267e3d162e.png";
import imgBlog3 from "figma:asset/2891dac2e6a891501cc4a1c60c383e5dd1c20ffd.png";
import imgAvatar1 from "figma:asset/e19140f772444650cb1ebd50164fdde9a62fc536.png";
import imgAvatar2 from "figma:asset/fe07b23c0d180fe81fa3d969d3179b3ca1f73972.png";
import imgAvatar3 from "figma:asset/b8ff23154f756e9b0481a46bc8bc5dc94194fb01.png";
import imgAvatar4 from "figma:asset/ed02ce19044bb9ddbf7d5a04381b84799da59299.png";
import imgAvatar5 from "figma:asset/7e53b1970aefa5875666f1fdd02992ae29456ac6.png";
import imgAvatar6 from "figma:asset/a47df3eedd8f0e7524febc75858c53ace0061afb.png";
import imgAvatar7 from "figma:asset/800fcbe693dbcd7da42162d1ceb81a6c2e6381d1.png";
import imgAvatar8 from "figma:asset/eee82aa3d395fab8d490c4df0dc8ffbd1d17ae88.png";

const categories = ["Tudo", "Websites", "Brands", "Social", "Motion"];

const portfolioItems = [
  { image: imgPhoto1, title: "Brand Identity - Studio K", category: "Brands", size: "large" },
  { image: imgBlog1, title: "E-commerce Platform", category: "Websites", size: "medium" },
  { image: imgAvatar1, title: "Social Campaign", category: "Social", size: "small" },
  { image: imgPhoto2, title: "Product Photography", category: "Brands", size: "medium" },
  { image: imgBlog2, title: "Landing Page - FinTech", category: "Websites", size: "small" },
  { image: imgAvatar2, title: "Motion Graphics Reel", category: "Motion", size: "large" },
  { image: imgPhoto3, title: "Corporate Website", category: "Websites", size: "medium" },
  { image: imgBlog3, title: "Rebranding Campaign", category: "Brands", size: "small" },
  { image: imgAvatar3, title: "App Design - Health", category: "Websites", size: "medium" },
  { image: imgAvatar4, title: "Social Media Content", category: "Social", size: "small" },
  { image: imgAvatar5, title: "Video Production", category: "Motion", size: "large" },
  { image: imgAvatar6, title: "Editorial Design", category: "Brands", size: "medium" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Tudo");

  const filtered = activeCategory === "Tudo"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 gap-0">
          {[imgPhoto1, imgPhoto2, imgPhoto3, imgBlog1, imgBlog2, imgBlog3, imgAvatar7, imgAvatar8].map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-center px-6 pt-20"
        >
          <h1 className="font-['Audiowide',cursive] text-[clamp(36px,7vw,64px)] text-white uppercase tracking-tight leading-[1.1]">
            PORTFÓLIO QUE CONTA HISTÓRIAS,{" "}
            <br className="hidden md:block" />
            <span className="text-[#d7f20d]">NÃO APENAS PROJETOS.</span>
          </h1>
          <p className="text-white/50 text-[17px] mt-6 max-w-lg mx-auto">
            Cada projeto é uma história de transformação digital.
          </p>
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[13px] uppercase bg-[#0d2618] px-4 py-1.5 rounded-full">
              Portfolio
            </span>
            <h2 className="font-['Audiowide',cursive] text-[#0d2618] text-[clamp(28px,4vw,40px)] tracking-tight mt-4 uppercase">
              Portfólio em Destaque
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#0d2618] text-[#d7f20d]"
                    : "bg-[#f0f0f0] text-[#605f5f] hover:bg-[#e0e0e0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
                {filtered.map((item, index) => (
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={item.title}
                    className="break-inside-avoid rounded-2xl overflow-hidden relative group cursor-pointer mb-4"
                >
                    <div className={`${item.size === "large" ? "aspect-[3/4]" : item.size === "medium" ? "aspect-[4/3]" : "aspect-square"}`}>
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-end justify-between">
                        <div>
                            <span className="text-[#d7f20d] text-[12px] font-medium uppercase">
                            {item.category}
                            </span>
                            <h3 className="text-white text-[18px] font-medium mt-1">
                            {item.title}
                            </h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#d7f20d] flex items-center justify-center flex-shrink-0">
                            <ArrowUpRight size={18} className="text-[#0d2618]" />
                        </div>
                        </div>
                    </div>
                    </div>
                </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* All in One Platform */}
      <section className="py-24 px-6 md:px-16 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0d2618] rounded-3xl p-8 md:p-16 text-center overflow-hidden relative"
          >
            <h2 className="font-['Audiowide',cursive] text-white text-[clamp(28px,4vw,40px)] tracking-tight relative z-10 uppercase">
              Tudo em uma só plataforma
            </h2>
            <p className="text-white/50 text-[16px] mt-4 max-w-lg mx-auto relative z-10">
              Do design ao código, da estratégia ao resultado. Tudo em um só lugar.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 relative z-10">
              {["Design", "Dev", "SEO", "CRM"].map((item) => (
                <div key={item} className="bg-white/10 rounded-xl p-4 text-white font-['Audiowide',cursive] text-[14px] uppercase border border-white/5">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
