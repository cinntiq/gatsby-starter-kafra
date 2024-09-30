import { ImageMeta } from "@components/meta/image-meta"
import { useGhostSettings } from "@hooks/use-ghost-settings"
import { useSiteMetadata } from "@hooks/use-site-metadata"
import { resolve } from "@utils/url-resolver"
import * as React from "react"

export const PageMeta = ({
    canonical,
    page: ghostPage,
}: {
    canonical: string | URL | undefined
    page?: Queries.PageQuery["ghostPage"]
}) => {
    const siteConfig = useSiteMetadata()
    const ghostSettings = useGhostSettings()

    const jsonLd = {
        "@context": "https://schema.org/",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": siteConfig?.siteUrl,
        },
        "@type": "Website",
        "description":
            ghostPage?.custom_excerpt ??
            ghostPage?.meta_description ??
            ghostPage?.og_description ??
            ghostPage?.twitter_description ??
            ghostPage?.excerpt,
        "url": canonical,
        "publisher": {
            "@type": "Organization",
            "name":
                ghostPage?.meta_title ??
                ghostPage?.og_title ??
                ghostPage?.twitter_title ??
                ghostPage?.title,
            "logo": {
                "@type": "ImageObject",
                "url": resolve(siteConfig?.siteUrl, "favicon-32x32.png"),
                "width": 60,
                "height": 60,
            },
        },
        "image":
            (ghostPage?.feature_image ?? ghostSettings?.cover_image)
                ? {
                      "@type": "ImageObject",
                      "url":
                          ghostPage?.feature_image ??
                          ghostSettings?.cover_image,
                      "width": siteConfig?.shareImage?.width,
                      "height": siteConfig?.shareImage?.height,
                  }
                : undefined,
    }

    return (
        <>
            <html lang={ghostSettings?.lang || "en"} />
            <title>{ghostPage?.title}</title>
            <meta
                name="description"
                content={`${ghostPage?.custom_excerpt ?? ghostPage?.excerpt}`}
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
                content={`${ghostPage?.og_title ?? ghostPage?.title}`}
            />
            <meta
                property="og:description"
                content={`${ghostPage?.og_description ?? ghostPage?.custom_excerpt ?? ghostPage?.excerpt}`}
            />
            <meta
                property="og:url"
                content={`${canonical}`}
            />
            <meta
                name="twitter:title"
                content={`${ghostPage?.twitter_title ?? ghostPage?.title}`}
            />
            <meta
                name="twitter:description"
                content={`${ghostPage?.twitter_description ?? ghostPage?.custom_excerpt ?? ghostPage?.excerpt}`}
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
                imgSrc={ghostPage?.feature_image ?? ghostSettings?.cover_image}
            />
        </>
    )
}
