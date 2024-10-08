import {
    getColorScheme,
    toggleColorScheme as toggleColorSchemeUtil,
} from "@utils/color-scheme"
import React, { createContext, useState, useContext, useEffect } from "react"

// Create a context for color scheme
const ColorSchemeContext = createContext<
    | {
          colorScheme: "light" | "dark"
          toggleColorScheme: () => void
      }
    | undefined
>(undefined)

// ColorSchemeProvider component to manage app-wide color scheme
export const ColorSchemeProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    // Initialize color scheme state
    const [colorScheme, setColorScheme] = useState<"light" | "dark">(() =>
        getColorScheme(),
    )

    // Apply color scheme to document
    // utterances will detect this change and update its theme accordingly
    useEffect(() => {
        document.documentElement.setAttribute("color-scheme", colorScheme)
    }, [colorScheme])

    // Toggle between light and dark schemes
    // utterances will react to this change through the document attribute update
    const handleToggleColorScheme = () => {
        toggleColorSchemeUtil()
        setColorScheme((prev) => (prev === "light" ? "dark" : "light"))
    }

    // Provide color scheme context to children components
    return (
        <ColorSchemeContext.Provider
            value={{ colorScheme, toggleColorScheme: handleToggleColorScheme }}>
            {children}
        </ColorSchemeContext.Provider>
    )
}

// Custom hook to access color scheme context
// Can be used by any component, including those managing utterances
export const useColorScheme = () => {
    const context = useContext(ColorSchemeContext)
    if (context === undefined) {
        throw new Error(
            "useColorScheme must be used within a ColorSchemeProvider",
        )
    }
    return context
}
