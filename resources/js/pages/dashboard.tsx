import { Head, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, TrendingUp } from 'lucide-react';
import { Auth } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const user = auth.user;
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-4xl font-poppins text-gray-900">
                        Selamat Datang {user?.username || "User"}, Eskalaber Jaya
                    </h1>
                    <h4 className="text-gray-500 font-medium text-sm md:text-base">
                        Temukan informasi terbaru dan fitur menarik di dashboard kami
                    </h4>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card className="relative overflow-hidden group hover:shadow-md transition-all border-l-4 border-l-orange-500">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Artikel Terbit</p>
                                <h3 className="text-3xl font-bold tracking-tight">1.200</h3>
                            </div>
                            <div className="bg-zinc-100 p-4 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors dark:bg-zinc-800">
                                <FileText className="size-6" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800">
                                    <FileText className="size-4 text-orange-600" />
                                </div>
                                <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold">1.200</span>
                                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 border-none px-1">
                                    ↑ 5%
                                </Badge>
                            </div>
                            <div className="mt-4 h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[70%]" /> {/* Simulasi target artikel */}
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-2">Target bulan ini: 1.500</p>
                        </CardContent>
                    </Card>
                    <Card className="overflow-hidden border-none shadow-sm bg-white dark:bg-zinc-950">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Artikel Terbit
                            </CardTitle>
                            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg dark:bg-orange-900/20 dark:text-orange-400">
                                <FileText className="size-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1.200</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-emerald-500 font-medium">+12%</span> dari bulan lalu
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="h-1 w-full bg-orange-500" />

                        <CardContent className="p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Artikel Terbit
                                    </p>

                                    <p className="text-4xl font-extrabold tracking-tight text-foreground">
                                        1.200
                                    </p>

                                    {/* Sub-text: Sangat Kecil, Deskriptif */}
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                                        <TrendingUp className="size-3.5 text-emerald-500" />
                                        <span><span className="font-medium text-emerald-600">+12%</span> bulan ini</span>
                                    </div>
                                </div>

                                {/* Icon: Besar, Halus, Berwarna Aksen */}
                                <div className="p-3.5 rounded-full bg-orange-50 dark:bg-orange-950/30">
                                    <FileText className="size-7 text-orange-600 dark:text-orange-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
