import * as React from "react"
import { Link } from "gatsby"
import { CardActionArea } from "@mui/material"
import * as styles from "@styles/components/common/post-card.module.scss"

const PostCard = ({
    post: { custom_excerpt, feature_image, excerpt, slug, tags, title },
}: {
    readonly post: {
        readonly custom_excerpt: string | null
        readonly feature_image: string | null
        readonly excerpt: string | null
        readonly slug: string
        readonly tags: ReadonlyArray<{
            readonly name: string
            readonly slug: string
            readonly visibility: string
        } | null> | null
        readonly title: string
    }
}) => (
    <CardActionArea className={styles.postCardActionArea}>
        <Link to={`/${slug}`}>
            <section className={styles.postCard}>
                {feature_image && (
                    <img
                        src={feature_image}
                        alt={title}
                        className={styles.postCardFeatureImage}
                    />
                )}
                <h2 className={styles.postCardTitle}>{title}</h2>
                <p className={styles.postCardExcerpt}>
                    {custom_excerpt ?? excerpt}
                </p>
                {tags && (
                    <ul className={styles.postCardTags}>
                        {Array.from(tags)
                            .filter((tag) => tag?.visibility === "public")
                            .map((publicTag, index) => (
                                <li
                                    className={styles.tagItem}
                                    key={index}>
                                    {`#${publicTag?.name}`}
                                </li>
                            ))}
                    </ul>
                )}
            </section>
        </Link>
    </CardActionArea>
)

export default PostCard
