import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { RiImage2Line, RiExternalLinkLine, RiCloseLine } from "react-icons/ri";

// Definisi tipe data untuk item galeri
interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
}

interface GallerySectionProps {
    className?: string;
}

const GallerySection = ({ className = "" }: GallerySectionProps) => {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [activeFilter, setFilter] = useState("all");

    // DATA STATIS (Dummy Data Galeri)
    const allGalleries: GalleryItem[] = [
        { id: 1, title: "Gedung Utama SMKN 8 Jember", category: "fasilitas", image: "/assets/images/gallery/gedung.jpg" },
        { id: 2, title: "Praktik Bengkel TBSM", category: "kegiatan", image: "/assets/images/gallery/praktik.jpg" },
        { id: 3, title: "Juara LKS Web Technology", category: "prestasi", image: "/assets/images/gallery/lks.jpg" },
        { id: 4, title: "Laboratorium Komputer RPL", category: "fasilitas", image: "/assets/images/gallery/lab.jpg" },
        { id: 5, title: "Upacara Hari Kemerdekaan", category: "kegiatan", image: "/assets/images/gallery/upacara.jpg" },
        { id: 6, title: "Penyerahan Sertifikat Industri", category: "prestasi", image: "/assets/images/gallery/industri.jpg" },
    ];

    const categories = [
        { id: "all", name: "all" },
        { id: "kegiatan", name: "kegiatan" },
        { id: "prestasi", name: "prestasi" },
        { id: "fasilitas", name: "fasilitas" },
    ];

    // Logika Filter Statis
    const filteredGalleries = activeFilter === "all" 
        ? allGalleries 
        : allGalleries.filter(item => item.category === activeFilter);

    return (
        <section id="gallery" className={`py-20 bg-gray-50 px-6 md:px-16 ${className}`}>
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900">
                        Galeri <span className="text-[#ff6000]">Sekolah</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-[#ff6000] mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-sm md:text-base">
                        Dokumentasi kegiatan, prestasi, event, dan fasilitas SMK Negeri 8 Jember yang membanggakan.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setFilter(category.name)}
                            className={`cursor-pointer font-poppins font-bold rounded-full text-xs md:text-sm py-2 px-6 md:px-8 border-2 border-[#ff6000] transition-all active:scale-95 ${
                                activeFilter === category.name
                                    ? "text-white bg-[#ff6000] shadow-lg shadow-orange-200"
                                    : "text-[#ff6000] bg-transparent hover:bg-[#ff6000] hover:text-white"
                            }`}
                        >
                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGalleries.length > 0 ? (
                        filteredGalleries.map((item) => (
                            <div 
                                key={item.id}
                                onClick={() => setSelectedImage(item)}
                                className="group relative h-72 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-gray-100 bg-white"
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://placehold.co/600x400?text=${encodeURIComponent(item.title)}`;
                                    }}
                                />
                                {/* Overlay muncul saat hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-1">{item.category}</span>
                                    <h4 className="text-white font-bold text-lg leading-tight">{item.title}</h4>
                                    <div className="mt-3 flex items-center text-white text-xs gap-2">
                                        <RiExternalLinkLine className="text-orange-400 text-lg" />
                                        <span>Klik untuk memperbesar</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                            <RiImage2Line size={80} className="opacity-20 mb-4" />
                            <p className="text-xl font-medium text-gray-600">Belum ada foto untuk kategori ini</p>
                        </div>
                    )}
                </div>

                {/* Tombol Lihat Semua */}
                <div className="flex justify-center items-center w-full mt-12">
                    <Link 
                        href="/gallery"
                        className="bg-[#ff6000] hover:bg-[#e65300] text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
                    >
                        Lihat Semua Galeri <RiExternalLinkLine />
                    </Link>
                </div>
            </div>

            {/* Lightbox / PopUp Modal Statis */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-10 transition-all"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Tombol Close */}
                    <button 
                        className="absolute top-6 right-6 text-white text-4xl hover:text-orange-500 transition-colors z-[210]"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <RiCloseLine />
                    </button>
                    
                    {/* Container Gambar */}
                    <div 
                        className="max-w-5xl w-full flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedImage.image} 
                            alt={selectedImage.title}
                            className="max-h-[75vh] w-auto rounded-lg shadow-2xl border-4 border-white/10"
                            onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/800x600?text=${encodeURIComponent(selectedImage.title)}`;
                            }}
                        />
                        <div className="mt-6 text-center">
                            <span className="bg-orange-600 text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold mb-2 inline-block">
                                {selectedImage.category}
                            </span>
                            <h3 className="text-white text-xl md:text-3xl font-bold">{selectedImage.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GallerySection;