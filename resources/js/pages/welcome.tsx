import { NavMain } from "@/components/nav-main"; 
import HeroSection  from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import AnnouncementSection from "@/components/sections/announcement-section";
import ArticlesSection from "@/components/sections/articles-section";
import GallerySection from "@/components/sections/gallery-section";
import Footer from "@/components/nav-footer";
import { Head } from "@inertiajs/react";

export default function Welcome() {
    console.log("Halaman Welcome di-render"); 
    
    return (
        <>
    
            <Head title="Selamat Datang - SMKN 8 Jember" />

            <NavMain />

            <main>

                <HeroSection />  
                <AboutSection />
                <AnnouncementSection />
                <ArticlesSection />
                <GallerySection />
                <Footer />

            </main>
        </>
    );
}