import path from "path"

import type { GatsbyNode } from "gatsby"

import { postsPerPage } from "./app-config.json"

/**
 * Configure Webpack
 * This function sets up path aliases and file extensions for the Gatsby project
 */
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
    stage,
    actions,
    getConfig,
}) => {
    // Get the current Webpack config
    const config = getConfig()

    // Adjust CSS-related settings based on the build stage
    if (stage === "build-javascript" || stage === "develop") {
        const miniCssExtractPlugin = config.plugins.find(
            (plugin: { constructor: { name: string } }) =>
                plugin.constructor.name === "MiniCssExtractPlugin",
        )
        if (miniCssExtractPlugin) {
            miniCssExtractPlugin.options.ignoreOrder = true
        }
    }

    // Replace the entire Webpack config
    actions.replaceWebpackConfig(config)

    // Add additional Webpack configurations
    actions.setWebpackConfig({
        resolve: {
            // Set up path aliases
            alias: {
                "@assets": path.resolve(__dirname, "src/assets"),
                "@components": path.resolve(__dirname, "src/components"),
                "@contexts": path.resolve(__dirname, "src/contexts"),
                "@hooks": path.resolve(__dirname, "src/hooks"),
                "@images": path.resolve(__dirname, "src/images"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@styles": path.resolve(__dirname, "src/styles"),
                "@templates": path.resolve(__dirname, "src/templates"),
                "@utils": path.resolve(__dirname, "src/utils"),
            },
            // Define file extensions to resolve
            extensions: [
                ".cjs",
                ".cts",
                ".js",
                ".jsx",
                ".mjs",
                ".mts",
                ".ts",
                ".tsx",
            ],
        },
    })
}

/**
 * Create pages for the Gatsby site
 * This function fetches data from Ghost CMS and creates pages for posts, tags, and authors
 */
export const createPages: GatsbyNode["createPages"] = async ({
    graphql,
    actions,
}) => {
    const { createPage } = actions

    /**
     * Pagination function
     * Creates multiple pages for a given set of items (e.g., posts, tags, authors)
     */
    const paginate = ({
        items,
        component,
        pathPrefix = "",
        context = {},
    }: {
        items: Array<{ node: { slug: string } }>
        component: string
        pathPrefix?: string
        context?: Record<string, unknown>
    }) => {
        const numPages = Math.ceil(items.length / postsPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path:
                    i === 0 ? `${pathPrefix}/` : `${pathPrefix}/page/${i + 1}/`,
                component,
                context: {
                    ...context,
                    pageNumber: i + 1,
                    pathPrefix,
                    skip: i * postsPerPage,
                    limit: postsPerPage,
                    numberOfPages: numPages,
                },
            })
        })
    }

    /**
     * Create individual post and page
     * Creates a page for each individual post and static page
     */
    const createContentPages = (
        edges: Array<{ node: { slug: string } }>,
        template: string,
    ) => {
        edges.forEach(({ node }) => {
            createPage({
                path: `/${node.slug}/`,
                component: path.resolve(`./src/templates/${template}.tsx`),
                context: { slug: node.slug },
            })
        })
    }

    /**
     * Create tag and author pages
     * Creates paginated pages for each tag and author
     */
    const createCollectionPages = (
        edges: Array<{ node: { slug: string; postCount: number } }>,
        type: string,
    ) => {
        edges.forEach(({ node }) => {
            paginate({
                items: Array.from({ length: node.postCount }).map(() => ({
                    node: { slug: node.slug },
                })),
                component: path.resolve(`./src/templates/${type}.tsx`),
                pathPrefix: `/${type}/${node.slug}`,
                context: { slug: node.slug },
            })
        })
    }

    // Fetch data from Ghost CMS
    const result = await graphql<{
        allGhostPost: { edges: Array<{ node: { slug: string } }> }
        allGhostPage: { edges: Array<{ node: { slug: string } }> }
        allGhostTag: {
            edges: Array<{ node: { slug: string; postCount: number } }>
        }
        allGhostAuthor: {
            edges: Array<{ node: { slug: string; postCount: number } }>
        }
    }>(`
        query GhostContentQuery {
            allGhostPost(sort: { published_at: ASC }) {
                edges {
                    node {
                        slug
                    }
                }
            }
            allGhostPage(sort: { published_at: ASC }) {
                edges {
                    node {
                        slug
                    }
                }
            }
            allGhostTag(sort: { name: ASC }) {
                edges {
                    node {
                        slug
                        postCount
                    }
                }
            }
            allGhostAuthor(sort: { name: ASC }) {
                edges {
                    node {
                        slug
                        postCount
                    }
                }
            }
        }
    `)

    if (!result.data) throw new Error("Error fetching data from Ghost CMS")

    // Create index pages
    paginate({
        items: result.data.allGhostPost.edges,
        component: path.resolve("./src/templates/index.tsx"),
    })

    // Create pages for individual posts and static pages
    createContentPages(result.data.allGhostPost.edges, "post")
    createContentPages(result.data.allGhostPage.edges, "page")

    // Create pages for tags and authors
    createCollectionPages(result.data.allGhostTag.edges, "tag")
    createCollectionPages(result.data.allGhostAuthor.edges, "author")
}
