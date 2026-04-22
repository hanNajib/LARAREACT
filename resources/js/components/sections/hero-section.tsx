import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import parse from 'html-react-parser';
import { Button } from '../ui/button'; 

import { FaArrowDown } from "react-icons/fa";
import { IoChatboxEllipsesOutline, IoCompassOutline } from "react-icons/io5";

// Hooks
// Jika file hook belum ada, kamu bisa biarkan ter-comment atau gunakan data dummy
// import { useWebSettings } from '../../hooks/api/useWebSettings';

const HeroSection = ({ 
    className = '', 
    judul = "SMK NEGERI 8 JEMBER <br /> WES TOP", 
    deskripsi = "Bersama kami, mari kita wujudkan masa depan generasi muda Bangsa Indonesia yang lebih berkualitas." 
}) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState<{q: string, a?: string}[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showFab, setShowFab] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Mock data untuk useWebSettings jika belum ada
    const websetting = { data: [] }; 
    // const { data: websetting } = useWebSettings();

    const { hero_image } = websetting?.data?.reduce((acc: any, setting: any) => {
        acc[setting.title] = setting.value;
        return acc;
    }, {}) || {};

    const questions = [
        { q: "Apa jurusan yang ada di SMKN 8 Jember?", a: "Kami memiliki beberapa jurusan seperti TKR, TSM, RPL, DKV, TKJ, APT, dan ATPH." },
        { q: "Siapa nama kepala sekolah di SMKN 8 Jember?", a: "Kepala sekolah yang menjabat di SMKN 8 Jember saat ini adalah Hj.Rahmah Hidana, S.Pd, M.Si." },
        { q: "Dimanakah alamat SMKN 8 Jember?", a: "SMKN 8 Jember berlokasi di jl.Pelita No 27 Sidomekar Semboro Jember Jawa Timur ." },
        { q: "Apa itu jurusan TKJ?", a: "TKJ (Teknik Komputer dan Jaringan) adalah keahlian yang mempelajari instalasi, konfigurasi, dan pemeliharaan jaringan komputer, termasuk administrasi server." },
        // ... (data pertanyaan lainnya tetap sama)
    ];

    const handleQuestionClick = (question: {q: string, a: string}) => {
        setChatHistory((prev) => [...prev, { q: question.q }]);
        setIsTyping(false);

        setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setChatHistory((prev) =>
                    prev.map((item, index) =>
                        index === prev.length - 1 ? { ...item, a: question.a } : item
                    )
                );
            }, 1500);
        }, 500);
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chatHistory, isTyping]);

    const handleScroll = () => {
        if (!chatContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
        setShowFab(!isAtBottom);
    };

    const scrollToBottom = () => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <section 
            style={{ 
                backgroundImage: hero_image ? `url(${hero_image})` : "url('/assets/images/hero.png')", 
                backgroundSize: "cover", 
                backgroundPosition: "center" 
            }}
            className={`h-screen flex lg:items-center relative overflow-hidden ${className}`}
        >
            {/* Overlay Gradient */}
            <div className="bg-gradient-to-r from-[#39302c9a] to-transparent w-full h-screen absolute inset-0"></div>
            
            <div className="px-6 md:px-16 w-full lg:w-5/6 z-10 pt-20 md:pt-36 lg:pt-0">
                <h1 className='font-poppins text-[#F8F9FA] text-left md:text-center lg:text-left font-bold text-5xl md:text-6xl lg:text-7xl'>
                    <div className='underline decoration-[#ff6000] decoration-8 underline-offset-8'>
                        { typeof judul === 'string' ? parse(judul) : judul }
                    </div> 
                </h1>
                
                <p className='text-white font-poppins pr-10 lg:pr-40 py-8 text-left md:text-center lg:text-left text-sm md:text-lg leading-relaxed max-w-3xl md:mx-auto lg:mx-0'>
                    { typeof deskripsi === 'string' ? parse(deskripsi) : deskripsi }
                </p>
                
                <div className="flex flex-col md:flex-row gap-5 md:justify-center lg:justify-start mt-4">
                    <Button onClick={() => window.location.href="#about"} className="bg-[#ff6000] hover:bg-[#e65300] text-white px-8 py-6 rounded-full text-lg transition-all">
                        Baca Selengkapnya
                    </Button>
                    <Link href="/announcement" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/50 px-8 py-3 rounded-full text-lg flex items-center justify-center transition-all">
                        Pengumuman Terbaru
                    </Link>
                </div>
            </div>

            {/* Float Buttons (Chat & Virtual Tour) */}
            <div className="absolute flex flex-row md:flex-col right-0 md:right-14 bottom-10 gap-4 justify-center items-center w-full md:w-auto z-20">
                {/* Chat Bot Toggle */}
                <div className="relative flex items-center justify-end rounded-full group cursor-pointer" onClick={() => setIsChatOpen(true)}>
                    <div className="bg-white flex items-center rounded-full shadow-xl">
                        <div className="pr-4 pl-6 font-poppins text-[#ff6000] font-semibold hidden lg:group-hover:block transition-all duration-300 whitespace-nowrap">
                            Tanya Seputar SMKN 8 Jember!
                        </div>
                        <div className="w-16 h-16 flex items-center justify-center bg-[#ff6000] text-white rounded-full shadow-lg">
                            <IoChatboxEllipsesOutline className='text-3xl' />
                        </div>
                    </div>
                </div>

                {/* Virtual Tour Toggle */}
                <div className="relative flex items-center justify-end rounded-full group cursor-pointer" onClick={() => window.open('https://app.lapentor.com/sphere/smkn8jember', '_blank')}>
                    <div className="bg-white flex items-center rounded-full shadow-xl">
                        <div className="pr-4 pl-6 font-poppins text-[#ff6000] font-semibold hidden lg:group-hover:block transition-all duration-300 whitespace-nowrap">
                            Jelajahi SMKN 8 Jember!
                        </div>
                        <div className="w-16 h-16 flex items-center justify-center bg-[#ff6000] text-white rounded-full shadow-lg">
                            <IoCompassOutline className='text-3xl' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Chatbot */}
            {isChatOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-0 md:p-4">
                    <div className="bg-[#EEEEEE] md:rounded-3xl shadow-2xl w-full h-full md:w-[90%] lg:w-[60%] md:h-[85vh] flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-300">
                        
                        {/* Header Chat */}
                        <div className="bg-[#ff6000] text-white p-5 flex justify-between items-center shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#ff6000]">
                                    <IoChatboxEllipsesOutline size={24} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg font-poppins leading-none">Asisten SMKN 8 Jember</h2>
                                    <span className="text-xs opacity-80">Online | Siap Membantu</span>
                                </div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors text-3xl">&times;</button>
                        </div>

                        {/* Chat Messages Area */}
                        <div 
                            ref={chatContainerRef}
                            onScroll={handleScroll}
                            className="flex-1 p-6 overflow-y-auto space-y-4 scroll-smooth bg-gray-50"
                        >
                            {chatHistory.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full opacity-80 py-10">
                                    <img src="/assets/images/bot.png" alt="Bot" className='w-48 mb-6 drop-shadow-md'/>
                                    <h1 className='font-black font-poppins text-2xl md:text-3xl text-center text-gray-800 px-6'>Yuk Cari Tahu Tentang Sekolah Kami!</h1>
                                    <p className="text-gray-600 mt-2 font-medium text-center">Pilih pertanyaan di bawah untuk memulai.</p>
                                </div>
                            )}

                            {chatHistory.map((item, index) => (
                                <div key={index} className="flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-300">
                                    {/* Question */}
                                    <div className="flex justify-end">
                                        <div className="bg-[#ff6000] text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md max-w-[85%] md:max-w-[70%] font-medium">
                                            {item.q}
                                        </div>
                                    </div>
                                    {/* Answer */}
                                    {item.a && (
                                        <div className="flex justify-start">
                                            <div className="bg-white text-gray-800 px-5 py-3 rounded-2xl rounded-tl-none shadow-md max-w-[85%] md:max-w-[70%] border-l-4 border-[#ff6000]">
                                                {item.a}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start animate-pulse">
                                    <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                        <span className="w-2 h-2 bg-[#ff6000] rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-[#ff6000] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-2 h-2 bg-[#ff6000] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Floating Scroll Down */}
                        {showFab && (
                            <button 
                                onClick={scrollToBottom} 
                                className="absolute bottom-32 right-8 bg-[#ff6000] text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform z-10"
                            >
                                <FaArrowDown />
                            </button>
                        )}

                        {/* Questions Suggestions Area */}
                        <div className="p-4 bg-white border-t flex flex-nowrap overflow-x-auto gap-3 no-scrollbar scrollbar-hide">
                            {questions.map((item, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleQuestionClick(item)} 
                                    className="shrink-0 bg-gray-50 hover:bg-orange-50 hover:border-[#ff6000] text-gray-700 border border-gray-200 text-sm px-4 py-2.5 rounded-full transition-all duration-200 active:scale-95"
                                >
                                    {item.q}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroSection;