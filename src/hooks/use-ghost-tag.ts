import { graphql, useStaticQuery } from "gatsby"

// Custom hook to fetch all Ghost tags for creating a tag cloud
export const useGhostTag = () => {
    const { allGhostTag }: Queries.UseGhostTagQuery = useStaticQuery(graphql`
        query UseGhostTag {
            allGhostTag {
                nodes {
                    ...GhostTagFields
                }
            }
        }
    `)

    // Return the array of tag nodes, or an empty array if no tags are found
    return allGhostTag?.nodes ?? []
}
