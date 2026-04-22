import { useState } from "react";
import { 
    FaYoutube, FaInstagram, FaFacebook, FaPhoneAlt, FaSearch, 
    FaBars, FaTimes, FaChevronDown, FaChevronUp 
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link, router } from '@inertiajs/react';

// Import Hooks API (Sesuaikan path jika sudah ada nanti, sementara dummy jika belum ada)
// import { useMajors } from "../hooks/api/useMajor";
// import { useCategories } from "../hooks/api/useCategory";

export function NavMain() {
    // State UI
    const [isOpen, setIsOpen] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [isProfil, setIsProfil] = useState(false);
    const [isJurusan, setIsJurusan] = useState(false);
    const [isBlog, setIsBlog] = useState(false);

    // Data Statis (Nanti ganti dengan hook API jika file sudah ada)
    const majors = [
        { id: 1, name: "Teknik Komputer dan Jaringan", short_name: "tkj" },
        { id: 2, name: "Akuntansi", short_name: "akl" },
    ];
    const categories = [
        { id: 1, name: "Berita" },
        { id: 2, name: "Prestasi" },
    ];

    // Handlers
    const handleToggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsSearch(false);
            setIsProfil(false);
            setIsJurusan(false);
            setIsBlog(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearch(false);
        }
    };

    return (
        <div className="w-full">
            {/* --- TOP BAR (Social & Contact) --- */}
            <div className="z-50 relative flex flex-col md:flex-row w-full bg-[#eeeeee] justify-between items-center gap-2">
                <div className="flex bg-[#FF6000] px-5 md:px-16 py-2 items-center gap-2 justify-center md:rounded-tr-full w-full md:w-auto">
                    <p className="hidden lg:flex font-bold text-white text-sm">Ikuti Kami :</p>
                    <a href="#" className="text-white bg-[#ffffff3c] p-2 rounded-full hover:bg-white/50 transition"><FaYoutube /></a>
                    <a href="#" className="text-white bg-[#ffffff3c] p-2 rounded-full hover:bg-white/50 transition"><FaInstagram /></a>
                    <a href="#" className="text-white bg-[#ffffff3c] p-2 rounded-full hover:bg-white/50 transition"><FaFacebook /></a>
                </div>

                <div className="flex items-center justify-center py-2 md:mr-10 gap-4 md:gap-8">
                    <p className="flex items-center text-black gap-2 text-xs md:text-sm font-medium">
                        <FaPhoneAlt className="text-[#ff6000]" /> 0331-xxxxxx
                    </p>
                    <p className="flex items-center text-black gap-2 text-xs md:text-sm font-medium">
                        <IoIosMail className="text-[#ff6000] text-lg" /> info@smkn8jember.sch.id
                    </p>
                </div>
            </div>

            {/* --- MAIN NAVBAR --- */}
            <div className="sticky top-0 z-40 flex bg-white items-center px-6 md:px-14 py-3 justify-between shadow-md">
                {/* Mobile Menu Toggle */}
                <div className="flex lg:hidden">
                    <button onClick={handleToggleOpen} className="text-xl">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Logo Section */}
                <Link href="/" className={`flex gap-3 items-center ${isSearch ? 'hidden md:flex' : 'flex'}`}>
                    <img src="/assets/images/logo-smk.png" alt="Logo" className="w-[40px] md:w-[50px]" />
                    <h1 className="font-bold text-[#424242] text-sm md:text-base">SMKN 8 JEMBER</h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex gap-8 text-[#4c4c4c] font-medium">
                    <Link href="/" className="hover:text-[#FF6000] transition">Beranda</Link>
                    
                    {/* Dropdown Profil */}
                    <div className="relative group cursor-pointer">
                        <p className="flex items-center gap-1 hover:text-[#FF6000]">
                            Profil <FaChevronDown className="text-[10px]" />
                        </p>
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl border rounded-md hidden group-hover:flex flex-col py-2 z-50">
                            <Link href="/history" className="px-4 py-2 hover:bg-orange-50 hover:text-[#FF6000]">Sejarah Sekolah</Link>
                            <Link href="/visi-misi" className="px-4 py-2 hover:bg-orange-50 hover:text-[#FF6000]">Visi dan Misi</Link>
                            <Link href="/teacher" className="px-4 py-2 hover:bg-orange-50 hover:text-[#FF6000]">Data Guru</Link>
                        </div>
                    </div>

                    {/* Dropdown Jurusan */}
                    <div className="relative group cursor-pointer">
                        <p className="flex items-center gap-1 hover:text-[#FF6000]">
                            Jurusan <FaChevronDown className="text-[10px]" />
                        </p>
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-xl border rounded-md hidden group-hover:flex flex-col py-2 z-50">
                            {majors.map((m) => (
                                <Link key={m.id} href={`/major/${m.short_name}`} className="px-4 py-2 hover:bg-orange-50 hover:text-[#FF6000]">{m.name}</Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/gallery" className="hover:text-[#FF6000]">Galeri</Link>
                    <Link href="/announcement" className="hover:text-[#FF6000]">Pengumuman</Link>
                </div>

                {/* Search Bar (Desktop) */}
                <div className="hidden lg:flex relative w-64">
                    <form onSubmit={handleSearch} className="w-full relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-1.5 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#FF6000] text-sm"
                        />
                    </form>
                </div>

                {/* Mobile Search Toggle */}
                <div className="flex lg:hidden items-center">
                    <button onClick={() => setIsSearch(!isSearch)} className="p-2">
                        {isSearch ? <FaTimes className="text-lg"/> : <FaSearch className="text-lg"/>}
                    </button>
                    {isSearch && (
                        <form onSubmit={handleSearch} className="absolute left-0 top-full w-full bg-white p-4 shadow-md flex z-50">
                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6000]"
                                placeholder="Cari..."
                            />
                        </form>
                    )}
                </div>
            </div>

            {/* --- MOBILE MENU DROPDOWN --- */}
            <div className={`lg:hidden fixed inset-x-0 bg-white shadow-2xl transition-all duration-300 z-30 overflow-hidden ${isOpen ? 'max-h-screen border-t' : 'max-h-0'}`}>
                <div className="flex flex-col p-6 gap-4 font-medium text-[#4c4c4c]">
                    <Link href="/" onClick={() => setIsOpen(false)}>Beranda</Link>
                    
                    {/* Mobile Profil */}
                    <button onClick={() => setIsProfil(!isProfil)} className="flex items-center justify-between w-full">
                        Profil {isProfil ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {isProfil && (
                        <div className="flex flex-col pl-4 gap-2 text-sm text-gray-500">
                            <Link href="/history">Sejarah Sekolah</Link>
                            <Link href="/visi-misi">Visi dan Misi</Link>
                        </div>
                    )}

                    {/* Mobile Jurusan */}
                    <button onClick={() => setIsJurusan(!isJurusan)} className="flex items-center justify-between w-full">
                        Jurusan {isJurusan ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {isJurusan && (
                        <div className="flex flex-col pl-4 gap-2 text-sm text-gray-500">
                            {majors.map(m => (
                                <Link key={m.id} href={`/major/${m.short_name}`}>{m.name}</Link>
                            ))}
                        </div>
                    )}

                    <Link href="/gallery">Galeri</Link>
                    <Link href="/announcement">Pengumuman</Link>
                </div>
            </div>
        </div>
    );
}