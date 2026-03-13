// Single source of truth for site nav — used by Header and Footer.
export type NavItem =
    | { label: string; path: string; children?: never }
    | { label: string; path?: never; children: { label: string; path: string }[] }

export const navItems: NavItem[] = [
    { label: "Home",        path: "/" },
    { label: "About",       children: [
        { label: "Goals",   path: "/goals/" },
        { label: "SAB",     path: "#" },
        { label: "Team",    path: "/team/" },
    ]},
    { label: "Get Involved", children: [
        { label: "Community",   path: "/community/" },
        { label: "Contact Us",  path: "#" },
    ]},
    { label: "FAQ",         path: "/faqs/" },
    { label: "Resources",   path: "#" },
]
