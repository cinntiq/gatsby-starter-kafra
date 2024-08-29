import * as React from "react"
import { ImageMeta } from "@components/meta/image-meta"
import { getAuthorSameAs } from "@utils/author-same-as"
import { useSiteMetadata } from "@hooks/use-site-metadata"
import { useGhostSettings } from "@hooks/use-ghost-settings"
import { resolve } from "@utils/url-resolver"

export const PostMeta = ({
    canonical,
    post: ghostPost,
}: {
    canonical: string | URL | undefined
    post: Queries.PostQuery["ghostPost"]
}) => {
    const siteConfig = useSiteMetadata()
    const ghostSettings = useGhostSettings()

    const publicTags = ghostPost?.tags
        ? Array.from(ghostPost.tags)
              .filter((tag) => tag?.visibility === "public")
              .map((publicTag) => publicTag?.name)
        : undefined

    const jsonLd = {
        "@context": "https://schema.org/",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": siteConfig?.siteUrl,
        },
        "@type": "Article",
        "headline":
            ghostPost?.meta_title ??
            ghostPost?.og_title ??
            ghostPost?.twitter_title ??
            ghostPost?.title,
        "description":
            ghostPost?.custom_excerpt ??
            ghostPost?.meta_description ??
            ghostPost?.og_description ??
            ghostPost?.twitter_description ??
            ghostPost?.excerpt,
        "url": canonical,
        "publisher": {
            "@type": "Organization",
            "name":
                ghostPost?.meta_title ??
                ghostPost?.og_title ??
                ghostPost?.twitter_title ??
                ghostPost?.title,
            "logo": {
                "@type": "ImageObject",
                "url": resolve(siteConfig?.siteUrl, "favicon-32x32.png"),
                "width": 60,
                "height": 60,
            },
        },
        "author": {
            "@type": "Person",
            "name": ghostPost?.primary_author.name,
            "image": ghostPost?.primary_author.profile_image,
            "sameAs": getAuthorSameAs(ghostPost?.primary_author),
        },
        "image":
            (ghostPost?.feature_image ?? ghostSettings?.cover_image)
                ? {
                      "@type": "ImageObject",
                      "url":
                          ghostPost?.feature_image ??
                          ghostSettings?.cover_image,
                      "width": siteConfig?.shareImage?.width,
                      "height": siteConfig?.shareImage?.height,
                  }
                : undefined,
        "datePublished": ghostPost?.published_at,
        "dateModified": ghostPost?.updated_at,
        "keywords": publicTags?.length ? publicTags.join(", ") : undefined,
    }

    return (
        <>
            <html lang={ghostSettings?.lang || "en"} />
            <title>{ghostPost?.title}</title>
            <meta
                name="description"
                content={`${ghostPost?.custom_excerpt ?? ghostPost?.excerpt}`}
            />
            <link
                rel="canonical"
                href={`${canonical}`}
            />
            <meta
                property="og:site_name"
                content={`${ghostSettings?.og_title ?? ghostSettings?.title}`}
            />
            <meta
                property="og:type"
                content="article"
            />
            <meta
                property="og:title"
                content={`${ghostPost?.og_title ?? ghostPost?.title}`}
            />
            <meta
                property="og:description"
                content={`${ghostPost?.og_description ?? ghostPost?.custom_excerpt ?? ghostPost?.excerpt}`}
            />
            <meta
                property="og:url"
                content={`${canonical}`}
            />
            {ghostPost?.primary_author.facebook && (
                <meta
                    property="article:author"
                    content={`https://www.facebook.com/${ghostPost?.primary_author.facebook.replace(/^\//, "")}/`}
                />
            )}
            {publicTags?.map((keyword, index) => (
                <meta
                    key={index}
                    property="article:tag"
                    content={keyword}
                />
            ))}
            <meta
                property="article:published_time"
                content={`${ghostPost?.published_at}`}
            />
            <meta
                property="article:modified_time"
                content={`${ghostPost?.updated_at}`}
            />
            {ghostSettings?.twitter && (
                <meta
                    name="twitter:site"
                    content={`https://twitter.com/${ghostSettings.twitter.replace(/^@/, "")}/`}
                />
            )}
            {ghostSettings?.twitter && (
                <meta
                    name="twitter:creator"
                    content={ghostSettings.twitter}
                />
            )}
            <meta
                name="twitter:title"
                content={`${ghostPost?.twitter_title ?? ghostPost?.title}`}
            />
            <meta
                name="twitter:description"
                content={`${ghostPost?.twitter_description ?? ghostPost?.custom_excerpt ?? ghostPost?.excerpt}`}
            />
            <meta
                name="twitter:url"
                content={`${canonical}`}
            />
            <meta
                name="twitter:label1"
                content="Written by"
            />
            <meta
                name="twitter:data1"
                content={`${ghostPost?.primary_author.name}`}
            />
            {ghostPost?.primary_tag && (
                <meta
                    name="twitter:label2"
                    content="Filed under"
                />
            )}
            {ghostPost?.primary_tag && (
                <meta
                    name="twitter:data2"
                    content={ghostPost.primary_tag.name}
                />
            )}
            <script type="application/ld+json">
                {JSON.stringify(
                    jsonLd,
                    (_, value) => (value ? value : undefined),
                    4,
                )}
            </script>
            <ImageMeta
                imgSrc={ghostPost?.feature_image ?? ghostSettings?.cover_image}
            />
        </>
    )
}
