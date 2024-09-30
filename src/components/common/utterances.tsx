import { useColorScheme } from "@contexts/color-scheme-provider"
import { useSiteMetadata } from "@hooks/use-site-metadata"
import * as styles from "@styles/components/common/utterances.module.scss"
import React, { useEffect, useRef } from "react"

const Utterances = ({ issueTerm = "pathname" }: { issueTerm?: string }) => {
    const data = useSiteMetadata()
    const { colorScheme } = useColorScheme()
    const containerRef = useRef<HTMLElement>(null)
    const repo = data?.utterances?.repo

    useEffect(() => {
        if (!repo) {
            console.warn("Utterances repository is not configured.")
            return
        }

        const script = document.createElement("script")
        const attributes: Record<string, string> = {
            "src": "https://utteranc.es/client.js",
            repo,
            "issue-term": issueTerm,
            "theme": colorScheme === "light" ? "github-light" : "github-dark",
            "crossOrigin": "anonymous",
            "async": "true",
        }

        Object.entries(attributes).forEach(([key, value]) => {
            script.setAttribute(key, value)
        })

        const container = containerRef.current
        container?.appendChild(script)

        return () => {
            if (container) {
                container.innerHTML = ""
            }
        }
    }, [repo, issueTerm, colorScheme])

    if (!repo) {
        return null
    }

    return (
        <section
            className={styles.utterancesContainer}
            ref={containerRef}
        />
    )
}

export default Utterances
