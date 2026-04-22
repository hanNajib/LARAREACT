import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaChalkboardTeacher } from "react-icons/fa";
import { LuBookText, LuHousePlus } from "react-icons/lu"; 
import { PiStudentBold } from "react-icons/pi";
import parse from 'html-react-parser';

interface AboutSectionProps {
    className?: string;
}

const AboutSection = ({ className = '' }: AboutSectionProps) => {
    const staticData = {
        deskripsi: `SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. <br /><br /> Dengan pengalaman lebih dari 25 tahun, kami terus berinnovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik. Kami memiliki fasilitas lengkap untuk menunjang kreativitas siswa di berbagai bidang keahlian.`,
        jumlahSiswa: 1200,
        jumlahGuru: 85,
        jumlahJurusan: 7,
        tahunBerdiri: 2004,
    };

    const currentYear = new Date().getFullYear();
    const umurSekolah = currentYear - staticData.tahunBerdiri;

    const stats = [
        {
            id: 'students',
            icon: <LuBookText className="text-2xl" />,
            value: `${staticData.jumlahSiswa}+`,
            label: 'Siswa - Siswi',
        },
        {
            id: 'teachers',
            icon: <FaChalkboardTeacher className="text-2xl" />,
            value: `${staticData.jumlahGuru}+`,
            label: 'Guru & Staf',
        },
        {
            id: 'majors',
            icon: <PiStudentBold className="text-2xl" />,
            value: `${staticData.jumlahJurusan}+`,
            label: 'Program Keahlian',
        },
        {
            id: 'years',
            icon: <LuHousePlus className="text-2xl" />,
            value: `${umurSekolah}+`,
            label: 'Tahun Berdiri',
        }
    ];

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section 
            id="about" 
            className={`py-16 md:py-24 bg-gray-50 px-6 md:px-16 ${className}`}
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 w-full">
                
                {/* Text Content */}
                <div className="lg:w-1/2 flex flex-col items-center lg:items-start order-2 lg:order-1">
                    <div className="flex flex-col items-center lg:items-start justify-center gap-3 pb-8">
                        <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-5xl'>
                            Tentang <span className='text-[#ff6000]'>Kami</span>
                        </h1>
                        <div className="w-24 h-1.5 bg-[#ff6000] rounded-full"></div>
                    </div>

                    <div className={`font-poppins text-[#4b4b4b] leading-relaxed text-[15px] md:text-[16px] text-justify lg:text-left transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-[150px] md:max-h-none'}`}>
                        {parse(staticData.deskripsi)}
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="flex md:hidden py-6 justify-center w-full">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 bg-[#ff6000] text-white rounded-full px-6 py-2 shadow-md active:scale-95 transition-all font-semibold"
                        >
                            {isExpanded ? (
                                <>Tampilkan Sedikit <FaChevronUp /></>
                            ) : (
                                <>Selengkapnya <FaChevronDown /></>
                            )}
                        </button>
                    </div>

                    {/* Stats Grid (Pengganti StatCard) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 w-full gap-4 mt-8 lg:pr-8">
                        {stats.map((stat) => (
                            <div 
                                key={stat.id} 
                                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center lg:items-start gap-2 hover:shadow-md transition-shadow"
                            >
                                <div className="text-[#ff6000]">
                                    {stat.icon}
                                </div>
                                <div className="flex flex-col items-center lg:items-start">
                                    <span className="text-xl font-bold text-[#3C4A78]">{stat.value}</span>
                                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Content */}
                <div className="flex justify-center items-center lg:w-1/2 order-1 lg:order-2">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6000] to-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        
                        <img 
                            src="/assets/images/about-img.png" 
                            alt="Tentang SMK Negeri 8 Jember" 
                            className="relative rounded-2xl shadow-xl w-full max-w-md lg:max-w-full transform transition duration-500 hover:scale-[1.01]"
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/600x400?text=SMKN+8+JEMBER";
                            }}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;