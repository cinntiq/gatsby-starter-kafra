import { graphql, useStaticQuery } from "gatsby"

/**
 * Custom hook to fetch and return site metadata
 *
 * This hook uses Gatsby's useStaticQuery to fetch site metadata at build time.
 * It utilizes the SiteMetadataFields fragment for consistent data fetching.
 *
 * @returns {Queries.SiteSiteMetadata | null} The site metadata object or null if not available
 */
export const useSiteMetadata = () => {
    const { site }: Queries.UseSiteMetadataQuery = useStaticQuery(graphql`
        query UseSiteMetadata {
            site {
                siteMetadata {
                    ...SiteMetadataFields
                }
            }
        }
    `)

    // Return the siteMetadata object if it exists, otherwise return null
    return site?.siteMetadata ?? null
}
