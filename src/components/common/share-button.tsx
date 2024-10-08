import { Share } from "@mui/icons-material"
import { IconButton, SvgIcon } from "@mui/material"
import * as styles from "@styles/components/common/share-button.module.scss"
import * as React from "react"

const ShareButton = ({ url }: { url: string }) => {
    const handleShare = () => {
        if (navigator.canShare && navigator.canShare({ url })) {
            navigator.share({
                title: document.title,
                url: url,
            })
        } else {
            navigator.clipboard
                .writeText(url)
                .then(() => alert(`${url} Copied!`))
        }
    }

    return (
        <IconButton
            className={styles.shareBtn}
            onClick={handleShare}
            title="Share Button">
            <SvgIcon
                className={styles.shareIcon}
                component={Share}
            />
        </IconButton>
    )
}

export default ShareButton
