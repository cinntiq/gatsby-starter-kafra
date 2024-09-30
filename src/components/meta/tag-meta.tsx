import { ImageMeta } from "@components/meta/image-meta"
import { useGhostSettings } from "@hooks/use-ghost-settings"
import { useSiteMetadata } from "@hooks/use-site-metadata"
import { resolve } from "@utils/url-resolver"
import * as React from "react"

export const TagMeta = ({
    canonical,
    tag: ghostTag,
}: {
    canonical: string | URL | undefined
    tag?: Queries.TagQuery["ghostTag"]
}) => {
    const siteConfig = useSiteMetadata()
    const ghostSettings = useGhostSettings()

    const jsonLd = {
        "@context": "https://schema.org/",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": siteConfig?.siteUrl,
        },
        "@type": "Series",
        "description":
            ghostTag?.meta_description ??
            ghostTag?.og_description ??
            ghostTag?.twitter_description ??
            ghostTag?.description,
        "url": canonical,
        "publisher": {
            "@type": "Organization",
            "name":
                ghostTag?.meta_title ??
                ghostTag?.og_title ??
                ghostTag?.twitter_title ??
                ghostTag?.name,
            "logo": {
                "@type": "ImageObject",
                "url": resolve(siteConfig?.siteUrl, "favicon-32x32.png"),
                "width": 60,
                "height": 60,
            },
        },
        "image":
            (ghostTag?.feature_image ?? ghostSettings?.cover_image)
                ? {
                      "@type": "ImageObject",
                      "url":
                          ghostTag?.feature_image ?? ghostSettings?.cover_image,
                      "width": siteConfig?.shareImage?.width,
                      "height": siteConfig?.shareImage?.height,
                  }
                : undefined,
    }

    return (
        <>
            <html lang={ghostSettings?.lang || "en"} />
            <title>{`${ghostTag?.name} | ${ghostSettings?.title}`}</title>
            <meta
                name="description"
                content={`${ghostTag?.description}`}
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
                content={`${ghostTag?.og_title ?? ghostTag?.name} | ${ghostSettings?.og_title ?? ghostSettings?.title}`}
            />
            <meta
                property="og:description"
                content={`${ghostTag?.og_description ?? ghostTag?.description}`}
            />
            <meta
                property="og:url"
                content={`${canonical}`}
            />
            <meta
                name="twitter:title"
                content={`${ghostTag?.twitter_title ?? ghostTag?.name} | ${ghostSettings?.twitter_title ?? ghostSettings?.title}`}
            />
            <meta
                name="twitter:description"
                content={`${ghostTag?.twitter_description ?? ghostTag?.description}`}
            />
            <meta
                name="twitter:url"
                content={`${canonical}`}
            />
            <script type="application/ld+json">
                {JSON.stringify(
                    jsonLd,
                    (_, value) => (value ? value : undefined),
                    4,
                )}
            </script>
            <ImageMeta
                imgSrc={ghostTag?.feature_image ?? ghostSettings?.cover_image}
            />
        </>
    )
}
