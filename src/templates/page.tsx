import { Layout } from "@components/common"
import { PageMeta } from "@components/meta/page-meta"
import * as styles from "@styles/templates/page.module.scss"
import { graphql, PageProps } from "gatsby"
import * as React from "react"

export const pageQuery = graphql`
    query Page($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`

const Page = ({ data: pageQuery }: PageProps<Queries.PageQuery>) => (
    <Layout>
        <article className={styles.articlePage}>
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    {pageQuery.ghostPage?.title}
                </h1>
            </header>
            <section
                className={`${styles.ghostContent} load-external-scripts`}
                dangerouslySetInnerHTML={{
                    __html: pageQuery.ghostPage!.html!,
                }}
            />
        </article>
    </Layout>
)

export const Head = ({
    data,
    location,
}: PageProps<Queries.PageQuery, object, Location>) => (
    <PageMeta
        page={data.ghostPage}
        canonical={location.pathname}
    />
)

export default Page
