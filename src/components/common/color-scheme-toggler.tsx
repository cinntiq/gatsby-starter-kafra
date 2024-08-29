import * as React from "react"
import { IconButton, SvgIcon } from "@mui/material"
import { DarkMode, LightMode } from "@mui/icons-material"
import { useColorScheme } from "@contexts/color-scheme-provider"
import * as styles from "@styles/components/common/color-scheme-toggler.module.scss"

const ColorSchemeToggler = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme()

    return (
        <IconButton
            className={styles.colorSchemeToggleBtn}
            id="colorSchemeToogleBtn"
            onClick={toggleColorScheme}
            title="Color Scheme Toggle Button">
            <SvgIcon
                className={styles.toggleIcon}
                component={colorScheme === "dark" ? DarkMode : LightMode}
            />
        </IconButton>
    )
}

export default ColorSchemeToggler
