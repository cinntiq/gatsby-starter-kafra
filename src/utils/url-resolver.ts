/**
 * URL Resolver
 *
 * @description A function that resolves a URL against a base URL, similar to the deprecated 'url.resolve'.
 * It handles both relative and absolute URLs, and works with string or URL object inputs.
 *
 * @param {string | URL | null | undefined} from - The base URL to resolve against
 * @param {string | URL | null | undefined} to - The URL to resolve
 * @returns {URL | string | undefined} The resolved URL, or undefined if inputs are invalid
 *
 * @example
 * resolve('http://example.com/foo', '/bar') // Returns 'http://example.com/bar'
 * resolve('http://example.com/foo', 'bar') // Returns 'http://example.com/foo/bar'
 * resolve('http://example.com/foo', 'http://example.org') // Returns 'http://example.org'
 */
export const resolve = (
    from: string | URL | null | undefined,
    to: string | URL | null | undefined,
): URL | string | undefined => {
    let resolvedUrl: URL | undefined = undefined

    if (from && to) {
        // Create a new URL object using 'to' as the path and 'from' as the base
        // We use 'resolve://' as a dummy protocol to handle cases where 'from' is a relative path
        resolvedUrl = new URL(to, new URL(from, "resolve://"))

        // If the resolved URL still has our dummy protocol, it means 'from' was relative
        // In this case, we return only the pathname, search, and hash
        if (resolvedUrl.protocol === "resolve:") {
            const { pathname, search, hash } = resolvedUrl
            return pathname + search + hash
        }
    }

    return resolvedUrl
}
