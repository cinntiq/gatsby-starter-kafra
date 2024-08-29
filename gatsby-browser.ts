import type { GatsbyBrowser } from "gatsby"
import hljs from "highlight.js/lib/common"
import "@styles/app/_global.scss" // Import global styles
import "highlight.js/styles/github-dark.css"

/**
 * Gatsby Browser API - onRouteUpdate
 * This function runs whenever a new page is loaded or when the URL changes.
 *
 * In this implementation, it's used to:
 * 1. Dynamically load external scripts that are present in the newly loaded page.
 * 2. Apply syntax highlighting to code blocks.
 */
export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
    // Select all script elements within elements that have the class 'load-external-scripts'
    const scripts = document.querySelectorAll<HTMLScriptElement>(
        ".load-external-scripts script",
    )

    // Get the head element of the document
    const head = document.querySelector("head")

    // If the head element exists (it should always exist, but we're being cautious)
    if (head) {
        // Iterate over each found script element
        scripts.forEach((scriptNode) => {
            // Clone the script node and append it to the head
            // This effectively "moves" the script to the head and causes it to execute
            head.appendChild(scriptNode.cloneNode(true))
        })
    }

    // Apply syntax highlighting to code blocks
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
    })
}
