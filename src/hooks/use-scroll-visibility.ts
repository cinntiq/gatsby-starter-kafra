import { useState, useEffect } from "react"

// Define the useScrollVisibility custom hook
// The threshold parameter has a default value of 0.9 (90%)
export const useScrollVisibility = (threshold = 0.9) => {
    // Define the isVisible state and its setter function
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Function to check scroll position and update isVisible state
        const checkScrollPosition = () => {
            // Get current scroll position (scrollY) and viewport height (innerHeight)
            const { scrollY, innerHeight } = window
            // Get the total height of the document
            const { scrollHeight } = document.documentElement
            // Set isVisible to true if current scroll position + viewport height
            // is greater than or equal to the threshold percentage of total document height
            setIsVisible(scrollY + innerHeight >= scrollHeight * threshold)
        }

        // Add scroll event listener with passive option for performance optimization
        window.addEventListener("scroll", checkScrollPosition, {
            passive: true,
        })
        // Add resize event listener
        window.addEventListener("resize", checkScrollPosition)
        // Call the function immediately for initial check
        checkScrollPosition()

        // Return a cleanup function to remove event listeners when component unmounts
        return () => {
            window.removeEventListener("scroll", checkScrollPosition)
            window.removeEventListener("resize", checkScrollPosition)
        }
    }, [threshold]) // Re-run useEffect when threshold changes

    // Return the isVisible state
    return isVisible
}
