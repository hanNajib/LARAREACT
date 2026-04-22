import React from "react";
import { Link } from "@inertiajs/react";
import { FaYoutube, FaInstagram, FaFacebook, FaPhone, FaClock } from "react-icons/fa6";
import { IoMdPin, IoMdMail } from "react-icons/io";

const Footer = () => {
    // DATA STATIS (Navigasi & Program Keahlian)
    const navigationLinks = [
        { name: "Beranda", href: "/" },
        { name: "Profil Sekolah", href: "/profil" },
        { name: "Artikel & Blog", href: "/artikel" },
        { name: "Galeri Kegiatan", href: "/gallery" },
        { name: "Pengumuman", href: "/announcement" },
    ];

    const majors = [
        { id: 1, name: "Rekayasa Perangkat Lunak", short_name: "RPL" },
        { id: 2, name: "Teknik Bisnis Sepeda Motor", short_name: "TBSM" },
        { id: 3, name: "Teknik Komputer & Jaringan", short_name: "TKJ" },
        { id: 4, name: "Multimedia", short_name: "MM" },
    ];

    const contactInfo = {
        alamat: "Jl. Pelita no 27 Sidomekar, Semboro, Jember",
        telepon: "(0336) 444112",
        email: "smknegeri08jember@gmail.com",
        jamKerja: "Senin - Jumat: 07:00 - 15:00",
        socials: {
            youtube: "https://youtube.com/@smkn8jember",
            instagram: "https://instagram.com/smkn8jember",
            facebook: "https://facebook.com/smkn8jember",
        }
    };

    return (
        <footer className="bg-[#212529] pt-16 pb-8 px-8 md:px-20 w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Kolom 1: Branding & Deskripsi */}
                <div className="flex flex-col gap-6">
                    <h1 className="font-poppins font-bold text-[#ff6000] text-2xl">
                        SMK Negeri 8 Jember
                    </h1>
                    <p className="font-poppins text-[#A0A0A0] text-sm leading-relaxed">
                        Sekolah Menengah Kejuruan yang berkomitmen menghasilkan lulusan berkualitas, 
                        berkarakter unggul, dan siap kerja di era digital serta industri global.
                    </p>
                    <div className="flex items-center gap-3">
                        <a href={contactInfo.socials.youtube} target="_blank" rel="noreferrer" className="bg-[#ff6000] hover:bg-orange-600 transition-colors p-2.5 rounded-full text-white">
                            <FaYoutube size={18} />
                        </a>
                        <a href={contactInfo.socials.instagram} target="_blank" rel="noreferrer" className="bg-[#ff6000] hover:bg-orange-600 transition-colors p-2.5 rounded-full text-white">
                            <FaInstagram size={18} />
                        </a>
                        <a href={contactInfo.socials.facebook} target="_blank" rel="noreferrer" className="bg-[#ff6000] hover:bg-orange-600 transition-colors p-2.5 rounded-full text-white">
                            <FaFacebook size={18} />
                        </a>
                    </div>
                </div>

                {/* Kolom 2: Navigasi Cepat */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-poppins font-bold text-white text-lg">Navigasi</h2>
                    <ul className="flex flex-col gap-3">
                        {navigationLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className="text-[#A0A0A0] hover:text-[#ff6000] transition-colors text-sm">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Kolom 3: Program Keahlian */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-poppins font-bold text-white text-lg">Program Keahlian</h2>
                    <ul className="flex flex-col gap-3">
                        {majors.map((major) => (
                            <li key={major.id}>
                                <Link href={`/major/${major.short_name}`} className="text-[#A0A0A0] hover:text-[#ff6000] transition-colors text-sm">
                                    {major.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Kolom 4: Kontak */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-poppins font-bold text-white text-lg">Kontak Kami</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-3">
                            <IoMdPin className="text-[#ff6000] mt-1 shrink-0" size={20} />
                            <p className="text-[#A0A0A0] text-sm leading-snug">{contactInfo.alamat}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaPhone className="text-[#ff6000] shrink-0" size={16} />
                            <p className="text-[#A0A0A0] text-sm">{contactInfo.telepon}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <IoMdMail className="text-[#ff6000] shrink-0" size={18} />
                            <p className="text-[#A0A0A0] text-sm">{contactInfo.email}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaClock className="text-[#ff6000] shrink-0" size={16} />
                            <p className="text-[#A0A0A0] text-sm italic">{contactInfo.jamKerja}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logo Partner / Kerjasama */}
            {/* <div className="max-w-4xl mx-auto mb-12 bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-center items-center backdrop-blur-sm transition-all hover:bg-white/10">
                <img 
                    src="/assets/images/Logo Jagoan Hosting, Komdigi, Maspion IT, Garuda Spark.png" 
                    alt="Mitra Industri SMKN 8 Jember" 
                    className="max-h-12 md:max-h-16 object-contain opacity-80 hover:opacity-100 transition-opacity invert brightness-0" 
                />
            </div> */}

            {/* Copyright */}
            <div className="max-w-7xl mx-auto border-t border-gray-700/50 pt-8 text-center">
                <p className="font-poppins text-[#6c757d] text-xs md:text-sm">
                    © {new Date().getFullYear()} SMK Negeri 8 Jember. Semua hak dilindungi undang-undang.
                </p>
                <p className="text-[#495057] text-[10px] mt-2 uppercase tracking-widest">
                    Penerapan Teknologi RPL - SMK Unggul
                </p>
            </div>
        </footer>
    );
};

export default Footer;