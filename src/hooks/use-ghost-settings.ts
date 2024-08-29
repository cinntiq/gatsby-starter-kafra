import { graphql, useStaticQuery } from "gatsby"

// Custom hook to fetch Ghost CMS settings
export const useGhostSettings = () => {
    const { ghostSettings }: Queries.UseGhostSettingsQuery = useStaticQuery(
        graphql`
            query UseGhostSettings {
                ghostSettings {
                    ...GhostSettingsFields
                }
            }
        `,
    )

    // Return the fetched Ghost settings
    return ghostSettings
}
