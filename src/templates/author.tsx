import { Layout, Pagination, PostCard } from "@components/common"
import { AuthorMeta } from "@components/meta/author-meta"
import { Facebook, Language as Website, Twitter } from "@mui/icons-material"
import * as styles from "@styles/templates/author.module.scss"
import { graphql, PageProps } from "gatsby"
import * as React from "react"

export const authorQuery = graphql`
    query Author($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }

        allGhostPost(
            sort: { published_at: DESC }
            filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`

const Author = ({
    data: authorQuery,
    pageContext,
}: PageProps<
    Queries.AuthorQuery,
    {
        readonly pageNumber: number
        readonly numberOfPages: number
        readonly pathPrefix: string
    }
>) => {
    return (
        <Layout>
            <header className={styles.authorHeader}>
                <h1 className={styles.authorName}>
                    {`@${authorQuery.ghostAuthor?.name}`}
                </h1>
                <nav className={styles.authorNav}>
                    {authorQuery.ghostAuthor?.website && (
                        <a
                            className={styles.navItem}
                            href={authorQuery.ghostAuthor.website}
                            rel="noopener noreferrer"
                            target="_blank">
                            <Website />
                        </a>
                    )}
                    {authorQuery.ghostAuthor?.facebook && (
                        <a
                            className={styles.navItem}
                            href={`https://www.facebook.com/${authorQuery.ghostAuthor.facebook.replace(
                                /^\//,
                                "",
                            )}`}
                            rel="noopener noreferrer"
                            target="_blank">
                            <Facebook />
                        </a>
                    )}
                    {authorQuery.ghostAuthor?.twitter && (
                        <a
                            className={styles.navItem}
                            href={`https://twitter.com/${authorQuery.ghostAuthor.twitter.replace(
                                /^@/,
                                "",
                            )}`}
                            rel="noopener noreferrer"
                            target="_blank">
                            <Twitter />
                        </a>
                    )}
                </nav>
            </header>
            {authorQuery.ghostAuthor?.bio && (
                <p className={styles.authorBio}>
                    {authorQuery.ghostAuthor.bio}
                </p>
            )}
            <section className={styles.postFeed}>
                {Array.from(authorQuery.allGhostPost.edges).map(({ node }) => (
                    <PostCard
                        key={node.id}
                        post={node}
                    />
                ))}
            </section>
            <Pagination pageContext={pageContext} />
        </Layout>
    )
}

export const Head = ({
    data,
    location,
}: PageProps<Queries.AuthorQuery, object, Location>) => (
    <AuthorMeta
        author={data.ghostAuthor}
        canonical={location.pathname}
    />
)

export default Author
