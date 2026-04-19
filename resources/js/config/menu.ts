import { dashboard } from '@/routes';
import articles from '@/routes/articles';
import {
    LayoutGrid,
    FileText,
    Megaphone,
    Image,
    Users,
    GraduationCap,
    Settings,
    Activity,
    BookOpen,
    Building2,
    Network,
    UserCog
} from 'lucide-react';

export const mainNavItems = [
    {
        group: "Ringkasan",
        items: [
            { title: "Dashboard", href: dashboard(), icon: LayoutGrid },
        ],
    },
    {
        group: "Informasi Publik",
        items: [
            { title: "Artikel", href: articles.index(), icon: FileText },
            { title: "Artikel User", href: "/user-articles", icon: FileText },
            { title: "Pengumuman", href: "/announcements", icon: Megaphone },
            { title: "Gambar", href: "/gallery", icon: Image },
        ],
    },
    {
        group: "Manajemen Personel",
        items: [
            { title: "Data Guru", href: "/teachers", icon: Users },
            { title: "Data Karyawan", href: "/staff", icon: UserCog },
            { title: "Data Siswa Setting", href: "/student-settings", icon: Users },
            { title: "User Jurusan", href: "/department-users", icon: GraduationCap },
        ],
    },
    {
        group: "Akademik & Sarpras",
        items: [
            { title: "Mapel", href: "/subjects", icon: BookOpen },
            { title: "Jurusan", href: "/departments", icon: GraduationCap },
            { title: "Data Fasilitas", href: "/facilities", icon: Building2 }, 
        ],
    },
    {
        group: "Organisasi & Ekstra",
        items: [
            { title: "Struktur Organisasi", href: "/organization", icon: Network },
            { title: "Ekstrakurikuler", href: "/extracurricular", icon: Activity },
        ],
    },
    {
        group: "Sistem",
        items: [
            { title: "Home Setting", href: "/settings/home", icon: Settings },
        ],
    },
];

export const footerNavItems = [
    // { title: "Settings", href: "/settings", icon: Settings },
];