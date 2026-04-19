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
    UserCog,
    type LucideIcon
} from 'lucide-react';

interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
}

interface NavGroup {
    group: string;
    items: NavItem[];
}

export const getMainNavItems = (__: (key: string) => string): NavGroup[] => [
    {
        group: __("Summary"), 
        items: [
            { title: __("Dashboard"), href: dashboard().url, icon: LayoutGrid },
        ],
    },
    {
        group: __("Public Information"),
        items: [
            { title: __("Articles"), href: articles.index().url, icon: FileText },
            { title: __("User Articles"), href: "/user-articles", icon: FileText },
            { title: __("Announcements"), href: "/announcements", icon: Megaphone },
            { title: __("Gallery"), href: "/gallery", icon: Image },
        ],
    },
    {
        group: __("Personnel Management"),
        items: [
            { title: __("Teachers"), href: "/teachers", icon: Users },
            { title: __("Staff"), href: "/staff", icon: UserCog },
            { title: __("Students"), href: "/student-settings", icon: Users },
            { title: __("Department Users"), href: "/department-users", icon: GraduationCap },
        ],
    },
    {
        group: __("Academic & Facilities"),
        items: [
            { title: __("Subjects"), href: "/subjects", icon: BookOpen },
            { title: __("Departments"), href: "/departments", icon: GraduationCap },
            { title: __("Facilities"), href: "/facilities", icon: Building2 }, 
        ],
    },
    {
        group: __("Organization & Extra"),
        items: [
            { title: __("Organization Structure"), href: "/organization", icon: Network },
            { title: __("Extracurricular"), href: "/extracurricular", icon: Activity },
        ],
    },
    {
        group: __("System"),
        items: [
            { title: __("Home Setting"), href: "/settings/home", icon: Settings },
        ],
    },
];

export const getFooterNavItems = (__: (key: string) => string): NavItem[] => [
    // { title: __("Settings"), href: "/settings", icon: Settings },
];