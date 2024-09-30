import { Pagination as Paginate, PaginationItem } from "@mui/material"
import * as styles from "@styles/components/common/pagination.module.scss"
import { Link } from "gatsby"
import * as React from "react"

const Pagination = ({
    pageContext: { numberOfPages, pageNumber, pathPrefix },
}: {
    readonly pageContext: {
        readonly numberOfPages: number
        readonly pageNumber: number
        readonly pathPrefix: string
    }
}) => (
    <Paginate
        className={styles.pagination}
        count={Number(numberOfPages)}
        page={pageNumber}
        renderItem={(item) => (
            <PaginationItem
                className={styles.navItem}
                component={Link}
                to={
                    item.page === 1
                        ? `${pathPrefix}/`
                        : `${pathPrefix}/page/${item.page}/`
                }
                {...item}
            />
        )}
        shape="rounded"
        siblingCount={0}
    />
)

export default Pagination
