import * as React from "react"
import { Link } from "gatsby"
import * as styles from "@styles/components/common/navigation.module.scss"

export const Navigation = ({
    items,
}: {
    items:
        | ReadonlyArray<{
              readonly label: string
              readonly url: string
          } | null>
        | null
        | undefined
}) => (
    <>
        <nav className={styles.navigation}>
            {items &&
                Array.from(items).map((item, index) => {
                    if (item?.url.match(/^\s?http(s?)/gi)) {
                        return (
                            <a
                                className={styles.navItem}
                                href={item.url}
                                key={index}
                                rel="noopener noreferrer"
                                target="_blank">
                                {`${item.label}`}
                            </a>
                        )
                    } else if (item) {
                        return (
                            <Link
                                className={styles.navItem}
                                key={index}
                                to={item.url}>
                                {item.label}
                            </Link>
                        )
                    }
                })}
        </nav>
    </>
)

export default Navigation
