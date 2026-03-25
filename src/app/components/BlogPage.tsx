import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Search, Calendar, Clock } from "lucide-react";
import { FadeInImage } from "./ui/FadeInImage";
import { TiltCard } from "./ui/TiltCard";

// Import images
import imgBlog1 from "figma:asset/bce1f4b39d2d36cbdd81e5e228fe13752fe8bf7a.png";
import imgBlog2 from "figma:asset/7b78b6e2c09c66340cf3dbce5b34ae267e3d162e.png";
import imgBlog3 from "figma:asset/2891dac2e6a891501cc4a1c60c383e5dd1c20ffd.png";

const blogPosts = [
  {
    id: "design-thinking-na-pratica",
    image: imgBlog1,
    title: "Design Thinking na prática: Como transformar ideias em soluções",
    excerpt: "Entenda como aplicar metodologias ágeis de design para resolver problemas complexos de negócio.",
    tag: "Design",
    tagColor: "bg-purple-600",
    date: "15 de Fevereiro, 2026",
    readTime: "8 min",
  },
  {
    id: "inteligencia-artificial-marketing",
    image: imgBlog2,
    title: "IA no Marketing Digital: Como usar automação para escalar resultados",
    excerpt: "Descubra como a inteligência artificial está revolucionando as estratégias de marketing digital.",
    tag: "Marketing",
    tagColor: "bg-[#d7f20d]",
    date: "12 de Fevereiro, 2026",
    readTime: "6 min",
  },
  {
    id: "tendencias-desenvolvimento-web-2026",
    image: imgBlog3,
    title: "Tendências de desenvolvimento web para 2026",
    excerpt: "Tecnologias e frameworks que estão moldando o futuro do desenvolvimento web.",
    tag: "Tech",
    tagColor: "bg-[#1a3a6c]",
    date: "10 de Fevereiro, 2026",
    readTime: "7 min",
  },
  {
    id: "design-thinking-na-pratica",
    image: imgBlog1,
    title: "Site sob medida ou Template pronto? O que sua empresa realmente precisa",
    excerpt: "Compare as vantagens e desvantagens de cada abordagem para fazer a melhor escolha.",
    tag: "Tecnologia",
    tagColor: "bg-[#d7f20d]",
    date: "8 de Fevereiro, 2026",
    readTime: "5 min",
  },
  {
    id: "inteligencia-artificial-marketing",
    image: imgBlog2,
    title: "Design centrado no usuário: por que importa",
    excerpt: "Como criar produtos digitais que realmente atendem às necessidades dos usuários.",
    tag: "Design",
    tagColor: "bg-[#a83a17]",
    date: "5 de Fevereiro, 2026",
    readTime: "6 min",
  },
  {
    id: "tendencias-desenvolvimento-web-2026",
    image: imgBlog3,
    title: "Estratégias de SEO para 2026",
    excerpt: "Técnicas e práticas atualizadas para melhorar o posicionamento orgânico do seu site.",
    tag: "SEO",
    tagColor: "bg-white/10",
    date: "3 de Fevereiro, 2026",
    readTime: "9 min",
  },
];

const categories = ["Todos", "Design", "Marketing", "Tech", "SEO"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "Todos" || post.tag === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#d7f20d]/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-[10%] w-[300px] h-[300px] rounded-full bg-[#d7f20d]/[0.03] blur-[100px]" />
        <div className="absolute top-40 right-[15%] w-[250px] h-[250px] rounded-full bg-[#d7f20d]/[0.02] blur-[80px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[#d7f20d] font-['Audiowide',cursive] text-[12px] uppercase tracking-widest mb-4 block">
              Novidades & Insights
            </span>
            <h1 className="font-['Audiowide',cursive] text-white text-[clamp(36px,6vw,72px)] uppercase tracking-tight leading-[1.1] mb-6">
              Blog <span className="text-[#d7f20d]">SOMO</span>
            </h1>
            <p className="text-white/60 font-['Geist',sans-serif] text-[18px] max-w-3xl mx-auto leading-relaxed">
              Explore artigos sobre tecnologia, design estratégico, marketing digital e inovação. 
              Entenda como transformamos linhas de código em resultados reais.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white font-['Geist',sans-serif] text-[16px] placeholder:text-white/40 focus:outline-none focus:border-[#d7f20d]/50 transition-all"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-['Audiowide',cursive] text-[12px] uppercase tracking-wide transition-all ${
                  activeCategory === category
                    ? "bg-[#d7f20d] text-[#0a0a0a] shadow-lg shadow-[#d7f20d]/20"
                    : "bg-white/[0.05] backdrop-blur-sm border border-white/10 text-white/60 hover:border-[#d7f20d]/30 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/40 font-['Geist',sans-serif] text-[18px]">
                Nenhum artigo encontrado. Tente outra busca.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <TiltCard key={`${post.id}-${index}`} tiltMaxX={8} tiltMaxY={8} scale={1.02}>
                  <Link to={`/blog/${post.id}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group cursor-pointer backdrop-blur-sm bg-white/[0.03] rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col hover:border-[#d7f20d]/30 transition-all"
                    >
                      {/* Image */}
                      <div className="overflow-hidden aspect-[16/10] relative">
                        <FadeInImage
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={`${post.tagColor} text-white text-[10px] font-['Audiowide',cursive] px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                            {post.tag}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-4 text-white/40 text-[12px] font-['Geist',sans-serif]">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-white font-['Geist',sans-serif] text-[18px] font-semibold leading-tight mb-3 group-hover:text-[#d7f20d] transition-colors">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-white/60 font-['Geist',sans-serif] text-[14px] leading-relaxed mb-4 flex-grow">
                          {post.excerpt}
                        </p>

                        {/* Read More */}
                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[#d7f20d] text-[12px] font-['Audiowide',cursive] uppercase tracking-wide">
                            Ler artigo
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-[#d7f20d] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </TiltCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative"
        >
          <TiltCard tiltMaxX={3} tiltMaxY={3} scale={1.01}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#d7f20d]/10 to-transparent border border-[#d7f20d]/20 rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d7f20d] to-transparent" />

              <h3 className="font-['Audiowide',cursive] text-white text-[clamp(24px,4vw,36px)] uppercase tracking-tight mb-4">
                Quer receber nossas novidades?
              </h3>
              <p className="text-white/60 font-['Geist',sans-serif] text-[16px] mb-8 max-w-2xl mx-auto">
                Inscreva-se na nossa newsletter e receba artigos exclusivos sobre tecnologia, design e inovação
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-grow bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4 text-white font-['Geist',sans-serif] text-[14px] placeholder:text-white/40 focus:outline-none focus:border-[#d7f20d]/50 transition-all"
                />
                <button className="bg-[#d7f20d] text-[#0a0a0a] px-8 py-4 rounded-xl font-['Audiowide',cursive] text-[14px] uppercase tracking-wide hover:bg-[#c5e00c] transition-all shadow-lg shadow-[#d7f20d]/20 hover:shadow-[#d7f20d]/40 hover:-translate-y-1 transform whitespace-nowrap">
                  Inscrever-se
                </button>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>
    </div>
  );
}
