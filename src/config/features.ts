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
        description: "Explore ZAPP's community-driven standards for zebrafish phenotypic and toxicological data sharing, reuse, and reproducibility.",
        href: "/goals/",
        btnLabel: "Read More",
        icon: svg(faFileLines),
    },
    {
        title: "Upcoming Events",
        description: "Join webinars, workshops, and collaborative sessions to connect with the ZAPP team and stay informed about project developments.",
        href: "/events/",
        btnLabel: "Join Now",
        icon: svg(faCalendarDays),
    },
    {
        title: "Submit Data",
        description: "Annotate your research using established standards and contribute phenotype images to the zebrafish atlas.",
        href: "/coming-soon/",
        btnLabel: "Submit Data",
        icon: svg(faShareFromSquare),
    },
    {
        title: "Phenotype Atlas",
        description: "Search and explore phenotype observations and visual representations in our interactive atlas.",
        href: "/coming-soon/",
        btnLabel: "Explore Atlas",
        icon: svg(faChartBar),
    },
]
