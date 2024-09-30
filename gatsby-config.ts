import path from "path"

import dotenv from "dotenv"
import type { GatsbyConfig, IPluginRefOptions } from "gatsby"

import appConfig from "./app-config.json"

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
})

// Ghost CMS related interfaces
interface GhostTag {
    name: string
    visibility: string
}

interface GhostAuthor {
    name: string
}

interface GhostPost {
    id: string
    title: string
    excerpt: string
    custom_excerpt?: string
    slug: string
    published_at: string
    primary_author: GhostAuthor
    tags: GhostTag[]
    html: string
    plaintext?: string
}

interface GhostSettings {
    title: string
    description: string
}

interface GhostQueryResult {
    allGhostPost: {
        edges: Array<{
            node: GhostPost
        }>
    }
    ghostSettings: GhostSettings
}

// Ghost CMS configuration
const ghostConfig: NonNullable<IPluginRefOptions> & {
    apiUrl: string
    contentApiKey: string
} = {
    apiUrl: process.env.GHOST_API_URL || "https://gatsby.ghost.io",
    contentApiKey:
        process.env.GHOST_CONTENT_API_KEY || "9cc5c67c358edfdd81455149d0",
}

// Site metadata configuration
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

// Main Gatsby configuration
const config: GatsbyConfig = {
    graphqlTypegen: true,
    siteMetadata: siteMetadata,
    trailingSlash: "always",
    plugins: [
        "gatsby-plugin-catch-links",
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sass",
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
        {
            resolve: "gatsby-plugin-feed",
            options: {
                feeds: [
                    {
                        title: "RSS Feed",
                        serialize: ({
                            query: { allGhostPost },
                        }: {
                            query: GhostQueryResult
                        }) =>
                            allGhostPost.edges.map(({ node }) => ({
                                title: node.title,
                                description:
                                    node.custom_excerpt ?? node.excerpt,
                                guid: node.id,
                                url: `${siteMetadata.siteUrl}/${node.slug}/`,
                                author: node.primary_author.name,
                                date: node.published_at,
                                categories: node.tags
                                    .filter(
                                        (tag) => tag.visibility === "public",
                                    )
                                    .map((publicTag) => publicTag.name),
                                custom_elements: [
                                    {
                                        "content:encoded": {
                                            _cdata: node.html,
                                        },
                                    },
                                ],
                            })),
                        setup: ({
                            query: { ghostSettings },
                        }: {
                            query: GhostQueryResult
                        }) => ({
                            title: ghostSettings.title,
                            description: ghostSettings.description,
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
                normalizer: ({ data }: { data: GhostQueryResult }) =>
                    data.allGhostPost.edges.map(({ node }) => ({
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
