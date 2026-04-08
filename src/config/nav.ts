// Single source of truth for site nav — used by Header and Footer.
export type NavItem =
    | { label: string; path: string; children?: never }
    | { label: string; path?: never; children: { label: string; path: string; external?: boolean }[] }

export const navItems: NavItem[] = [
    { label: "Home",        path: "/" },
    { label: "About",       children: [
        { label: "Goals",   path: "/goals" },
        { label: "SAB",     path: "/sab" },
        { label: "Team",    path: "/team" },
    ]},
    { label: "Get Involved", children: [
        { label: "Community",   path: "/community" },
        { label: "Events",      path: "/events" },
        { label: "Contact Us",  path: "/contact" },
    ]},
    { label: "FAQ",         path: "/faqs" },
    { label: "Resources",   children: [
        { label: "Technical Resources",   path: "/resources" },
        { label: "ZAPP in the Wild",      path: "/zapp-in-the-wild" },
        { label: "Blog",                  path: "/blog" },
        { label: "ZAPP GitHub",           path: "https://github.com/zappfish", external: true },
    ]},
]
