import * as React from "react"
import { ImageMeta } from "@components/meta/image-meta"
import { useSiteMetadata } from "@hooks/use-site-metadata"
import { resolve } from "@utils/url-resolver"

export const IndexMeta = ({
    canonical,
    settings: ghostSettings,
}: {
    canonical: string | URL | undefined
    settings?: Queries.IndexQuery["ghostSettings"]
}) => {
    const siteConfig = useSiteMetadata()

    const jsonLd = {
        "@context": "https://schema.org/",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": siteConfig?.siteUrl,
        },
        "@type": "Website",
        "description":
            ghostSettings?.meta_description ??
            ghostSettings?.og_description ??
            ghostSettings?.twitter_description ??
            ghostSettings?.description,
        "url": canonical,
        "publisher": {
            "@type": "Organization",
            "name":
                ghostSettings?.meta_title ??
                ghostSettings?.og_title ??
                ghostSettings?.twitter_title ??
                ghostSettings?.title,
            "logo": {
                "@type": "ImageObject",
                "url": resolve(siteConfig?.siteUrl, "favicon-32x32.png"),
                "width": 60,
                "height": 60,
            },
        },
        "image": ghostSettings?.cover_image
            ? {
                  "@type": "ImageObject",
                  "url": ghostSettings?.cover_image,
                  "width": siteConfig?.shareImage?.width,
                  "height": siteConfig?.shareImage?.height,
              }
            : undefined,
    }

    return (
        <>
            <html lang={ghostSettings?.lang || "en"} />
            <title>{ghostSettings?.title}</title>
            <meta
                name="description"
                content={`${ghostSettings?.description}`}
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
                content="website"
            />
            <meta
                property="og:title"
                content={`${ghostSettings?.og_title ?? ghostSettings?.title}`}
            />
            <meta
                property="og:description"
                content={`${ghostSettings?.og_description ?? ghostSettings?.description}`}
            />
            <meta
                property="og:url"
                content={`${canonical}`}
            />
            <meta
                name="twitter:title"
                content={`${ghostSettings?.twitter_title ?? ghostSettings?.title}`}
            />
            <meta
                name="twitter:description"
                content={`${ghostSettings?.twitter_description ?? ghostSettings?.description}`}
            />
            <meta
                name="twitter:url"
                content={`${canonical}`}
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
            <script type="application/ld+json">
                {JSON.stringify(
                    jsonLd,
                    (_, value) => (value ? value : undefined),
                    4,
                )}
            </script>
            <ImageMeta imgSrc={ghostSettings?.cover_image} />
        </>
    )
}
