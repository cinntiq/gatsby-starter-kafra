/**
 * Utility functions for managing color schemes (light/dark mode)
 */

/**
 * Get the current color scheme
 * @returns {'light' | 'dark'} Current color scheme
 */
export const getColorScheme = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
        const prefersColorScheme = window.matchMedia(
            "(prefers-color-scheme: light)",
        ).matches
            ? "light"
            : "dark"

        switch (localStorage.getItem("color-scheme")) {
            case "light":
                return "light"
            case "dark":
                return "dark"
            default:
                return prefersColorScheme
        }
    } else {
        return "light"
    }
}

/**
 * Toggle between light and dark color schemes
 */
export const toggleColorScheme = (): void => {
    localStorage.setItem(
        "color-scheme",
        getColorScheme() === "light" ? "dark" : "light",
    )
}

/**
 * Apply the current color scheme to the document
 */
export const useColorScheme = (): void => {
    document.documentElement.setAttribute("color-scheme", getColorScheme())
}
