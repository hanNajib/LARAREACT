import React, { useEffect, useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
    ChevronLeft, 
    Save, 
    FileText, 
    Loader2,
    AlertCircle,
    Image as ImageIcon,
    Sparkles,
    Clock3,
    Eye,
    ImagePlus,
    CheckCircle2
} from "lucide-react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { __ } from "@/lib/helpers";
import articles from "@/routes/articles";

const articleSchema = z.object({
    title: z.string().min(1, __("Judul wajib diisi")).max(255),
    content: z.string().min(1, __("Konten tidak boleh kosong")).refine(val => val !== '<p><br></p>', __("Konten tidak boleh kosong")),
    image: z
        .any()
        .refine((file) => file instanceof File, __("Gambar wajib diunggah"))
        .refine((file) => file?.size <= 2 * 1024 * 1024, __("Maksimal ukuran 2MB"))
        .refine(
            (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file?.type),
            __("Format harus PNG, JPG, atau JPEG")
        ),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image', 'video'],
        ['clean'] 
    ],
};

export default function ArticleCreate() {
    const [preview, setPreview] = useState<string | null>(null);
    const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ArticleFormValues>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: "",
            content: "",
        }
    });

    const contentValue = watch("content");
    const titleValue = watch("title");

    const contentText = useMemo(() => {
        const stripped = (contentValue || "")
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        return stripped;
    }, [contentValue]);

    const readingTime = useMemo(() => {
        const words = contentText ? contentText.split(" ").length : 0;
        return Math.max(1, Math.ceil(words / 200));
    }, [contentText]);

    useEffect(() => {
        return () => {
            if (previewObjectUrl) {
                URL.revokeObjectURL(previewObjectUrl);
            }
        };
    }, [previewObjectUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (previewObjectUrl) {
                URL.revokeObjectURL(previewObjectUrl);
            }

            const objectUrl = URL.createObjectURL(file);
            setValue("image", file, { shouldValidate: true });
            setPreview(objectUrl);
            setPreviewObjectUrl(objectUrl);
        }
    };

    const onSubmit = (data: ArticleFormValues, status: 'published' | 'draft') => {
        router.post(articles.store().url, { ...data, status }, {
            forceFormData: true,
        });
    };

    return (
        <div className="mx-auto w-full max-w-7xl p-4 md:p-8">
            <Head title={__("Tambah Artikel")} />

            <div className="sticky top-3 z-40 mb-6 rounded-2xl border bg-card/95 p-4 shadow-sm backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.history.back()}
                            className="rounded-full"
                        >
                            <ChevronLeft className="size-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">
                                {__("Tulis Artikel")}
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                {__("Susun konten yang rapi, jelas, dan siap diterbitkan")}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            disabled={isSubmitting}
                            onClick={handleSubmit((d) => onSubmit(d, "draft"))}
                        >
                            <FileText className="mr-2 size-4" />
                            {__("Simpan Draft")}
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            onClick={handleSubmit((d) => onSubmit(d, "published"))}
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 size-4" />
                            )}
                            {__("Publikasikan")}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-8">
                    <Card className="gap-0 py-0">
                        <CardHeader className="border-b py-5">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Sparkles className="size-4 text-primary" />
                                {__("Detail Artikel")}
                            </CardTitle>
                            <CardDescription>
                                {__("Isi judul yang kuat dan konten yang informatif")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 py-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">{__("Judul Artikel")}</Label>
                                <Input
                                    id="title"
                                    {...register("title")}
                                    placeholder={__("Ketik judul artikel di sini...")}
                                    className="h-12 text-lg font-semibold"
                                />
                                {errors.title && (
                                    <p className="flex items-center gap-2 text-sm text-red-500">
                                        <AlertCircle className="size-4" />
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>{__("Isi Artikel")}</Label>
                                <div
                                    className={`overflow-hidden rounded-xl border ${
                                        errors.content ? "border-red-300" : "border-border"
                                    }`}
                                >
                                    <ReactQuill
                                        theme="snow"
                                        value={contentValue}
                                        onChange={(content) =>
                                            setValue("content", content, {
                                                shouldValidate: true,
                                            })
                                        }
                                        modules={quillModules}
                                        placeholder={__("Tulis isi artikel yang menarik di sini...")}
                                        className="bg-card [&_.ql-container]:border-none [&_.ql-editor]:min-h-100 [&_.ql-editor]:text-base [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:bg-muted/50"
                                    />
                                </div>
                                {errors.content && (
                                    <p className="flex items-center gap-2 text-sm text-red-500">
                                        <AlertCircle className="size-4" />
                                        {errors.content.message}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6 lg:col-span-4">
                    <Card className="gap-0 py-0">
                        <CardHeader className="border-b py-5">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ImagePlus className="size-4 text-primary" />
                                {__("Cover Artikel")}
                            </CardTitle>
                            <CardDescription>
                                {__("Upload gambar utama untuk menarik perhatian pembaca")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 py-6">
                            <label
                                className={`group relative flex min-h-75 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition ${
                                    errors.image
                                        ? "border-red-300 bg-red-50"
                                        : "border-border bg-muted/40 hover:bg-muted/70"
                                }`}
                            >
                                {preview ? (
                                    <>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="max-h-125 h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                                                {__("Ganti Gambar")}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-2 px-4 text-center text-muted-foreground">
                                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                                            <ImageIcon className="size-6" />
                                        </div>
                                        <p className="font-medium text-foreground">
                                            {__("Klik untuk unggah gambar cover")}
                                        </p>
                                        <p className="text-xs">
                                            {__("PNG, JPG, JPEG (Maks. 2MB)")}
                                        </p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </label>

                            {errors.image && (
                                <p className="flex items-center gap-2 text-sm text-red-500">
                                    <AlertCircle className="size-4" />
                                    {errors.image.message as string}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="gap-0 py-0">
                        <CardHeader className="border-b py-5">
                            <CardTitle className="text-base">{__("Ringkasan")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 py-6 text-sm">
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <Eye className="size-4" />
                                    {__("Judul")}
                                </span>
                                <span className="max-w-40 truncate text-foreground">
                                    {titleValue || __("Belum diisi")}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <Clock3 className="size-4" />
                                    {__("Estimasi baca")}
                                </span>
                                <span className="text-foreground">{readingTime} {__("menit")}</span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <CheckCircle2 className="size-4" />
                                    {__("Status")}
                                </span>
                                <span className="text-foreground">
                                    {isSubmitting ? __("Menyimpan...") : __("Siap")}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
                <Button
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={handleSubmit((d) => onSubmit(d, "draft"))}
                >
                    <FileText className="mr-2 size-4" />
                    {__("Simpan Draft")}
                </Button>
                <Button
                    disabled={isSubmitting}
                    onClick={handleSubmit((d) => onSubmit(d, "published"))}
                >
                    {isSubmitting ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 size-4" />
                    )}
                    {__("Publikasikan")}
                </Button>
            </div>
        </div>
    );
}

ArticleCreate.layout = {
    breadcrumbs: [
        {
            title: __("Artikel"),
            href: articles.index().url,
        },
        {
            title: __("Tambah Artikel"),
            href: articles.create().url,
        }
    ]
}