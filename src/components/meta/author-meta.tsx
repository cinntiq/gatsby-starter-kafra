import { ImageMeta } from "@components/meta/image-meta"
import { useGhostSettings } from "@hooks/use-ghost-settings"
import { useSiteMetadata } from "@hooks/use-site-metadata"
import { getAuthorSameAs } from "@utils/author-same-as"
import * as React from "react"

export const AuthorMeta = ({
    author: ghostAuthor,
    canonical,
}: {
    author: Queries.AuthorQuery["ghostAuthor"]
    canonical: string | URL | undefined
}) => {
    const siteConfig = useSiteMetadata()
    const ghostSettings = useGhostSettings()

    const jsonLd = {
        "@context": "https://schema.org/",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": siteConfig?.siteUrl,
        },
        "@type": "Person",
        "name": ghostAuthor?.meta_title ?? ghostAuthor?.name,
        "description": ghostAuthor?.meta_description ?? ghostAuthor?.bio,
        "url": canonical,
        "image":
            (ghostAuthor?.profile_image ?? ghostSettings?.cover_image)
                ? {
                      "@type": "ImageObject",
                      "url":
                          ghostAuthor?.profile_image ??
                          ghostSettings?.cover_image,
                      "width": siteConfig?.shareImage?.width,
                      "height": siteConfig?.shareImage?.height,
                  }
                : undefined,
        "sameAs": getAuthorSameAs(ghostAuthor),
    }

    return (
        <>
            <html lang={ghostSettings?.lang || "en"} />
            <title>{`${ghostAuthor?.name} | ${ghostSettings?.title}`}</title>
            <meta
                name="description"
                content={`${ghostAuthor?.bio}`}
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
                content="profile"
            />
            <meta
                property="og:title"
                content={`${ghostAuthor?.name} | ${ghostSettings?.og_title ?? ghostSettings?.title}`}
            />
            <meta
                property="og:description"
                content={`${ghostAuthor?.bio}`}
            />
            <meta
                property="og:url"
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
                    content={`${ghostSettings.twitter_title ?? ghostSettings.title}`}
                />
            )}
            <meta
                name="twitter:title"
                content={`${ghostAuthor?.name} | ${ghostSettings?.twitter_title ?? ghostSettings?.title}`}
            />
            <meta
                name="twitter:description"
                content={`${ghostAuthor?.bio}`}
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
                imgSrc={
                    ghostAuthor?.profile_image ?? ghostSettings?.cover_image
                }
            />
        </>
    )
}
