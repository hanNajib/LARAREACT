import articles from "@/routes/articles";
import { Auth } from "@/types";
import { Head, usePage, router } from "@inertiajs/react";
import React, { useState } from "react";
import {
    SquarePen,
    Plus,
    Trash2,
    RotateCcw,
    Image as ImageIcon,
    Search,
    RefreshCw
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { __ } from "@/lib/helpers";

// Custom Components
import FilterAdmin from "@/components/filter-admin";
import PaginationAdmin from "@/components/pagination-admin";
import ImageModal from "@/components/image-modal";

interface ArticleProps {
    data: any[];
    meta: any;
}

export default function ArticleIndex({ data: initialArticles = [], meta = {} }: ArticleProps) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [softDeleteFilter, setSoftDeleteFilter] = useState("active");

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? initialArticles.map((a) => a.id) : []);
    };

    const handleSelectRow = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-6 p-4 md:p-8">
            <Head title={__("Articles")} />

            <div className="bg-card text-card-foreground rounded-xl shadow-sm border p-6">
                <FilterAdmin
                    titleHalaman={__("Articles Data")}
                    descHalaman={__("Manage your articles content here")}
                    search={search}
                    setSearch={setSearch}
                    linkTambah={articles.create ? articles.create().url : "#"}
                    titleBTN={__("Add Article")}
                    softDeleteFilter={softDeleteFilter}
                    setSoftDeleteFilter={setSoftDeleteFilter}
                />

                {selectedIds.length > 0 && (
                    <div className="flex items-center justify-between bg-primary/10 border border-primary/30 p-4 rounded-lg my-4">
                            <span className="text-sm font-medium text-primary">
                            {selectedIds.length} {__("items selected")}
                        </span>
                        <div className="flex gap-2">
                            <Button variant="destructive" size="sm" className="gap-2">
                                <Trash2 className="size-4" /> {__("Bulk Delete")}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setSelectedIds([])}>
                                {__("Cancel")}
                            </Button>
                        </div>
                    </div>
                )}

                <div className="rounded-md border mt-6 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-12.5">
                                    <Checkbox
                                        checked={selectedIds.length === initialArticles.length && initialArticles.length > 0}
                                        onCheckedChange={(checked) => handleSelectAll(!!checked)}
                                    />
                                </TableHead>
                                <TableHead>{__("No")}</TableHead>
                                <TableHead className="min-w-62.5">{__("Title")}</TableHead>
                                <TableHead>{__("Category")}</TableHead>
                                <TableHead>{__("Date")}</TableHead>
                                <TableHead>{__("Image")}</TableHead>
                                <TableHead>{__("Status")}</TableHead>
                                <TableHead className="text-center">{__("Actions")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialArticles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                        {__("No articles found.")}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                initialArticles.map((article, index) => (
                                    <TableRow key={article.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedIds.includes(article.id)}
                                                onCheckedChange={() => handleSelectRow(article.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-medium">{article.title}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {article.categories?.map((cat: any) => (
                                                    <Badge key={cat.id} variant="secondary" className="bg-primary/10 text-primary">
                                                        {cat.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>{new Date(article.created_at).toLocaleDateString('id-ID')}</TableCell>
                                        <TableCell>
                                            {article.image ? (
                                                <Button variant="ghost" size="sm" className="h-8 gap-2" onClick={() => setSelectedImage(article.image)}>
                                                    <ImageIcon className="size-4 text-primary" /> {__("View")}
                                                </Button>
                                            ) : "-"}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={article.status === 'published' ? 'default' : 'outline'}>
                                                {article.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-center gap-2">
                                                <Button size="icon" variant="outline" className="size-8 text-primary">
                                                    <SquarePen className="size-4" />
                                                </Button>
                                                <Button size="icon" variant="outline" className="size-8 text-destructive">
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-6">
                    <PaginationAdmin
                        currentPage={meta.current_page || 1}
                        totalPages={meta.last_page || 1}
                        onPageChange={(page) =>
                            router.get(articles.index().url, { page }, { preserveState: true, preserveScroll: true })
                        }
                    />
                </div>
            </div>

            <ImageModal
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
}

ArticleIndex.layout = {
    breadcrumbs: [
        {
            title: __("Articles"),
            href: articles.index().url
        },
    ]
}