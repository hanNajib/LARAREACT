import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { RiMegaphoneFill, RiInbox2Line } from "react-icons/ri";
import { FaCalendarAlt, FaChevronRight } from "react-icons/fa";

// Kamu bisa buat file terpisah untuk PopUp, atau sementara pakai modal sederhana dulu
// import PengumumanPopUp from '../ui/PengumumanPopUp';

interface Announcement {
    id: number;
    title: string;
    content: string;
    date: string;
    category: string;
}

const AnnouncementSection = ({ className = '' }) => {
    // DATA STATIS (Dummy Data)
    const announcements: Announcement[] = [
        {
            id: 1,
            title: "Pelaksanaan Ujian Tengah Semester Genap 2026",
            content: "Diberitahukan kepada seluruh siswa bahwa UTS akan dilaksanakan mulai tanggal 4 Mei 2026...",
            date: "20 April 2026",
            category: "Akademik"
        },
        {
            id: 2,
            title: "Penerimaan Peserta Didik Baru (PPDB) Jalur Prestasi",
            content: "Pendaftaran jalur prestasi resmi dibuka. Siapkan berkas dan sertifikat kejuaraan Anda...",
            date: "18 April 2026",
            category: "PPDB"
        },
        {
            id: 3,
            title: "Kegiatan Kerja Bakti Lingkungan Sekolah",
            content: "Dalam rangka memperingati hari bumi, seluruh civitas akademika diharapkan hadir untuk...",
            date: "15 April 2026",
            category: "Kegiatan"
        }
    ];

    const [selectedPengumuman, setSelectedPengumuman] = useState<Announcement | null>(null);

    return (
        <section id="pengumuman" className={`py-20 bg-gradient-to-b from-orange-50 to-white px-6 md:px-16 ${className}`}>
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900">
                        Pengumuman <span className='text-[#ff6000]'>Terbaru</span>
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Informasi penting dan terkini untuk seluruh siswa, orang tua, dan civitas akademika SMK Negeri 8 Jember.
                    </p>
                </div>

                {/* Container Papan Pengumuman */}
                <div className="w-full lg:w-5/6 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
                    
                    {/* Header Papan */}
                    <div className="bg-[#f78000] p-6 flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-full text-white backdrop-blur-sm">
                            <RiMegaphoneFill size={28} />
                        </div>
                        <h3 className="text-white text-xl md:text-2xl font-poppins font-bold">
                            Papan Pengumuman
                        </h3>
                    </div>

                    {/* List Pengumuman */}
                    <div className="p-5 md:p-8">
                        {announcements.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {announcements.map((item) => (
                                    <div 
                                        key={item.id}
                                        onClick={() => setSelectedPengumuman(item)}
                                        className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-orange-200 hover:shadow-md transition-all cursor-pointer"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-orange-100 text-[#ff6000] text-[10px] font-bold uppercase rounded-full">
                                                    {item.category}
                                                </span>
                                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                    <FaCalendarAlt />
                                                    <span>{item.date}</span>
                                                </div>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#ff6000] transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-500 text-sm line-clamp-1">
                                                {item.content}
                                            </p>
                                        </div>
                                        <div className="mt-4 md:mt-0 flex items-center text-[#ff6000] font-semibold text-sm gap-2">
                                            Lihat Detail <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                ))}

                                {/* Action Button */}
                                <div className="flex justify-center pt-8">
                                    <Link 
                                        href="/announcement"
                                        className="bg-[#ff6000] hover:bg-[#e65300] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-orange-200 transition-all active:scale-95"
                                    >
                                        Lihat Semua Pengumuman
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-16 text-gray-400">
                                <RiInbox2Line size={64} className="mb-4 opacity-20" />
                                <p className="text-xl font-medium">Belum ada pengumuman saat ini</p>
                                <p className="text-sm">Tetap pantau halaman ini untuk info terbaru ya.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Sederhana (Pengganti PopUp sementara) */}
            {selectedPengumuman && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex justify-center items-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="bg-orange-500 p-6 text-white relative">
                            <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-1 rounded mb-2 inline-block">
                                {selectedPengumuman.category}
                            </span>
                            <h3 className="text-xl font-bold">{selectedPengumuman.title}</h3>
                            <button 
                                onClick={() => setSelectedPengumuman(null)}
                                className="absolute top-4 right-4 text-2xl leading-none hover:bg-black/10 rounded-full w-8 h-8 flex items-center justify-center"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                <FaCalendarAlt />
                                <span>{selectedPengumuman.date}</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                {selectedPengumuman.content}
                            </p>
                            <button 
                                onClick={() => setSelectedPengumuman(null)}
                                className="mt-8 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AnnouncementSection;