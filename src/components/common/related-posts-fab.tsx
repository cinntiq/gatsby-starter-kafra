import { useRelatedPosts } from "@hooks/use-related-posts"
import { useScrollVisibility } from "@hooks/use-scroll-visibility"
import { ChevronLeft, ChevronRight, Article } from "@mui/icons-material"
import { Fab, Tooltip, Zoom } from "@mui/material"
import * as styles from "@styles/components/common/related-posts-fab.module.scss"
import { fabStyle } from "@utils/fab-styles"
import { Link } from "gatsby"
import React, { useState } from "react"

const RelatedPosts = ({
    currentSlug,
    currentPrimaryTag,
}: {
    currentSlug: string | undefined
    currentPrimaryTag: string | undefined
}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const { prevPost, nextPost } = useRelatedPosts(
        currentSlug ?? "",
        currentPrimaryTag ?? "",
    )
    const isVisible = useScrollVisibility()

    if (
        typeof window === "undefined" ||
        !isVisible ||
        !currentSlug ||
        !currentPrimaryTag
    )
        return null

    const relatedPosts = [
        {
            post: prevPost,
            label: "Previous related post",
            icon: <ChevronLeft />,
        },
        { post: nextPost, label: "Next related post", icon: <ChevronRight /> },
    ].filter(
        (
            item,
        ): item is {
            post: Queries.GhostPost
            label: string
            icon: JSX.Element
        } => item.post !== null,
    )

    return (
        <nav className={styles.relatedPostsNav}>
            <ul className={styles.relatedPostsList}>
                {relatedPosts.map(({ post, icon }) => (
                    <Zoom
                        in={isExpanded}
                        key={post.slug}>
                        <li className={styles.relatedPostsItem}>
                            <Tooltip
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            fontSize: "1rem",
                                        },
                                    },
                                }}
                                placement="left"
                                title={post.title}>
                                <Link to={`/${post.slug}`}>
                                    <Fab
                                        size="small"
                                        sx={fabStyle}>
                                        {icon}
                                    </Fab>
                                </Link>
                            </Tooltip>
                        </li>
                    </Zoom>
                ))}
            </ul>
            <button className={styles.relatedPostsBtn}>
                <Fab
                    onClick={() => setIsExpanded(!isExpanded)}
                    size="small"
                    sx={fabStyle}>
                    <Article />
                </Fab>
            </button>
        </nav>
    )
}

export default RelatedPosts
