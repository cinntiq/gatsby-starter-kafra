import { Layout, Pagination, PostCard } from "@components/common"
import { IndexMeta } from "@components/meta/index-meta"
import * as styles from "@styles/templates/index.module.scss"
import { graphql, PageProps } from "gatsby"
import * as React from "react"

export const indexQuery = graphql`
    query Index($limit: Int!, $skip: Int!) {
        ghostSettings {
            ...GhostSettingsFields
        }

        allGhostPost(sort: { published_at: DESC }, limit: $limit, skip: $skip) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`

const Index = ({
    data: indexQuery,
    pageContext,
}: PageProps<
    Queries.IndexQuery,
    {
        readonly pageNumber: number
        readonly numberOfPages: number
        readonly pathPrefix: string
    }
>) => (
    <Layout isHome={true}>
        <section className={styles.postFeed}>
            {Array.from(indexQuery.allGhostPost.edges).map(({ node }) => (
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
}: PageProps<Queries.IndexQuery, object, Location>) => (
    <IndexMeta
        settings={data.ghostSettings}
        canonical={location.pathname}
    />
)

export default Index
