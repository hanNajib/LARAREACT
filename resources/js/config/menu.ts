import { 
    LayoutGrid, 
    FileText, 
    Megaphone, 
    Image, 
    Users, 
    GraduationCap, 
    Settings 
} from 'lucide-react';

export const mainNavItems = [
    {
        group: "Platform",
        items: [
            { title: "Dashboard", href: "/dashboard", icon: LayoutGrid },
        ],
    },
    {
        group: "Konten",
        items: [
            { title: "Artikel", href: "/articles", icon: FileText },
            { title: "Pengumuman", href: "/announcements", icon: Megaphone },
            { title: "Gambar", href: "/gallery", icon: Image },
        ],
    },
    {
        group: "Manajemen Data",
        items: [
            { title: "Data Guru", href: "/teachers", icon: Users },
            { title: "Jurusan", href: "/majors", icon: GraduationCap },
        ],
    },
];

export const footerNavItems = [
    { title: "Settings", href: "/settings", icon: Settings },
];