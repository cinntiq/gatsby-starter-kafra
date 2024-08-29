import Fuse from "fuse.js"

/**
 * Performs a fuzzy search on the provided data using Fuse.js
 *
 * @param query - The search query string
 * @param fusejsObj - An object containing the search data and precomputed Fuse index
 * @returns An array of search results, each containing the matched item and its score
 */
export const getSearchResults = (
    query: string,
    fusejsObj: { data: Array<{ [key: string]: any }>; index?: string } | null,
): ReadonlyArray<{
    item: {
        id: string
        title: string
        slug: string
        excerpt?: string
        custom_excerpt?: string
        plaintext?: string
    }
    score?: number
}> => {
    // Return empty array if query is empty or fusejsObj is invalid
    if (!query || !fusejsObj?.data || !fusejsObj.index) return []

    // Initialize Fuse instance with the provided data and options
    const fuse = new Fuse(
        fusejsObj.data,
        {
            // Define search keys and their weights
            keys: [
                { name: "title", weight: 0.4 },
                { name: "excerpt", weight: 0.3 },
                { name: "custom_excerpt", weight: 0.2 },
                { name: "plaintext", weight: 0.1 },
            ],
            includeScore: true, // Include the calculated score in the result
            threshold: 0.3, // A lower threshold means a more strict matching
            ignoreLocation: true, // Ignore the location of the match in the string
            useExtendedSearch: true, // Enable Fuse's extended search syntax
            minMatchCharLength: 2, // Minimum number of characters that must match
            shouldSort: true, // Sort the results by score
        },
        // Use the precomputed Fuse index for better performance
        Fuse.parseIndex(JSON.parse(fusejsObj.index)),
    )

    // Perform the search and return the results
    return fuse.search(query)
}
