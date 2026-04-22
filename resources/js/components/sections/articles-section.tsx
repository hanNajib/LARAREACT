import React from "react";
import { Link } from "@inertiajs/react";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

// Definisi tipe data untuk Artikel
interface Article {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string;
}

interface ArticlesSectionProps {
    className?: string;
}

const ArticlesSection = ({ className = "" }: ArticlesSectionProps) => {
    // DATA STATIS dengan Type Safety
    const articles: Article[] = [
        {
            id: 1,
            title: "Kunjungan Industri Siswa RPL ke PT Pringapus Digital Technology",
            excerpt: "Siswa jurusan Rekayasa Perangkat Lunak melakukan kunjungan untuk melihat langsung alur kerja software house profesional...",
            image: "/assets/images/artikel-1.jpg",
            date: "20 April 2026",
            author: "Admin SMKN 8",
        },
        {
            id: 2,
            title: "Prestasi Gemilang: Juara 1 LKS Tingkat Provinsi Bidang Web Tech",
            excerpt: "Selamat kepada perwakilan SMKN 8 Jember yang berhasil membawa pulang piala emas dalam ajang LKS tahun ini...",
            image: "/assets/images/artikel-2.jpg",
            date: "18 April 2026",
            author: "Humas",
        },
        {
            id: 3,
            title: "Tips Perawatan Mesin CVT Motor Matic bagi Pemula",
            excerpt: "Panduan praktis dari jurusan Teknik Bisnis Sepeda Motor (TBSM) tentang cara merawat transmisi otomatis agar tetap awet...",
            image: "/assets/images/artikel-3.jpg",
            date: "15 April 2026",
            author: "Jurusan TBSM",
        },
    ];

    return (
        <section 
            id="articles" 
            className={`py-20 bg-white px-6 md:px-16 ${className}`}
        >
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900">
                        Artikel <span className="text-[#ff6000]">Terbaru</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[#ff6000] mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                        Ikuti berita dan informasi terkini seputar kegiatan dan prestasi SMK Negeri 8 Jember.
                    </p>
                </div>

                {/* Grid Artikel */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {articles.map((article) => (
                        <div 
                            key={article.id} 
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            {/* Thumbnail Gambar */}
                            <div className="relative h-52 overflow-hidden">
                                <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://placehold.co/600x400?text=${encodeURIComponent(article.title)}`;
                                    }}
                                />
                                <div className="absolute top-4 left-4 bg-[#ff6000] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                    Berita
                                </div>
                            </div>

                            {/* Konten Artikel */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-[#ff6000]" />
                                        <span>{article.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaUser className="text-[#ff6000]" />
                                        <span>{article.author}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#ff6000] transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                
                                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                    {article.excerpt}
                                </p>

                                <div className="mt-auto">
                                    <Link 
                                        href={`/artikel/${article.id}`}
                                        className="flex items-center gap-2 text-[#ff6000] font-bold text-sm hover:gap-3 transition-all"
                                    >
                                        Baca Selengkapnya <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tombol Lihat Semua */}
                <div className="flex justify-center items-center w-full pt-12">
                    <Link 
                        href="/artikel"
                        className="bg-white border-2 border-[#ff6000] text-[#ff6000] hover:bg-[#ff6000] hover:text-white px-8 py-3 rounded-full font-bold shadow-md transition-all active:scale-95"
                    >
                        Lihat Semua Artikel
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default ArticlesSection;