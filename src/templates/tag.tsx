import { Layout, PostCard, Pagination } from "@components/common"
import { TagMeta } from "@components/meta/tag-meta"
import * as styles from "@styles/templates/tag.module.scss"
import { graphql, PageProps } from "gatsby"
import * as React from "react"

export const tagQuery = graphql`
    query Tag($slug: String!, $limit: Int!, $skip: Int!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }

        allGhostPost(
            sort: { published_at: DESC }
            filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
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

const Tag = ({
    data: tagQuery,
    pageContext,
}: PageProps<
    Queries.TagQuery,
    {
        readonly pageNumber: number
        readonly numberOfPages: number
        readonly pathPrefix: string
    }
>) => (
    <Layout>
        <header className={styles.tagHeader}>
            <h1 className={styles.tagName}>{`#${tagQuery.ghostTag?.name}`}</h1>
        </header>
        {tagQuery.ghostTag?.description && (
            <p className={styles.tagDescription}>
                {tagQuery.ghostTag.description}
            </p>
        )}
        <section className={styles.postFeed}>
            {Array.from(tagQuery.allGhostPost.edges).map(({ node }) => (
                <PostCard
                    key={node.id}
                    post={node}
                />
            ))}
        </section>
        <Pagination pageContext={pageContext} />
    </Layout>
)

export const Head = ({
    data,
    location,
}: PageProps<Queries.TagQuery, object, Location>) => (
    <TagMeta
        tag={data.ghostTag}
        canonical={location.pathname}
    />
)

export default Tag
