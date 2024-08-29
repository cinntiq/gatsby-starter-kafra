import React from "react"
import { Fab } from "@mui/material"
import { KeyboardArrowUp } from "@mui/icons-material"
import { useScrollVisibility } from "@hooks/use-scroll-visibility"
import { fabStyle } from "@utils/fab-styles"
import * as styles from "@styles/components/common/scroll-to-top-fab.module.scss"

const ScrollToTopFab: React.FC = () => {
    const isVisible = useScrollVisibility()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (typeof window === "undefined" || !isVisible) return null

    return (
        <nav className={styles.scrollToTopNav}>
            <Fab
                onClick={scrollToTop}
                size="small"
                sx={fabStyle}>
                <KeyboardArrowUp />
            </Fab>
        </nav>
    )
}

export default ScrollToTopFab
