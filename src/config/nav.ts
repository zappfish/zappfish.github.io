// Single source of truth for site nav — used by Header and Footer.
export type NavItem =
    | { label: string; path: string; children?: never }
    | { label: string; path?: never; children: { label: string; path: string }[] }

export const navItems: NavItem[] = [
    { label: "Home",          path: "/" },
    { label: "Goals",         path: "/goals/" },
    { label: "Community",     path: "/community/" },
    { label: "Meet the Team", path: "/team/" },
    { label: "Get Involved",  path: "/get-involved/" },
    { label: "Events",        path: "/events/" },
    { label: "FAQ",           path: "/faqs/" },
    { label: "Sample", children: [
        { label: "Item 1", path: "/" },
        { label: "Item 2", path: "/" },
    ]},
]
