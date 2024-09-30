import * as styles from "@styles/pages/404.module.scss"
import { graphql, Link, PageProps } from "gatsby"
import * as React from "react"

const title = "404: Not Found"
const description = "You just hit a route that does not exist…"

export const routeNotFoundedQuery = graphql`
    query RouteNotFounded {
        ghostSettings {
            ...GhostSettingsFields
        }
    }
`

export const RouteNotFounded = ({
    data: { ghostSettings },
}: PageProps<Queries.RouteNotFoundedQuery>) => (
    <>
        <main className={styles.siteMainContainer}>
            <h1 className={styles.pageNotRoutedTitle}>{title}</h1>
            <p className={styles.pageNotRoutedDescription}>{description}</p>
            <Link
                className={styles.goToHome}
                to="/">
                {ghostSettings?.title}
            </Link>
        </main>
    </>
)

export const Head = () => (
    <>
        <title>{title}</title>
        <meta
            name="description"
            content={description}
        />
        <meta
            property="og:title"
            content={title}
        />
        <meta
            property="og:description"
            content={description}
        />
        <meta
            property="og:type"
            content="website"
        />
        <meta
            name="twitter:title"
            content={title}
        />
        <meta
            name="twitter:description"
            content={description}
        />
        <meta
            name="twitter:card"
            content="summary"
        />
    </>
)

export default RouteNotFounded
