import { useStaticQuery, graphql } from "gatsby"

// Custom hook to fetch related posts based on current post's slug and primary tag
export const useRelatedPosts = (
    currentSlug?: string,
    currentPrimaryTag?: string,
) => {
    const { allGhostPost } = useStaticQuery<{
        allGhostPost: {
            edges: Array<Queries.GhostPostEdge>
        }
    }>(graphql`
        query {
            allGhostPost(sort: { published_at: DESC }) {
                edges {
                    node {
                        ...GhostPostFields
                    }
                }
            }
        }
    `)

    // If current post's slug or primary tag is not provided, return null for both prev and next posts
    if (!currentSlug || !currentPrimaryTag)
        return { prevPost: null, nextPost: null }

    // Filter posts by primary tag and map to array of nodes
    const posts = allGhostPost.edges
        .map(({ node }) => node)
        .filter((post) => post.primary_tag?.slug === currentPrimaryTag)

    // Find the index of the current post in the filtered array
    const currentIndex = posts.findIndex((post) => post.slug === currentSlug)

    // If current post is not found in the filtered array, return null for both prev and next posts
    // Otherwise, return the previous and next posts based on the current index
    return currentIndex === -1
        ? { prevPost: null, nextPost: null }
        : {
              prevPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
              nextPost:
                  currentIndex < posts.length - 1
                      ? posts[currentIndex + 1]
                      : null,
          }
}
