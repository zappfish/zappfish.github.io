/**
 * Single source of truth for the home page feature items.
 *
 * Icons use @fortawesome/fontawesome-svg-core to generate inline SVG strings at
 * build time. This avoids a runtime JS dependency — the SVG is rendered as static
 * HTML via Astro's `set:html` directive. We use the `far` (regular) style to match
 * the outlined icon treatment in the design.
 *
 * To change an icon: find the icon name at https://fontawesome.com/icons?s=regular
 * and import the corresponding `fa*` definition from @fortawesome/free-regular-svg-icons.
 */

import { icon } from '@fortawesome/fontawesome-svg-core'
import {
    faFileLines,
    faCalendarDays,
    faShareFromSquare,
    faChartBar,
} from '@fortawesome/free-regular-svg-icons'

// icon().html[0] returns the raw SVG string — consumed by `set:html` in components
const svg = (def: Parameters<typeof icon>[0]) => icon(def).html[0]

export const featureItems = [
    {
        title: "Learn About Project",
        description: "Explore ZAPP's mission, goals, and innovative approach to zebrafish toxicology research. Learn how we're creating standardized phenotype data to advance comparative studies worldwide.",
        href: "/goals/",
        btnLabel: "Read More",
        icon: svg(faFileLines),
    },
    {
        title: "Upcoming Events",
        description: "Stay connected with the ZAPP community. Join our workshops, webinars, and collaboration sessions to share findings and help shape the future of toxicology data standards.",
        href: "/events/",
        btnLabel: "Join Now",
        icon: svg(faCalendarDays),
    },
    {
        title: "Submit Data",
        description: "Contribute your zebrafish phenotype data to our growing atlas. Your submissions help build a comprehensive, community-driven resource that advances toxicology research globally.",
        href: "#",
        btnLabel: "Submit Data",
        icon: svg(faShareFromSquare),
    },
    {
        title: "Phenotype Atlas",
        description: "Access thousands of annotated zebrafish phenotypes curated by experts. Search, analyze, and visualize toxicology data to support your research and drive new discoveries.",
        href: "#",
        btnLabel: "Explore Atlas",
        icon: svg(faChartBar),
    },
]
