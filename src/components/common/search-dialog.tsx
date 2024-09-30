import { useFusejs } from "@hooks/use-fuse-js"
import { Search } from "@mui/icons-material"
import { Dialog, IconButton, Slide, SvgIcon } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import * as styles from "@styles/components/common/search-dialog.module.scss"
import { getSearchResults } from "@utils/post-search"
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

const SearchDialog = () => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const fusejs = useFusejs()
    const deferredQuery = React.useDeferredValue(query)
    const searchResults = getSearchResults(deferredQuery, fusejs)

    React.useEffect(() => {
        setQuery(open ? query : "")
    }, [open, query])

    return (
        <>
            <IconButton
                className={styles.searchBtn}
                id="searchBtn"
                onClick={() => setOpen(true)}
                title="Search Button">
                <SvgIcon
                    className={styles.searchIcon}
                    component={Search}
                />
            </IconButton>
            <Dialog
                TransitionComponent={dialogTransition}
                className={styles.searchDialog}
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
                <header className={styles.searchHeader}>
                    <input
                        autoFocus
                        className={styles.searchInput}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Please enter a search word…"
                        type="text"
                    />
                </header>
                {searchResults.length !== 0 && (
                    <ul className={styles.searchResultArea}>
                        {searchResults.map(({ item }) => (
                            <li
                                className={styles.searchResultItem}
                                key={item.id}>
                                <Link to={`/${item.slug}`}>
                                    <h2
                                        className={
                                            styles.searchResultItemTitle
                                        }>
                                        {item.title}
                                    </h2>
                                    <p
                                        className={
                                            styles.searchResultItemExcerpt
                                        }>
                                        {item.custom_excerpt ?? item.excerpt}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </Dialog>
        </>
    )
}

export default SearchDialog
