import { useSiteMetadata } from "@hooks/use-site-metadata"
import * as React from "react"

export const ImageMeta = ({
    imgSrc,
}: {
    imgSrc: string | null | undefined
}) => {
    const siteConfig = useSiteMetadata()

    if (!imgSrc) {
        return null
    }

    return (
        <>
            <meta
                property="og:image"
                content={imgSrc}
            />
            <meta
                property="og:image:width"
                content={siteConfig?.shareImage?.width?.toString()}
            />
            <meta
                property="og:image:height"
                content={siteConfig?.shareImage?.height?.toString()}
            />
            <meta
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                name="twitter:image"
                content={imgSrc}
            />
        </>
    )
}
