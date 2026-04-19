import { Search, Plus, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { __ } from "@/lib/helpers";
import { Link } from "@inertiajs/react";

interface FilterAdminProps {
    titleHalaman: string;
    descHalaman: string;
    search: string;
    setSearch: (val: string) => void;
    linkTambah: string;
    titleBTN: string;
    hasSoftDelete?: boolean;
    softDeleteFilter?: string;
    setSoftDeleteFilter?: (value: string) => void;
}

export default function FilterAdmin({
    titleHalaman,
    descHalaman,
    search,
    setSearch,
    linkTambah,
    titleBTN
}: FilterAdminProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{titleHalaman}</h1>
                <p className="text-muted-foreground">{descHalaman}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={__("Search...")}
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href={linkTambah}>
                        <Plus className="mr-2 h-4 w-4" /> {titleBTN}
                    </Link>
                </Button>
            </div>
        </div>
    );
}