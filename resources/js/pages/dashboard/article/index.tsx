import articles from "@/routes/articles";
import { Auth } from "@/types";
import { Head, usePage } from "@inertiajs/react";

export default function ArticleIndex() {
    const { auth } = usePage<{auth: Auth}>().props;
        const user = auth.user;
    return (
        <>
            <Head title="Artikel"/>
        </>
    )
}

ArticleIndex.layout = {
    breadcrumbs: [
        {
            title: "Artikel",
            href: articles.index()
        }
    ]
}