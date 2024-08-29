import { graphql, useStaticQuery } from "gatsby"

// Custom hook to fetch Fuse.js search index data
export const useFusejs = () => {
    const { fusejs }: Queries.UseFusejsQuery = useStaticQuery(graphql`
        query UseFusejs {
            fusejs {
                ...FusejsFields
            }
        }
    `)

    // Return the fetched Fuse.js data
    return fusejs
}
