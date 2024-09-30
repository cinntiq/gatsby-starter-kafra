import { useGhostTag } from "@hooks/use-ghost-tag"
import { Tag } from "@mui/icons-material"
import { Dialog, IconButton, Slide, SvgIcon } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import * as styles from "@styles/components/common/tag-cloud.module.scss"
import { Link } from "gatsby"
import * as React from "react"

const dialogTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>,
) {
    return (
        <Slide
            direction="down"
            ref={ref}
            {...props}
        />
    )
})

const TagCloud = () => {
    const [open, setOpen] = React.useState(false)
    const tags = useGhostTag()

    return (
        <>
            <IconButton
                className={styles.tagCloudBtn}
                id="tagCloudBtn"
                onClick={() => setOpen(true)}
                title="Tag Cloud Button">
                <SvgIcon
                    className={styles.tagIcon}
                    component={Tag}
                />
            </IconButton>
            <Dialog
                TransitionComponent={dialogTransition}
                className={styles.tagCloudDialog}
                disableScrollLock
                fullWidth
                onClose={() => setOpen(false)}
                open={open}
                scroll="paper"
                sx={{
                    "& .MuiDialog-container": {
                        alignItems: "start",
                    },
                }}>
                <ul className={styles.tagCloudArea}>
                    {tags.map((tag) => (
                        <li
                            className={styles.tagItem}
                            key={tag.id}>
                            <Link to={`/tag/${tag.slug}`}>
                                {`#${tag.name}(${tag.postCount})`}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Dialog>
        </>
    )
}

export default TagCloud
