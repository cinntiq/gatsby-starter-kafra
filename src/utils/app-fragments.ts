import { graphql } from "gatsby"

/**
 * Gatsby GraphQL Fragments
 *
 * This file contains GraphQL fragments used throughout the Gatsby project.
 * These fragments are automatically picked up by Gatsby and do not need to be imported explicitly.
 */

// Site metadata fields
export const siteMetadataFields = graphql`
    fragment SiteMetadataFields on SiteSiteMetadata {
        siteUrl
        postsPerPage
        shareImage {
            height
            width
        }
        utterances {
            repo
        }
    }
`

// Ghost CMS settings fields
export const ghostSettingsFields = graphql`
    fragment GhostSettingsFields on GhostSettings {
        title
        description
        meta_title
        meta_description
        og_title
        og_description
        twitter_title
        twitter_description
        url
        icon
        lang
        cover_image
        facebook
        twitter
        navigation {
            label
            url
        }
    }
`

// Ghost post fields
export const ghostPostFields = graphql`
    fragment GhostPostFields on GhostPost {
        # Main fields
        id
        title
        slug
        featured
        feature_image
        excerpt
        custom_excerpt
        visibility

        # Dates unformatted
        created_at
        published_at
        updated_at

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")

        # SEO
        meta_title
        meta_description
        og_title
        og_description
        og_image
        twitter_title
        twitter_description
        twitter_image

        # Authors
        authors {
            name
            slug
            bio
            # email
            profile_image
            website
            facebook
            twitter
        }
        primary_author {
            name
            slug
            bio
            # email
            profile_image
            website
            facebook
            twitter
        }

        # Tags
        tags {
            name
            slug
            description
            feature_image
            meta_title
            meta_description
            visibility
        }
        primary_tag {
            name
            slug
            description
            feature_image
            meta_title
            meta_description
            visibility
        }

        # Content
        html
        plaintext

        # Additional fields
        uuid
        url
        canonical_url
        page
        comment_id
    }
`

// Ghost page fields
export const ghostPageFields = graphql`
    fragment GhostPageFields on GhostPage {
        # Main fields
        title
        slug
        featured
        feature_image
        excerpt
        custom_excerpt
        visibility

        # Dates unformatted
        created_at
        published_at
        updated_at

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")

        # SEO
        meta_title
        meta_description
        og_title
        og_description
        og_image
        twitter_title
        twitter_description
        twitter_image

        # Authors
        authors {
            name
            slug
            bio
            # email
            profile_image
            website
            facebook
            twitter
        }
        primary_author {
            name
            slug
            bio
            # email
            profile_image
            website
            facebook
            twitter
        }

        # Tags
        tags {
            name
            slug
            description
            feature_image
            meta_title
            meta_description
            visibility
        }
        primary_tag {
            name
            slug
            description
            feature_image
            meta_title
            meta_description
            visibility
        }

        # Content
        html
        plaintext

        # Additional fields
        uuid
        url
        canonical_url
        page
        comment_id
    }
`

// Ghost tag fields
export const ghostTagFields = graphql`
    fragment GhostTagFields on GhostTag {
        id
        name
        slug
        description
        postCount
        meta_title
        meta_description
        og_title
        og_description
        twitter_title
        twitter_description
        feature_image
        visibility
    }
`

// Ghost author fields
export const ghostAuthorFields = graphql`
    fragment GhostAuthorFields on GhostAuthor {
        name
        slug
        bio
        meta_title
        meta_description
        location
        cover_image
        profile_image
        website
        facebook
        twitter
    }
`

// Fuse.js search fields
export const fusejsFields = graphql`
    fragment FusejsFields on fusejs {
        id
        data
        index
    }
`
