import React from "react"
import { Link } from "gatsby"
import * as styles from "@styles/components/common/post-author.module.scss"

const PostAuthor = ({
    author,
    avatar,
}: {
    author?: {
        slug: string
        name: string
        profile_image: string | null
        bio: string | null
        website?: string | null
        facebook?: string | null
        twitter?: string | null
    }
    avatar: string
}) => {
    if (!author) return null

    return (
        <footer className={styles.postAuthor}>
            <Link
                className={styles.authorProfile}
                to={`/author/${author.slug}`}>
                <img
                    className={styles.avatar}
                    src={author.profile_image ?? avatar}
                    alt={author.name}
                />
                <div className={styles.authorInfo}>
                    <span className={styles.authorName}>
                        {`@${author.name}`}
                    </span>
                    {author.bio && (
                        <p className={styles.authorBio}>{author.bio}</p>
                    )}
                </div>
            </Link>
        </footer>
    )
}

export default PostAuthor
