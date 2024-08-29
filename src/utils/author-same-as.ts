/**
 * Generates a Same-As string for JSON-LD from author's social media links
 *
 * @param author - Object containing author's website and social media handles
 * @returns A JSON-LD compatible string of author's links or undefined if no links
 */
export const getAuthorSameAs = (
    author:
        | {
              readonly website: string | null
              readonly facebook: string | null
              readonly twitter: string | null
          }
        | null
        | undefined,
) => {
    const sameAsArray = [
        author?.website,
        author?.facebook
            ? `https://www.facebook.com/${author.facebook.replace(/^\//, "")}/`
            : undefined,
        author?.twitter
            ? `https://twitter.com/${author.twitter.replace(/^@/, "")}/`
            : undefined,
    ].filter((item) => item)

    return sameAsArray.length ? `["${sameAsArray.join('", "')}"]` : undefined
}
