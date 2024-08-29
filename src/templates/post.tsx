import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"
import {
    Layout,
    PostAuthor,
    RelatedPostsFab,
    ShareButton,
    Utterances,
} from "@components/common"
import { PostMeta } from "@components/meta/post-meta"
import featureImage from "@images/feature-image-1280x720.webp"
import avatar from "@images/avatar-64x64.webp"
import * as styles from "@styles/templates/post.module.scss"

export const postQuery = graphql`
    query Post($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`

const Post = ({
    data: postQuery,
    location,
}: PageProps<Queries.PostQuery, Location>) => (
    <Layout>
        <article className={styles.articlePost}>
            <header className={styles.postHeader}>
                {postQuery.ghostPost?.tags &&
                    postQuery.ghostPost?.primary_tag && (
                        <nav className={styles.postTagsNav}>
                            {Array.from(postQuery.ghostPost?.tags)
                                .filter((tag) => tag?.visibility === "public")
                                .map((publicTag, index) => (
                                    <Link
                                        className={styles.navItem}
                                        key={index}
                                        to={`/tag/${publicTag?.slug}`}>
                                        {`#${publicTag?.name}`}
                                    </Link>
                                ))}
                        </nav>
                    )}
                <time className={`${styles.postDate}`}>
                    <span className={`${styles.dateItem}`}>
                        {"Updated at "}
                        {postQuery.ghostPost?.updated_at_pretty}
                    </span>
                </time>
                <h1 className={styles.postTitle}>
                    {postQuery.ghostPost?.title}
                </h1>
                <img
                    className={styles.postFeatureImage}
                    src={postQuery.ghostPost?.feature_image ?? featureImage}
                    alt={postQuery.ghostPost?.title}
                />
            </header>
            <section
                className={`${styles.ghostContent} load-external-scripts`}
                dangerouslySetInnerHTML={{
                    __html: postQuery.ghostPost!.html!,
                }}
            />
            <ShareButton url={location.href} />
            <RelatedPostsFab
                currentSlug={postQuery.ghostPost?.slug}
                currentPrimaryTag={postQuery.ghostPost?.primary_tag?.slug}
            />
            <PostAuthor
                author={postQuery.ghostPost?.primary_author}
                avatar={avatar}
            />
            <Utterances />
        </article>
    </Layout>
)

export const Head = ({
    data,
    location,
}: PageProps<Queries.PostQuery, {}, Location>) => (
    <PostMeta
        post={data.ghostPost}
        canonical={location.pathname}
    />
)

export default Post
