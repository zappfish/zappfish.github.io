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
        description: "Learn how ZAPP supports the sharing, reuse, and reproducibility of zebrafish phenotypic and toxicological data. Explore our community-driven efforts to develop and promote standards, along with tools for standards-based data annotation and a zebrafish atlas featuring standardized data and visual representations of phenotypes.",
        href: "/goals/",
        btnLabel: "Read More",
        icon: svg(faFileLines),
    },
    {
        title: "Upcoming Events",
        description: "Connect with the ZAPP team and community members, share updates, and stay informed about project developments. Participate in webinars, workshops, and collaborative sessions that support community engagement and knowledge exchange.",
        href: "/events/",
        btnLabel: "Join Now",
        icon: svg(faCalendarDays),
    },
    {
        title: "Submit Data",
        description: "Annotate your research findings using established standards and submit them to the zebrafish phenotype atlas. Contribute to a growing collection of phenotype images supported by standardized, structured annotations.",
        href: "/coming-soon/",
        btnLabel: "Submit Data",
        icon: svg(faShareFromSquare),
    },
    {
        title: "Phenotype Atlas",
        description: "Explore our interactive atlas, which includes phenotype observations, visual representations, and search tools to support data discovery and exploration.",
        href: "/coming-soon/",
        btnLabel: "Explore Atlas",
        icon: svg(faChartBar),
    },
]
