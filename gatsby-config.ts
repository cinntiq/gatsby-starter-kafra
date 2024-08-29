import type { GatsbyConfig, IPluginRefOptions } from "gatsby"
import dotenv from "dotenv"
import path from "path"
import appConfig from "./app-config.json"

// Load environment variables based on the current Node environment
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
})

/**
 * Ghost CMS configuration
 * Sets up the connection to the Ghost CMS API
 */
const ghostConfig: NonNullable<IPluginRefOptions> & {
    apiUrl: string
    contentApiKey: string
} = {
    apiUrl: process.env.GHOST_API_URL || "https://gatsby.ghost.io",
    contentApiKey:
        process.env.GHOST_CONTENT_API_KEY || "9cc5c67c358edfdd81455149d0",
}

/**
 * Site metadata configuration
 * Defines global site properties and manifest settings
 */
const siteMetadata: NonNullable<GatsbyConfig["siteMetadata"]> & {
    siteUrl: string
    postsPerPage: number
    manifest: {
        name: string
        short_name: string
        start_url: string
        display: string
        theme_color: string
        background_color: string
        icon: string
    }
    shareImage: {
        width: number
        height: number
    }
    utterances?: {
        repo: string
    }
} = {
    siteUrl: process.env.SITE_URL || "http://localhost:8000",
    manifest: {
        name: process.env.APP_NAME || "Gatsby Starter Kafra",
        short_name: process.env.APP_SHORT_NAME || "Kafra",
        icon: "src/images/icon-512x512.png",
        start_url: "/",
        display: "standalone",
        theme_color: "#f1f2f6",
        background_color: "#f1f2f6",
    },
    postsPerPage: appConfig.postsPerPage,
    shareImage: appConfig.shareImage,
    utterances: {
        repo: process.env.UTTERANCES_REPO || "",
    },
}

/**
 * Main Gatsby configuration object
 * Defines all the Gatsby-specific settings and plugins
 */
const config: GatsbyConfig = {
    graphqlTypegen: true,
    siteMetadata: siteMetadata,
    trailingSlash: "always",
    plugins: [
        // Essential Gatsby plugins
        "gatsby-plugin-catch-links",
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sass",

        // SEO and site optimization plugins
        {
            resolve: "gatsby-plugin-manifest",
            options: siteMetadata.manifest,
        },
        "gatsby-plugin-offline",
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                host: siteMetadata.siteUrl,
                sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
            },
        },
        "gatsby-plugin-sitemap",

        // Content source plugins
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: path.join(__dirname, "src", "images"),
                name: "images",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: path.join(__dirname, "src", "pages"),
                name: "pages",
            },
        },
        {
            resolve: "gatsby-source-ghost",
            options: ghostConfig,
        },

        // RSS feed generation plugin
        {
            resolve: "gatsby-plugin-feed",
            options: {
                feeds: [
                    {
                        title: "RSS Feed",
                        serialize: ({ query: { allGhostPost } }: any) =>
                            allGhostPost.edges.map(({ node }: any) => ({
                                title: node?.title,
                                description:
                                    node?.custom_excerpt ?? node?.excerpt,
                                guid: node?.id,
                                url: `${siteMetadata.siteUrl}/${node?.slug}/`,
                                author: node?.primary_author.name,
                                date: node?.published_at,
                                categories: node?.tags
                                    .filter(
                                        (tag: any) =>
                                            tag?.visibility === "public",
                                    )
                                    .map((publicTag: any) => publicTag?.name),
                                custom_elements: [
                                    {
                                        "content:encoded": {
                                            _cdata: node?.html,
                                        },
                                    },
                                ],
                            })),
                        setup: ({ query: { ghostSettings } }: any) => ({
                            title: ghostSettings?.title,
                            description: ghostSettings?.description,
                            generator: "Ghost 5.0",
                            feed_url: `${siteMetadata.siteUrl}/rss/`,
                            site_url: `${siteMetadata.siteUrl}/`,
                            image_url: `${siteMetadata.siteUrl}/icons/icon-48x48.png`,
                            ttl: "60",
                            custom_namespaces: {
                                content:
                                    "http://purl.org/rss/1.0/modules/content/",
                                media: "http://search.yahoo.com/mrss/",
                            },
                        }),
                        query: `{
                            ghostSettings {
                                title
                                description
                            }
                    
                            allGhostPost(sort: {published_at: DESC}) {
                                edges {
                                    node {
                                        id
                                        title
                                        excerpt
                                        custom_excerpt
                                        slug
                                        published_at
                                        primary_author {
                                        name
                                        }
                                        tags {
                                        name
                                        visibility
                                        }
                                        html
                                    }
                                }
                            }
                        }`,
                        output: "/rss",
                    },
                ],
            },
        },

        // Search functionality plugin
        {
            resolve: "gatsby-plugin-fusejs",
            options: {
                query: `{        
                    allGhostPost(sort: {published_at: DESC}) {
                        edges {
                        node {
                            id
                            title
                            slug
                            excerpt
                            custom_excerpt
                            plaintext
                        }
                        }
                    }
                }`,
                keys: ["title", "excerpt", "custom_excerpt", "plaintext"],
                normalizer: ({ data }: any) =>
                    data.allGhostPost.edges.map(({ node }: any) => ({
                        id: node.id,
                        title: node.title,
                        slug: node.slug,
                        excerpt: node.excerpt,
                        custom_excerpt: node.custom_excerpt,
                        plaintext: node.plaintext,
                    })),
            },
        },
    ],
}

export default config
