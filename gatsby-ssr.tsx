import type { GatsbySSR } from "gatsby"
import * as React from "react"

// JavaScript code to preload the color scheme
// This function runs in the browser to set the initial color scheme
// It checks localStorage for a saved preference, falls back to system preference,
// and sets the color-scheme attribute on the document element
const preloadColorScheme = `(function() {
    if (typeof window !== 'undefined') {
        const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark';

        switch (localStorage.getItem('color-scheme')) {
            case 'light':
                document.documentElement.setAttribute('color-scheme', 'light');
                break;

            case 'dark':
                document.documentElement.setAttribute('color-scheme', 'dark');
                break;

            default:
                localStorage.setItem('color-scheme', prefersColorScheme);
                document.documentElement.setAttribute('color-scheme', prefersColorScheme);
                break;
        }
    }    
})()`

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
    setHeadComponents,
}) => {
    // Add the script to the <head> section of the page
    setHeadComponents([
        <script
            key="preload-color-scheme"
            dangerouslySetInnerHTML={{ __html: preloadColorScheme }}
        />,
    ])
}
