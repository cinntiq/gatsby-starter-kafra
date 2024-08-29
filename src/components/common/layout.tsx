import * as React from "react"
import { Link } from "gatsby"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Facebook, Home, Info, RssFeed, Twitter } from "@mui/icons-material"
import {
    ColorSchemeToggler,
    Navigation,
    SearchDialog,
    TagCloud,
    ScrollToTopFab,
} from "@components/common"
import { ColorSchemeProvider } from "@contexts/color-scheme-provider"
import { useSiteMetadata } from "@hooks/use-site-metadata"
import { useGhostSettings } from "@hooks/use-ghost-settings"
import * as styles from "@styles/components/common/layout.module.scss"

const Layout = ({
    children,
    isHome,
}: {
    children?: React.ReactNode
    isHome?: boolean
}) => {
    const siteMetadata = useSiteMetadata()
    const ghostSettings = useGhostSettings()

    return (
        <ColorSchemeProvider>
            <div className={styles.viewport}>
                <header className={styles.siteHeader}>
                    <Link
                        className={styles.siteTitle}
                        to="/">
                        {ghostSettings?.title}
                    </Link>
                    <TagCloud />
                    <SearchDialog />
                    <ColorSchemeToggler />
                </header>
                {isHome && (
                    <section className={styles.siteBanner}>
                        {ghostSettings?.description && (
                            <p className={styles.siteDescription}>
                                {ghostSettings.description}
                            </p>
                        )}
                        <Navigation items={ghostSettings?.navigation} />
                    </section>
                )}
                <main className={styles.siteMainContainer}>
                    {children}
                    <Analytics />
                    <SpeedInsights />
                </main>
                <footer className={styles.siteFooter}>
                    <span
                        className={
                            styles.siteCopyright
                        }>{`${ghostSettings?.title} \u00a9 ${new Date().getFullYear()}`}</span>
                    <nav className={styles.siteNav}>
                        <Link
                            className={styles.navItem}
                            to="/">
                            <Home />
                        </Link>
                        <Link
                            className={styles.navItem}
                            to="/about">
                            <Info />
                        </Link>
                        {ghostSettings?.facebook && (
                            <a
                                className={styles.navItem}
                                href={`https://www.facebook.com/${ghostSettings.facebook.replace(
                                    "/^//",
                                    "",
                                )}`}
                                rel="noopener noreferrer"
                                target="_blank">
                                <Facebook />
                            </a>
                        )}
                        {ghostSettings?.twitter && (
                            <a
                                className={styles.navItem}
                                href={`https://twitter.com/${ghostSettings.twitter.replace(
                                    "/^@/",
                                    "",
                                )}`}
                                rel="noopener noreferrer"
                                target="_blank">
                                <Twitter />
                            </a>
                        )}
                        {ghostSettings?.url && (
                            <a
                                className={styles.navItem}
                                href={`https://feedly.com/i/subscription/feed/${siteMetadata?.siteUrl || ghostSettings.url}/rss/`}
                                rel="noopener noreferrer"
                                target="_blank">
                                <RssFeed />
                            </a>
                        )}
                    </nav>
                </footer>
            </div>
            <ScrollToTopFab />
        </ColorSchemeProvider>
    )
}

export default Layout
